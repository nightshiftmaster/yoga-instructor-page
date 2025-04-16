"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

export default function About() {
  const { language, translations } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);

  const titleChars = translations[language].aboutTitle.split("");

  return (
    <section
      id="about"
      className="py-28 bg-gradient-to-b from-[#9d9996] via-[#8A7F7A] to-[#8a5347] h-full w-full relative overflow-hidden noise-bg"
    >
      {/* Organic background elements instead of hexagons */}
      <motion.div
        className="absolute top-20 left-20 w-40 h-40 organic-shape border-2 border-teal/20"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.3, rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-20 w-60 h-60 organic-shape-alt border-2 border-amber/20"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.3, rotate: -360 }}
        transition={{
          duration: 40,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-20">
            <motion.span
              className="inline-block text-teal text-sm tracking-[0.3em] uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {translations[language].aboutHeader}
            </motion.span>

            <div className="overflow-hidden">
              <motion.h2
                className="text-4xl   md:text-6xl font-heading font-bold text-white relative inline-block"
                initial={{ y: 100 }}
                animate={isInView ? { y: 0 } : { y: 100 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-teal ">{titleChars[0]}</span>
                {titleChars.slice(1).join("")}
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-[3px]"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  style={{
                    background: "linear-gradient(90deg, #0BCEBC, #FF9E2C)",
                    originX: 0,
                  }}
                />
              </motion.h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="relative perspective-container"
            >
              <motion.div
                className="aspect-[3/4] w-full max-w-xl mx-auto md:mx-0 "
                style={{ y, opacity }}
              >
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <Image
                    src="/hero.jpg"
                    alt="Юлия Головин"
                    fill
                    className="object-cover z-0 "
                  />
                  <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover blur-xl opacity-30"></div>
                </div>
                <motion.div
                  className="absolute -bottom-6 -right-6 w-24 h-24 animate-rotate-slow"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
                      fill="none"
                      stroke="#0BCEBC"
                      strokeWidth="1"
                    />
                    <path
                      d="M50 30 L70 40 L70 60 L50 70 L30 60 L30 40 Z"
                      fill="none"
                      stroke="#FF9E2C"
                      strokeWidth="1"
                      strokeDasharray="2 4"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 2, delay: 0.8 }}
              className="text-white "
            >
              <p className="text-lg leading-relaxed mb-8  font-light text-white/80">
                <span className="float-left text-[5rem] mr-2 font-initial text-white leading-[0.6] -mt-1.5">
                  {translations[language].aboutText.charAt(0)}
                </span>
                {translations[language].aboutText.slice(1)}
              </p>

              <p className="text-lg leading-relaxed mb-8 font-light text-white/80">
                {translations[language].aboutText2}
              </p>

              <p className="text-lg leading-relaxed mb-8 font-light text-white/80">
                {translations[language].aboutText3}
              </p>

              <p className="text-lg leading-relaxed mb-8 font-light text-white/80">
                <span className="float-left text-[5rem] mr-2 font-initial text-white leading-[0.6] -mt-1.5">
                  {translations[language].aboutText4.charAt(0)}
                </span>
                {translations[language].aboutText4.slice(1)}
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-10 flex justify-center"
              >
                <Button
                  size="lg"
                  className="text-white border drop-shadow-[0_0_24px_rgba(200,200,200,0.5)] border-teal/70 hover:border-amber/70 rounded-full px-7 py-3 md:px-12 md:py-6 relative overflow-hidden group bg-gradient-to-r from-teal/80 to-bg-teal/70 backdrop-blur-xl shadow-xl shadow-teal/20 hover:shadow-xl hover:shadow-amber/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                  onClick={() =>
                    document
                      .getElementById("courses")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <span className="relative z-10 tracking-[0.2em] font-body text-sm md:text-lg uppercase font-normal group-hover:text-white transition-colors duration-300">
                    {translations[language].coursesTitle}
                  </span>
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-teal/60 to-amber/60 blur-sm"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </Button>
              </motion.div>

              <motion.div
                className="mt-10 inline-block"
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
                }
                transition={{ duration: 0.5, delay: 1.3 }}
              >
                <svg className="w-32 h-auto" viewBox="0 0 100 30" fill="none">
                  <motion.path
                    d="M0,15 Q25,0 50,15 T100,15"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0"
                      y1="0"
                      x2="100"
                      y2="0"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#0BCEBC" />
                      <stop offset="1" stopColor="#FF9E2C" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
