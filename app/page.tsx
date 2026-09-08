import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stack from "@/components/Stack";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-16 lg:px-12 lg:py-24">
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