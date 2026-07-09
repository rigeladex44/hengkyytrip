"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { Language } from "@/lib/translations"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#home", label: t.nav.home },
    { href: "#packages", label: t.nav.packages },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#testimonials", label: t.nav.testimonials },
  ]

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "id", label: "ID", flag: "🇮🇩" },
    { code: "en", label: "EN", flag: "🇬🇧" },
    { code: "ms", label: "MS", flag: "🇲🇾" },
    { code: "zh", label: "ZH", flag: "🇨🇳" },
  ]

  const currentLang = languages.find((l) => l.code === language) || languages[0]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent ${
          isScrolled 
            ? "glass-dark shadow-2xl py-2" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <Link href="/" className="text-3xl font-serif font-bold tracking-tight text-white flex-shrink-0 z-50">
              Hengkyy<span className="text-[var(--color-sand)] italic">Trip</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12 absolute left-1/2 transform -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm uppercase tracking-[0.2em] font-medium text-gray-300 hover:text-white transition-colors group"
                >
                  {link.label}
                  <span className="absolute -bottom-2 left-1/2 w-0 h-[2px] bg-[var(--color-sand)] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-6 z-50">
              
              {/* Custom Language Selector */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center space-x-2 text-sm uppercase tracking-wider text-gray-300 hover:text-white transition-colors py-2"
                >
                  <span className="text-lg">{currentLang.flag}</span>
                  <span>{currentLang.label}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isLangOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-32 bg-[var(--color-charcoal)] border border-gray-800 rounded-lg shadow-xl overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code)
                            setIsLangOpen(false)
                          }}
                          className={`w-full text-left px-4 py-3 flex items-center space-x-3 hover:bg-[#2a2a2a] transition-colors ${
                            language === lang.code ? "text-[var(--color-sand)] bg-[#222]" : "text-gray-300"
                          }`}
                        >
                          <span className="text-xl">{lang.flag}</span>
                          <span className="text-sm font-medium">{lang.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white hover:text-[var(--color-sand)] transition-colors p-2"
              >
                <div className="w-6 flex flex-col items-end space-y-1.5">
                  <span className={`block h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? "w-6 rotate-45 translate-y-[8px]" : "w-6"}`}></span>
                  <span className={`block h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "w-4"}`}></span>
                  <span className={`block h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? "w-6 -rotate-45 -translate-y-[8px]" : "w-5"}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[var(--color-charcoal)] md:hidden flex flex-col justify-center px-8"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-forest-dark)] rounded-full blur-[100px] opacity-50 -translate-y-1/2 translate-x-1/4"></div>

            <div className="flex flex-col space-y-8 z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-serif text-gray-300 hover:text-white hover:pl-4 transition-all block border-b border-gray-800 pb-4"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Language Selector */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-16 z-10"
            >
              <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">Select Language</p>
              <div className="flex space-x-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`flex flex-col items-center p-3 rounded-xl transition-colors ${
                      language === lang.code ? "bg-[#2a2a2a] border border-gray-700" : "bg-[#1a1a1a] opacity-60"
                    }`}
                  >
                    <span className="text-2xl mb-1">{lang.flag}</span>
                    <span className="text-xs font-bold">{lang.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
