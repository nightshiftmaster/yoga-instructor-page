"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export default function Hero() {
  const { language, translations } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Split text animation
  const titleWords = translations[language].title.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

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
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>

      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 rounded-full bg-teal/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{ y }}
      />

      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-amber/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{ y }}
      />

      {/* Organic shapes instead of hexagons */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 organic-shape bg-teal/20"
        animate={{
          rotate: [0, 360],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          rotate: {
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
          scale: {
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          },
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-24 h-24 organic-shape-alt bg-amber/20"
        animate={{
          rotate: [360, 0],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          rotate: {
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
          scale: {
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          },
        }}
      />

      <div className="container mx-auto px-6 z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ opacity }}
        >
          <motion.div
            className="mb-10 inline-block"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 1.5, type: "spring" }}
          >
            <svg
              className="w-20 h-20 mx-auto"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
                stroke="#0BCEBC"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <motion.path
                d="M50 30 L70 40 L70 60 L50 70 L30 60 L30 40 Z"
                stroke="#FF9E2C"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.5 }}
              />
            </svg>
          </motion.div>

          <motion.h1
            className="mb-8 overflow-hidden"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {/* logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mr-3 text-5xl md:text-7xl font-heading font-bold text-white"
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

            {/* {titleWords.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-3 text-5xl md:text-7xl font-heading font-bold text-white"
                variants={child}
              >
                {index === 0 ? (
                  <span className="text-teal">{word}</span>
                ) : index === titleWords.length - 1 ? (
                  <span className="text-amber">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))} */}
          </motion.h1>

          <motion.h1 className="text-2xl  md:text-5xl font-heading text-white mb-8 font-bold">
            {translations[language].slogan}
          </motion.h1>

          <motion.div
            className="w-32 h-[2px] bg-gradient-to-r from-teal to-amber mx-auto my-8"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 1, delay: 2 }}
          />

          <motion.div
            className="overflow-hidden mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
          >
            <motion.p
              className="text-lg md:text-xl font-light tracking-widest text-white/90"
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {translations[language].subtitle}
            </motion.p>
          </motion.div>

          <motion.p
            className="text-base md:text-xl mb-10 text-white/80 font-light tracking-wide max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            {translations[language].description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className=" text-white border-2 rounded-lg border-teal hover:border-amber px-10 py-7 relative overflow-hidden group bg-[#0BCEBC]"
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="relative z-10 tracking-widest font-light text-lg">
                {translations[language].cta}
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-teal to-amber"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.div
          className="w-8 h-14 border-2 border-teal/50 rounded-full flex justify-center"
          animate={{
            boxShadow: [
              "0 0 0 rgba(11, 206, 188, 0)",
              "0 0 10px rgba(11, 206, 188, 0.5)",
              "0 0 0 rgba(11, 206, 188, 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <motion.div
            className="w-1.5 h-3 bg-teal rounded-full mt-3"
            animate={{
              y: [0, 16, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
