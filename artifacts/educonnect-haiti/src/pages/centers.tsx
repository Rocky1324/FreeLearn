import { Layout } from "@/components/layout/Layout";
import { centers } from "@/data/centers";
import { MapPin, Clock, Laptop, Wifi, Users, Building } from "lucide-react";

import centreImg from "@/assets/images/centre.png";

export default function Centers() {
  return (
    <Layout>
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight">
              Centres Relais EduConnect
            </h1>
            <p className="text-xl text-muted-foreground">
              Pas d'internet à la maison ? Aucun problème. Nos centres communautaires partenaires vous offrent l'accès gratuit aux équipements nécessaires pour apprendre.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl border">
            <div className="aspect-[4/3] bg-muted relative">
               <img src={centreImg} alt="Centre communautaire" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-serif mb-4">Trouvez un centre près de chez vous</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nous avons identifié des bibliothèques, écoles et centres communautaires dans nos zones prioritaires pour vous accueillir dans de bonnes conditions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {centers.map(center => (
            <div key={center.id} className="bg-card border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6 border-b bg-muted/10">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-bold rounded-md uppercase tracking-wider">
                    {center.zone}
                  </span>
                  <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                    {center.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-serif mt-2 mb-1">{center.name}</h3>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mr-3 mt-0.5" />
                  <span className="text-sm font-medium">{center.address}</span>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-muted-foreground shrink-0 mr-3 mt-0.5" />
                  <span className="text-sm font-medium">{center.hours}</span>
                </div>
                
                <div className="pt-4 mt-4 border-t">
                  <h4 className="text-xs uppercase font-bold text-muted-foreground mb-3 tracking-wider">Équipements disponibles</h4>
                  <ul className="space-y-2">
                    {center.equipment.map((eq, idx) => {
                      let Icon = Building;
                      if (eq.toLowerCase().includes("ordinateur")) Icon = Laptop;
                      else if (eq.toLowerCase().includes("internet")) Icon = Wifi;
                      else if (eq.toLowerCase().includes("encadreur")) Icon = Users;
                      
                      return (
                        <li key={idx} className="flex items-center text-sm text-foreground/80">
                          <Icon className="w-4 h-4 mr-2 text-primary" />
                          {eq}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}