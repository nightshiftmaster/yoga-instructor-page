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

    aboutHeader: "Познакомимся",
    galleryHeader: "Моменты практики",
    coursesHeader: "Программы обучения",
    contactHeader: "Будем на связи",

    // Hero
    title: "YG Level",
    slogan: "В мире осознанности",
    subtitle: "Йога • Пилатес • Танцевально-двигательная терапия • Тетахилинг",
    description: "Все о движении тела и ума.",
    cta: "Узнать больше",
    serviceList:
      "Йога • Пилатес • Танцевально-двигательная терапия • Тетахилинг",

    // About
    aboutTitle: "Обо мне",
    aboutText:
      "Меня зовут Юлия Головин, я сертифицированный инструктор Йоги/Пилатес терапии...",
    aboutText2:
      "Мой путь в йоге начался более 10 лет назад. За это время я изучила различные направления и техники, которые помогают людям обрести гармонию тела и духа.",
    aboutText3:
      "В своей практике я сочетаю элементы йоги, пилатеса и танцевально-двигательной терапии, создавая уникальный подход к каждому ученику.",

    // Courses
    coursesTitle: "Мои курсы",
    course1Title: "Знакомство с Йогой",
    course1Desc:
      "Первые шаги в мир осознанности: дыхание, движения, концентрация.",
    course1Details: "1 месяц (16 занятий)",
    course1Price: "650",

    course2Title: "Здоровая спина",
    course2Desc: "Практика для укрепления позвоночника и улучшения осанки.",
    course2Details: "2 месяца (24 занятия)",
    course2Price: "1200",

    course3Title: "Красота тела и души",
    course3Desc: "Йога, танец и осознанность для женственности и гармонии.",
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
    copyright: "© 2025 Все права защищены.",
  },
  en: {
    // Navigation
    home: "Home",
    about: "About",
    gallery: "Gallery",
    courses: "Courses",
    contact: "Contact",

    aboutHeader: "Let's Get Acquainted",
    galleryHeader: "Practice Moments",
    coursesHeader: "Training Programs",
    contactHeader: "Let's Stay in Touch",

    // Hero
    title: "YG Level",
    slogan: "In the World of Mindfulness",
    subtitle: "Yoga • Pilates • Dance Movement Therapy • ThetaHealing",
    description: "All about the movement of body and mind.",
    cta: "Learn More",
    serviceList: "Yoga • Pilates • Dance Movement Therapy • ThetaHealing",

    // About
    aboutTitle: "About Me",
    aboutText:
      "My name is Yulia Golovin, I am a certified Yoga/Pilates therapy instructor...",
    aboutText2:
      "My journey in yoga began over 10 years ago. During this time, I've studied various directions and techniques that help people achieve harmony of body and spirit.",
    aboutText3:
      "In my practice, I combine elements of yoga, pilates, and dance movement therapy, creating a unique approach for each student.",

    // Courses
    coursesTitle: "My Courses",
    course1Title: "Introduction to Yoga",
    course1Desc:
      "First steps into the world of mindfulness: breathing, movements, concentration.",
    course1Details: "1 month (16 sessions)",
    course1Price: "650",

    course2Title: "Healthy Back",
    course2Desc: "Practice for strengthening the spine and improving posture.",
    course2Details: "2 months (24 sessions)",
    course2Price: "1200",

    course3Title: "Beauty of Body and Soul",
    course3Desc: "Yoga, dance, and mindfulness for femininity and harmony.",
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
