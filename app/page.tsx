import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stack from "@/components/Stack";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main
        id="contenido"
        tabIndex={-1}
        className="mx-auto max-w-[90vw] px-6 py-10 outline-none sm:max-w-[85vw] lg:max-w-[70vw] lg:px-12 lg:py-[4vh]"
      >
        <div className="space-y-32">
          <Hero />
          <Stack />
          <Projects />
          <Contact />
        </div>
      </main>

      {/* Se calcula en el servidor: el HTML y la hidratación siempre coinciden. */}
      <Footer year={new Date().getFullYear()} />
    </>
  );
}
