// ===== محتوى الموقع / Site content =====
// عدّل النصوص هنا فقط. Edit the text here only.
// الحركة والعرض التجريبي في motion.js. Motion and the demo live in motion.js.

const texts = {
  ar: {
    logo: "محمد",
    nav_about: "نبذة عني",
    nav_skills: "المهارات",
    nav_services: "الخدمات",
    nav_projects: "أعمالي",
    nav_contact: "تواصل معي",
    hero_hello: "مرحباً، أنا",
    hero_name: "محمد حسام",
    hero_role: "مطوّر مواقع ووكلاء ذكاء اصطناعي",
    hero_btn: "شاهد أعمالي",
    about_title: "نبذة عني",
    about_text: "أنا محمد حسام، مطوّر مواقع، وأبني وكلاء ذكاء اصطناعي يساعدون في أتمتة المهام وتسهيل العمل. أدرس إدارة الأعمال في مودرن أكاديمي بالمعادي، وأجمع بين فهم الأعمال والبرمجة لأصنع حلولاً عملية تخدم احتياج الناس فعلاً.",
    skills_title: "المهارات",
    services_title: "الخدمات",
    demo_title: "شاهد وكيلاً ذكياً أثناء العمل",
    demo_note: "محاكاة توضيحية لطريقة عمل الوكلاء، وليست وكيلاً حقيقياً متصلاً بخدمة.",
    demo_pick: "اختر مثالاً:",
    demo_you: "أنت",
    demo_agent: "الوكيل",
    projects_title: "أعمالي",
    contact_title: "تواصل معي",
    contact_text: "عندك فكرة أو فرصة عمل؟ يسعدني أن أسمع منك.",
    footer: "جميع الحقوق محفوظة",
    code: "الكود",
    live: "عرض مباشر",
  },
  en: {
    logo: "Mohammed",
    nav_about: "About",
    nav_skills: "Skills",
    nav_services: "Services",
    nav_projects: "Projects",
    nav_contact: "Contact",
    hero_hello: "Hi, I'm",
    hero_name: "Mohammed Hossam",
    hero_role: "Web Developer & AI Agents Builder",
    hero_btn: "See my work",
    about_title: "About me",
    about_text: "I'm Mohammed Hossam, a web developer who builds AI agents that automate tasks and make work easier. I'm a Business Administration student at Modern Academy in Maadi, and I combine business understanding with programming to build practical solutions people actually need.",
    skills_title: "Skills",
    services_title: "Services",
    demo_title: "See an AI agent at work",
    demo_note: "An illustrative simulation of how agents work, not a live agent connected to a service.",
    demo_pick: "Pick an example:",
    demo_you: "You",
    demo_agent: "Agent",
    projects_title: "Projects",
    contact_title: "Get in touch",
    contact_text: "Have an idea or a job opportunity? I'd love to hear from you.",
    footer: "All rights reserved",
    code: "Code",
    live: "Live demo",
  },
};

const skills = ["HTML", "CSS", "JavaScript", "AI Agents", "Git", "GitHub"];

// الخدمات / Services. icon: أيقونة SVG بسيطة.
const services = [
  {
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    title: { ar: "تصميم وتطوير المواقع", en: "Website design & development" },
    desc: {
      ar: "مواقع سريعة وأنيقة تعمل على كل الأجهزة، وتدعم العربية والإنجليزية.",
      en: "Fast, polished websites that work on every device, in Arabic and English.",
    },
  },
  {
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M9 16h6"/></svg>',
    title: { ar: "وكلاء الذكاء الاصطناعي", en: "AI agents" },
    desc: {
      ar: "وكلاء يجيبون عن الأسئلة وينفّذون المهام المتكررة بدلاً من أن تقوم بها يدوياً.",
      en: "Agents that answer questions and handle repetitive tasks so you don't have to.",
    },
  },
  {
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V11M10 20V4M16 20v-7M22 20H2"/></svg>',
    title: { ar: "حلول تناسب نشاطك", en: "Solutions that fit your business" },
    desc: {
      ar: "أبدأ بفهم احتياج العمل، ثم أبني الأداة المناسبة له بخلفيتي في إدارة الأعمال.",
      en: "I start by understanding what your business needs, then build the right tool, drawing on my business administration background.",
    },
  },
];

// سيناريوهات العرض التجريبي / Demo scenarios (simulated, scripted)
const scenarios = [
  {
    id: "booking",
    label: { ar: "حجز موعد", en: "Book an appointment" },
    user: { ar: "أريد حجز موعد غداً الساعة 5 مساءً", en: "I'd like to book an appointment tomorrow at 5 PM" },
    steps: {
      ar: ["فهم الطلب", "فحص المواعيد المتاحة", "تثبيت الحجز وإرسال التأكيد"],
      en: ["Understanding the request", "Checking available slots", "Confirming the booking"],
    },
    reply: {
      ar: "تم حجز موعدك غداً الساعة 5 مساءً. سأرسل لك تذكيراً قبل الموعد بساعة.",
      en: "Your appointment is booked for tomorrow at 5 PM. I'll send you a reminder one hour before.",
    },
  },
  {
    id: "faq",
    label: { ar: "سؤال عن الخدمات", en: "Ask about services" },
    user: { ar: "ما الباقات المتاحة؟", en: "What plans are available?" },
    steps: {
      ar: ["فهم السؤال", "البحث في معلومات الخدمات", "تجهيز الرد"],
      en: ["Understanding the question", "Searching the service info", "Preparing the reply"],
    },
    reply: {
      ar: "عندنا باقتان: أساسية ومتقدمة. هل تريد أن أرسل لك مقارنة بينهما؟",
      en: "We have two plans: Basic and Advanced. Want me to send you a comparison?",
    },
  },
  {
    id: "summary",
    label: { ar: "تلخيص رسائل اليوم", en: "Summarize today's messages" },
    user: { ar: "لخّص لي رسائل اليوم", en: "Summarize today's messages" },
    steps: {
      ar: ["قراءة الرسائل الواردة", "تصنيفها حسب النوع", "كتابة الملخص"],
      en: ["Reading incoming messages", "Sorting them by type", "Writing the summary"],
    },
    reply: {
      ar: "وصلتك 24 رسالة: 15 استفساراً و6 طلبات حجز و3 شكاوى تحتاج متابعة منك.",
      en: "You received 24 messages: 15 questions, 6 booking requests, and 3 complaints that need your follow-up.",
    },
  },
];

// لإضافة مشروع جديد: انسخ كتلة { ... } وغيّر القيم.
// To add a project: copy a { ... } block and change the values.
// image: ضع اسم الصورة داخل مجلد images، أو اتركه "" لعرض لون بدلاً منها.
const projects = [
  {
    title: { ar: "موقع البورتفوليو الشخصي", en: "Personal Portfolio Website" },
    desc: {
      ar: "موقع شخصي بلغتين (عربي وإنجليزي) لعرض أعمالي، مبني بـ HTML وCSS وJavaScript ومنشور على Vercel.",
      en: "A bilingual (Arabic & English) personal site that showcases my work, built with HTML, CSS and JavaScript and hosted on Vercel.",
    },
    image: "",
    code: "https://github.com/mohammedelsherben/Portfolio",
    live: "https://portfolio-mohammedelsherben.vercel.app",
  },
  {
    title: { ar: "IRON HOUSE FITNESS: موقع نادي رياضي", en: "IRON HOUSE FITNESS: Gym Website" },
    desc: {
      ar: "موقع نادي رياضي متميز بلغتين (عربي وإنجليزي) مع لوحة تحكم تجريبية لإدارة الاشتراكات. بيانات تجريبية بالكامل، مبني بـ HTML وCSS وJavaScript.",
      en: "A premium bilingual (Arabic & English) gym website with a demo membership-management dashboard. All data is fictional; built with HTML, CSS and JavaScript.",
    },
    image: "",
    code: "https://github.com/mohammedelsherben/iron-house-fitness",
    live: "https://iron-house-fitness.vercel.app",
  },
  {
    title: { ar: "co/mohammed: منصة تدريب وتغذية أونلاين", en: "co/mohammed: Online Coaching Platform" },
    desc: {
      ar: "منصة كاملة للتدريب والتغذية بالعربية: تسجيل ودخول، باقات اشتراك، أنظمة غذائية بالسعرات والماكروز، سجل تمارين وأوزان، ولوحة تحكم للمدرب. مبنية بـ Next.js وPostgreSQL مع تشفير للبيانات الحساسة.",
      en: "A full Arabic online coaching platform: sign-up and login, subscription plans, diet plans with calories and macros, workout and weight logging, and a coach dashboard. Built with Next.js and PostgreSQL with encryption for sensitive data.",
    },
    image: "",
    code: "",
    live: "https://co-mohammed-mohammedelsherben.vercel.app",
  },
];

// ===== الكود / Code =====

function getSavedLang() {
  try {
    return localStorage.getItem("lang");
  } catch {
    return null;
  }
}

let lang = getSavedLang() === "en" ? "en" : "ar";

function render() {
  const t = texts[lang];

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.title = t.hero_name;
  document.getElementById("lang-btn").textContent = lang === "ar" ? "EN" : "عربي";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t[el.dataset.i18n];
  });

  document.getElementById("skills-list").innerHTML = skills
    .map((s) => `<li>${s}</li>`)
    .join("");

  document.getElementById("services-grid").innerHTML = services
    .map(
      (s) => `
        <article class="service" data-tilt>
          <span class="icon">${s.icon}</span>
          <h3>${s.title[lang]}</h3>
          <p>${s.desc[lang]}</p>
        </article>`
    )
    .join("");

  document.getElementById("projects-grid").innerHTML = projects
    .map((p, i) => {
      return `
        <article class="project" data-tilt>
          <span class="idx">${String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3>${p.title[lang]}</h3>
            <p>${p.desc[lang]}</p>
          </div>
          <div class="actions">
            ${p.code ? `<a href="${p.code}" target="_blank" rel="noopener">${t.code}</a>` : ""}
            ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener">${t.live}</a>` : ""}
          </div>
        </article>`;
    })
    .join("");

  if (window.portfolioMotion) window.portfolioMotion.refresh();
}

// ===== الوضع الليلي / Dark mode =====
const themeMeta = document.querySelector('meta[name="theme-color"]');
function applyTheme(dark) {
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  themeMeta.content = dark ? "#0E1330" : "#F7F7FB";
}
applyTheme(document.documentElement.dataset.theme === "dark");

document.getElementById("theme-btn").addEventListener("click", () => {
  const dark = document.documentElement.dataset.theme !== "dark";
  applyTheme(dark);
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {}
});

document.getElementById("lang-btn").addEventListener("click", () => {
  lang = lang === "ar" ? "en" : "ar";
  try {
    localStorage.setItem("lang", lang);
  } catch {}
  render();
});

render();

// ظهور هادئ للأقسام عند التمرير / gentle fade-in on scroll
if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("js");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}
