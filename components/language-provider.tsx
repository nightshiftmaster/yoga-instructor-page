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
    subtitle: "Йога • Пилатес • Танцевально-двигательная терапия • Тета-хилинг",
    description: "Все о движении тела и ума.",
    cta: "Узнать больше",
    serviceList:
      "Йога • Пилатес • Танцевально-двигательная терапия • Тета-хилинг",

    // About
    aboutTitle: "Обо мне",
    aboutText:
      "Меня зовут Юлия Головин, я сертифицированный инструктор Йоги/Пилатес терапии",
    aboutText2:
      "За плечами более 15 лет преподавательской практики. Большую часть жизни я провела в танцах и путешествиях по миру. Движение, энергия, ритм — через них я открывала новые грани тела и ощущений. Когда я открыла для себя йогу, мое сознание изменилось, все слилось в единое целое (танец,знание,йога).",
    aboutText3:
      "Философия йоги, влияние физической нагрузки на тело, любовь и открытость миру привели меня к истинному Я и необходимости создания YG_level пространства. ",
    aboutText4:
      "YG Level — это не просто йога практики. Это путь к сознательному проживанию жизни, искусство слышать себя и чувствовать мир.",

    // Courses
    coursesTitle: "Мои курсы",
    course1Title: "Знакомство с Йогой",
    course1Desc:
      "Первые шаги в мир осознанности. Этот курс поможет тебе мягко войти в практику, понять основы дыхания, движения и концентрации",
    course1FullDesc:
      "Ты узнаешь, как правильно выполнять асаны, работать с дыханием и расслабляться, чтобы почувствовать гармонию тела и ума. Подходит для новичков, а также для тех, кто хочет вернуться к практике с осознанностью.",
    course1Details: "1 месяц (16 занятий)",
    course1Price: "650",

    course2Title: "Здоровая спина",
    course2Desc:
      "Спина — ось нашего тела и зеркало образа жизни. Этот курс направлен на восстановление и укрепление позвоночника, снятие напряжения и улучшение осанки",
    course2FullDesc:
      "Включает в себя мягкие, но эффективные упражнения из йоги, пилатеса и дыхательных практик. Подходит для тех, кто испытывает дискомфорт в спине, хочет улучшить осанку и почувствовать лёгкость в движении.",
    course2Details: "2 месяца (24 занятия)",
    course2Price: "1200",

    course3Title: "Красота тела и души",
    course3Desc:
      "Истинная красота — это внутренняя гармония. Kурс объединяет йогу, танцевально-двигательную терапию и практики осознанности.",
    course3FullDesc:
      "Ты научишься чувствовать своё тело, работать с энергией и раскрывать свою естественную красоту через движение. Подходит для тех, кто хочет соединить физическую практику с глубокой внутренней работой.",
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
    subtitle: "Yoga • Pilates • Dance Movement Therapy • Theta-Healing",
    description: "All about the movement of body and mind.",
    cta: "Learn More",
    serviceList: "Yoga • Pilates • Dance Movement Therapy • Theta-Healing",

    // About
    aboutTitle: "About Me",
    aboutText:
      "My name is Yuliya Golovin, I am a certified Yoga/Pilates therapy instructor.",
    aboutText2:
      "I have over 15 years of teaching experience. I have spent most of my life dancing and traveling the world. Movement, energy, rhythm — through them I discovered new facets of the body and sensations. When I discovered yoga, my consciousness changed, everything merged into a single whole (dance, knowledge, yoga).",

    aboutText3:
      "The philosophy of yoga, the impact of physical activity on the body, love and openness to the world led me to my true self and the need to create the YG_level space.",
    aboutText4:
      "YG Level is not just yoga practices. It is a path to conscious living, the art of hearing yourself and feeling the world.",
    // Courses
    coursesTitle: "My Courses",
    course1Title: "Introduction to Yoga",
    course1Desc:
      "First steps into the world of mindfulness. This course will gently introduce you to the practice, helping you understand the basics of breathing, movement, and concentration.",
    course1FullDesc:
      "You will learn how to correctly perform asanas, work with your breath, and relax to feel the harmony of body and mind. Suitable for beginners as well as those who want to return to practice with mindfulness.",
    course1Details: "1 month (16 sessions)",
    course1Price: "650",

    course2Title: "Healthy Back",
    course2Desc:
      "The back is the axis of our body and a mirror of our lifestyle. This course is aimed at restoring and strengthening the spine, relieving tension, and improving posture.",
    course2FullDesc:
      "Includes gentle yet effective exercises from yoga, pilates, and breathing practices. Suitable for those who experience back discomfort, want to improve posture, and feel lightness in movement.",
    course2Details: "2 months (24 sessions)",
    course2Price: "1200",

    course3Title: "Beauty of Body and Soul",
    course3Desc:
      "True beauty is inner harmony. This course combines yoga, dance-movement therapy, and mindfulness practices.",
    course3FullDesc:
      "You will learn to feel your body, work with energy, and reveal your natural beauty through movement. Suitable for those who want to combine physical practice with deep inner work.",
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
