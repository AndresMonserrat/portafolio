/*  */
export const profile = {
  name: "Portafolio Personal", // TODO: reemplazar
  role: "Soy estudiante de Ingeniería de Sistemas y Computación en la Universidad del Norte, actualmente estoy cursando el noveno semestre.",
  university: "Universidad del Norte",
  semester: "9° semestre",
  status: ["Hola!!, mi nombre es"," Andres Monserrat"],
  intro: "Construyo interfaces con Next.js y React, y este semestre estoy metiéndole cabeza en serio al backend: APIs, arquitectura de servicios y bases de datos.",
  location: "Barranquilla, Colombia", // TODO: confirmar
  links: {
    github: "https://github.com/AndresMonserrat",
    linkedin: "https://www.linkedin.com/in/andresmonserrat", // TODO
    email: "andresmonserrat0413@gmail.com", // TODO
    cv: "", // TODO
  },
};

export const stack = [
  { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Radix UI", "Zustand", "TanStack Query", "React Hook Form", "Zod"] },
  { group: "Backend", items: ["Node.js", "NestJS", "gRPC", "Prisma", "PostgreSQL", "JWT"] },
  { group: "Testing & herramientas", items: ["Vitest", "Playwright", "Testing Library", "ESLint", "Prettier", "Docker", "pnpm"] },
];

export const projects = [
  {
    slug: "iris",
    name: "Iris — Sistema de Evaluación de Proyectos",
    period: "8° semestre · Diseño de Software 2",
    path: "~/proyectos/iris",
    description: "Aplicación web para la gestión y calificación de proyectos por parte de jurados en eventos académicos.",
    details: [
      "Contribuí al frontend: Next.js + React + TypeScript, arquitectura feature-based inspirada en Bulletproof React.",
      "El backend del proyecto (microservicios con NestJS + gRPC, un servicio por dominio: auth, evaluación, eventos, invitaciones, proyectos y notificaciones) fue desarrollado por el equipo — estos son los conceptos que estoy reforzando ahora en la materia de Backend.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "NestJS", "gRPC"],
    href: "https://github.com/PCPI-UN/iris-front",
  },
  {
    slug: "arkad",
    name: "Arkad",
    period: "7° semestre",
    path: "~/proyectos/arkad",
    description: "API backend para una plataforma de envío y evaluación de videojuegos entre jurados.",
    details: [
      "Autenticación con JWT y documentación de endpoints con Swagger.",
      "ORM con Prisma sobre PostgreSQL, carga de archivos con Azure Blob Storage y verificación con Google reCAPTCHA.",
    ],
    stack: ["Node.js", "Prisma", "PostgreSQL", "JWT", "Swagger"],
    href: "https://github.com/djromerom/gamerlab_back_2295_2",
  },
];

export const nav = [
  { id: "inicio", label: "Inicio" },
  { id: "stack", label: "Stack" },
  { id: "proyectos", label: "Proyectos" },
  { id: "contacto", label: "Contacto" },
];