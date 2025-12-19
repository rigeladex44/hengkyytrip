"use client"

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

import { useLanguage } from "@/lib/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-charcoal-light border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Hengkyy<span className="text-gradient">Trip</span>
            </h3>
            <p className="text-gray-400 mb-4">
              {t.footer.about}
            </p>
            <div className="flex gap-4">
              <a href="#" className="glass p-2 rounded-full hover:bg-white/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="glass p-2 rounded-full hover:bg-white/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="glass p-2 rounded-full hover:bg-white/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">{t.footer.links}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-gray-400 hover:text-[var(--color-sand)] transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="#packages" className="text-gray-400 hover:text-[var(--color-sand)] transition-colors">
                  {t.nav.packages}
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-gray-400 hover:text-[var(--color-sand)] transition-colors">
                  {t.nav.testimonials}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">{t.footer.services}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Paket Wisata Bromo</li>
              <li>Paket Wisata Ijen</li>
              <li>Sewa Mobil + Driver</li>
              <li>Private Tour</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>+62 851-5505-8577</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>info@hengkyytrip.com</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Jawa Timur, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} HengkyyTrip. {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
