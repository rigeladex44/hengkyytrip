"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Car, Route, Headphones } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ImageSlider } from "@/components/ui/image-slider"

function FeatureImage({ folder, defaultImage }: { folder: string, defaultImage: string }) {
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    fetch(`/api/images?section=features/${folder}`)
      .then(res => res.json())
      .then(data => {
        if (data.images && data.images.length > 0) {
          setImages(data.images)
        } else {
          setImages([defaultImage])
        }
      })
      .catch(err => console.error("Error fetching feature images:", err))
  }, [folder, defaultImage])

  return (
    <div className="relative aspect-[4/3] md:aspect-[5/4] overflow-hidden rounded-sm group">
      <ImageSlider images={images.length > 0 ? images : [defaultImage]} autoPlayInterval={5000} />
    </div>
  )
}

export default function Features() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Car,
      title: t.features.f1_title,
      description: t.features.f1_desc,
      folder: "f1",
      image: "https://images.unsplash.com/photo-1549880181-56a44cf4a9a1?auto=format&fit=crop&q=80&w=1000",
    },
    {
      icon: Route,
      title: t.features.f2_title,
      description: t.features.f2_desc,
      folder: "f2",
      image: "https://images.unsplash.com/photo-1521404176326-0e10ccfb4c03?auto=format&fit=crop&q=80&w=1000",
    },
    {
      icon: Headphones,
      title: t.features.f3_title,
      description: t.features.f3_desc,
      folder: "f3",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000",
    },
  ]

  return (
    <section className="py-24 md:py-32 bg-[var(--color-sand-light)] text-[var(--color-charcoal)] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20 md:mb-32"
        >
          <h2 className="text-sm uppercase tracking-[0.3em] font-bold mb-4 text-[var(--color-forest)]">Why Choose Us</h2>
          <h3 className="text-4xl md:text-5xl font-serif leading-[1.1] max-w-2xl mx-auto">
            Experience the standard of <span className="italic font-light">premium travel</span>
          </h3>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {features.map((feature, index) => {
             const isEven = index % 2 === 0;
             return (
              <div key={feature.title} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-8 md:gap-16`}>
                
                {/* Image Side */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1 }}
                  className="w-full md:w-[45%]"
                >
                  <FeatureImage folder={feature.folder} defaultImage={feature.image} />
                </motion.div>

                {/* Text Side */}
                <motion.div 
                   initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.8, delay: 0.2 }}
                   className="w-full md:w-[45%] flex flex-col items-start"
                >
                  <div className="w-16 h-16 rounded-full border border-[var(--color-forest)] flex items-center justify-center mb-8">
                    <feature.icon className="h-6 w-6 text-[var(--color-forest)]" />
                  </div>
                  <h4 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">{feature.title}</h4>
                  <p className="text-lg text-[var(--color-charcoal-light)] font-light leading-relaxed mb-8">
                    {feature.description}
                  </p>
                  <div className="h-[1px] w-12 bg-[var(--color-forest)]"></div>
                </motion.div>
                
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
