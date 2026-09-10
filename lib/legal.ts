import { site } from "@/lib/site";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type LegalPage = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
};

export const legalNav = [
  { label: "Infos entreprise", href: "/infos-entreprise/" },
  { label: "Mentions légales", href: "/mentions-legales/" },
  { label: "Politique de cookies", href: "/politique-de-cookies/" },
  { label: "Texte alternatif", href: "/texte-alternatif/" },
  { label: "Suivi analytique", href: "/suivi-analytique/" },
] as const;

export const legalPages: LegalPage[] = [
  {
    slug: "infos-entreprise",
    title: "Infos entreprise",
    description:
      "Informations sur l’éditeur du site et le cadre d’activité de Marc-Onel Volcimus.",
    updated: "10 septembre 2026",
    sections: [
      {
        heading: "Identité",
        paragraphs: [
          `Ce site présente la marque personnelle de ${site.name}, développeur logiciel et praticien en cybersécurité.`,
          "Il s’agit d’un site vitrine individuel, non rattaché à une société commerciale enregistrée au moment de la publication.",
        ],
      },
      {
        heading: "Coordonnées",
        paragraphs: [
          `Nom : ${site.name}`,
          `E-mail : ${site.social.email}`,
          `Site : ${site.url}`,
          `Portfolio : ${site.portfolio}`,
        ],
      },
      {
        heading: "Activité présentée",
        paragraphs: [
          "Le site met en avant des compétences en développement logiciel, cybersécurité, projets personnels et présence éditoriale (notamment Instagram).",
          "Toute collaboration ou demande professionnelle peut être adressée via l’adresse e-mail indiquée ci-dessus.",
        ],
      },
      {
        heading: "Hébergement",
        paragraphs: [
          "Le site est hébergé via GitHub Pages.",
          "Hébergeur : GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.",
          "Site de l’hébergeur : https://pages.github.com",
        ],
      },
    ],
  },
  {
    slug: "mentions-legales",
    title: "Mentions légales",
    description:
      "Mentions légales du site personnel de Marc-Onel Volcimus.",
    updated: "10 septembre 2026",
    sections: [
      {
        heading: "Éditeur du site",
        paragraphs: [
          `Le présent site est édité par ${site.name}.`,
          `Contact : ${site.social.email}`,
        ],
      },
      {
        heading: "Directeur de la publication",
        paragraphs: [`${site.name}`],
      },
      {
        heading: "Hébergement",
        paragraphs: [
          "GitHub Pages — GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.",
        ],
      },
      {
        heading: "Propriété intellectuelle",
        paragraphs: [
          "L’ensemble des contenus présents sur ce site (textes, visuels, éléments graphiques, structure, code front-end dans la mesure où ils sont originaux) sont protégés par le droit d’auteur, sauf mention contraire.",
          "Toute reproduction, représentation, modification ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.",
          "Les marques, logos et contenus tiers éventuellement cités restent la propriété de leurs détenteurs respectifs.",
        ],
      },
      {
        heading: "Responsabilité",
        paragraphs: [
          "Les informations publiées le sont à titre informatif et illustratif. Elles peuvent évoluer sans préavis.",
          "L’éditeur ne saurait être tenu responsable des dommages directs ou indirects liés à l’accès, l’utilisation ou l’impossibilité d’utiliser le site, ni du contenu des sites tiers accessibles via des liens hypertextes.",
        ],
      },
      {
        heading: "Liens externes",
        paragraphs: [
          "Ce site peut contenir des liens vers Instagram, GitHub, le portfolio et d’autres services tiers. Ces sites disposent de leurs propres conditions et politiques de confidentialité.",
        ],
      },
      {
        heading: "Droit applicable",
        paragraphs: [
          "Les présentes mentions sont rédigées pour un usage transparent du site. Pour toute question, contactez l’éditeur à l’adresse e-mail indiquée.",
        ],
      },
    ],
  },
  {
    slug: "politique-de-cookies",
    title: "Politique de cookies",
    description:
      "Informations sur l’usage des cookies et du stockage local sur ce site.",
    updated: "10 septembre 2026",
    sections: [
      {
        heading: "Qu’est-ce qu’un cookie ?",
        paragraphs: [
          "Un cookie est un petit fichier déposé sur votre appareil lors de la visite d’un site. Des technologies similaires (stockage local du navigateur) peuvent aussi être utilisées pour mémoriser un choix.",
        ],
      },
      {
        heading: "Cookies et traceurs utilisés",
        paragraphs: [
          "À ce jour, ce site n’utilise pas de cookies publicitaires, de cookies de réseaux sociaux intégrés ni de cookies de mesure d’audience tiers.",
          "Le seul stockage éventuellement utilisé est le stockage local du navigateur (localStorage) pour mémoriser votre choix concernant le bandeau d’information cookies / analytique.",
        ],
        list: [
          "Nom / clé : marc-legal-notice",
          "Finalité : mémoriser que le bandeau d’information a été fermé",
          "Durée : jusqu’à suppression manuelle des données du navigateur",
          "Base : intérêt légitime / confort de navigation (pas de tracking)",
        ],
      },
      {
        heading: "Cookies techniques de l’hébergeur",
        paragraphs: [
          "GitHub Pages et le réseau de distribution associés peuvent traiter des données techniques strictement nécessaires au fonctionnement et à la sécurité de l’hébergement (journaux de connexion, etc.), selon leurs propres politiques.",
        ],
      },
      {
        heading: "Gestion de vos choix",
        paragraphs: [
          "Vous pouvez supprimer le stockage local depuis les paramètres de votre navigateur.",
          "Vous pouvez aussi refuser ou limiter les cookies via les réglages du navigateur. Cela n’empêche en général pas la consultation de ce site vitrine.",
        ],
      },
      {
        heading: "Mises à jour",
        paragraphs: [
          "Cette politique pourra être mise à jour si des cookies ou outils de mesure sont ajoutés ultérieurement. La date de mise à jour figurera en tête de page.",
        ],
      },
    ],
  },
  {
    slug: "texte-alternatif",
    title: "Texte alternatif",
    description:
      "Engagement d’accessibilité : textes alternatifs et alternatives non textuelles.",
    updated: "10 septembre 2026",
    sections: [
      {
        heading: "Objectif",
        paragraphs: [
          "Les contenus non textuels (images, illustrations, icônes informatives) doivent disposer, lorsque cela est pertinent, d’une alternative textuelle afin d’être compréhensibles avec un lecteur d’écran, lorsque les images sont désactivées, ou dans d’autres contextes d’accessibilité.",
        ],
      },
      {
        heading: "Pratique sur ce site",
        paragraphs: [
          "Les images de projet, de galerie et de présentation portent un attribut alt descriptif lorsque l’image véhicule une information.",
          "Les éléments purement décoratifs sont masqués aux technologies d’assistance (aria-hidden) lorsque c’est approprié.",
          "Les liens et boutons importants reposent sur un libellé textuel clair, pas uniquement sur une icône.",
        ],
      },
      {
        heading: "Contenu éditorial Instagram / médias",
        paragraphs: [
          "Certaines images illustratives issues du parcours éditorial sont accompagnées d’un titre et d’une description dans l’interface. Ces textes complètent la compréhension du moment présenté.",
        ],
      },
      {
        heading: "Amélioration continue",
        paragraphs: [
          "L’accessibilité est traitée comme un chantier continu. Si un texte alternatif manque, est imprécis ou trop long, signalez-le à l’adresse e-mail du site : cela permet une correction rapide.",
        ],
      },
      {
        heading: "Contact accessibilité",
        paragraphs: [`${site.social.email}`],
      },
    ],
  },
  {
    slug: "suivi-analytique",
    title: "Suivi analytique",
    description:
      "Transparence sur la mesure d’audience et les outils de suivi.",
    updated: "10 septembre 2026",
    sections: [
      {
        heading: "État actuel",
        paragraphs: [
          "Aucun outil de suivi analytique tiers (Google Analytics, Matomo cloud, Meta Pixel, etc.) n’est actif sur ce site au moment de la publication de cette page.",
          "Aucune balise de tracking marketing n’est intégrée dans le code front-end.",
        ],
      },
      {
        heading: "Données techniques d’hébergement",
        paragraphs: [
          "L’hébergeur (GitHub Pages) peut collecter des journaux techniques (adresse IP, user-agent, horodatage, URL demandée) pour assurer le service, la sécurité et le diagnostic, conformément à sa politique de confidentialité.",
          "Ces traitements ne sont pas configurés par l’éditeur comme un tableau de bord d’audience marketing.",
        ],
      },
      {
        heading: "Si un suivi est ajouté plus tard",
        paragraphs: [
          "Avant l’activation éventuelle d’un outil de mesure d’audience, cette page sera mise à jour pour préciser :",
        ],
        list: [
          "le nom de l’outil et son éditeur",
          "les données collectées",
          "la finalité (statistiques de fréquentation, performance, etc.)",
          "la durée de conservation",
          "le mécanisme de consentement le cas échéant",
        ],
      },
      {
        heading: "Vos droits",
        paragraphs: [
          "Pour toute question relative aux données ou au suivi, contactez l’éditeur :",
          site.social.email,
          "Selon votre situation, vous pouvez également exercer des droits d’accès, de rectification ou d’opposition auprès du responsable de traitement concerné.",
        ],
      },
    ],
  },
];

export function getLegalPage(slug: string) {
  return legalPages.find((page) => page.slug === slug);
}
