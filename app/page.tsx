import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import Stack from "@/components/Stack";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import AnimatedSection from "@/components/animation/AnimatedSection";

export default function Home() {
  return (
    <div className="flex max-w-full flex-col justify-between lg:flex-row">
      <Sidebar />

      <main className="flex-1 px-6 py-10 lg:px-12 lg:py-16">
        <div className="space-y-16 lg:space-y-20">
          <AnimatedSection className="border-b border-panel-border pb-12">
            <Hero />
          </AnimatedSection>

          <AnimatedSection className="border-b border-panel-border pb-12">
            <Stack />
          </AnimatedSection>

          <AnimatedSection className="border-b border-panel-border pb-12">
            <Projects />
          </AnimatedSection>

          <AnimatedSection>
            <Contact />
          </AnimatedSection>
        </div>
      </main>
    </div>
  );
}