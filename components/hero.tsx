"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ImageSlider } from "@/components/ui/image-slider"

export default function Hero() {
  const { t } = useLanguage()
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/images?section=hero')
      .then(res => res.json())
      .then(data => {
        if (data.images) setImages(data.images)
      })
      .catch(err => console.error("Error fetching hero images:", err))
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-end md:items-center justify-center overflow-hidden pb-20 md:pb-0">
      {/* Background with Slider */}
      <div className="absolute inset-0 z-0">
        <ImageSlider images={images.length > 0 ? images : ['/background.jpg']} autoPlayInterval={6000} disableHoverPause={true} />
        {/* Editorial Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-black/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10 md:block hidden pointer-events-none" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 z-20 relative w-full mt-32 md:mt-0 pointer-events-none">
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between h-full gap-12 pointer-events-auto">
          
          {/* Text Content (Left on Desktop, Bottom on Mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full md:max-w-3xl space-y-6 md:space-y-8"
          >
            <div className="flex items-center space-x-3 text-[var(--color-sand)] uppercase tracking-[0.3em] text-xs font-bold mb-4">
              <MapPin className="w-4 h-4" />
              <span>Explore East Java</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-medium leading-[1] tracking-tight text-white drop-shadow-2xl">
              {t.hero.title}
              <br />
              <span className="italic text-[var(--color-sand)] font-light">{t.hero.titleAccent}</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-xl font-light leading-relaxed border-l-2 border-[var(--color-sand)] pl-6 py-2">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button
                size="lg"
                className="group bg-[var(--color-sand)] hover:bg-white text-[var(--color-charcoal)] font-semibold rounded-none h-14 px-8 tracking-widest uppercase text-xs pointer-events-auto"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.hero.cta}
                <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-none h-14 px-8 tracking-widest uppercase text-xs border-white/30 text-white hover:bg-white/10 pointer-events-auto"
                onClick={() => window.open('https://wa.me/6285155058577?text=Halo%20HengkyyTrip,%20saya%20ingin%20bertanya%20seputar%20paket%20wisata', '_blank')}
              >
                {t.hero.contact}
              </Button>
            </div>
          </motion.div>
          
          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hidden md:flex w-1/3 justify-end items-end h-full pointer-events-auto"
          >
             <div className="glass-dark p-6 max-w-xs backdrop-blur-xl border-l-[3px] border-[var(--color-accent)]">
               <p className="text-sm text-gray-300 italic mb-2">"Pengalaman yang mengubah cara pandang kami tentang keindahan alam Bromo."</p>
               <div className="flex items-center gap-2">
                 <div className="flex text-[var(--color-sand)]">
                   {'★★★★★'.split('').map((star, i) => <span key={i} className="text-sm">{star}</span>)}
                 </div>
                 <span className="text-xs text-gray-400 font-bold tracking-widest uppercase">5.0 RATED</span>
               </div>
             </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
      </motion.div>
    </section>
  )
}
