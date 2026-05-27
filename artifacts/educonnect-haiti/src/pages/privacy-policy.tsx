import { Link } from "wouter";
import { GraduationCap, ArrowLeft, Shield, Eye, Database, Share2, Lock, Mail, Trash2, RefreshCw, Ban } from "lucide-react";

const LAST_UPDATED = "27 mai 2026";
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
            <li>Votre mot de passe (chiffré avec bcrypt — jamais stocké en clair)</li>
          </ul>
          <p>
            Si vous vous connectez avec Google, nous collectons également :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Votre identifiant Google unique</li>
            <li>Votre adresse e-mail et votre nom fournis par Google</li>
            <li>Votre photo de profil Google</li>
            <li>Un jeton d'accès et un jeton de rafraîchissement Google (nécessaires pour Google Drive et Google Calendar)</li>
          </ul>
          <p>
            Nous collectons également des données d'utilisation : les chapitres complétés, votre progression dans les cours et les sessions d'activité.
          </p>
        </Section>

        <Section icon={Database} title="2. Comment nous utilisons vos données">
          <p>Vos données sont utilisées exclusivement pour :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Vous authentifier et maintenir votre session de connexion</li>
            <li>Sauvegarder et afficher votre progression dans les cours</li>
            <li>Synchroniser les événements académiques vers votre Google Calendar personnel (si vous avez accordé l'accès)</li>
            <li>Enregistrer des fichiers PDF d'annales dans votre Google Drive personnel (si vous avez accordé l'accès)</li>
            <li>Afficher votre tableau de bord de progression</li>
          </ul>
          <p>
            <strong>Nous n'utilisons jamais les données Google des utilisateurs pour entraîner des modèles d'intelligence artificielle ou d'apprentissage automatique.</strong>
          </p>
          <p>
            Nous n'utilisons pas vos données à des fins publicitaires, commerciales ou d'analyse de masse. Nous ne vendons jamais vos données.
          </p>
        </Section>

        <Section icon={Share2} title="3. Partage, transfert et divulgation des données">
          <p>
            <strong>Nous ne vendons, ne louons et ne transférons jamais vos données personnelles à des tiers à des fins commerciales.</strong>
          </p>
          <p>
            Vos données peuvent être partagées uniquement dans les cas suivants, et pour les seules fins décrites :
          </p>
          <ul className="list-disc pl-5 space-y-3">
            <li>
              <strong>Google LLC</strong> — Lorsque vous choisissez de connecter votre compte Google,
              les jetons d'accès sont transmis aux APIs Google (Calendar et Drive) uniquement pour exécuter
              les actions que vous demandez (créer un événement, enregistrer un fichier). Google traite ces
              données selon sa propre{" "}
              <a href="https://policies.google.com/privacy" className="text-primary underline" target="_blank" rel="noopener noreferrer">
                Politique de confidentialité
              </a>
              . {APP_NAME} ne lit pas, ne stocke pas et ne transfère pas le contenu de votre Calendar ou Drive
              à d'autres parties.
            </li>
            <li>
              <strong>Hébergement (Render.com)</strong> — Nos serveurs sont hébergés sur{" "}
              <a href="https://render.com" className="text-primary underline" target="_blank" rel="noopener noreferrer">
                Render.com
              </a>
              , qui héberge la base de données chiffrée contenant vos données. Render n'accède pas à vos données
              à des fins autres que la fourniture du service d'hébergement.
            </li>
            <li>
              <strong>Obligations légales</strong> — Nous pouvons divulguer vos données si la loi haïtienne
              ou internationale nous y oblige expressément (ordonnance de tribunal, obligation réglementaire).
              Nous vous en informerons dans la mesure du possible avant toute divulgation.
            </li>
          </ul>
          <p>
            En dehors de ces trois cas, <strong>aucune donnée vous concernant n'est partagée, transférée
            ou divulguée à qui que ce soit.</strong>
          </p>
        </Section>

        <Section icon={Database} title="4. Utilisation des APIs Google — détail des accès">
          <p>
            {APP_NAME} demande les autorisations Google suivantes, uniquement si vous choisissez de connecter
            votre compte Google :
          </p>
          <ul className="list-disc pl-5 space-y-3">
            <li>
              <strong>Profil de base (openid, email, profile)</strong> — Pour créer ou associer votre compte
              {APP_NAME} à votre identité Google. Nous lisons votre nom, adresse e-mail et photo de profil
              une seule fois lors de la connexion.
            </li>
            <li>
              <strong>Google Calendar</strong>{" "}
              (<code className="text-xs bg-muted px-1 py-0.5 rounded">https://www.googleapis.com/auth/calendar.events</code>)
              {" "}— Pour créer des événements académiques (rentrée, examens, vacances) dans votre agenda Google.
              Nous créons uniquement des événements à votre demande. Nous ne lisons pas, ne modifions pas
              et ne supprimons pas vos événements existants.
            </li>
            <li>
              <strong>Google Drive (drive.file)</strong>{" "}
              (<code className="text-xs bg-muted px-1 py-0.5 rounded">https://www.googleapis.com/auth/drive.file</code>)
              {" "}— Pour enregistrer des fichiers PDF d'annales dans votre Google Drive à votre demande.
              Nous n'avons accès qu'aux fichiers créés par {APP_NAME} lui-même. Nous ne pouvons jamais lire,
              modifier ni supprimer vos autres fichiers Drive.
            </li>
          </ul>
          <p>
            Les données obtenues via ces APIs ne sont utilisées qu'aux seules fins décrites ci-dessus.
            Elles ne sont <strong>jamais</strong> partagées avec des tiers, utilisées pour de la publicité,
            ou utilisées pour entraîner des modèles d'IA/ML.
          </p>
          <p>
            L'utilisation des APIs Google est régie par les{" "}
            <a href="https://developers.google.com/terms" className="text-primary underline" target="_blank" rel="noopener noreferrer">
              Conditions d'utilisation des APIs Google
            </a>{" "}
            et la politique{" "}
            <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-primary underline" target="_blank" rel="noopener noreferrer">
              Google API Services User Data Policy
            </a>
            , y compris les exigences d'utilisation limitée (Limited Use).
          </p>
        </Section>

        <Section icon={Lock} title="5. Sécurité de vos données">
          <p>
            Nous prenons la sécurité au sérieux :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Les mots de passe sont hachés avec bcrypt (12 rounds) avant d'être stockés</li>
            <li>Les jetons de session sont stockés sous forme hachée (SHA-256) ; le jeton brut n'existe qu'en cookie HTTP-only</li>
            <li>Les cookies de session utilisent les attributs <code>HttpOnly</code>, <code>Secure</code> et <code>SameSite</code></li>
            <li>Les jetons Google sont stockés dans notre base de données sécurisée (HTTPS + chiffrement en transit)</li>
            <li>Toutes les communications entre votre navigateur et nos serveurs sont chiffrées (HTTPS/TLS)</li>
          </ul>
        </Section>

        <Section icon={Ban} title="6. Ce que nous ne faisons jamais">
          <p>
            {APP_NAME} s'engage formellement à ne jamais :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Vendre, louer ou monétiser vos données personnelles</li>
            <li>Utiliser les données Google pour de la publicité ciblée</li>
            <li>Transférer vos données à des courtiers de données</li>
            <li>Utiliser les données Google pour entraîner des modèles d'IA ou de machine learning</li>
            <li>Lire le contenu de vos fichiers Drive autres que ceux créés par {APP_NAME}</li>
            <li>Lire, modifier ou supprimer vos événements Calendar existants</li>
          </ul>
        </Section>

        <Section icon={RefreshCw} title="7. Conservation des données">
          <p>
            Nous conservons vos données tant que votre compte est actif. Les sessions expirent automatiquement
            après 30 jours d'inactivité.
          </p>
          <p>
            Vous pouvez demander la suppression complète de votre compte à tout moment depuis le menu
            de votre profil ("Supprimer mon compte") ou en nous contactant. La suppression est permanente
            et entraîne l'effacement de toutes vos données dans les 30 jours.
          </p>
          <p>
            Vous pouvez également révoquer l'accès de {APP_NAME} à votre compte Google à tout moment via{" "}
            <a href="https://myaccount.google.com/permissions" className="text-primary underline" target="_blank" rel="noopener noreferrer">
              myaccount.google.com/permissions
            </a>
            .
          </p>
        </Section>

        <Section icon={Trash2} title="8. Vos droits">
          <p>Vous avez le droit de :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Accéder aux données que nous détenons sur vous</li>
            <li>Demander la correction de vos données inexactes</li>
            <li>Demander la suppression complète de votre compte et de toutes vos données</li>
            <li>Vous opposer au traitement de vos données</li>
            <li>Révoquer l'accès Google à tout moment</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline">
              {CONTACT_EMAIL}
            </a>
            . Nous répondrons dans un délai de 30 jours.
          </p>
        </Section>

        <Section icon={Mail} title="9. Contact">
          <p>
            Pour toute question relative à cette politique de confidentialité ou à vos données personnelles :
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
            Cette politique peut être mise à jour. En cas de modification importante, nous vous en informerons
            via l'application. La date de dernière mise à jour est indiquée en haut de cette page.
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
