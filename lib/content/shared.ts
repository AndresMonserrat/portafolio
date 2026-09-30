// Datos que no dependen del idioma: imágenes, enlaces, nombres propios y tecnologías.
import portrait from "@/assets/images/portrait.jpg";
import volleyServe from "@/assets/images/volley-serve.jpg";
import volleySpike from "@/assets/images/volley-spike.jpg";
import thera from "@/assets/images/thera.jpg";
import plinio from "@/assets/images/plinio.jpg";
import irisTeam from "@/assets/images/iris-team.jpg";
import arkadTeam from "@/assets/images/arkad-team.jpg";
import landscapeDandelion from "@/assets/images/landscape-dandelion.jpg";
import landscapePalms from "@/assets/images/landscape-palms.jpg";
import landscapeDaisies from "@/assets/images/landscape-daisies.jpg";
import landscapeSky from "@/assets/images/landscape-sky.jpg";

export const images = {
  portrait,
  volleyServe,
  volleySpike,
  thera,
  plinio,
  irisTeam,
  arkadTeam,
  landscapeDandelion,
  landscapePalms,
  landscapeDaisies,
  landscapeSky,
};

export const identity = {
  name: "Andrés Monserrat",
  brand: "AM.",
  links: {
    github: "https://github.com/AndresMonserrat",
    linkedin: "https://www.linkedin.com/in/andresmonserrat",
    email: "andresmonserrat0413@gmail.com",
    cv: "https://drive.google.com/file/d/1leRMU62p0ShWQKmRXq9yQtRPqbSLYFHE/view?usp=sharing",
  },
};

/** Rotan en el hero, una a la vez. */
export const rotatingSkills = [
  "Next.js",
  "React",
  "TypeScript",
  "NestJS",
  "Node.js",
  "Prisma",
  "PostgreSQL",
  "Python",
  "Flutter",
  "Docker",
  "Linux",
];

export const devSkills = ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "NestJS", "Prisma", "Docker", "Git", "Linux"];
export const dataSkills = ["SQL", "PostgreSQL", "Python", "Excel / Google Sheets"];

export const projectsShared = {
  iris: {
    slug: "iris",
    name: "Iris",
    org: "Universidad del Norte",
    period: "03/2026 – 06/2026",
    liveUrl: "https://iris.uninorte.edu.co/",
    image: irisTeam,
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "NestJS", "PostgreSQL", "Prisma"],
  },
  arkad: {
    slug: "arkad",
    name: "Arkad",
    org: "Universidad del Norte",
    period: "08/2025 – 11/2025",
    liveUrl: "https://arkad.openlab.uninorte.edu.co/",
    image: arkadTeam,
    tech: ["React", "TypeScript", "Vite", "Node.js", "NestJS", "Prisma", "PostgreSQL", "JWT", "Docker"],
  },
};
