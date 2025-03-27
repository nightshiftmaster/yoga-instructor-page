"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Instagram, Facebook, Youtube } from "lucide-react"

export default function Contact() {
  const { language, translations } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({ name: "", email: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="contact" className="py-28 bg-dark-black relative overflow-hidden noise-bg">
      <motion.div
        className="absolute top-0 left-0 w-full h-20 bg-dark-slate"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 100%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-20">
            <motion.span
              className="inline-block text-teal text-sm tracking-[0.3em] uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Связаться со мной
            </motion.span>

            <motion.h2
              className="text-4xl md:text-6xl font-heading font-bold text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-teal">{translations[language].contactTitle.charAt(0)}</span>
              {translations[language].contactTitle.slice(1)}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-1 rounded-lg bg-gradient-to-r from-teal to-amber z-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />

              <motion.form
                onSubmit={handleSubmit}
                className="relative z-10 bg-dark-slate p-8 space-y-8 rounded-lg"
                variants={formVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.div variants={itemVariants}>
                  <Input
                    type="text"
                    name="name"
                    placeholder={translations[language].name}
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="bg-dark border-white/10 focus-visible:ring-teal text-white placeholder:text-white/50 h-14"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Input
                    type="email"
                    name="email"
                    placeholder={translations[language].email}
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="bg-dark border-white/10 focus-visible:ring-teal text-white placeholder:text-white/50 h-14"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Textarea
                    name="message"
                    placeholder={translations[language].message}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="bg-dark border-white/10 focus-visible:ring-teal text-white placeholder:text-white/50 min-h-[150px]"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-teal hover:bg-amber text-black font-medium tracking-wider h-14 text-lg relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center"
                        >
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Отправка...
                        </motion.div>
                      ) : (
                        <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          {translations[language].send}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>

                <AnimatePresence>
                  {isSubmitted && (
                    <motion.p
                      className="text-green-500 text-center font-medium"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {language === "ru"
                        ? "Спасибо! Ваше сообщение отправлено."
                        : "Thank you! Your message has been sent."}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col justify-between"
            >
              <motion.div
                className="space-y-8 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <p className="text-xl leading-relaxed font-light">
                  {language === "ru"
                    ? "Если у вас есть вопросы о моих курсах или вы хотите записаться на занятие, пожалуйста, заполните форму или свяжитесь со мной через социальные сети."
                    : "If you have questions about my courses or would like to sign up for a class, please fill out the form or contact me through social media."}
                </p>
                <p className="text-lg leading-relaxed font-light text-white/80">
                  {language === "ru" ? "Я отвечу вам в течение 24 часов." : "I will respond to you within 24 hours."}
                </p>
              </motion.div>

              <motion.div
                className="mt-16 border-t border-white/10 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <h3 className="text-2xl font-heading font-bold mb-8 text-teal">{translations[language].follow}</h3>
                <div className="flex space-x-6">
                  <motion.a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal hover:text-white transition-colors p-4 border border-teal/30 hover:border-teal"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Instagram size={24} />
                    <span className="sr-only">Instagram</span>
                  </motion.a>
                  <motion.a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber hover:text-white transition-colors p-4 border border-amber/30 hover:border-amber"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Facebook size={24} />
                    <span className="sr-only">Facebook</span>
                  </motion.a>
                  <motion.a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal hover:text-white transition-colors p-4 border border-teal/30 hover:border-teal"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Youtube size={24} />
                    <span className="sr-only">YouTube</span>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

