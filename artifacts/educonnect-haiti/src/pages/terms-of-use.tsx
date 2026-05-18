import { Link } from "wouter";
import { GraduationCap, ArrowLeft, FileText, UserCheck, BookOpen, AlertTriangle, Scale, Mail, Ban } from "lucide-react";

const LAST_UPDATED = "18 mai 2026";
const CONTACT_EMAIL = "freelearn.haiti@gmail.com";
const APP_NAME = "FreeLearn";

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="text-muted-foreground leading-relaxed space-y-3 pl-12">{children}</div>
    </section>
  );
}

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/bienvenue">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg group-hover:text-primary transition-colors">FreeLearn</span>
            </div>
          </Link>
          <Link href="/bienvenue">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-3">
            <FileText className="w-4 h-4" />
            Conditions d'utilisation
          </div>
          <h1 className="text-3xl font-bold mb-3">Conditions d'utilisation de {APP_NAME}</h1>
          <p className="text-muted-foreground">
            Dernière mise à jour : <strong>{LAST_UPDATED}</strong>. En utilisant {APP_NAME}, vous acceptez
            les présentes conditions d'utilisation. Veuillez les lire attentivement avant de créer un compte.
          </p>
        </div>

        <Section icon={BookOpen} title="1. Description du service">
          <p>
            {APP_NAME} est une plateforme éducative numérique gratuite destinée aux élèves et enseignants
            d'Haïti. Elle offre :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Des ressources pédagogiques pour les classes de 1ère AF à 9ème AF</li>
            <li>Des outils d'apprentissage (fiches, annales, calendrier académique)</li>
            <li>Un suivi de progression personnalisé</li>
            <li>Des informations sur les opportunités éducatives et les établissements scolaires</li>
            <li>Un espace de forum communautaire</li>
            <li>Des fonctionnalités d'intégration avec Google Calendar et Google Drive (optionnelles)</li>
          </ul>
          <p>
            Le service est fourni gratuitement et sans garantie de disponibilité continue.
          </p>
        </Section>

        <Section icon={UserCheck} title="2. Création de compte et admissibilité">
          <p>Pour utiliser {APP_NAME}, vous devez :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Avoir au moins 13 ans. Les élèves de moins de 13 ans doivent obtenir l'accord d'un parent ou tuteur</li>
            <li>Fournir des informations exactes lors de la création de votre compte</li>
            <li>Ne pas créer plusieurs comptes pour le même usage</li>
            <li>Garder vos identifiants de connexion confidentiels</li>
          </ul>
          <p>
            Les comptes enseignants nécessitent un code d'accès spécifique fourni par l'administration
            de {APP_NAME}. Toute utilisation frauduleuse de ce code est interdite.
          </p>
          <p>
            Vous êtes responsable de toutes les activités effectuées depuis votre compte.
          </p>
        </Section>

        <Section icon={Scale} title="3. Utilisation acceptable">
          <p>Vous acceptez d'utiliser {APP_NAME} uniquement à des fins éducatives légitimes. Il est notamment interdit de :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Publier des contenus illégaux, obscènes, harcelants ou discriminatoires sur le forum</li>
            <li>Tenter d'accéder aux comptes d'autres utilisateurs</li>
            <li>Utiliser des outils automatisés (bots, scrapers) pour accéder à la plateforme</li>
            <li>Copier ou redistribuer les contenus pédagogiques à des fins commerciales sans autorisation</li>
            <li>Perturber le bon fonctionnement du service (attaques, surcharge intentionnelle, etc.)</li>
            <li>Usurper l'identité d'un autre utilisateur ou d'un enseignant</li>
          </ul>
        </Section>

        <Section icon={BookOpen} title="4. Propriété intellectuelle">
          <p>
            Les contenus éducatifs disponibles sur {APP_NAME} (cours, fiches, ressources pédagogiques) sont
            fournis à des fins d'apprentissage. Certains contenus peuvent être soumis à des droits d'auteur
            tiers ; dans ce cas, ils sont utilisés conformément aux dispositions relatives à l'usage éducatif.
          </p>
          <p>
            Les contenus que vous publiez sur le forum vous appartiennent. En les publiant, vous accordez à
            {" "}{APP_NAME} une licence non exclusive pour les afficher aux autres utilisateurs de la plateforme.
          </p>
          <p>
            Le code source, le design et le nom {APP_NAME} sont la propriété de leurs auteurs et ne peuvent
            être reproduits sans autorisation.
          </p>
        </Section>

        <Section icon={Ban} title="5. Suspension et suppression de compte">
          <p>
            {APP_NAME} se réserve le droit de suspendre ou supprimer tout compte qui :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Viole les présentes conditions d'utilisation</li>
            <li>Publie des contenus inappropriés sur le forum</li>
            <li>Tente de compromettre la sécurité de la plateforme</li>
          </ul>
          <p>
            Vous pouvez supprimer votre compte à tout moment en nous contactant à{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline">
              {CONTACT_EMAIL}
            </a>
            . La suppression entraîne l'effacement définitif de toutes vos données dans un délai de 30 jours.
          </p>
        </Section>

        <Section icon={AlertTriangle} title="6. Limitation de responsabilité">
          <p>
            {APP_NAME} est fourni « tel quel », sans garantie d'aucune sorte. Nous ne garantissons pas :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>La disponibilité continue du service (pannes, maintenance)</li>
            <li>L'exactitude ou l'exhaustivité des contenus pédagogiques</li>
            <li>La compatibilité avec tous les appareils ou navigateurs</li>
          </ul>
          <p>
            {APP_NAME} ne saurait être tenu responsable des dommages directs ou indirects résultant de
            l'utilisation ou de l'impossibilité d'utiliser le service.
          </p>
          <p>
            Nous nous efforçons de maintenir le service opérationnel et de corriger les erreurs dans les
            meilleurs délais, mais sans engagement contractuel de délai ou de niveau de service.
          </p>
        </Section>

        <Section icon={Scale} title="7. Modifications des conditions">
          <p>
            Ces conditions peuvent être mises à jour à tout moment. En cas de modification importante,
            nous vous en informerons via l'application ou par e-mail. La poursuite de l'utilisation de
            {" "}{APP_NAME} après notification vaut acceptation des nouvelles conditions.
          </p>
        </Section>

        <Section icon={Mail} title="8. Contact">
          <p>
            Pour toute question concernant ces conditions d'utilisation :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              E-mail :{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline">
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </Section>

        <div className="border-t pt-8 mt-8 text-center text-sm text-muted-foreground">
          <p>
            Voir aussi :{" "}
            <Link href="/politique-de-confidentialite" className="text-primary underline font-medium">
              Politique de confidentialité
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
