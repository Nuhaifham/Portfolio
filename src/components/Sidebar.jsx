import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, FolderGit, Mail, Menu, X, Compass, Send } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const LinkedinIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);


const navLinks = [
  { name: "Home", to: "home", icon: <Home size={18} /> },
  { name: "About", to: "about", icon: <User size={18} /> },
  { name: "Experience", to: "experience", icon: <Briefcase size={18} /> },
  { name: "Portfolio", to: "portfolio", icon: <FolderGit size={18} /> },
  { name: "Contact", to: "contact", icon: <Mail size={18} /> },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Keep track of scroll to toggle shadow
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Top Bar (Only visible on small devices) */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-[#08060d]/80 backdrop-blur-md z-40 px-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 transition-all ${scrolled ? "shadow-md" : ""}`}>
        <Link to="home" smooth={true} duration={800} className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white cursor-pointer">
          Nuha<span className="text-[var(--color-primary)]">.</span>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-700 dark:text-gray-300 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop & Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-black z-40"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-[#110e1b] z-50 p-6 flex flex-col justify-between border-r border-gray-100 dark:border-gray-800"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-extrabold text-2xl tracking-tight text-gray-900 dark:text-white">
                    Nuha<span className="text-[var(--color-primary)]">.</span>
                  </span>
                  <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white">
                    <X size={20} />
                  </button>
                </div>
                <nav>
                  <ul className="space-y-4">
                    {navLinks.map((link) => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          spy={true}
                          smooth={true}
                          duration={500}
                          onClick={() => setIsOpen(false)}
                          onSetActive={() => setActiveSection(link.to)}
                          className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer font-medium transition-all ${
                            activeSection === link.to
                              ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold"
                              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                          }`}
                        >
                          {link.icon}
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Sidebar Social Footer */}
              <div className="flex justify-center gap-6 mt-8">
                <a href="https://linkedin.com/in/nuha-ifham" target="_blank" rel="noopener" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors"><LinkedinIcon className="w-5 h-5" /></a>
                <a href="https://github.com/Nuhaifham" target="_blank" rel="noopener" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors"><GithubIcon className="w-5 h-5" /></a>
                <a href="https://instagram.com/nuha_mi_" target="_blank" rel="noopener" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors"><InstagramIcon className="w-5 h-5" /></a>
                <a href="https://behance.net/nuhaifham" target="_blank" rel="noopener" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors"><Compass size={20} /></a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Navigation Sidebar (LG devices and up) */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-[#110e1b] border-r border-gray-100 dark:border-gray-800 flex-col justify-between py-10 z-30 transition-colors duration-300">
        <div className="flex flex-col">
          {/* Logo Brand area */}
          <div className="px-8 mb-12 flex flex-col items-center">
            <Link to="home" smooth={true} duration={800} className="relative cursor-pointer group flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[var(--color-primary)] to-purple-500 flex items-center justify-center shadow-[0_4px_20px_rgba(170,59,255,0.35)] group-hover:scale-105 transition-all duration-300">
                <span className="font-heading font-extrabold text-white text-3xl select-none">N</span>
              </div>
              <span className="font-heading font-extrabold text-lg text-gray-900 dark:text-white mt-4 select-none tracking-wide">
                Nuha Ifham
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1 select-none">
                UI/UX & Developer
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="px-4">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.to} className="relative">
                  {activeSection === link.to && (
                    <motion.div
                      layoutId="desktop-active-pill"
                      className="absolute inset-0 bg-[var(--color-primary)]/10 dark:bg-[var(--color-primary)]/20 border-l-4 border-[var(--color-primary)] rounded-r-2xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Link
                    to={link.to}
                    spy={true}
                    smooth={true}
                    duration={500}
                    onSetActive={() => setActiveSection(link.to)}
                    className={`relative z-10 flex items-center gap-4 px-6 py-3.5 rounded-r-2xl cursor-pointer transition-colors ${
                      activeSection === link.to
                        ? "text-[var(--color-primary)] font-bold"
                        : "text-gray-700 dark:text-gray-300 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary)]"
                    }`}
                  >
                    {link.icon}
                    <span className="text-sm font-semibold">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Footer with socials & Theme toggler */}
        <div className="px-8 flex flex-col items-center gap-8">
          <div className="flex gap-4">
            <a
              href="https://linkedin.com/in/nuha-ifham"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white hover:bg-[var(--color-primary)] hover:border-transparent transition-all duration-300 shadow-sm"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/Nuhaifham"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white hover:bg-[var(--color-primary)] hover:border-transparent transition-all duration-300 shadow-sm"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/nuha_mi_"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white hover:bg-[var(--color-primary)] hover:border-transparent transition-all duration-300 shadow-sm"
              aria-label="Instagram Profile"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://behance.net/nuhaifham"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white hover:bg-[var(--color-primary)] hover:border-transparent transition-all duration-300 shadow-sm"
              aria-label="Behance Profile"
            >
              <Compass size={16} />
            </a>
          </div>
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
