"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export default function Gallery() {
  const { t } = useLanguage()
  const [images, setImages] = useState<{ url: string, span: string, aspect: string }[]>([])

  useEffect(() => {
    fetch('/api/images?section=gallery')
      .then(res => res.json())
      .then(data => {
        if (data.images && data.images.length > 0) {
          // Assign random span and aspect to create masonry look
          const formattedImages = data.images.map((url: string, index: number) => {
             // Pattern to make it look like a masonry grid
             let span = "md:col-span-1 md:row-span-1"
             let aspect = "aspect-square"
             
             if (index % 5 === 0) {
                span = "md:col-span-2 md:row-span-2"
                aspect = "aspect-square md:aspect-auto"
             } else if (index % 5 === 2) {
                span = "md:col-span-1 md:row-span-2"
                aspect = "aspect-[4/3] md:aspect-[3/4]"
             } else if (index % 5 === 4) {
                span = "md:col-span-2 md:row-span-1"
                aspect = "aspect-video"
             }

             return { url, span, aspect }
          })
          setImages(formattedImages)
        }
      })
      .catch(err => console.error("Error fetching gallery images:", err))
  }, [])

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[var(--color-charcoal-light)] relative">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-2xl"
          >
            <h2 className="text-sm text-[var(--color-sand)] uppercase tracking-[0.3em] font-bold mb-4">{t.gallery.title}</h2>
            <h3 className="text-4xl md:text-6xl font-serif leading-[1.1] text-white">
              {t.gallery.title} <span className="italic text-gray-400">{t.gallery.titleAccent}</span>
            </h3>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-gray-400 max-w-sm text-sm leading-relaxed hidden md:block text-right"
          >
            {t.gallery.subtitle}
          </motion.p>
        </div>

        {/* Bento/Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-6 md:auto-rows-[250px]">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (index % 5) * 0.1 }}
              className={`group relative overflow-hidden rounded-sm bg-gray-900 ${image.span} ${image.aspect} md:h-full`}
            >
              <img 
                src={image.url} 
                alt="Gallery" 
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute bottom-0 left-0 p-6 md:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <div className="w-12 h-[1px] bg-[var(--color-sand)] mt-4"></div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
