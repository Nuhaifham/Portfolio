import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, Element, animateScroll as scroll } from "react-scroll";
import {
  ArrowUp,
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  Download,
  Layers,
  Palette,
  Shield,
  Code,
  Settings,
  Terminal,
  Database,
  Smartphone,
  Monitor,
  Lightbulb,
  UserCheck,
  Activity,
  Atom,
  Send,
  Compass,
} from "lucide-react";
import Tilt from "react-parallax-tilt";

// Components
import Sidebar from "./components/Sidebar";
import CustomCursor from "./components/CustomCursor";
import SkillsCloud from "./components/SkillsCloud";
import SectionHeader from "./components/SectionHeader";
import ProjectCard from "./components/ProjectCard";

// Custom SVG Icons matching exact visual layout
const LinkedInIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const WhatsAppIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

// Skills list with brand color icons
const skillsData = [
  { name: "Figma", icon: <span className="text-[#F24E1E]">🎨</span> },
  { name: "React.js", icon: <span className="text-[#61DAFB]">⚛️</span> },
  { name: "UI/UX Design", icon: <span className="text-[#aa3bff]">📐</span> },
  { name: "User Interface", icon: <span className="text-[#FF6C37]">👁️</span> },
  {
    name: "Interaction Design",
    icon: <span className="text-[#0055FF]">🔄</span>,
  },
  { name: "JavaScript", icon: <span className="text-[#F7DF1E]">🟨</span> },
  { name: "Wireframing", icon: <span className="text-[#47A248]">🔲</span> },
  { name: "Prototyping", icon: <span className="text-[#E0234E]">📱</span> },
  { name: "Full-Stack Dev", icon: <span className="text-[#239120]">💻</span> },
  { name: "Node.js", icon: <span className="text-[#339933]">🟢</span> },
  { name: "Python", icon: <span className="text-[#3776AB]">🐍</span> },
  { name: "MongoDB", icon: <span className="text-[#47A248]">💾</span> },
  {
    name: "Express.js",
    icon: <span className="text-[#181717] dark:text-white">🚂</span>,
  },
  { name: "Flutter", icon: <span className="text-[#02569B]">📱</span> },
  { name: "Adobe XD", icon: <span className="text-[#FF6C37]">🎨</span> },
  { name: "Adobe Photoshop", icon: <span className="text-[#00c8ff]">📷</span> },
  {
    name: "Adobe Illustrator",
    icon: <span className="text-[#ff9a00]">🖌️</span>,
  },
  { name: "REST APIs", icon: <span className="text-[#007ACC]">🔗</span> },
  { name: "HTML5", icon: <span className="text-[#E34F26]">🟥</span> },
  { name: "CSS3", icon: <span className="text-[#1572B6]">🟦</span> },
  { name: "Bootstrap", icon: <span className="text-[#777BB4]">🟣</span> },
  { name: "Design Thinking", icon: <span className="text-[#FFCA28]">💡</span> },
  { name: "User Research", icon: <span className="text-[#06B6D4]">🔍</span> },
  { name: "Docker", icon: <span className="text-[#2496ED]">🐳</span> },
  { name: "Git", icon: <span className="text-[#F05032]">🐙</span> },
];

// Experience list
const experiences = [
  {
    period: "2024 - Present",
    title: "Chief Operating Officer (COO)",
    subtitle: "Zatroz (Sri Lanka)",
    description: [
      "Leading operations and strategic initiatives at Zatroz, an AI and SaaS startup.",
      "Oversee product development, client relations, and cross-functional teams across web development, mobile apps, POS systems, AI automation, and business solutions.",
      "Leverage expertise in full-stack development and UI/UX design to drive product innovation, consistency, and operational excellence.",
    ],
  },
];

// Education list
const educationList = [
  {
    period: "2023 - Present",
    title: "BICT(Hons) in Software Engineering",
    subtitle: "South Eastern University of Sri Lanka (SEUSL)",
    description: [
      "Currently reading for degree. Coursework in data structures, algorithms, UI/UX principles, database systems, and full-stack software development.",
    ],
  },
  {
    period: "Completed Jun 2024",
    title: "Google UX Design Professional Training",
    subtitle: "Google (via Coursera)",
    description: [
      "Comprehensive training covering user research, paper and digital wireframes, high-fidelity prototypes, and usability testing.",
    ],
  },
  {
    period: "Expected Jun 2025",
    title: "UX Certification (UXC™)",
    subtitle: "Nielsen Norman Group (In Progress)",
    description: [
      "Advanced studies in usability metrics, interaction design frameworks, and cognitive ergonomics.",
    ],
  },
  {
    period: "Expected Aug 2025",
    title: "Meta Front-End Developer Certificate",
    subtitle: "Meta (via Coursera)",
    description: [
      "Professional front-end coursework specializing in React.js, advanced CSS frameworks, responsive architectures, and client-side optimization.",
    ],
  },
];

// Projects data
const projectsData = [
  {
    title: "Smart Campus",
    description:
      "AI-powered academic assistance and student productivity platform. Supports opportunity discovery, schedule optimization, and educational AI features.",
    tags: ["Figma", "Wireframing", "Design Thinking", "Problem Solving"],
    category: "UI/UX Design",
    link: "https://www.figma.com/design/EFVI50Xxa5QXBBmlXWWDDk/Smart-Campus?node-id=1-37&t=r3ABvJ4YwkCwTDoz-1",
    image: "/Images/smartcampus.jpg",
  },
  {
    title: "Alerta",
    description:
      "First place design winner disaster management mobile application. Features real-time emergency broadcast maps, location-based SOS triggers, and crisis contacts.",
    tags: ["Figma", "React Native", "Maps API"],
    category: "Mobile",
    link: "https://www.figma.com/proto/9v6yjWBsVt5PmfHlDMkEOq/Alerta?node-id=2-1277&p=f&viewport=148%2C24%2C0.07&t=WjMRs7J0nUR3YtHp-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2%3A1277&page-id=0%3A1",
    image: "/Images/alerta.jpg",
  },
  {
    title: "Eventaa",
    description:
      "A premium Flutter application for discovering and booking local events. Integrates Google Gemini AI as a conversational assistant, Supabase Auth for security, and real-time database syncing.",
    tags: ["Flutter", "Supabase", "Gemini AI", "Mobile"],
    category: "Mobile",
    link: "https://github.com/MohamedMusammil/Flutter_App",
    image: "/Images/eventaa.jpg",
  },
  {
    title: "SEUSL Connect",
    description:
      "A smart campus platform designed to make student life connected and efficient. Includes an AI assistant, timetable organizer, notices, course resources, and student services.",
    tags: ["Figma", "UI/UX", "Bootstrap", "Azure"],
    category: "UI/UX Design",
    link: "https://www.figma.com/design/6jTmTgtUhDaGIHlA0cybDE/SEUSL-Connect?node-id=0-1&t=f4vBYHpEhnAhHIef-1",
    image: "/Images/seusl_connect.jpg",
  },
  {
    title: "EcoTrack",
    description:
      "A household resource-tracking and management mobile application encouraging water, waste, and energy efficiency through clean visualizations and reminders.",
    tags: ["Figma", "Interaction Design", "User Research"],
    category: "UI/UX Design",
    link: "https://behance.net/nuhaifham",
    image: "/Images/ecotrack.jpg",
  },
  {
    title: "CampusMate",
    description:
      "Student campus companion mobile app helping university students browse event listings, cafeteria menus, and grade statistics with minimal cognitive load.",
    tags: ["Figma", "Prototyping", "UI Design"],
    category: "UI/UX Design",
    link: "https://www.figma.com/proto/3ZLXnLzQYjQX4xWgJYwFY8/CampusMate?page-id=0%3A1&node-id=1-932&p=f&viewport=157%2C191%2C0.07&t=TGuv9NFyOI0WIrJV-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A544",
    image: "/Images/campusmate.jpg",
  },
  {
    title: "Coffee Shop Website",
    description:
      "Clean, responsive storefront website layout featuring custom illustration overlays, dynamic card animations, and unified styling systems.",
    tags: ["Figma", "Responsive Web Design"],
    category: "UI/UX Design",
    link: "https://www.figma.com/design/n4nbaKza0KmOpW1JirMgIa/Coffea---Free-Responsive-Coffee-Shop-Website-Template--Community-?node-id=2007-24&t=hcwHrKp3F6QWKlfy-1",
    image: "/Images/coffeeshop.jpg",
  },
  {
    title: "Salon Booking System",
    description:
      "Full-stack web application designed for appointment scheduling, customer queuing, time-slot selection, and database logging.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Docker"],
    category: "Web App",
    link: "https://github.com/Nuhaifham/Salon-Appointment-Booking-System",
    image: "/Images/salonbooking.jpg",
  },
  {
    title: "TechDesk",
    description:
      "Helpdesk support ticketer and team communication application built to log client technical problems and assign them to support reps.",
    tags: ["React", "CSS3", "JavaScript"],
    category: "Web App",
    link: "https://github.com/MohamedMusammil/Flutter_App",
    image: "/Images/techdesk.jpg",
  },
];

// Achievements data
const achievements = [
  {
    title: "Hack Like A Girl 3.0 - Top 10 Finalist",
    date: "May 2026",
    issuer: "SLASSCOM",
    desc: "Recognized among the top 10 finalists out of hundreds of entries for the Smart Campus platform, showcasing innovative product design, AI features, and technical feasibility at TRACE Expert City.",
  },
  {
    title: "Designathon Winner - First Place UX",
    date: "Jan 2026",
    issuer: "Southeastern University",
    desc: "Awarded first place for Outstanding UI/UX Design Excellence for Call Alerta. Judges commended the mobile layout's usability, speed, and reduced cognitive load during emergency scenarios.",
  },
  {
    title: "SLIIT Designathon - Top 10 Performer",
    date: "Jul 2025",
    issuer: "SLIIT",
    desc: "Placed in the top 10 for excellent UI/UX prototype engineering, user journey mapping, and overall creative interface solutioning.",
  },
];

// Typewriter hook helper
function useTypewriter(words, speed = 100, delay = 2000) {
  const [currentText, setCurrentText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
      }, speed / 2);
    } else {
      timer = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
      }, speed);
    }

    if (!isDeleting && currentText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words, speed, delay]);

  return currentText;
}

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeImage, setActiveImage] = useState(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [visibleCounts, setVisibleCounts] = useState([3, 3, 3]);

  // Form States
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending email (1.5 seconds loading state)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");

      // Prefill and open client email application
      const mailtoUrl = `mailto:nuhaifham2001@gmail.com?subject=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`)}`;
      window.location.href = mailtoUrl;

      // Reset form after success state
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Clear success notification after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  const roles = [
    "Software Developer",
    "UI/UX Designer",
    "Frontend Engineer",
    "Design Systems Specialist",
  ];
  const animatedRole = useTypewriter(roles, 80, 2200);

  // Monitor scroll for ScrollToTop button visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const filteredProjects = projectsData.filter(
    (proj) => activeCategory === "All" || proj.category === activeCategory,
  );

  return (
    <div className="flex overflow-x-hidden min-h-screen relative font-sans">
      <CustomCursor />

      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Brand Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] opacity-10 dark:opacity-[0.03] mix-blend-overlay">
          <span className="text-[12vw] font-heading font-extrabold text-[var(--color-primary)] select-none">
            NI
          </span>
        </div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-300/40 dark:bg-purple-900/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-300/40 dark:bg-[var(--color-primary)]/10 blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-pink-300/20 dark:bg-pink-900/10 blur-[100px]" />
      </div>

      {/* Main Container */}
      <div className="flex w-full relative">
        <Sidebar />

        {/* Content Wrapper */}
        <main className="flex-1 lg:ml-64 w-full lg:w-[calc(100%-16rem)] overflow-x-hidden relative flex flex-col min-h-screen pt-16 lg:pt-0 z-10 bg-slate-50 dark:bg-[#08060d] transition-colors duration-300 font-sans">
          {/* HOME HERO SECTION */}
          <Element
            name="home"
            className="min-h-screen flex items-center justify-center py-20 px-6 sm:px-12 relative overflow-hidden"
          >
            <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              {/* Left Column: Text & Intro */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col text-left justify-center"
              >
                <h3 className="text-xl sm:text-2xl font-medium text-gray-500 dark:text-gray-400 mb-2 font-heading">
                  Hello, My name is
                </h3>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 leading-tight font-heading">
                  Nuha Ifham
                  <span className="text-[var(--color-primary)]">.</span>
                </h1>
                <h3 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-6 h-12">
                  I'm a{" "}
                  <span className="underline decoration-wavy decoration-purple-500/50">
                    {animatedRole}
                  </span>
                </h3>
                <p className="text-gray-650 dark:text-gray-300 leading-relaxed mb-8 max-w-lg text-base">
                  I'm a dedicated, conscientious, and energetic Software
                  Developer and UI/UX Designer. Working on startup initiatives
                  like Zatroz and winning university designathons has enabled me
                  to build a high-end visual aesthetic and bridge it with robust
                  technical implementations.
                </p>

                {/* Social Media Link Buttons */}
                <div className="flex gap-4 mb-8">
                  <a
                    href="https://linkedin.com/in/nuha-ifham"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white hover:bg-[var(--color-primary)] shadow-md hover:-translate-y-1 transition-all duration-300"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedInIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/Nuhaifham"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white hover:bg-[var(--color-primary)] shadow-md hover:-translate-y-1 transition-all duration-300"
                    aria-label="GitHub Profile"
                  >
                    <GitHubIcon className="w-5 h-5" />
                  </a>

                  <a
                    href="https://wa.me/94773299615"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white hover:bg-[var(--color-primary)] shadow-md hover:-translate-y-1 transition-all duration-300"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://behance.net/nuhaifham"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white hover:bg-[var(--color-primary)] shadow-md hover:-translate-y-1 transition-all duration-300"
                    aria-label="Behance"
                  >
                    <Compass size={18} />
                  </a>
                </div>

                <div>
                  <a
                    href="/Nuha_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-4 bg-[var(--color-primary)] text-white font-bold rounded-full hover:bg-[var(--color-primary-dark)] transition-all shadow-lg shadow-[var(--color-primary)]/30 hover:shadow-[var(--color-primary)]/50 transform hover:-translate-y-1 cursor-pointer select-none"
                  >
                    Download CV
                  </a>
                </div>
              </motion.div>

              {/* Right Column: Profile Image Card exactly like samahi.me */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex justify-center lg:justify-end mt-8 lg:mt-0"
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-full max-w-md"
                >
                  <Tilt
                    tiltMaxAngleX={5}
                    tiltMaxAngleY={5}
                    scale={1.02}
                    transitionSpeed={400}
                    className="relative w-full mx-auto"
                  >
                    {/* Shadow Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-purple-400 rounded-[2.5rem] blur-2xl opacity-30 dark:opacity-40 animate-pulse" />

                    {/* Glass Card Outer */}
                    <div className="glass-card p-4 sm:p-6 rounded-[2.5rem] !overflow-visible relative">
                      <div className="glass-card-inner rounded-[2.5rem]" />

                      {/* Image Mask Wrapper */}
                      <div
                        className="relative rounded-2xl group bg-gray-100 dark:bg-gray-800/50 overflow-hidden"
                        style={{ clipPath: "inset(-100% 0 0 0 round 1rem)" }}
                      >
                        <motion.img
                          layoutId="hero-profile-image"
                          transition={{
                            layout: {
                              duration: 1.5,
                              ease: [0.6, 0.01, -0.05, 0.9],
                            },
                          }}
                          src="/Images/profile.jpg"
                          alt="Nuha Ifham"
                          className="relative z-10 w-full h-auto object-contain transition-all duration-700 grayscale-0 opacity-100 sm:grayscale sm:opacity-90 group-hover:grayscale-0 group-hover:opacity-100"
                          whileHover={{ scale: 1.15, y: -24 }}
                          style={{
                            WebkitMaskImage:
                              "linear-gradient(to bottom, black 70%, transparent 100%)",
                            maskImage:
                              "linear-gradient(to bottom, black 70%, transparent 100%)",
                          }}
                        />
                        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[var(--color-primary)]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                      </div>

                      {/* Floating Badges */}
                      {/* Badge 1: React Icon */}
                      <motion.div
                        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute top-[20%] -right-4 sm:-right-6 bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 text-[#61DAFB] text-2xl sm:text-3xl z-30 flex items-center justify-center"
                      >
                        <Atom size={28} className="animate-spin-slow" />
                      </motion.div>

                      {/* Badge 2: Figma Icon */}
                      <motion.div
                        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5,
                        }}
                        className="absolute top-[10%] -left-4 sm:-left-6 bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 text-[#F24E1E] text-2xl sm:text-3xl z-30 flex items-center justify-center"
                      >
                        <span className="text-2xl font-bold">🎨</span>
                      </motion.div>

                      {/* Badge 3: Code Brackets */}
                      <motion.div
                        animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }}
                        transition={{
                          duration: 4.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1,
                        }}
                        className="absolute bottom-[20%] -left-4 sm:-left-6 bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 text-[var(--color-primary)] text-2xl sm:text-3xl z-30 flex items-center justify-center"
                      >
                        <Code size={28} />
                      </motion.div>

                      {/* Badge 4: Design Bulb */}
                      <motion.div
                        animate={{ y: [0, 8, 0], rotate: [0, 4, 0] }}
                        transition={{
                          duration: 5.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.5,
                        }}
                        className="absolute bottom-[10%] -right-4 sm:-right-6 bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 text-[#FFCA28] text-2xl sm:text-3xl z-30 flex items-center justify-center"
                      >
                        <Lightbulb size={28} />
                      </motion.div>
                    </div>
                  </Tilt>
                </motion.div>
              </motion.div>
            </div>
          </Element>

          {/* ABOUT SECTION */}
          <Element
            name="about"
            className="py-20 px-6 sm:px-12 relative border-t border-gray-100 dark:border-gray-800/50"
          >
            <div className="max-w-5xl mx-auto">
              <SectionHeader title="About Me" subtitle="Biography" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    I'm Nuha Ifham, a Software Developer & UI/UX Specialist
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    I am currently pursuing my BICT(Hons) in Software
                    Technologies. Over the past few years, I have successfully
                    balanced core academic concepts with hands-on startup
                    execution, serving as the Chief Operating Officer at Zatroz.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    My design philosophy focuses on clean, intuitive layouts
                    that reduce user friction. My engineering philosophy focuses
                    on robust, testable, and highly responsive codebases. By
                    maintaining a foot in both design and development worlds, I
                    write systems that work exactly the way they look.
                  </p>
                </div>

                {/* 3D Skills Sphere */}
                <div className="lg:col-span-5 flex items-center justify-center">
                  <div className="w-full flex flex-col items-center">
                    <SkillsCloud skills={skillsData} />
                  </div>
                </div>
              </div>
            </div>
          </Element>

          {/* EDUCATION SECTION */}
          <Element
            name="experience"
            className="py-20 px-6 sm:px-12 relative border-t border-gray-100 dark:border-gray-800/50"
          >
            <div className="max-w-4xl mx-auto">
              <SectionHeader title="Education" subtitle="Academic Journey" alignment="center" />

              <div className="max-w-3xl mx-auto mt-12">
                <div className="relative border-l border-gray-200 dark:border-gray-800 ml-4 pl-8 space-y-12">
                  {educationList.map((edu, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline point */}
                      <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-[#08060d] border-4 border-[var(--color-primary)] group-hover:scale-110 transition-transform duration-300 shadow-sm" />

                      <span className="text-xs font-extrabold text-[var(--color-primary)] uppercase tracking-wider block mb-2">
                        {edu.period}
                      </span>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                        {edu.title}
                      </h4>
                      <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">
                        {edu.subtitle}
                      </h5>
                      <ul className="list-disc list-outside ml-4 text-sm text-gray-600 dark:text-gray-300 space-y-2">
                        {edu.description.map((desc, dIdx) => (
                          <li key={dIdx}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Element>

          {/* ACHIEVEMENTS & AWARDS */}
          <section className="py-20 px-6 sm:px-12 relative border-t border-gray-100 dark:border-gray-800/50 bg-white/20 dark:bg-black/10">
            <div className="max-w-5xl mx-auto">
              <SectionHeader title="Achievements" subtitle="Honors" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {achievements.map((ach, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6 }}
                    className="p-6 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-gray-700/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-extrabold tracking-wider bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-3 py-1 rounded-full uppercase">
                          {ach.issuer}
                        </span>
                        <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                          {ach.date}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        {ach.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-350 leading-relaxed">
                        {ach.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* PORTFOLIO PROJECTS SECTION */}
          <Element
            name="portfolio"
            className="py-20 px-6 sm:px-12 relative border-t border-gray-100 dark:border-gray-800/50 min-h-screen"
          >
            <div className="max-w-5xl mx-auto">
              <SectionHeader
                title="Portfolio"
                subtitle="Showcase"
                alignment="center"
              />

              {/* Filters */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {["All", "Web App", "Mobile", "UI/UX Design"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 overflow-hidden cursor-pointer select-none ${
                      activeCategory === cat
                        ? "text-white shadow-[0_0_20px_var(--color-primary)]/30 scale-105"
                        : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-md text-gray-650 dark:text-gray-450 hover:text-[var(--color-primary)] border border-white/60 dark:border-gray-800 hover:border-[var(--color-primary)]/50"
                    }`}
                  >
                    {activeCategory === cat && (
                      <motion.div
                        layoutId="active-filter-bg"
                        className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-purple-500 z-0"
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                ))}
              </div>

              {/* Projects Grid */}
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.title}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProjectCard {...project} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </Element>

          {/* GALLERY SECTION */}
          <Element
            name="gallery"
            className="py-20 px-6 sm:px-12 relative border-t border-gray-100 dark:border-gray-800/50 bg-white/20 dark:bg-black/10 overflow-hidden"
          >
            <div className="max-w-6xl mx-auto relative">
              <SectionHeader title="Gallery" subtitle="Moments & Competitions" alignment="center" />

              {/* Slider Categories Navigation */}
              <div className="flex justify-center gap-4 mb-10 mt-8">
                {["SLASSCOM", "SLIIT", "South Eastern Designathon"].map((cat, idx) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCardIndex(idx);
                    }}
                    className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer select-none border ${
                      activeCardIndex === idx
                        ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20 scale-105"
                        : "bg-white/50 dark:bg-gray-800/50 border-white/60 dark:border-gray-850 text-gray-500 dark:text-gray-400 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/40"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Carousel Container */}
              <div className="relative w-full flex items-center justify-center min-h-[580px] sm:min-h-[540px]">
                {/* Left Arrow Button */}
                <button
                  onClick={() => setActiveCardIndex((prev) => (prev > 0 ? prev - 1 : 2))}
                  className="absolute left-2 lg:-left-6 z-20 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[var(--color-primary)] cursor-pointer select-none hover:scale-105 active:scale-95 transition-all"
                >
                  &larr;
                </button>

                {/* Cards Deck Wrapper */}
                <div className="relative w-full max-w-4xl h-full flex justify-center items-center py-6 px-4">
                  {[0, 1, 2].map((idx) => {
                    const offset = idx - activeCardIndex;
                    const isActive = idx === activeCardIndex;
                    
                    const categoryData = [
                      {
                        title: "SLASSCOM - Hack Like A Girl 3.0",
                        images: [
                          { src: "/Images/slasscom1.jpg", span: "col-span-1 h-36 sm:h-44" },
                          { src: "/Images/slasscom2.jpg", span: "col-span-1 h-36 sm:h-44" },
                          { src: "/Images/slasscom3.jpg", span: "col-span-2 h-44 sm:h-56" },
                          { src: "/Images/gallery2.jpeg", span: "col-span-1 h-36 sm:h-44" }
                        ]
                      },
                      {
                        title: "SLIIT Designathon",
                        images: [
                          { src: "/Images/sliit1.jpg", span: "col-span-1 h-36 sm:h-44" },
                          { src: "/Images/sliit2.jpg", span: "col-span-1 h-36 sm:h-44" },
                          { src: "/Images/sliit3.jpg", span: "col-span-2 h-44 sm:h-56" }
                        ]
                      },
                      {
                        title: "South Eastern Designathon",
                        images: [
                          { src: "/Images/seusl1.jpg", span: "col-span-2 h-44 sm:h-56" },
                          { src: "/Images/seusl2.jpg", span: "col-span-1 h-36 sm:h-44" },
                          { src: "/Images/seusl3.jpg", span: "col-span-1 h-36 sm:h-44" }
                        ]
                      }
                    ][idx];

                    return (
                      <motion.div
                        key={idx}
                        style={{ originY: 0.5 }}
                        animate={{
                          x: offset * 340,
                          scale: isActive ? 1 : 0.82,
                          opacity: isActive ? 1 : 0.15,
                          zIndex: isActive ? 10 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={`absolute w-full bg-white dark:bg-[#110e1b] border border-gray-150 dark:border-gray-800/80 rounded-[2.5rem] shadow-xl p-5 sm:p-8 flex flex-col transition-shadow duration-300 ${
                          isActive ? "relative shadow-2xl cursor-default" : "cursor-pointer pointer-events-none"
                        }`}
                        onClick={() => {
                          if (!isActive) setActiveCardIndex(idx);
                        }}
                      >
                        <h4 className="text-lg sm:text-xl font-bold text-gray-950 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center justify-between">
                          <span>{categoryData.title}</span>
                          <span className="text-[10px] bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                            Card {idx + 1}
                          </span>
                        </h4>

                        {/* Masonry Grid inside the card */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          {categoryData.images
                            .slice(0, visibleCounts[idx])
                            .map((img, i) => (
                              <motion.div
                                key={i}
                                layout
                                whileHover={{ scale: 1.02 }}
                                onClick={() => isActive && setActiveImage(img.src)}
                                className={`relative rounded-2xl overflow-hidden group shadow-sm cursor-zoom-in ${img.span}`}
                              >
                                <img
                                  src={img.src}
                                  alt="Competition moment"
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                  <span className="text-white text-xs font-bold uppercase tracking-widest">Zoom +</span>
                                </div>
                              </motion.div>
                            ))}
                        </div>

                        {/* Load More Button */}
                        {visibleCounts[idx] < categoryData.images.length && (
                          <div className="text-center mt-6">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setVisibleCounts((prev) => {
                                  const next = [...prev];
                                  next[idx] += 2;
                                  return next;
                                });
                              }}
                              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-850 dark:text-white text-xs sm:text-sm font-semibold rounded-full shadow-sm cursor-pointer select-none transition-colors duration-200"
                            >
                              Load More
                            </button>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Right Arrow Button */}
                <button
                  onClick={() => setActiveCardIndex((prev) => (prev < 2 ? prev + 1 : 0))}
                  className="absolute right-2 lg:-right-6 z-20 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[var(--color-primary)] cursor-pointer select-none hover:scale-105 active:scale-95 transition-all"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </Element>

          {/* CONTACT SECTION */}
          <Element
            name="contact"
            className="py-20 px-6 sm:px-12 relative border-t border-gray-100 dark:border-gray-800/50"
          >
            <div className="max-w-5xl mx-auto">
              <SectionHeader
                title="Contact Me"
                subtitle="Get in touch"
                alignment="center"
              />

              {/* Info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div className="p-6 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-gray-700/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-4">
                    <Phone size={20} />
                  </div>
                  <h5 className="font-extrabold text-sm text-gray-900 dark:text-white uppercase mb-1">
                    WhatsApp
                  </h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold hover:text-[var(--color-primary)]">
                    <a
                      href="https://wa.me/94773299615"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +94 77 329 9615
                    </a>
                  </p>
                </div>

                <div className="p-6 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-gray-700/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-4">
                    <MapPin size={20} />
                  </div>
                  <h5 className="font-extrabold text-sm text-gray-900 dark:text-white uppercase mb-1">
                    Location
                  </h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                    Kurunegala, Sri Lanka
                  </p>
                </div>

                <div className="p-6 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-gray-700/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-4">
                    <Mail size={20} />
                  </div>
                  <h5 className="font-extrabold text-sm text-gray-900 dark:text-white uppercase mb-1">
                    Email
                  </h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold hover:text-[var(--color-primary)]">
                    <a href="mailto:nuhaifham2001@gmail.com">
                      nuhaifham2001@gmail.com
                    </a>
                  </p>
                </div>

                <div className="p-6 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-gray-700/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-4">
                    <Globe size={20} />
                  </div>
                  <h5 className="font-extrabold text-sm text-gray-900 dark:text-white uppercase mb-1">
                    Website
                  </h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold hover:text-[var(--color-primary)]">
                    <a
                      href="https://www.nuhaifham.com"
                      target="_blank"
                      rel="noopener"
                    >
                      nuhaifham.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Form card */}
              <div className="max-w-3xl mx-auto bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-white/60 dark:border-gray-700 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <h4 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-8 text-center tracking-tight uppercase">
                    Send Me An Email
                  </h4>

                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-2xl text-center text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      <span>✓</span> Message prepared successfully! Launching
                      email application...
                    </motion.div>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        required
                        disabled={isSubmitting}
                        className="w-full bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all text-gray-900 dark:text-white disabled:opacity-50"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="Your Email"
                        required
                        disabled={isSubmitting}
                        className="w-full bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all text-gray-900 dark:text-white disabled:opacity-50"
                      />
                    </div>
                    <input
                      type="text"
                      name="subject"
                      value={formState.subject}
                      onChange={handleInputChange}
                      placeholder="Subject"
                      required
                      disabled={isSubmitting}
                      className="w-full bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all text-gray-900 dark:text-white disabled:opacity-50"
                    />
                    <textarea
                      rows={5}
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder="Message"
                      required
                      disabled={isSubmitting}
                      className="w-full bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all text-gray-900 dark:text-white resize-none disabled:opacity-50"
                    />
                    <div className="text-center pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-10 py-4 bg-gradient-to-r from-[var(--color-primary)] to-purple-500 hover:from-[var(--color-primary-dark)] hover:to-purple-600 text-white rounded-full font-bold shadow-[0_4px_20px_rgba(170,59,255,0.25)] hover:shadow-[0_4px_30px_rgba(170,59,255,0.45)] transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer select-none inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message <Send size={16} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Element>

          {/* FOOTER */}
          <footer className="py-10 border-t border-gray-100 dark:border-gray-800/50 bg-white/10 dark:bg-black/10 text-center relative z-10">
            <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-signature text-3xl text-[var(--color-primary)] font-medium">Nuha Ifham</span>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                &copy; 2026 Nuha Ifham. All rights reserved.
              </p>
              <div className="flex gap-4">
                <a href="https://linkedin.com/in/nuha-ifham" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-primary)] transition-colors"><LinkedInIcon className="w-5 h-5" /></a>
                <a href="https://github.com/Nuhaifham" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-primary)] transition-colors"><GitHubIcon className="w-5 h-5" /></a>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Smooth Scroll back to top & Lightbox */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed bottom-8 right-8 z-40"
          >
            <button
              onClick={() => scroll.scrollToTop({ duration: 800 })}
              className="p-4 bg-[var(--color-primary)] text-white rounded-full shadow-[0_0_20px_var(--color-primary)]/40 hover:shadow-[0_0_30px_var(--color-primary)]/60 hover:bg-[var(--color-primary-dark)] hover:-translate-y-1 transition-all duration-300 focus:outline-none cursor-pointer"
              aria-label="Scroll To Top"
            >
              <ArrowUp size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 text-white hover:text-[var(--color-primary)] transition-colors p-2 text-2xl font-bold bg-white/10 rounded-full w-12 h-12 flex items-center justify-center"
            >
              ✕
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={activeImage}
              alt="Competition Moment"
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl select-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
