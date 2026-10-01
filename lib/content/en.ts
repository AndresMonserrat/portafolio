import type { StaticImageData } from "next/image";
import { dataSkills, devSkills, identity, images, projectsShared } from "./shared";

export type TimelineKind = "education" | "project" | "certification" | "sport" | "volunteering" | "training";

export type Project = {
  slug: string;
  name: string;
  org: string;
  period: string;
  liveUrl: string;
  image: StaticImageData;
  tech: string[];
  summary: string;
  role: string;
  duration: string;
  imageAlt: string;
  problem: string;
  contributions: string[];
  scope: string;
  architecture?: string;
};

/** `skill`: habilidad blanda que la foto representa (se muestra en la galería de paisajes). */
export type Photo = { src: StaticImageData; alt: string; caption: string; skill?: string };

const en = {
  meta: {
    description: "Building digital experiences, exploring technology, and learning through real-world projects.",
    ogLocale: "en_US",
    projects: { title: "Projects", description: "Software projects built for Universidad del Norte: Iris and Arkad." },
    about: {
      title: "About",
      description: "Andrés, not just the engineer: volleyball, university life, curiosity and community.",
    },
  },

  ui: {
    skipLink: "Skip to content",
    mainNav: "Main",
    home: "home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    theme: { toDark: "Switch to night sky theme", toLight: "Switch to daylight theme", toDarkTitle: "Go to space", toLightTitle: "Back to Earth" },
    language: { label: "Leer en español", short: "ES" },
    opensNewTab: "(opens in a new tab)",
  },

  nav: [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "#contact", label: "Contact" },
  ],

  profile: {
    ...identity,
    roleLead: "Software Engineer",
    roleSparkle: "in Progress.",
    tagline: "Building digital experiences, exploring technology, and learning through real-world projects.",
    intro:
      "I’m interested in full-stack development, software architecture, and the intersection between technology and everyday life. Currently studying, building, and looking for opportunities to grow as a developer.",
    motto: "Building things. Learning constantly. Living beyond the code.",
    pillars: ["Software", "Sports", "Life"],
    availability: "Open to internship opportunities",
    portrait: images.portrait,
    portraitAlt: "Portrait of Andrés Monserrat",
  },

  home: {
    buildingWith: "Currently building with",
    skillsLabel: "Skills",
    explore: "Explore my work",
    getToKnow: "Get to know me",
    stickers: ["🏐 volleyball", "⌨️ full-stack", "📍 Barranquilla"],
    infoStrip: [
      { label: "Based in", value: "Colombia 🇨🇴" },
      { label: "Education", value: "Systems Engineering" },
      { label: "Focus", value: "Full Stack Development" },
      { label: "Outside code", value: "Team Sports" },
    ],
    work: { eyebrow: "Selected work", title: "Real projects, real users", all: "All projects" },
    numbers: { eyebrow: "In numbers", title: "No inflated stats, just facts" },
    beyond: {
      eyebrow: "Beyond the code",
      title: "Volleyball, landscapes and two very good dogs.",
      body: "I play for the Universidad del Norte volleyball team. When I’m not coding or training, I’m probably photographing small details outside, or hanging out with Thera and Plinio.",
    },
  },

  projectsPage: {
    eyebrow: "Projects",
    title: "Things I’ve helped build",
    intro:
      "Two platforms in production at Universidad del Norte, each built in four months with a team. Every project has its own page with the problem, what I did and the stack we actually used.",
  },

  projectCard: { role: "Role", scope: "Scope", technologies: "Technologies", readCaseStudy: "Read the case study" },

  projectPage: {
    back: "All projects",
    caseStudy: "Case study",
    meta: { role: "Role", org: "Organization", period: "Period", duration: "Duration" },
    visit: "Visit",
    teamCaption: (name: string) => `The ${name} team at Universidad del Norte.`,
    sections: {
      problem: "The problem",
      whatIDid: "What I did",
      scope: "Scope",
      architecture: "Architecture",
      stack: "Stack",
    },
    next: "Next project",
  },

  projects: [
    {
      ...projectsShared.iris,
      summary: "Platform for managing and grading capstone projects",
      role: "Frontend Developer",
      duration: "4 months",
      imageAlt: "The Iris team posing in front of a screen showing the Iris logo at Universidad del Norte",
      problem:
        "The Engineering Division needed one place to manage and grade every capstone project, making the evaluation process more transparent and efficient.",
      contributions: [
        "Took part in building Iris, the software the Engineering Division uses to manage and grade all of its capstone projects.",
        "Built interface features with Next.js, React and TypeScript, following a feature-based architecture connected to the team’s NestJS microservices backend.",
      ],
      scope: "Every capstone project in the Engineering Division",
      architecture: "Microservices backend in NestJS; services communicate over gRPC.",
    },
    {
      ...projectsShared.arkad,
      summary: "Management platform for the Uninorte Gamer Fair",
      role: "Full Stack Developer",
      duration: "4 months",
      imageAlt: "Andrés with three Arkad teammates, all wearing Arkad t-shirts, at the Uninorte Gamer Fair",
      problem:
        "Students, professors and judges needed a single platform to register, manage and grade the video games presented at the Uninorte Gamer Fair.",
      contributions: [
        "Built frontend features with React and TypeScript for the platform students, professors and judges use to register, manage and grade the fair’s video games.",
        "Implemented user authentication with JWT and data persistence with Prisma on a relational PostgreSQL database.",
      ],
      scope: "Three user types: students, professors and judges",
    },
  ] as Project[],

  stats: [
    { value: "2", label: "projects with real users", note: "Iris & Arkad, both on official Uninorte domains" },
    { value: "9th", label: "semester", note: "Systems Engineering, Universidad del Norte" },
    { value: "4", label: "years at university", note: "since 07/2022" },
    { value: "B2", label: "English", note: "EF SET 59/100" },
    { value: "12", label: "years volunteering", note: "Colombian Red Cross, since 2014" },
  ],

  timelineKinds: {
    education: "Education",
    project: "Project",
    certification: "Certification",
    sport: "Sport",
    volunteering: "Volunteering",
    training: "Training",
  } satisfies Record<TimelineKind, string>,

  timeline: [
    { date: "2014 – present", title: "Volunteer, Colombian Red Cross", detail: "Atlántico chapter", kind: "volunteering" },
    { date: "07/2022", title: "Started Systems & Computer Engineering", detail: "Universidad del Norte", kind: "education" },
    { date: "Team member", title: "Uninorte volleyball team", detail: "Representing the university in regional competitions", kind: "sport" },
    { date: "08/2025 – 11/2025", title: "Arkad — Full Stack Developer", detail: "Uninorte Gamer Fair platform", kind: "project" },
    { date: "11/2025", title: "Linux Essentials", detail: "Cisco Networking Academy", kind: "certification" },
    { date: "03/2026 – 06/2026", title: "Iris — Frontend Developer", detail: "Capstone project grading platform", kind: "project" },
    {
      date: "06/2026 – 07/2026",
      title: "Cátedra Barranquilla",
      detail: "Leadership, civic participation, environment and social transformation",
      kind: "training",
    },
    { date: "09/2026", title: "EF SET English Certificate", detail: "59/100 · B2 Upper Intermediate", kind: "certification" },
    { date: "Now", title: "9th semester", detail: "Systems Engineering", kind: "education" },
    { date: "09/2027", title: "Expected graduation", kind: "education", upcoming: true },
  ] as { date: string; title: string; detail?: string; kind: TimelineKind; upcoming?: boolean }[],

  skills: [
    { group: "Development", items: devSkills, translatable: false },
    { group: "Data & analysis", items: dataSkills, translatable: false },
    { group: "Languages", items: ["Spanish (native)", "English (B2, EF SET)"], translatable: true },
  ],

  about: {
    eyebrow: "About me",
    title: "A little about me",
    factsTitle: "A few things about me",
    story: [
      "I’m Andrés, a Systems Engineering student from Colombia who enjoys building things, understanding how technology works, and exploring new challenges.",
      "My journey combines software development, university life, sports, and a constant curiosity for learning. Outside programming, you’ll probably find me playing volleyball, spending time with friends, exploring new tools, or working on something that started as a simple idea.",
      "I believe that growth comes from consistency, curiosity, and being willing to try things you haven’t mastered yet.",
    ],
    why: "I like taking an idea — something intangible — and making it real. If you can imagine it, you can build it.",
    whyCaption: "— Why I build things",
    facts: [
      { label: "From", value: "Barranquilla, Colombia" },
      { label: "Currently", value: "Systems Engineering student" },
      { label: "Sport", value: "Volleyball" },
      { label: "Exploring", value: "Software architecture & development" },
    ],
    categoriesHeading: { eyebrow: "Software · Sports · Life", title: "What I’m made of" },
    categories: [
      {
        title: "Volleyball & Sports",
        body: "Member of the Uninorte volleyball team, competing regionally for the university. Also into basketball, soccer and the gym. Discipline, teamwork, competition and learning.",
      },
      {
        title: "University Life",
        body: "Studying Systems Engineering: academic challenges, university activities and experiences that complement the degree.",
      },
      { title: "Tech & Curiosity", body: "Linux, Ubuntu, developer tooling, programming, automation and tech experiments." },
      { title: "Community & Volunteering", body: "Volunteer with the Colombian Red Cross, Atlántico chapter." },
    ],
    court: { eyebrow: "Uninorte volleyball team", title: "On the court" },
    journey: { eyebrow: "Journey", title: "How I got here" },
    crew: { eyebrow: "The crew", title: "Meet Thera & Plinio" },
    gallery: { eyebrow: "Landscapes & small details", title: "Things I stop to look at", skillLabel: "Soft skill" },
    music: {
      eyebrow: "On repeat",
      intro: "I listen to a bit of everything: Latin genres, pop, and even classical.",
      picks: ["Riptide", "It Could Be", "Lacrimosa"],
    },
  },

  sportsPhotos: [
    { src: images.volleyServe, alt: "Andrés jumping to serve a volleyball in an indoor court", caption: "Jump serve" },
    { src: images.volleySpike, alt: "Andrés spiking the ball over the net during a university volleyball match", caption: "Game day" },
  ] as Photo[],

  pets: [
    { src: images.thera, alt: "Black-and-white close-up of Thera, a shepherd dog, in profile", caption: "Thera" },
    { src: images.plinio, alt: "Close-up of Plinio, a Yorkshire terrier, looking at the camera", caption: "Plinio" },
  ] as Photo[],

  landscapes: [
    { src: images.landscapeSky, alt: "Tall tree against a deep blue sky with white clouds", caption: "Looking up", skill: "Long-term vision" },
    { src: images.landscapePalms, alt: "Purple flowers in front of a row of tall palm trunks", caption: "Palms & periwinkles", skill: "Adaptability" },
    { src: images.landscapeDaisies, alt: "A field of small white daisies with yellow centers", caption: "Chamomile", skill: "Teamwork" },
    { src: images.landscapeDandelion, alt: "A single yellow flower standing out in green grass", caption: "Small details", skill: "Attention to detail" },
  ] as Photo[],


  footer: {
    heading: "Let’s build something real",
    body: "Available for professional opportunities and collaborations — including international internships.",
    socials: { linkedin: "LinkedIn", github: "GitHub", cv: "Résumé" },
    robotLabel: "A small original robot floating in space, holding a plant sprout",
  },

  notFound: {
    eyebrow: "404 — lost in space",
    title: "This page drifted out of orbit.",
    body: "The little explorer looked everywhere. Let’s get you back home.",
    cta: "Back to Earth",
  },
};

export type Content = typeof en;
export default en;
