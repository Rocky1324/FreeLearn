// --- CONFIGURATION ET DONNÉES STATIQUES ---

// Failles majeures (Approximations pour Haïti)
const faultLines = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": { "name": "Faille d'Enriquillo-Plantain Garden" },
            "geometry": { "type": "LineString", "coordinates": [[-74.450, 18.466], [-73.500, 18.450], [-72.333, 18.533], [-71.850, 18.520], [-71.600, 18.500]] }
        },
        {
            "type": "Feature",
            "properties": { "name": "Faille Septentrionale" },
            "geometry": { "type": "LineString", "coordinates": [[-73.300, 19.900], [-72.200, 19.800], [-71.500, 19.700]] }
        }
    ]
};

// Heatmap des zones à risque (Généré depuis les failles)
function generateHeatmapPoints(line, weight) {
    const points = [];
    const coords = line.geometry.coordinates;
    for (let i = 0; i < coords.length - 1; i++) {
        const start = coords[i], end = coords[i+1];
        for (let j = 0; j <= 50; j++) {
            const fraction = j / 50;
            points.push({
                type: "Feature",
                properties: { risk: weight },
                geometry: { type: "Point", coordinates: [start[0] + (end[0] - start[0]) * fraction, start[1] + (end[1] - start[1]) * fraction] }
            });
        }
    }
    return points;
}
const riskHeatmapPoints = {
    "type": "FeatureCollection",
    "features": [
        ...generateHeatmapPoints(faultLines.features[0], 1.0),
        ...generateHeatmapPoints(faultLines.features[1], 0.8)
    ]
};

// URL des tuiles raster pour les fonds de carte
const BASEMAPS = {
    'satellite': 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    'streets': 'https://tile.openstreetmap.org/{z}/{x}/{y}.png' // Fallback gratuit OSM
};

// --- INITIALISATION DE LA CARTE ---
const map = new maplibregl.Map({
    container: 'map',
    style: {
        version: 8,
        sources: {
            'basemap': { type: 'raster', tiles: [BASEMAPS.satellite], tileSize: 256 },
            'terrain': { type: 'raster-dem', tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'], encoding: 'terrarium', tileSize: 256 }
        },
        layers: [
            { id: 'background', type: 'background', paint: { 'background-color': '#020617' } },
            { id: 'basemap-layer', type: 'raster', source: 'basemap', minzoom: 0, maxzoom: 19 }
        ]
    },
    center: [-72.5, 19.0], 
    zoom: 7.2,
    pitch: 55, 
    bearing: -10,
    maxPitch: 85
});

// Variables globales d'état
let currentMagFilter = 5.0;
let currentYearFilter = 2026;
let isMeasureMode = false;
let rippleMarkers = []; // Pour stocker les marqueurs HTML animés

// --- FONCTIONS DE FETCH DE DONNÉES ---

// 1. Fetch USGS Séismes
async function fetchUSGSData(type) {
    let url = '';
    // Bounding box d'Haïti approximative : minLat=17, maxLat=20.5, minLng=-75, maxLng=-71
    if (type === 'historical') {
        // Depuis 1900, Magnitude > 5.0 dans la zone d'Haïti
        url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=1900-01-01&endtime=2026-12-31&minmagnitude=5.0&minlatitude=17&maxlatitude=20.5&minlongitude=-75&maxlongitude=-71';
    } else {
        // Temps réel (30 jours), on prend global et on filtre côté client
        url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson';
    }
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Si temps réel, on filtre géographiquement côté client car l'API feed ne prend pas de bbox
        if (type === 'realtime') {
            data.features = data.features.filter(f => {
                const [lng, lat] = f.geometry.coordinates;
                return lat >= 17 && lat <= 20.5 && lng >= -75 && lng <= -71;
            });
        }
        
        // Ajouter une propriété "year" pour la timeline
        data.features.forEach(f => {
            f.properties.year = new Date(f.properties.time).getFullYear();
        });
        
        return data;
    } catch (e) {
        console.error("Erreur USGS:", e);
        return { type: "FeatureCollection", features: [] };
    }
}

// 2. Fetch Hôpitaux (Overpass API)
async function fetchHospitals() {
    const overpassQuery = `[out:json][timeout:25];node["amenity"="hospital"](18,-75,20,-71);out;`;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const features = data.elements.map(el => ({
            type: "Feature",
            properties: { name: el.tags.name || "Hôpital inconnu" },
            geometry: { type: "Point", coordinates: [el.lon, el.lat] }
        }));
        
        return { type: "FeatureCollection", features: features };
    } catch (e) {
        console.error("Erreur Overpass:", e);
        return { type: "FeatureCollection", features: [] };
    }
}

// Mettre à jour les filtres de la couche de séismes
function updateEarthquakeFilters() {
    // Si la timeline est à fond à droite (2026), on montre tout (ou on filtre par l'année).
    // Modif : le slider montre les séismes JUSQU'À l'année sélectionnée.
    const filter = [
        'all',
        ['>=', ['get', 'mag'], currentMagFilter],
        ['<=', ['get', 'year'], currentYearFilter]
    ];
    
    if (map.getLayer('earthquakes-layer')) {
        map.setFilter('earthquakes-layer', filter);
    }
    
    // Gérer les marqueurs d'ondes de choc
    manageRippleMarkers();
}

// Gérer les animations d'ondes de choc (Ripples) pour les séismes > 6.0
function manageRippleMarkers() {
    // Nettoyer les anciens
    rippleMarkers.forEach(m => m.remove());
    rippleMarkers = [];
    
    const source = map.getSource('earthquakes-src');
    if (!source || !source._data || !source._data.features) return;
    
    const features = source._data.features;
    
    features.forEach(f => {
        if (f.properties.mag >= 6.0 && f.properties.year <= currentYearFilter) {
            const el = document.createElement('div');
            el.className = 'ripple-marker';
            
            const popup = new maplibregl.Popup({ offset: 15 }).setHTML(`
                <div class="quake-popup">
                    <h3>Séisme Majeur (Mag ${f.properties.mag})</h3>
                    <p><strong>Date :</strong> ${new Date(f.properties.time).toLocaleDateString()}</p>
                    <p><strong>Lieu :</strong> ${f.properties.place}</p>
                </div>
            `);
            
            const marker = new maplibregl.Marker({ element: el })
                .setLngLat(f.geometry.coordinates)
                .setPopup(popup)
                .addTo(map);
                
            rippleMarkers.push(marker);
        }
    });
}

// --- CHARGEMENT DE LA CARTE ---

map.on('load', async () => {
    map.setTerrain({ source: 'terrain', exaggeration: 1.5 });

    // 1. Couche Heatmap
    map.addSource('risk-heatmap-src', { type: 'geojson', data: riskHeatmapPoints });
    map.addLayer({
        id: 'risk-heatmap-layer',
        type: 'heatmap',
        source: 'risk-heatmap-src',
        paint: {
            'heatmap-weight': ['get', 'risk'],
            'heatmap-intensity': [ 'interpolate', ['linear'], ['zoom'], 0, 1, 9, 3 ],
            'heatmap-color': [
                'interpolate', ['linear'], ['heatmap-density'],
                0, 'rgba(255, 255, 255, 0)',
                0.2, 'rgba(255, 204, 0, 0.4)',
                0.5, 'rgba(255, 102, 0, 0.6)',
                0.8, 'rgba(255, 0, 0, 0.8)'
            ],
            'heatmap-radius': [ 'interpolate', ['linear'], ['zoom'], 0, 10, 9, 60 ],
            'heatmap-opacity': 0.6
        }
    });

    // 2. Failles
    map.addSource('faults-src', { type: 'geojson', data: faultLines });
    map.addLayer({
        id: 'faults-layer',
        type: 'line',
        source: 'faults-src',
        paint: { 'line-color': '#ff3333', 'line-width': 3, 'line-dasharray': [2, 2] }
    });

    // 3. Vulnérabilité (Hôpitaux)
    const hospitalsData = await fetchHospitals();
    map.addSource('hospitals-src', { type: 'geojson', data: hospitalsData });
    map.addLayer({
        id: 'hospitals-layer',
        type: 'circle',
        source: 'hospitals-src',
        paint: {
            'circle-radius': 6,
            'circle-color': '#3b82f6',
            'circle-stroke-width': 1,
            'circle-stroke-color': '#ffffff'
        },
        layout: { 'visibility': 'none' } // Caché par défaut
    });
    
    // 4. Séismes (Chargement initial = Historique)
    const earthquakeData = await fetchUSGSData('historical');
    map.addSource('earthquakes-src', { type: 'geojson', data: earthquakeData });
    map.addLayer({
        id: 'earthquakes-layer',
        type: 'circle',
        source: 'earthquakes-src',
        paint: {
            'circle-radius': [
                'interpolate', ['linear'], ['get', 'mag'],
                5.0, 5,
                8.0, 20
            ],
            'circle-color': 'rgba(255, 204, 0, 0.7)',
            'circle-stroke-width': 1.5,
            'circle-stroke-color': '#ff4444'
        }
    });

    updateEarthquakeFilters();

    // Interactions Séismes
    map.on('click', 'earthquakes-layer', (e) => {
        if (isMeasureMode) return;
        const props = e.features[0].properties;
        const html = `
            <div class="quake-popup">
                <h3>Mag ${props.mag}</h3>
                <p><strong>Date :</strong> ${new Date(props.time).toLocaleString()}</p>
                <p><strong>Lieu :</strong> ${props.place}</p>
            </div>
        `;
        new maplibregl.Popup().setLngLat(e.lngLat).setHTML(html).addTo(map);
    });
    
    // Interactions Hôpitaux
    map.on('click', 'hospitals-layer', (e) => {
        if (isMeasureMode) return;
        new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<div style="color:black;"><strong>Hôpital:</strong><br>${e.features[0].properties.name}</div>`)
            .addTo(map);
    });

    map.on('mouseenter', 'earthquakes-layer', () => map.getCanvas().style.cursor = 'pointer');
    map.on('mouseleave', 'earthquakes-layer', () => map.getCanvas().style.cursor = isMeasureMode ? 'crosshair' : '');

    // --- ÉVÉNEMENTS UI ---

    // Toggles Couches
    document.getElementById('toggle-heatmap').addEventListener('change', (e) => {
        map.setLayoutProperty('risk-heatmap-layer', 'visibility', e.target.checked ? 'visible' : 'none');
    });
    document.getElementById('toggle-faults').addEventListener('change', (e) => {
        map.setLayoutProperty('faults-layer', 'visibility', e.target.checked ? 'visible' : 'none');
    });
    document.getElementById('toggle-hospitals').addEventListener('change', (e) => {
        map.setLayoutProperty('hospitals-layer', 'visibility', e.target.checked ? 'visible' : 'none');
    });

    // Filtre Magnitude
    document.getElementById('mag-filter').addEventListener('input', (e) => {
        currentMagFilter = parseFloat(e.target.value);
        document.getElementById('mag-value').innerText = currentMagFilter.toFixed(1);
        updateEarthquakeFilters();
    });

    // Timeline Slider
    document.getElementById('timeline-slider').addEventListener('input', (e) => {
        currentYearFilter = parseInt(e.target.value);
        document.getElementById('timeline-year').innerText = currentYearFilter;
        updateEarthquakeFilters();
    });

    // Source de données
    document.getElementById('datasource-select').addEventListener('change', async (e) => {
        const type = e.target.value;
        const newData = await fetchUSGSData(type);
        map.getSource('earthquakes-src').setData(newData);
        updateEarthquakeFilters();
        
        // Ajuster la timeline
        const slider = document.getElementById('timeline-slider');
        if (type === 'historical') {
            slider.min = "1900";
            slider.disabled = false;
        } else {
            slider.min = new Date().getFullYear();
            slider.value = slider.max;
            currentYearFilter = parseInt(slider.max);
            document.getElementById('timeline-year').innerText = "Temps Réel";
            slider.disabled = true;
        }
    });

    // Fond de carte
    document.getElementById('basemap-select').addEventListener('change', (e) => {
        map.getSource('basemap').tiles = [BASEMAPS[e.target.value]];
        // Force le rechargement de la source
        map.style.sourceCaches['basemap'].clearTiles();
        map.style.sourceCaches['basemap'].update(map.transform);
    });

    // Mode Mesure (Turf.js)
    const btnMeasure = document.getElementById('toggle-measure');
    const instruction = document.getElementById('measure-instruction');
    
    btnMeasure.addEventListener('click', () => {
        isMeasureMode = !isMeasureMode;
        if (isMeasureMode) {
            btnMeasure.classList.add('active');
            instruction.style.display = 'block';
            map.getCanvas().style.cursor = 'crosshair';
        } else {
            btnMeasure.classList.remove('active');
            instruction.style.display = 'none';
            map.getCanvas().style.cursor = '';
            if (window.measurePopup) window.measurePopup.remove();
        }
    });

    // Clic sur la carte (pour le mode mesure)
    map.on('click', (e) => {
        if (!isMeasureMode) return;
        
        const pt = turf.point([e.lngLat.lng, e.lngLat.lat]);
        let minDistance = Infinity;
        let closestFault = "";
        
        // Calculer la distance à chaque faille
        faultLines.features.forEach(fault => {
            const distance = turf.pointToLineDistance(pt, fault, {units: 'kilometers'});
            if (distance < minDistance) {
                minDistance = distance;
                closestFault = fault.properties.name;
            }
        });
        
        // Estimer le risque
        let riskLevel = "Faible";
        let color = "#10b981"; // Vert
        if (minDistance < 10) { riskLevel = "Très Élevé (Destruction probable)"; color = "#ef4444"; }
        else if (minDistance < 30) { riskLevel = "Élevé"; color = "#f97316"; }
        else if (minDistance < 60) { riskLevel = "Modéré"; color = "#eab308"; }
        
        if (window.measurePopup) window.measurePopup.remove();
        
        window.measurePopup = new maplibregl.Popup({ closeOnClick: false })
            .setLngLat(e.lngLat)
            .setHTML(`
                <div style="color: black; font-family: Inter, sans-serif; padding: 5px;">
                    <h4 style="margin:0 0 5px 0; color: ${color};">Analyse du Risque</h4>
                    <p style="margin:2px 0;"><strong>Distance à la faille:</strong> ${minDistance.toFixed(2)} km</p>
                    <p style="margin:2px 0;"><strong>Faille la plus proche:</strong> ${closestFault}</p>
                    <p style="margin:2px 0;"><strong>Niveau de Risque:</strong> <span style="color:${color}; font-weight:bold;">${riskLevel}</span></p>
                </div>
            `)
            .addTo(map);
    });

    // Navigation de base
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');

    document.getElementById('reset-view').addEventListener('click', () => {
        map.flyTo({ center: [-72.5, 19.0], zoom: 7.2, pitch: 55, bearing: -10, duration: 2500 });
    });
});
