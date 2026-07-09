"use client"

import Navigation from "@/components/navigation"
import { LanguageProvider } from "@/lib/language-context"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Packages from "@/components/packages"
import Gallery from "@/components/gallery"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <Navigation />
        <Hero />
        <Features />
        <Packages />
        <Gallery />
        <Testimonials />
        <Footer />
        <WhatsAppButton />
      </main>
    </LanguageProvider>
  )
}
