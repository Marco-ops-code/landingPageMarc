export const site = {
  name: "Marc-Onel Volcimus",
  firstName: "Marc-Onel",
  lastName: "Volcimus",
  role: "Software Developer & Cybersecurity",
  tagline: "One person. Three dimensions.",
  dimensions: ["Lifestyle", "Technology", "Cybersecurity"] as const,
  locationLine: "Based in the digital world",
  description:
    "Software developer and cybersecurity practitioner. I build digital experiences, explore technology, and grow through every challenge.",
  url: "https://marconelvolcimus.com",
  social: {
    instagram: {
      handle: "marconel.volcimus",
      url: "https://instagram.com/marconel.volcimus",
    },
    linkedin: "https://www.linkedin.com/in/marc-onel-volcimus",
    github: "https://github.com/Marco-ops-code",
    email: "hello@marconelvolcimus.com",
  },
} as const;

export const navSocial = [
  { label: "Instagram", href: site.social.instagram.url },
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "GitHub", href: site.social.github },
] as const;

export const work = [
  {
    index: "01",
    title: "Matrix Generator",
    tags: "C# / .NET / Software",
    description:
      "An application designed to generate individual assignments involving matrices and systems of linear equations.",
    cta: "View project",
    href: "https://github.com/Marco-ops-code/TaskGenerator",
  },
  {
    index: "02",
    title: "TaskEngine",
    tags: "Software / Automation",
    description:
      "A structured ecosystem for generating, organizing and managing academic tasks.",
    cta: "View project",
    href: "https://github.com/Marco-ops-code/GeneratorMultiTask",
  },
  {
    index: "03",
    title: "Cybersecurity Lab",
    tags: "Cybersecurity / Learning",
    description:
      "Hands-on exploration of networking, systems, security concepts and defensive technologies.",
    cta: "View journey",
    href: "#now",
  },
] as const;

export const instagramFeed = [
  {
    src: "/images/ig-01-city.png",
    alt: "Night city through rain-streaked glass — lifestyle",
  },
  {
    src: "/images/ig-02-code.png",
    alt: "MacBook in the dark — technology",
  },
  {
    src: "/images/ig-03-lifestyle.png",
    alt: "Dark still life — lifestyle",
  },
  {
    src: "/images/ig-04-cyber.png",
    alt: "Network hardware glow — cybersecurity",
  },
  {
    src: "/images/ig-05-street.png",
    alt: "Wet street at night — lifestyle",
  },
  {
    src: "/images/ig-06-life.png",
    alt: "Blue hour desk — life",
  },
] as const;

export const toolkit = [
  {
    label: "Development",
    items: ["C#", ".NET", "Python", "SQL"],
  },
  {
    label: "Systems",
    items: ["Linux", "Windows", "Networking"],
  },
  {
    label: "Security",
    items: ["Cybersecurity", "Networking", "Security fundamentals"],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "Visual Studio"],
  },
] as const;

export const currently = [
  "Cybersecurity",
  "SOC / Blue Team",
  "Security Operations",
  "Networking",
  "Software Engineering",
] as const;
