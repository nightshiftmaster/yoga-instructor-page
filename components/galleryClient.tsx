"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

type ImagesCollectionType = {
  src: string;
  alt: string;
}[];

export default function Gallery({
  galleryImages,
}: {
  galleryImages: ImagesCollectionType;
}) {
  const { language, translations } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  console.log(galleryImages);

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <section
      id="gallery"
      className="py-28 bg-gradient-to-b from-[#8a5347] via-[#8A7F7A] to-[#5b5a5a] relative overflow-hidden noise-bg "
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-full grid-pattern"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          style={{ opacity, scale }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-20">
            <motion.span
              className="inline-block text-teal text-sm tracking-[0.3em] uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Моменты практики
            </motion.span>

            <motion.h2
              className="text-4xl md:text-6xl font-heading font-bold text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-teal">
                {translations[language].gallery.charAt(0)}
              </span>
              {translations[language].gallery.slice(1)}
            </motion.h2>

            <motion.div
              className="w-24 h-[2px] mx-auto mt-8 mb-4"
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                background: "linear-gradient(90deg, #0BCEBC, #FF9E2C)",
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
              loop={true}
              effect="coverflow"
              speed={800}
              initialSlide={2}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="gallery-swiper"
            >
              {galleryImages?.map((image, index) => (
                <SwiperSlide
                  key={index}
                  style={{ width: "100%", maxWidth: "500px" }}
                >
                  <motion.div
                    className="relative aspect-[4/3] w-full overflow-hidden group rounded-frame soft-shadow"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    ></motion.div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
