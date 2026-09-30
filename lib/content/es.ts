import type { Content, Photo, Project, TimelineKind } from "./en";
import { dataSkills, devSkills, identity, images, projectsShared } from "./shared";

const es: Content = {
  meta: {
    description: "Creo experiencias digitales, exploro la tecnología y aprendo a través de proyectos reales.",
    ogLocale: "es_CO",
    projects: { title: "Proyectos", description: "Proyectos de software desarrollados para la Universidad del Norte: Iris y Arkad." },
    about: {
      title: "Sobre mí",
      description: "Andrés, no solamente el ingeniero: voleibol, vida universitaria, curiosidad y comunidad.",
    },
  },

  ui: {
    skipLink: "Saltar al contenido",
    mainNav: "Principal",
    home: "inicio",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    theme: {
      toDark: "Cambiar al tema cielo nocturno",
      toLight: "Cambiar al tema de día",
      toDarkTitle: "Ir al espacio",
      toLightTitle: "Volver a la Tierra",
    },
    language: { label: "Read in English", short: "EN" },
    opensNewTab: "(se abre en una pestaña nueva)",
  },

  nav: [
    { href: "/", label: "Inicio" },
    { href: "/projects", label: "Proyectos" },
    { href: "/about", label: "Sobre mí" },
    { href: "#contact", label: "Contacto" },
  ],

  profile: {
    ...identity,
    roleLead: "Ingeniero de software",
    roleSparkle: "en formación.",
    tagline: "Creo experiencias digitales, exploro la tecnología y aprendo a través de proyectos reales.",
    intro:
      "Me interesa el desarrollo full-stack, la arquitectura de software y la intersección entre la tecnología y la vida cotidiana. Actualmente estudio, construyo y busco oportunidades para crecer como desarrollador.",
    motto: "Construyendo cosas. Aprendiendo siempre. Viviendo más allá del código.",
    pillars: ["Software", "Deporte", "Vida"],
    availability: "Disponible para prácticas profesionales",
    portrait: images.portrait,
    portraitAlt: "Retrato de Andrés Monserrat",
  },

  home: {
    buildingWith: "Ahora construyendo con",
    skillsLabel: "Habilidades",
    explore: "Ver mi trabajo",
    getToKnow: "Conóceme",
    stickers: ["🏐 voleibol", "⌨️ full-stack", "📍 Barranquilla"],
    infoStrip: [
      { label: "Desde", value: "Colombia 🇨🇴" },
      { label: "Formación", value: "Ingeniería de Sistemas" },
      { label: "Enfoque", value: "Desarrollo Full Stack" },
      { label: "Fuera del código", value: "Deportes de equipo" },
    ],
    work: { eyebrow: "Trabajo destacado", title: "Proyectos reales, usuarios reales", all: "Todos los proyectos" },
    numbers: { eyebrow: "En cifras", title: "Sin cifras infladas, solo hechos" },
    beyond: {
      eyebrow: "Más allá del código",
      title: "Voleibol, paisajes y dos perros muy buenos.",
      body: "Juego en la selección de voleibol de la Universidad del Norte. Cuando no estoy programando o entrenando, seguramente estoy fotografiando pequeños detalles al aire libre o pasando el rato con Thera y Plinio.",
    },
  },

  projectsPage: {
    eyebrow: "Proyectos",
    title: "Cosas que he ayudado a construir",
    intro:
      "Dos plataformas en producción en la Universidad del Norte, cada una construida en cuatro meses con un equipo. Cada proyecto tiene su propia página con el problema, lo que hice y el stack que realmente usamos.",
  },

  projectCard: { role: "Rol", scope: "Alcance", technologies: "Tecnologías", readCaseStudy: "Leer el caso de estudio" },

  projectPage: {
    back: "Todos los proyectos",
    caseStudy: "Caso de estudio",
    meta: { role: "Rol", org: "Organización", period: "Periodo", duration: "Duración" },
    visit: "Visitar",
    teamCaption: (name: string) => `El equipo de ${name} en la Universidad del Norte.`,
    sections: {
      problem: "El problema",
      whatIDid: "Lo que hice",
      scope: "Alcance",
      architecture: "Arquitectura",
      stack: "Stack",
    },
    next: "Siguiente proyecto",
  },

  projects: [
    {
      ...projectsShared.iris,
      summary: "Plataforma de gestión y calificación de proyectos de grado",
      role: "Desarrollador Frontend",
      duration: "4 meses",
      imageAlt: "El equipo de Iris posando frente a una pantalla con el logo de Iris en la Universidad del Norte",
      problem:
        "La División de Ingenierías necesitaba un solo lugar para gestionar y calificar todos sus proyectos de grado, haciendo el proceso de evaluación más transparente y eficiente.",
      contributions: [
        "Participé en el desarrollo de Iris, el software con el que la División de Ingenierías gestiona y califica todos sus proyectos de grado.",
        "Desarrollé funcionalidades de la interfaz con Next.js, React y TypeScript, bajo una arquitectura organizada por funcionalidades y conectada al backend de microservicios en NestJS del equipo.",
      ],
      scope: "Todos los proyectos de grado de la División de Ingenierías",
      architecture: "Backend de microservicios en NestJS; los servicios se comunican mediante gRPC.",
    },
    {
      ...projectsShared.arkad,
      summary: "Plataforma de gestión de la Feria Gamer Uninorte",
      role: "Desarrollador Full Stack",
      duration: "4 meses",
      imageAlt: "Andrés con tres compañeros de Arkad, todos con camisetas de Arkad, en la Feria Gamer Uninorte",
      problem:
        "Estudiantes, profesores y jurados necesitaban una sola plataforma para registrar, gestionar y calificar los videojuegos presentados en la Feria Gamer Uninorte.",
      contributions: [
        "Desarrollé funcionalidades de frontend con React y TypeScript para la plataforma con la que estudiantes, profesores y jurados registran, gestionan y califican los videojuegos de la feria.",
        "Implementé la autenticación de usuarios con JWT y la persistencia de datos con Prisma sobre una base de datos relacional en PostgreSQL.",
      ],
      scope: "Tres tipos de usuario: estudiantes, profesores y jurados",
    },
  ] as Project[],

  stats: [
    { value: "2", label: "proyectos con usuarios reales", note: "Iris y Arkad, ambos en dominios oficiales de Uninorte" },
    { value: "9.°", label: "semestre", note: "Ingeniería de Sistemas, Universidad del Norte" },
    { value: "4", label: "años en la universidad", note: "desde 07/2022" },
    { value: "B2", label: "inglés", note: "EF SET 59/100" },
    { value: "12", label: "años de voluntariado", note: "Cruz Roja Colombiana, desde 2014" },
  ],

  timelineKinds: {
    education: "Educación",
    project: "Proyecto",
    certification: "Certificación",
    sport: "Deporte",
    volunteering: "Voluntariado",
    training: "Formación",
  } satisfies Record<TimelineKind, string>,

  timeline: [
    { date: "2014 – presente", title: "Voluntario, Cruz Roja Colombiana", detail: "Seccional Atlántico", kind: "volunteering" },
    { date: "07/2022", title: "Inicio de Ingeniería de Sistemas y Computación", detail: "Universidad del Norte", kind: "education" },
    { date: "Integrante", title: "Selección de voleibol de Uninorte", detail: "Representando a la universidad en competencias regionales", kind: "sport" },
    { date: "08/2025 – 11/2025", title: "Arkad — Desarrollador Full Stack", detail: "Plataforma de la Feria Gamer Uninorte", kind: "project" },
    { date: "11/2025", title: "Linux Essentials", detail: "Cisco Networking Academy", kind: "certification" },
    { date: "03/2026 – 06/2026", title: "Iris — Desarrollador Frontend", detail: "Plataforma de calificación de proyectos de grado", kind: "project" },
    {
      date: "06/2026 – 07/2026",
      title: "Cátedra Barranquilla",
      detail: "Liderazgo, participación ciudadana, medio ambiente y transformación social",
      kind: "training",
    },
    { date: "09/2026", title: "EF SET English Certificate", detail: "59/100 · B2 Upper Intermediate", kind: "certification" },
    { date: "Ahora", title: "Noveno semestre", detail: "Ingeniería de Sistemas", kind: "education" },
    { date: "09/2027", title: "Graduación prevista", kind: "education", upcoming: true },
  ],

  skills: [
    { group: "Desarrollo", items: devSkills, translatable: false },
    { group: "Datos y análisis", items: dataSkills, translatable: false },
    { group: "Idiomas", items: ["Español (nativo)", "Inglés (B2, EF SET)"], translatable: true },
  ],

  about: {
    eyebrow: "Sobre mí",
    title: "Un poco sobre mí",
    factsTitle: "Algunas cosas sobre mí",
    story: [
      "Soy Andrés, estudiante de Ingeniería de Sistemas de Colombia. Disfruto construir cosas, entender cómo funciona la tecnología y explorar nuevos retos.",
      "Mi camino combina el desarrollo de software, la vida universitaria, el deporte y una curiosidad constante por aprender. Fuera de la programación, seguramente me encuentres jugando voleibol, compartiendo con amigos, explorando nuevas herramientas o trabajando en algo que empezó como una idea sencilla.",
      "Creo que el crecimiento viene de la constancia, la curiosidad y las ganas de intentar cosas que aún no dominas.",
    ],
    why: "Me gusta tomar una idea, algo intangible, y hacerla real. Si lo puedes imaginar, lo puedes construir.",
    whyCaption: "— Por qué construyo cosas",
    facts: [
      { label: "De", value: "Barranquilla, Colombia" },
      { label: "Actualmente", value: "Estudiante de Ingeniería de Sistemas" },
      { label: "Deporte", value: "Voleibol" },
      { label: "Explorando", value: "Arquitectura y desarrollo de software" },
    ],
    categoriesHeading: { eyebrow: "Software · Deporte · Vida", title: "De qué estoy hecho" },
    categories: [
      {
        title: "Voleibol y deporte",
        body: "Integrante de la selección de voleibol de Uninorte, compitiendo a nivel regional por la universidad. También me gustan el baloncesto, el fútbol y el gimnasio. Disciplina, equipo, competencia y aprendizaje.",
      },
      {
        title: "Vida universitaria",
        body: "Estudiando Ingeniería de Sistemas: retos académicos, actividades universitarias y experiencias que complementan la formación.",
      },
      {
        title: "Tecnología y curiosidad",
        body: "Linux, Ubuntu, herramientas de desarrollo, programación, automatización y experimentación tecnológica.",
      },
      { title: "Comunidad y voluntariado", body: "Voluntario en la Cruz Roja Colombiana, Seccional Atlántico." },
    ],
    court: { eyebrow: "Selección de voleibol de Uninorte", title: "En la cancha" },
    journey: { eyebrow: "Trayectoria", title: "Cómo llegué hasta aquí" },
    crew: { eyebrow: "La manada", title: "Te presento a Thera y Plinio" },
    gallery: { eyebrow: "Paisajes y pequeños detalles", title: "Cosas en las que me detengo a mirar" },
    music: {
      eyebrow: "En repetición",
      intro: "Escucho de todo un poco: géneros latinos, pop e incluso música clásica.",
      picks: ["Riptide", "It Could Be", "Lacrimosa"],
    },
  },

  sportsPhotos: [
    { src: images.volleyServe, alt: "Andrés saltando para sacar un balón de voleibol en una cancha cubierta", caption: "Saque en salto" },
    { src: images.volleySpike, alt: "Andrés rematando el balón sobre la red durante un partido universitario de voleibol", caption: "Día de partido" },
  ] as Photo[],

  pets: [
    { src: images.thera, alt: "Primer plano en blanco y negro de Thera, una perra pastora, de perfil", caption: "Thera" },
    { src: images.plinio, alt: "Primer plano de Plinio, un yorkshire terrier, mirando a la cámara", caption: "Plinio" },
  ] as Photo[],

  landscapes: [
    { src: images.landscapeSky, alt: "Un árbol alto contra un cielo azul intenso con nubes blancas", caption: "Mirando hacia arriba" },
    { src: images.landscapePalms, alt: "Flores moradas frente a una hilera de palmas altas", caption: "Palmas y vincas" },
    { src: images.landscapeDaisies, alt: "Un campo de pequeñas margaritas blancas con centro amarillo", caption: "Manzanilla" },
    { src: images.landscapeDandelion, alt: "Una sola flor amarilla que resalta entre el pasto verde", caption: "Pequeños detalles" },
  ] as Photo[],


  footer: {
    heading: "Construyamos algo real",
    body: "Disponible para oportunidades profesionales y colaboraciones, incluidas prácticas internacionales.",
    socials: { linkedin: "LinkedIn", github: "GitHub", cv: "Hoja de vida" },
    robotLabel: "Un pequeño robot original flotando en el espacio, sosteniendo un brote de planta",
  },

  notFound: {
    eyebrow: "404 — perdido en el espacio",
    title: "Esta página se salió de órbita.",
    body: "El pequeño explorador buscó por todas partes. Volvamos a casa.",
    cta: "Volver a la Tierra",
  },
};

export default es;
