"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const LanguageButton = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setLanguage(language === "ru" ? "en" : "ru");
          closeMenu();
        }}
        className="text-white text-[0.7rem] ml-2 md:text-sm  p-3 md:p-3 rounded-full bg-stone-600 hover:text-teal border-teal/30 hover:border-teal w-fit font-light tracking-widest"
      >
        {language === "ru" ? "EN" : "RU"}
      </Button>
    </div>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, translations } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const scrollToSection = (id: string) => {
    closeMenu();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        console.warn(`Element with ID '${id}' not found for scrolling.`);
      }
    }, 100);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-6 px-6 bg-gradient-to-b from-[#9d9996] via-[#8A7F7A] to-[#b6958d] backdrop-blur-2xl shadow-2xl"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-heading font-bold tracking-wider text-teal"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex items-center"
          >
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="gradient-text"
            >
              YG
            </motion.span>
            <motion.span
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white font-light ml-1"
            >
              Level
            </motion.span>
            <motion.div
              className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-teal to-amber"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <motion.nav
          className="hidden md:flex space-x-10"
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          {["home", "about", "gallery", "courses", "contact"].map(
            (item, index) => (
              <motion.button
                key={item}
                variants={itemVariants}
                onClick={() => scrollToSection(item)}
                className="text-white hover:text-teal transition-colors capitalize tracking-widest text-sm font-light relative group overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {translations[language][item]}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-teal"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            )
          )}
        </motion.nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex  items-center justify-center gap-1 -mr-7 md:mr-0">
          <motion.button
            className="md:hidden text-white  "
            onClick={toggleMenu}
            aria-label="Toggle menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={26} /> : <Menu size={29} />}
          </motion.button>
          <LanguageButton />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0  right-0 bg-gradient-to-b from-[#8f8882] via-[#8A7F7A] to-[#ddcac4] shadow-md py-6 px-6 transition-all duration-300 ease-in-out"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav className="flex flex-col space-y-6">
              {["home", "about", "gallery", "courses", "contact"].map(
                (item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="text-white hover:text-teal transition-colors py-2 capitalize font-light tracking-widest text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {translations[language][item]}
                  </motion.button>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
