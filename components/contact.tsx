"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Instagram, Facebook, Youtube, PhoneCall, Send } from "lucide-react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";

export default function Contact() {
  const { language, translations } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0 });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation schema
  const ContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, language === "ru" ? "Имя слишком короткое" : "Name is too short")
      .max(50, language === "ru" ? "Имя слишком длинное" : "Name is too long")
      .required(language === "ru" ? "Введите имя" : "Name is required"),
    email: Yup.string()
      .email(
        language === "ru" ? "Неверный формат email" : "Invalid email address"
      )
      .required(language === "ru" ? "Введите email" : "Email is required"),
    message: Yup.string()
      .min(
        10,
        language === "ru"
          ? "Сообщение слишком короткое"
          : "Message is too short"
      )
      .required(
        language === "ru" ? "Введите сообщение" : "Message is required"
      ),
  });

  interface FormValues {
    name: string;
    email: string;
    message: string;
  }

  const initialValues: FormValues = {
    name: "",
    email: "",
    message: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitted(true);
      resetForm();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="contact"
      className="py-28 bg-gradient-to-b from-[#8a635b] via-[#8A7F7A] to-[#5b5a5a] soft-gradient-bg  relative overflow-hidden noise-bg"
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-20 "
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
              viewport={{ once: false }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {translations[language].contactHeader}
            </motion.span>

            <motion.h2
              className="text-4xl md:text-6xl font-heading font-bold text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-teal">
                {translations[language].contactTitle.charAt(0)}
              </span>
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
                className="absolute -inset-[0.5px] rounded-2xl bg-gradient-to-r from-teal to-amber z-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.5, delay: 0.6 }}
              />

              <Formik
                initialValues={initialValues}
                validationSchema={ContactSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className="bg-stone-600 relative z-10 p-8 space-y-8 rounded-2xl">
                    <div className="space-y-2">
                      <Field name="name">
                        {({ field }: { field: any }) => (
                          <div className="relative">
                            <Input
                              {...field}
                              type="text"
                              placeholder={translations[language].name}
                              className={`bg-neutral-500 border-white/10 focus-visible:ring-teal text-white placeholder:text-white/50 h-14 ${
                                errors.name && touched.name
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                            {errors.name && touched.name && (
                              <div className="text-xs flex items-center gap-1 md:text-sm text-red-500  px-2 py-1 rounded mt-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {errors.name}
                              </div>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>

                    <div className="space-y-2">
                      <Field name="email">
                        {({ field }: { field: any }) => (
                          <div className="relative">
                            <Input
                              {...field}
                              type="email"
                              placeholder={translations[language].email}
                              className={`bg-neutral-500 border-white/10 focus-visible:ring-teal text-white placeholder:text-white/50 h-14 ${
                                errors.email && touched.email
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                            {errors.email && touched.email && (
                              <div className="text-xs md:text-sm flex items-center gap-1 text-red-500  px-2 py-1 rounded mt-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {errors.email}
                              </div>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>

                    <div className="space-y-2">
                      <Field name="message">
                        {({ field }: { field: any }) => (
                          <div className="relative">
                            <Textarea
                              {...field}
                              placeholder={translations[language].message}
                              className={`bg-neutral-500 border-white/10 focus-visible:ring-teal text-white placeholder:text-white/50 min-h-[150px] ${
                                errors.message && touched.message
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                            {errors.message && touched.message && (
                              <div className="text-xs md:text-sm flex items-center gap-1 text-red-500  px-2 py-1 rounded mt-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {errors.message}
                              </div>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-teal/70 hover:bg-amber rounded-lg text-white font-medium tracking-wider h-14 text-lg relative overflow-hidden disabled:opacity-50"
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
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                            {language === "ru" ? "Отправка..." : "Sending..."}
                          </motion.div>
                        ) : (
                          <motion.span
                            key="send"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {translations[language].send}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>

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
                  </Form>
                )}
              </Formik>
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
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <p className="md:text-xl text-base leading-relaxed font-light">
                  {language === "ru"
                    ? "Если у вас есть вопросы о моих курсах или вы хотите записаться на занятие, пожалуйста, заполните форму или свяжитесь со мной через социальные сети."
                    : "If you have questions about my courses or would like to sign up for a class, please fill out the form or contact me through social media."}
                </p>
                <p className="text-lg leading-relaxed font-light text-white/80">
                  {language === "ru"
                    ? "Я отвечу вам в течение 24 часов."
                    : "I will respond to you within 24 hours."}
                </p>
              </motion.div>

              <motion.div
                className="mt-16 border-t border-white/10 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="flex justify-center items-center  space-x-6">
                  <motion.a
                    href="tel:+16137699591"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber w-fit hover:text-white transition-colors p-4 border border-amber/30 hover:border-amber"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <PhoneCall size={24} />
                    <span className="sr-only">Phone</span>
                  </motion.a>
                  <motion.a
                    href="https://wa.me/16137699591"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal hover:text-white transition-colors p-4 border border-teal/30 hover:border-teal"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Send size={24} />
                    <span className="sr-only">Message</span>
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/yg_level/"
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
                    href="https://www.facebook.com/YuliaHolovina"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber hover:text-white transition-colors p-4 border border-amber/30 hover:border-amber"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Facebook size={24} />
                    <span className="sr-only">Facebook</span>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
