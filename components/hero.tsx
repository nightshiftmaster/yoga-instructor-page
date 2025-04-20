"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import MouseIcon from "./ui/mouse";

export default function Hero() {
  const { language, translations } = useLanguage();

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className=" flex items-center justify-center  bg-[#9d9996] h-screen w-full relative overflow-hidden noise-bg"
    >
      <video
        data-testid="video-content"
        className="h-[90%] absolute w-full opacity-60 object-cover z-0"
        id="video"
        loop
        autoPlay
        muted
        playsInline
      >
        <source src="/main_videoHD.MOV" type="video/mp4" />
      </video>

      <div className="container mx-auto px-6 z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ opacity }}
        >
          <div className="inline-block mb-8 relative drop-shadow-[0_0_1px_white]">
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-artistic bg-clip-text text-transparent bg-gradient-to-br from-teal via-white to-amber  "
            >
              YG
            </motion.span>
            <motion.span
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-7xl font-heading text-white/90 font-thin ml-4"
            >
              Level
            </motion.span>
          </div>

          <motion.h2
            className="text-2xl md:text-3xl font-artistic text-white mb-10 font-normal tracking-[0.2em]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal via-white to-amber drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
              {translations[language].slogan}
            </span>
          </motion.h2>

          <motion.div
            className="mt-20  flex flex-col gap-10 relative text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            <p className="text-sm md:text-lg font-body text-white/80 tracking-[0.05em] md:tracking-[0.15em] font-light uppercase">
              {translations[language].serviceList}
            </p>
            <p className="text-base md:text-lg mb-14 text-white/80 font-light tracking-wide max-w-xl mx-auto leading-relaxed">
              {translations[language].description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative"
          >
            <Button
              size="lg"
              className="text-white border drop-shadow-[0_0_24px_rgba(255,255,255,0.5)]  border-teal/70 hover:border-amber/70 rounded-full px-7 py-3 md:px-12 md:py-6 relative overflow-hidden group bg-gradient-to-r from-teal/80 to-bg-teal/70 backdrop-blur-xl shadow-xl shadow-teal/20 hover:shadow-xl hover:shadow-amber/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="relative z-10 tracking-[0.2em] font-body text-sm  md:text-lg uppercase font-normal group-hover:text-white transition-colors duration-300">
                {translations[language].cta}
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
            <motion.div
              className="absolute -right-8 top-1/2 -translate-y-1/2 text-2xl text-teal/50 font-artistic"
              initial={{ opacity: 0, x: -10, rotate: -20 }}
              animate={{
                opacity: [0.5, 1, 0.5],
                x: 0,
                rotate: [-20, 0, -20],
              }}
              transition={{
                duration: 2,
                delay: 2.6,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              ✧
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <MouseIcon />
    </section>
  );
}
