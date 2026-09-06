import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import Stack from "@/components/Stack";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 px-6 py-10 lg:px-12 lg:py-16">
        <div className="space-y-16 lg:space-y-20">
          <div className="border-b border-panel-border pb-12">
            <Hero />
          </div>
          <div className="border-b border-panel-border pb-12">
            <Stack />
          </div>
          <div className="border-b border-panel-border pb-12">
            <Projects />
          </div>
          <div>
            <Contact />
          </div>
        </div>
      </main>
    </div>
  );
}