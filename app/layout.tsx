import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "HengkyyTrip - Sewa Mobil & Paket Wisata Premium",
  description: "Jelajahi keindahan Gunung Bromo dan Kawah Ijen dengan paket wisata eksklusif dan sewa mobil premium",
  icons: {
    icon: '/LogoFavicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
