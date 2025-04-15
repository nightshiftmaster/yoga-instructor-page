"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { X, Check, CreditCard, Mail, Phone, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { loadStripe as loadStripeFromLibrary } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { createPaymentIntent } from "@/app/actions/stripe-actions";
import { toast } from "sonner";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";

const stripePromise = loadStripeFromLibrary(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_your_key"
);

const pictures = ["./yoga.jpg", "./back3.jpg", "./soul.jpg"];

function PaymentSuccessHandler({ course }: { course: { title: string } }) {
  // Don't read URL parameters here

  useEffect(() => {
    // Read URL parameters only on the client inside useEffect
    const params = new URLSearchParams(window.location.search);
    const redirectStatus = params.get("redirect_status");

    if (redirectStatus === "succeeded") {
      toast.success("Оплата прошла успешно!", {
        description: `Вы успешно оплатили курс "${course.title}"`,
        duration: 10000,
        className: "bg-white border border-gray-200 shadow-lg",
        position: "top-center",
      });

      // Clear URL parameters after showing toast
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    // Dependency only on course.title, as URL is read on each effect execution
  }, [course.title]);

  return null;
}

export default function Courses() {
  const { language, translations } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
  ];

  return (
    <section
      id="courses"
      className="py-36 bg-gradient-to-b from-[#5b5a5a] via-[#8A7F7A] to-[#8a635b] soft-gradient-bg relative overflow-hidden"
    >
      <PaymentSuccessHandler course={courses[0]} />
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-80 h-80 rounded-full bg-teal/3 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
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
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-amber/3 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.15, 0.05],
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
          <div className="text-center mb-24">
            <motion.span
              className="inline-block text-teal/90 text-sm tracking-[0.3em] uppercase mb-6 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {translations[language].coursesHeader}
            </motion.span>

            <motion.h2
              className="text-4xl md:text-6xl font-heading font-bold text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-teal">
                {translations[language].coursesTitle.charAt(0)}
              </span>
              {translations[language].coursesTitle.slice(1)}
            </motion.h2>

            <motion.div
              className="w-24 h-[1px] mx-auto mt-8 mb-4"
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                background: "linear-gradient(90deg, #0BCEBC, #FF9E2C)",
                opacity: 0.5,
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {courses.map((course, index) => (
              <CourseCard
                picture={pictures[index]}
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
  );

  function CourseCard({
    picture,
    course,
    index,
    isInView,
    language,
    translations,
  }: {
    course: {
      id: number;
      title: string;
      description: string;
      details: string;
      price: string;
    };
    picture: string;
    index: number;
    isInView: boolean;
    language: string;
    translations: Record<string, any>;
  }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("initial"); // initial, processing, success, error
    const [isMockMode, setIsMockMode] = useState(false);

    const handleEnrollClick = async () => {
      try {
        // Create a payment intent on the server
        const { clientSecret, mockMode } = await createPaymentIntent({
          amount: 100,
          currency: "usd",
          metadata: {
            courseId: course.id.toString(),
            courseTitle: course.title,
          },
        });

        setClientSecret(clientSecret);
        setIsMockMode(mockMode);
        setIsPaymentOpen(true);
      } catch (error) {
        console.error("Error creating payment intent:", error);
        // toast({
        //   title: "Error",
        //   description: "Could not initialize payment. Please try again later.",
        //   variant: "destructive",
        // });
      }
    };

    return (
      <>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -50 }}
          viewport={{ once: false }}
          transition={{ duration: 0.3, delay: 0.2 + index * 0.2 }}
          className="airy-card overflow-hidden relative group border-[0.1px] bg-stone-500 drop-shadow-2xl shadow-2xl  border-gray-400 rounded-2xl "
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-b border-1 border-white  from-teal/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={isHovered ? { opacity: 0 } : { opacity: 0 }}
          />
          <div className="opacity-80 h-1/3 p-6 ">
            <img
              src={picture}
              alt=""
              className="h-full w-full object-cover rounded-lg shadow-2xl"
            />
          </div>

          <motion.div
            className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-teal/30 to-amber/30"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
          />

          <div className="p-7">
            <motion.h3
              className="text-3xl font-heading font-bold mb-5 text-white group-hover:text-teal transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
            >
              {course.title}
            </motion.h3>

            <motion.p
              className="text-white/90 mb-3 font-normal leading-relaxed min-h-[100px]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }}
            >
              {course.description}
            </motion.p>

            <motion.div
              className="flex justify-between items-center mb-6 border-t border-b border-white/10 py-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
            >
              <span className="text-sm text-white/80 tracking-wider font-medium">
                {course.details}
              </span>
              <span className="text-2xl font-heading text-amber">
                ${course.price}
              </span>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.2 }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-teal/30 rounded-full bg-stone-700 relative text-white hover:bg-black  hover:border-teal/50 hover:scale-110 transition-all duration-300 tracking-wider font-medium"
                  >
                    {translations[language].learnMore}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-stone-600 text-white border-teal/10 max-w-2xl airy-card">
                  <DialogHeader>
                    <DialogTitle className="text-teal font-heading text-3xl font-bold">
                      {course.title}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 mt-6">
                    <p className="text-white/95 font-normal leading-relaxed">
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center border-t border-b border-white/10 py-4">
                      <span className="text-sm text-white/80 tracking-wider font-medium">
                        {course.details}
                      </span>
                      <span className="text-2xl font-heading text-amber">
                        ${course.price}
                      </span>
                    </div>
                    <p className="text-white/90 font-normal leading-relaxed">
                      Курс включает в себя индивидуальный подход к каждому
                      ученику, подробные инструкции и поддержку на всем пути
                      обучения. Вы получите не только практические навыки, но и
                      теоретические знания, которые помогут вам глубже понять
                      практику.
                    </p>
                    <p className="text-white/90 font-normal leading-relaxed">
                      Занятия проходят в комфортной атмосфере, способствующей
                      расслаблению и концентрации. Группы небольшие, что
                      позволяет уделить внимание каждому ученику.
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        className="airy-button text-white rounded-full w-full relative overflow-hidden  tracking-wider font-medium"
                        onClick={handleEnrollClick}
                      >
                        {translations[language].enroll}
                      </Button>
                    </motion.div>
                  </div>
                  <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-4 w-4 text-white" />
                    <span className="sr-only">Close</span>
                  </DialogClose>
                </DialogContent>
              </Dialog>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="airy-button text-white w-full  bg-teal/70 relative rounded-full overflow-hidden  tracking-wider font-medium"
                  onClick={handleEnrollClick}
                >
                  {translations[language].enroll}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        {/* Payment Dialog */}
        <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
          <DialogContent className="bg-stone-100 text-slate-700 border-teal/10 max-w-2xl max-h-[90vh] overflow-y-auto airy-card">
            <DialogHeader>
              <DialogTitle className="font-heading text-3xl font-bold sticky top-0 ">
                {paymentStatus === "success"
                  ? "Payment Successful"
                  : "Enroll in Course"}
              </DialogTitle>
            </DialogHeader>

            {paymentStatus === "success" ? (
              <div className="space-y-6 py-6">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-teal/20 rounded-full flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-teal" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    Thank you for your enrollment!
                  </h3>
                  <p className="text-white/70 mb-6">
                    You have successfully enrolled in{" "}
                    <span className="text-teal font-medium">
                      {course.title}
                    </span>
                    . A confirmation email has been sent to your email address.
                  </p>
                  <p className="text-white/70">
                    We'll contact you shortly with details about your first
                    session.
                  </p>
                </div>
                <div className="flex justify-center mt-6">
                  <Button
                    onClick={() => setIsPaymentOpen(false)}
                    className="airy-button text-white px-8"
                  >
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 py-2">
                {/* <div className="flex items-center gap-2 bg-teal/10 p-4 rounded-md">
                  <CreditCard className="h-5 w-5 text-teal" />
                  <p className="text-sm">
                    Secure payment processed by Stripe. Your information is
                    protected.
                  </p>
                </div> */}

                <div className="space-y-4">
                  <div className="pt-4 border-t border-white/5 text-slate-700 -mt-5 ">
                    {/* <h4 className="text-lg font-medium mb-4">Course Details</h4> */}
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Course:</span>
                      <span className="font-bold">{course.title}</span>
                    </div>
                    <div className="flex justify-between mb-6">
                      <span className="font-medium">Price:</span>
                      <span className="text-blue-500 font-bold">
                        ${course.price}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    {/* <h4 className="text-xl font-bold text-slate-700 mb-4">
                      Payment Details
                    </h4> */}
                    {clientSecret ? (
                      <Elements
                        stripe={stripePromise}
                        options={{
                          clientSecret,
                          appearance: {
                            theme: "stripe",
                            variables: {
                              colorPrimary: "#0BCEBC",
                            },
                          },
                        }}
                      >
                        <CheckoutForm
                          course={course}
                          setPaymentStatus={setPaymentStatus}
                          setIsPaymentOpen={setIsPaymentOpen}
                        />
                      </Elements>
                    ) : (
                      <div className="flex justify-center py-4">
                        <div className="animate-spin h-6 w-6 border-2 border-teal border-t-transparent rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {paymentStatus !== "success" && (
              <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4 text-white" />
                <span className="sr-only">Close</span>
              </DialogClose>
            )}
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

// Validation schema
const CheckoutSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Name is too short")
    .max(50, "Name is too long")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.number()
    .typeError("Тhe phone number must consist of numbers")
    .required("Phone number is required"),
});

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
}

function CheckoutForm({
  course,
  setPaymentStatus,
  setIsPaymentOpen,
}: {
  course: { id: number; title: string; price: string };
  setPaymentStatus: (status: string) => void;
  setIsPaymentOpen: (isOpen: boolean) => void;
}): React.ReactElement {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMockMode, setIsMockMode] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const initialValues: FormValues = {
    fullName: "",
    email: "",
    phone: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError }: FormikHelpers<FormValues>
  ) => {
    if (!stripe && !isMockMode) {
      setSubmitting(false);
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    try {
      // If we're in mock mode, simulate a successful payment
      if (isMockMode || !stripe) {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        try {
          await sendAdminNotification({
            courseTitle: course.title,
            coursePrice: course.price,
            customerName: values.fullName,
            customerEmail: values.email,
            customerPhone: values.phone,
          });
        } catch (emailError) {
          console.log(
            "Email notification skipped in development mode:",
            emailError
          );
        }

        setPaymentStatus("success");
        setIsProcessing(false);
        return;
      }

      if (!elements) {
        setErrorMessage("Payment form not properly initialized");
        setIsProcessing(false);
        return;
      }

      // Real Stripe payment flow
      const result = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: window.location.origin,
          receipt_email: values.email,
          payment_method_data: {
            billing_details: {
              name: values.fullName,
              email: values.email,
              phone: values.phone,
            },
          },
        },
      });

      if (result.error) {
        setErrorMessage(
          result.error.message ||
            "An error occurred with your payment. Please try again."
        );
        return;
      }

      // If we get here, the payment was successful
      await sendAdminNotification({
        courseTitle: course.title,
        coursePrice: course.price,
        customerName: values.fullName,
        customerEmail: values.email,
        customerPhone: values.phone,
      });

      setPaymentStatus("success");
    } catch (err) {
      console.error("Payment error:", err);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CheckoutSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-6 overflow-y-auto -mt-10">
          <input type="hidden" name="courseId" value={course.id} />
          <input type="hidden" name="courseTitle" value={course.title} />
          <input type="hidden" name="coursePrice" value={course.price} />

          <div className="grid grid-cols-1 gap-4 ">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-700" />
                <Label htmlFor="fullName" className="text-gray-700">
                  Full Name
                </Label>
              </div>
              <div className="relative mb-8">
                <Field
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  className={`w-full bg-white border ${
                    errors.fullName && touched.fullName
                      ? "border-red-500"
                      : "border-gray-400"
                  } text-gray-900 placeholder:text-gray-400 focus:outline-none rounded-md px-3 py-2`}
                />
                {errors.fullName && touched.fullName && (
                  <div className=" text-xs text-red-500 bg-red-50 px-2 py-1 rounded flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.fullName}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-700" />
                <Label htmlFor="email" className="text-gray-700">
                  Email Address
                </Label>
              </div>
              <div className="relative mb-8">
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full bg-white border ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-400"
                  } text-gray-900 placeholder:text-gray-400 focus:outline-none rounded-md px-3 py-2`}
                />
                {errors.email && touched.email && (
                  <div className=" text-xs text-red-500 bg-red-50 px-2 py-1 rounded flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
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
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-700" />
                <Label htmlFor="phone" className="text-gray-700">
                  Phone Number
                </Label>
              </div>
              <div className="relative mb-8">
                <Field
                  id="phone"
                  name="phone"
                  placeholder="+1 (123) 456-7890"
                  className={`w-full bg-white border ${
                    errors.phone && touched.phone
                      ? "border-red-500"
                      : "border-gray-400"
                  } text-gray-900 placeholder:text-gray-400 focus:outline-none rounded-md px-3 py-2`}
                />
                {errors.phone && touched.phone && (
                  <div className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.phone}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-md border border-gray-400">
            {isMockMode ? (
              <div className="p-2 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-teal/20 p-1 rounded-full">
                    <Check className="h-4 w-4 text-teal" />
                  </div>
                  <span className="text-teal text-sm font-medium">
                    Development Mode
                  </span>
                </div>
                <p className="text-sm text-white/70">
                  Using simulated payments. No real credit card required.
                </p>
              </div>
            ) : (
              <PaymentElement
                options={{
                  layout: { type: "tabs" },
                  wallets: { applePay: "never", googlePay: "never" },
                }}
              />
            )}
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm p-3 bg-red-50 rounded-md border border-red-200">
              {errorMessage}
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-gray-200">
            <Button
              type="submit"
              disabled={
                (!stripe && !isMockMode) || isProcessing || isSubmitting
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-11 rounded-md transition-colors w-full"
            >
              {isProcessing || isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Processing...
                </div>
              ) : (
                `Pay $${course.price}`
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

async function sendAdminNotification(data: {
  courseTitle: string;
  coursePrice: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}) {
  try {
    const response = await fetch("/api/send-admin-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "Nightshiftmaster@gmail.com",
        subject: `New Course Enrollment: ${data.courseTitle}`,
        ...data,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send admin notification");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending admin notification:", error);
  }
}
