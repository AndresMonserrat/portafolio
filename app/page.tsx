import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stack from "@/components/Stack";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-[90vw] px-6 py-10 sm:max-w-[85vw] lg:max-w-[70vw] lg:px-12 lg:py-[4vh]">
        <div className="space-y-24">
          <Hero />
          <Stack />
          <Projects />
          <Contact />
        </div>
      </main>
    </>
  );
}