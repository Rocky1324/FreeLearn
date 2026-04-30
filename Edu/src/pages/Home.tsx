import { Link } from "wouter";
import { BookOpen, GraduationCap, MapPin, HeartHandshake, ArrowRight, PlayCircle, Award, Briefcase } from "lucide-react";

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="badge mb-2">
              <span className="dot"></span>
              L'éducation pour tous, partout en Haïti
            </div>
            <h1>Donner à chaque jeune haïtien les mêmes chances de réussir</h1>
            <p>
              De Cité Soleil au Plateau Central, accédez gratuitement à des cours de qualité, 
              des bourses d'études et une orientation personnalisée.
            </p>
            <div className="hero-actions">
              <Link href="/cours" className="btn btn-primary">
                Explorer les cours
                <ArrowRight size={20} />
              </Link>
              <Link href="/orientation" className="btn btn-outline">
                Test d'orientation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section stats-section">
        <div className="container">
          <div className="grid grid-4 stats-grid">
            <div className="stat-card">
              <h3>12+</h3>
              <p>Cours Complets</p>
            </div>
            <div className="stat-card">
              <h3>15+</h3>
              <p>Bourses & Stages</p>
            </div>
            <div className="stat-card">
              <h3>4</h3>
              <p>Zones Prioritaires</p>
            </div>
            <div className="stat-card">
              <h3>100%</h3>
              <p>Gratuit & Hors-ligne</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <div className="section-header text-center mb-4">
            <h2>Pourquoi EduConnect ?</h2>
            <p>Une solution pensée pour les défis d'Haïti</p>
          </div>
          <div className="grid grid-3">
            <div className="card feature-card">
              <div className="icon-wrapper"><BookOpen size={32} /></div>
              <h3>Cours Simplifiés</h3>
              <p>Maths, Français, Sciences... Tout le programme haïtien expliqué simplement.</p>
            </div>
            <div className="card feature-card">
              <div className="icon-wrapper"><PlayCircle size={32} /></div>
              <h3>Mode Hors-ligne</h3>
              <p>Téléchargez vos cours une seule fois et apprenez sans connexion internet.</p>
            </div>
            <div className="card feature-card">
              <div className="icon-wrapper"><Briefcase size={32} /></div>
              <h3>Opportunités Réelles</h3>
              <p>Bourses, formations et concours pour propulser votre carrière.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Priority Zones */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header text-center mb-4">
            <h2>Nos Zones Prioritaires</h2>
            <p>Nous intervenons là où les besoins sont les plus urgents</p>
          </div>
          <div className="grid grid-4">
            {["Cité Soleil", "Bel-Air", "Martissant", "Plateau Central"].map((zone) => (
              <div key={zone} className="zone-card card">
                <MapPin size={24} className="text-primary" />
                <h3>{zone}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section cta-section text-center">
        <div className="container">
          <div className="glass cta-box p-4">
            <h2>Prêt à transformer votre avenir ?</h2>
            <p className="mb-3">Rejoignez des milliers de jeunes qui utilisent déjà EduConnect.</p>
            <Link href="/cours" className="btn btn-primary">Commencer maintenant</Link>
          </div>
        </div>
      </section>

      <style>{`
        .badge {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 100px;
          font-size: 0.9rem;
          font-weight: 500;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .dot {
          width: 8px;
          height: 8px;
          background: var(--secondary);
          border-radius: 50%;
          margin-right: 0.75rem;
          box-shadow: 0 0 10px var(--secondary);
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        .stats-grid {
          grid-template-columns: repeat(4, 1fr);
          text-align: center;
        }
        .stat-card h3 {
          font-size: 2.5rem;
          color: var(--primary);
        }
        .stat-card p {
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 1px;
        }
        .icon-wrapper {
          color: var(--primary);
          margin-bottom: 1rem;
        }
        .feature-card h3 {
          margin-bottom: 0.5rem;
        }
        .cta-section {
          background: var(--primary);
          color: var(--white);
        }
        .cta-box {
          border-radius: var(--radius-lg);
          color: var(--text-main);
        }
        .cta-box h2 {
          color: var(--primary);
          margin-bottom: 1rem;
        }
        .grid-4 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }
        .zone-card {
          text-align: center;
          padding: 2rem;
        }
        .zone-card h3 {
          margin-top: 1rem;
          font-family: 'Outfit', sans-serif;
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .hero h1 { font-size: 2.5rem; }
          .hero-actions { flex-direction: column; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
