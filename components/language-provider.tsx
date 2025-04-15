"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "ru" | "en";

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  ru: {
    // Navigation
    home: "Главная",
    about: "Обо мне",
    gallery: "Галерея",
    courses: "Курсы",
    contact: "Контакты",

    // Hero
    title: "YG Level",
    slogan: "В мире осознанности",
    subtitle: "Йога • Пилатес • Танцевально-двигательная терапия • Тетахилинг",
    description: "Все о движении тела и ума.",
    cta: "Узнать больше",

    // About
    aboutTitle: "Обо мне",
    aboutText:
      "Меня зовут Юлия Головин, я сертифицированный инструктор Йоги/Пилатес терапии...",
    aboutText2:
      "Мой путь в йоге начался более 10 лет назад. За это время я изучила различные направления и техники, которые помогают людям обрести гармонию тела и духа. Я верю, что осознанное движение — это ключ к здоровью, внутреннему спокойствию и радости.",
    aboutText3:
      "В своей практике я сочетаю элементы йоги, пилатеса и танцевально-двигательной терапии, создавая уникальный подход к каждому ученику. Моя цель — помочь вам раскрыть свой потенциал, научиться слушать свое тело и обрести внутреннюю гармонию.",

    // Courses
    coursesTitle: "Мои курсы",
    course1Title: "Знакомство с Йогой",
    course1Desc:
      "Первые шаги в мир осознанности: дыхание, движения, концентрация. Освоение базовых асан и работы с телом.",
    course1Details: "1 месяц (16 занятий)",
    course1Price: "650",

    course2Title: "Здоровая спина",
    course2Desc:
      "Практика для укрепления позвоночника, снятия напряжения и улучшения осанки через йогу, пилатес и дыхание.",
    course2Details: "2 месяца (24 занятия)",
    course2Price: "1200",

    course3Title: "Красота тела и души",
    course3Desc:
      "Йога, танец и осознанность для женственности, пластичности и раскрытия внутренней гармонии.",
    course3Details: "3 месяца (60 занятий)",
    course3Price: "1550",

    learnMore: "Подробнее",
    enroll: "Записаться",

    // Contact
    contactTitle: "Свяжитесь со мной",
    name: "Имя",
    email: "Email",
    message: "Сообщение",
    send: "Отправить",
    follow: "Следите за мной",

    // Footer
    copyright: "© 2025 All rights reserved.",
  },
  en: {
    // Navigation
    home: "Home",
    about: "About",
    gallery: "Gallery",
    courses: "Courses",
    contact: "Contact",

    // Hero
    title: "YG Level – In the World of Mindfulness",
    subtitle: "Yoga • Pilates • Dance Movement Therapy • ThetaHealing",
    description: "All about the movement of body and mind.",
    cta: "Learn more",
    slogan: "In the world of mindfulness",

    // About
    aboutTitle: "About Me",
    aboutText:
      "My name is Yulia Golovin, I am a certified Yoga/Pilates therapy instructor...",
    aboutText2:
      "My journey in yoga began over 10 years ago. Throughout this time, I’ve explored various styles and techniques that help people find harmony between body and soul. I truly believe that mindful movement is the key to health, inner peace, and genuine joy.",
    aboutText3:
      "In my practice, I combine elements of yoga, pilates, and dance movement therapy, creating a unique approach for each student. My goal is to help you unlock your potential, learn to listen to your body, and find inner harmony.",

    // Courses
    coursesTitle: "My Courses",
    course1Title: "Introduction to Yoga",
    course1Desc:
      "First steps into the world of mindfulness: breathing, movements, concentration. Mastering basic asanas and body work.",
    course1Details: "1 month (16 sessions)",
    course1Price: "650",

    course2Title: "Healthy Back",
    course2Desc:
      "Practice for strengthening the spine, relieving tension and improving posture through yoga, pilates and breathing.",
    course2Details: "2 months (24 sessions)",
    course2Price: "1200",

    course3Title: "Beauty of Body and Soul",
    course3Desc:
      "Yoga, dance and mindfulness for femininity, plasticity and revealing inner harmony.",
    course3Details: "3 months (60 sessions)",
    course3Price: "1550",

    learnMore: "Learn More",
    enroll: "Enroll",

    // Contact
    contactTitle: "Contact Me",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    follow: "Follow Me",

    // Footer
    copyright: "© 2025 All rights reserved.",
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Translations;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru");

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
