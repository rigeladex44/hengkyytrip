"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  const handleClick = () => {
    const whatsappUrl = `https://wa.me/6285155058577?text=${encodeURIComponent('Halo, saya tertarik dengan layanan BromoTrip')}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg glow-hover"
    >
      <MessageCircle className="h-8 w-8 text-white" />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-green-500 rounded-full opacity-50"
      />
    </motion.button>
  )
}
