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
    cv: "https://drive.google.com/file/d/1leRMU62p0ShWQKmRXq9yQtRPqbSLYFHE/view?usp=sharing", // TODO
  },
};

export const stack = [
  {
    group: "FRONTEND",
    strong: ["Next.js", "React", "Tailwind CSS", "Flutter"],
    items: [],
  },
  {
    group: "BACKEND",
    strong: ["Node.js", "NestJS"],
    items: ["Prisma", "PostgreSQL", "JWT"],
  },
  {
    group: "LENGUAJES",
    strong: ["Python", "Dart", "JavaScript", "TypeScript"],
    items: ["NumPy", "Pandas"],
  },
  {
    group: "HERRAMIENTAS",
    strong: ["Git", "GitHub", "Docker", "Figma"],
    items: [],
  },
  {
    group: "IDIOMAS",
    strong: [],
    items: ["Inglés (B2)", "Español (Nativo)"],
  },
];

export const projects = [
  {
    slug: "iris",
    name: "IRIS",
    tagline: "Plataforma de evaluación de proyectos",
    period: "2025-II",
    liveUrl: "https://iris.uninorte.edu.co/",
    liveLabel: "Ver página",
    description:
      "Plataforma web para gestionar y evaluar proyectos académicos. Participé en su desarrollo full-stack, utilizando Next.js, React y TypeScript en el frontend, y NestJS, PostgreSQL y Prisma en el backend.",
    highlight:
      "Arquitectura de microservicios, donde los servicios se comunican mediante gRPC.",
    sections: [
      {
        key: "frontend",
        label: "Frontend",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        href: "https://github.com/PCPI-UN/iris-front",
        repo: "PCPI-UN/iris-front",
      },
      {
        key: "backend",
        label: "Backend",
        tech: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "Docker"],
        href: "https://github.com/PCPI-UN/Iris",
        repo: "PCPI-UN/Iris",
      },
    ],
  },
  {
    slug: "arkad",
    name: "Arkad",
    tagline: "Plataforma de evaluación de videojuegos",
    period: "2025-I",
    liveUrl: "https://arkad.openlab.uninorte.edu.co/",
    liveLabel: "Ver pagina",
    description:
      "Plataforma web para la gestión y evaluación de proyectos de videojuegos. Participé en su desarrollo full-stack, utilizando React, TypeScript y Vite en el frontend, junto con Node.js, PostgreSQL y Prisma en el backend.",
    highlight:
      "Integra autenticación, gestión de usuarios y equipos, carga de archivos mediante Azure Blob Storage y un sistema de evaluación por jurados. El entorno de desarrollo está containerizado con Docker.",
    sections: [
      {
        key: "frontend",
        label: "Frontend",
        tech: ["React", "TypeScript", "Vite"],
        href: "https://github.com/djromerom/gamerlab_front_2295_2",
        repo: "djromerom/gamerlab_front_2295_2",
        private: true,
      },
      {
        key: "backend",
        label: "Backend",
        tech: ["Node.js", "NestJS", "Prisma", "PostgreSQL", "JWT", "Docker"],
        href: "https://github.com/djromerom/gamerlab_back_2295_2",
        repo: "djromerom/gamerlab_back_2295_2",
        private: true,
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