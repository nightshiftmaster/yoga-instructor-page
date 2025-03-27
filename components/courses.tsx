"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { X } from "lucide-react"

export default function Courses() {
  const { language, translations } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const courses = [
    {
      id: 1,
      title: translations[language].course1Title,
      description: translations[language].course1Desc,
      details: translations[language].course1Details,
      price: translations[language].course1Price,
    },
    {
      id: 2,
      title: translations[language].course2Title,
      description: translations[language].course2Desc,
      details: translations[language].course2Details,
      price: translations[language].course2Price,
    },
    {
      id: 3,
      title: translations[language].course3Title,
      description: translations[language].course3Desc,
      details: translations[language].course3Details,
      price: translations[language].course3Price,
    },
  ]

  return (
    <section id="courses" className="py-28 bg-dark-slate relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-60 h-60 rounded-full bg-teal/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-amber/5 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-20">
            <motion.span
              className="inline-block text-teal text-sm tracking-[0.3em] uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Программы обучения
            </motion.span>

            <motion.h2
              className="text-4xl md:text-6xl font-heading font-bold text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-teal">{translations[language].coursesTitle.charAt(0)}</span>
              {translations[language].coursesTitle.slice(1)}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {courses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                index={index}
                isInView={isInView}
                language={language}
                translations={translations}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function CourseCard({ course, index, isInView, language, translations }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
      className="bg-dark-black overflow-hidden relative group rounded-frame"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
      />

      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal to-amber"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
      />

      <div className="p-10">
        <motion.h3
          className="text-3xl font-heading font-bold mb-4 text-white group-hover:text-teal transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
        >
          {course.title}
        </motion.h3>

        <motion.p
          className="text-white/80 mb-8 font-light leading-relaxed min-h-[100px]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }}
        >
          {course.description}
        </motion.p>

        <motion.div
          className="flex justify-between items-center mb-10 border-t border-b border-white/10 py-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
        >
          <span className="text-sm text-white/70 tracking-wider">{course.details}</span>
          <span className="text-2xl font-heading text-amber">{course.price}</span>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.9 + index * 0.2 }}
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-teal/50 text-white hover:text-black hover:bg-teal hover:border-teal transition-all duration-300 tracking-wider font-light"
              >
                {translations[language].learnMore}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-dark text-white border-teal/30 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-teal font-heading text-3xl font-bold">{course.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 mt-6">
                <p className="text-white/90 font-light leading-relaxed">{course.description}</p>
                <div className="flex justify-between items-center border-t border-b border-white/10 py-4">
                  <span className="text-sm text-white/70 tracking-wider">{course.details}</span>
                  <span className="text-2xl font-heading text-amber">{course.price}</span>
                </div>
                <p className="text-white/80 font-light leading-relaxed">
                  Курс включает в себя индивидуальный подход к каждому ученику, подробные инструкции и поддержку на всем
                  пути обучения. Вы получите не только практические навыки, но и теоретические знания, которые помогут
                  вам глубже понять практику.
                </p>
                <p className="text-white/80 font-light leading-relaxed">
                  Занятия проходят в комфортной атмосфере, способствующей расслаблению и концентрации. Группы небольшие,
                  что позволяет уделить внимание каждому ученику.
                </p>
              </div>
              <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4 text-white" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogContent>
          </Dialog>

          <Button
            className="bg-teal hover:bg-amber text-black relative overflow-hidden tracking-wider font-medium"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            as={motion.button}
          >
            {translations[language].enroll}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

