import Hero from "@/components/hero";
import About from "@/components/about";
import Courses from "@/components/courses";
import Contact from "@/components/contact";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { LanguageProvider } from "@/components/language-provider";
import Cursor from "@/components/cursor";
import GalleryPage from "@/components/gallery";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-dark-black overflow-hidden">
        <Cursor />
        <Navbar />
        <main>
          <Hero />
          <About />
          <GalleryPage />
          <Courses />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
