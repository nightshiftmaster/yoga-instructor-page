import Hero from "@/components/hero";
import About from "@/components/about";
import Gallery from "@/components/gallery";
import Courses from "@/components/courses";
import Contact from "@/components/contact";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { LanguageProvider } from "@/components/language-provider";
import Cursor from "@/components/cursor";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-dark-black overflow-hidden">
        <Cursor />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Gallery />
          <Courses />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
