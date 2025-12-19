"use client"

import { motion } from "framer-motion"
import { Car, Route, Headphones } from "lucide-react"

import { useLanguage } from "@/lib/language-context"

export default function Features() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Car,
      title: t.features.f1_title,
      description: t.features.f1_desc,
    },
    {
      icon: Route,
      title: t.features.f2_title,
      description: t.features.f2_desc,
    },
    {
      icon: Headphones,
      title: t.features.f3_title,
      description: t.features.f3_desc,
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass p-8 rounded-2xl hover:bg-white/15 transition-all cursor-pointer bg-[var(--color-charcoal)] border border-[var(--color-forest-dark)]"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-forest-teal)] to-[var(--color-sand)] flex items-center justify-center mb-6"
              >
                <feature.icon className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
