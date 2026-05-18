import { Link } from "wouter";
import { GraduationCap, ArrowLeft, Shield, Eye, Database, Share2, Lock, Mail, Trash2, RefreshCw } from "lucide-react";

const LAST_UPDATED = "18 mai 2026";
const CONTACT_EMAIL = "freelearn.haiti@gmail.com";
const APP_NAME = "FreeLearn";
const APP_URL = "https://educonnect-frontend-vqa9.onrender.com";

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

export default function PrivacyPolicy() {
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
            <Shield className="w-4 h-4" />
            Politique de confidentialité
          </div>
          <h1 className="text-3xl font-bold mb-3">Vos données, votre vie privée</h1>
          <p className="text-muted-foreground">
            Dernière mise à jour : <strong>{LAST_UPDATED}</strong>. Cette politique s'applique à l'application{" "}
            <strong>{APP_NAME}</strong> accessible sur{" "}
            <a href={APP_URL} className="text-primary underline" target="_blank" rel="noopener noreferrer">
              {APP_URL}
            </a>
            .
          </p>
        </div>

        <Section icon={Eye} title="1. Données que nous collectons">
          <p>
            Lorsque vous créez un compte, nous collectons les informations suivantes :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Votre adresse e-mail</li>
            <li>Votre nom d'affichage</li>
            <li>Votre mot de passe (chiffré — nous ne le stockons jamais en clair)</li>
          </ul>
          <p>
            Si vous vous connectez avec Google, nous collectons également :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Votre identifiant Google</li>
            <li>Votre adresse e-mail et nom fournis par Google</li>
            <li>Votre photo de profil Google</li>
            <li>Un jeton d'accès et un jeton de rafraîchissement Google (pour Google Drive et Google Calendar)</li>
          </ul>
          <p>
            Nous collectons également des données d'utilisation : les chapitres complétés, votre progression dans les cours et les sessions d'activité.
          </p>
        </Section>

        <Section icon={Database} title="2. Comment nous utilisons vos données">
          <p>Vos données sont utilisées exclusivement pour :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Vous authentifier et maintenir votre session de connexion</li>
            <li>Sauvegarder votre progression dans les cours</li>
            <li>Synchroniser vos événements académiques avec Google Calendar (si vous avez accordé l'accès)</li>
            <li>Enregistrer des fichiers PDF dans votre Google Drive personnel (si vous avez accordé l'accès)</li>
            <li>Afficher votre tableau de bord de progression</li>
          </ul>
          <p>
            Nous n'utilisons pas vos données à des fins publicitaires, commerciales ou d'analyse de masse. Nous ne vendons jamais vos données.
          </p>
        </Section>

        <Section icon={Share2} title="3. Utilisation des services Google">
          <p>
            {APP_NAME} utilise les APIs Google suivantes, uniquement si vous choisissez de connecter votre compte Google :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Google Calendar API</strong> — pour synchroniser les événements du calendrier académique
              vers votre agenda Google personnel. Nous créons des événements en votre nom ; nous ne lisons, modifions
              ni supprimons pas vos événements existants.
            </li>
            <li>
              <strong>Google Drive API (drive.file)</strong> — pour enregistrer des fichiers PDF d'annales
              dans votre Google Drive. Nous n'avons accès qu'aux fichiers créés par {APP_NAME} lui-même, jamais
              à vos autres fichiers Drive.
            </li>
          </ul>
          <p>
            L'utilisation des APIs Google est régie par les{" "}
            <a
              href="https://developers.google.com/terms"
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Conditions d'utilisation des APIs Google
            </a>
            . Les données obtenues via les APIs Google ne sont pas partagées avec des tiers et ne sont utilisées
            qu'aux fins décrites ci-dessus, conformément à la{" "}
            <a
              href="https://policies.google.com/privacy"
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Politique de confidentialité de Google
            </a>
            .
          </p>
        </Section>

        <Section icon={Lock} title="4. Sécurité de vos données">
          <p>
            Nous prenons la sécurité au sérieux :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Les mots de passe sont hachés avec bcrypt avant d'être stockés</li>
            <li>Les jetons de session sont stockés sous forme hachée (SHA-256) ; le jeton brut n'existe qu'en cookie HTTP-only</li>
            <li>Les cookies de session utilisent les attributs <code>HttpOnly</code>, <code>Secure</code> et <code>SameSite</code></li>
            <li>Les jetons Google sont stockés de manière chiffrée dans notre base de données</li>
            <li>Toutes les communications entre votre navigateur et nos serveurs sont chiffrées (HTTPS)</li>
          </ul>
        </Section>

        <Section icon={RefreshCw} title="5. Conservation et partage des données">
          <p>
            Nous conservons vos données tant que votre compte est actif. Les sessions expirent automatiquement
            après 30 jours d'inactivité.
          </p>
          <p>
            Nous ne partageons vos données avec aucun tiers, sauf dans les cas suivants :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Google</strong> — uniquement les données nécessaires à l'utilisation de Calendar et Drive,
              si vous choisissez de connecter votre compte Google
            </li>
            <li>
              <strong>Obligations légales</strong> — si la loi nous y oblige expressément
            </li>
          </ul>
        </Section>

        <Section icon={Trash2} title="6. Vos droits">
          <p>Vous avez le droit de :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Accéder aux données que nous détenons sur vous</li>
            <li>Demander la correction de vos données</li>
            <li>Demander la suppression complète de votre compte et de toutes vos données</li>
            <li>Révoquer l'accès de {APP_NAME} à votre compte Google à tout moment via les{" "}
              <a href="https://myaccount.google.com/permissions" className="text-primary underline" target="_blank" rel="noopener noreferrer">
                paramètres de sécurité Google
              </a>
            </li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline">
              {CONTACT_EMAIL}
            </a>
            . Nous répondrons dans un délai de 30 jours.
          </p>
        </Section>

        <Section icon={Mail} title="7. Contact">
          <p>
            Pour toute question relative à cette politique de confidentialité ou à vos données personnelles,
            contactez-nous :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              E-mail :{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline">
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
          <p>
            Cette politique peut être mise à jour de temps en temps. En cas de modification importante,
            nous vous en informerons via l'application.
          </p>
        </Section>

        <div className="border-t pt-8 mt-8 text-center text-sm text-muted-foreground">
          <p>
            Voir aussi :{" "}
            <Link href="/conditions-utilisation" className="text-primary underline font-medium">
              Conditions d'utilisation
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
