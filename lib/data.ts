export const profile = {
  name: "Andres Monserrat",
  brand: "AM.",
  available: "Portafolio/WhoamI",
  metadata: "Ingeniería de Sistemas",
  university: "Universidad del Norte",
  semester: "9° semestre",
  quote:
    "Enfocado en la construcción de software robusto, bien estructurado y con arquitecturas limpias. Busco aplicar conocimientos de ingeniería de sistemas en retos de desarrollo web real, integrando frontend moderno y backends seguros.",
  location: "Barranquilla, Colombia",
  links: {
    github: "https://github.com/AndresMonserrat",
    linkedin: "https://www.linkedin.com/in/andresmonserrat",
    email: "andresmonserrat0413@gmail.com", // TODO: confirmar
    cv: "", // TODO
  },
};

export const stack = [
  {
    group: "FRONTEND",
    strong: ["Next.js", "React", "TypeScript", "Flutter", "Tailwind CSS"],
    items: [],
  },
  {
    group: "BACKEND",
    strong: ["Node.js", "NestJS"],
    items: ["Prisma", "PostgreSQL", "JWT"],
  },
  {
    group: "HERRAMIENTAS",
    strong: ["Docker"],
    items: [],
  },
];

export const projects = [
  {
    slug: "iris",
    name: "IRIS",
    period: "2026-I",
    sections: [
      {
        key: "frontend",
        label: "Frontend",
        description:
          "Aplicación web para la gestión y calificación de proyectos por parte de jurados en eventos académicos.",
        highlight:
          "Frontend con Next.js + React + TypeScript, estructurado sobre una arquitectura limpia orientada a features para alta escalabilidad.",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        href: "https://github.com/PCPI-UN/iris-front",
        repo: "PCPI-UN/iris-front",
        pushedAt: "2026-08",
      },
      {
        key: "backend",
        label: "Backend",
        description:
          "Backend de microservicios para la gestión y calificación de proyectos por parte de jurados en eventos académicos.",
        highlight:
          "Arquitectura de microservicios con NestJS y gRPC: un gateway HTTP/REST y servicios de auth, evaluación, eventos, invitaciones, proyectos y notificaciones. Cada servicio con su propia base de datos PostgreSQL y despliegue completo vía Docker Compose.",
        tech: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "Docker"],
        href: "https://github.com/PCPI-UN/Iris",
        repo: "github.com/Iris",
        pushedAt: "2026-08",
      },
    ],
  },
  {
    slug: "arkad",
    name: "Arkad",
    period: "2024-II",
    sections: [
      {
        key: "api",
        label: "API",
        description:
          "API backend robusta y segura diseñada para soportar una plataforma global de envío y evaluación de videojuegos.",
        highlight:
          "Control de acceso seguro basado en tokens JWT, persistencia relacional con Prisma + PostgreSQL y almacenamiento optimizado en Azure Blob Storage.",
        tech: ["Node.js", "NestJS", "Prisma", "PostgreSQL", "JWT"],
        href: "https://github.com/djromerom/gamerlab_back_2295_2",
        repo: "github.com/Arkad",
        pushedAt: "2026-07",
      },
    ],
  },
];

export const nav = [
  { id: "inicio", label: "inicio" },
  { id: "stack", label: "stack" },
  { id: "proyectos", label: "proyectos" },
  { id: "contacto", label: "contacto" },
];