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
              className="w-24 h-24 mx-auto"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
                stroke="url(#gradient1)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <motion.path
                d="M50 30 L70 40 L70 60 L50 70 L30 60 L30 40 Z"
                stroke="url(#gradient2)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.5 }}
              />
              <defs>
                <linearGradient
                  id="gradient1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#0BCEBC" />
                  <stop offset="100%" stopColor="#FF9E2C" />
                </linearGradient>
                <linearGradient
                  id="gradient2"
                  x1="100%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FF9E2C" />
                  <stop offset="100%" stopColor="#0BCEBC" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          <motion.h1
            className="mb-8 overflow-hidden relative"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block relative"
            >
              <motion.span
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-artistic bg-clip-text text-transparent bg-gradient-to-br from-teal via-white to-amber"
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

              {/* Decorative underline */}
              <motion.div
                className="absolute -bottom-4 left-0 w-full h-[2px] overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.div
                  className="w-full h-full bg-gradient-to-r from-transparent via-teal to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-6 -left-8 text-3xl text-amber/40 font-artistic"
                initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                ✧
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -right-8 text-3xl text-teal/40 font-artistic"
                initial={{ opacity: 0, rotate: 20, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                ✧
              </motion.div>
            </motion.div>
          </motion.h1>

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
            className="w-40 h-[1px] mx-auto my-12 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-teal/60 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -top-5 left-1/2 -translate-x-1/2 text-2xl text-amber/70 font-artistic drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
              initial={{ opacity: 0, y: 10, rotate: -20 }}
              animate={{
                opacity: [0.7, 1, 0.7],
                y: [0, -5, 0],
                rotate: [-20, 0, -20],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              ❋
            </motion.div>
            <motion.div
              className="absolute -bottom-5 left-1/4 text-xl text-teal/70 font-artistic drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              ✧
            </motion.div>
            <motion.div
              className="absolute -bottom-5 right-1/4 text-xl text-amber/70 font-artistic drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2.5,
                delay: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              ✧
            </motion.div>
          </motion.div>

          <motion.div
            className="overflow-hidden mb-12 relative text-center"
            transition={{ duration: 5, delay: 2 }}
          >
            <motion.p
              className="text-sm md:text-lg font-body text-white/90 tracking-[0.05em] md:tracking-[0.15em] font-light uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
            >
              {translations[language].serviceList}
            </motion.p>
          </motion.div>

          <motion.p
            className="text-base md:text-lg mb-14 text-white/90 font-light tracking-wide max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            {translations[language].description}
          </motion.p>

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
              className="text-white border  border-teal/70 hover:border-amber/70 rounded-full px-7 py-3 md:px-12 md:py-6 relative overflow-hidden group bg-gradient-to-r from-teal/80 to-bg-teal/70 backdrop-blur-xl shadow-xl shadow-teal/20 hover:shadow-xl hover:shadow-amber/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
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
