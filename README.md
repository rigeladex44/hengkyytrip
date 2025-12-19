# BromoTrip - Modern Travel Website

A modern, elegant, and immersive travel booking website built with Next.js 14+, featuring glassmorphism design and smooth animations.

![BromoTrip Homepage](https://github.com/user-attachments/assets/f1940c92-b3e6-4d9b-bd86-18f5c8b38360)

## 🚀 Features

- **Modern Tech Stack**: Next.js 14+ with App Router and Turbopack
- **Elegant Design**: Glassmorphism UI with volcanic orange/gold theme
- **Smooth Animations**: Framer Motion for scroll reveals and interactions
- **Tour Packages**: Browse and book Bromo and Ijen tour packages
- **Fleet Management**: View available vehicles for rental
- **WhatsApp Integration**: Direct booking through WhatsApp
- **Multi-language Ready**: Support for ID, EN, MS, and ZH (framework in place)
- **Fully Responsive**: Mobile-first design approach
- **Type-Safe**: Built with TypeScript

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: Custom components with [Shadcn/UI](https://ui.shadcn.com/) patterns
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Font**: Plus Jakarta Sans
- **Language**: TypeScript

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/rigeladex44/traveltrip.git
cd traveltrip
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
traveltrip/
├── app/
│   ├── api/                 # API routes
│   │   ├── fleet/          # Fleet data API
│   │   └── packages/       # Packages data API
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/
│   ├── ui/                 # Reusable UI components
│   │   └── button.tsx
│   ├── features.tsx        # Features section
│   ├── fleet.tsx           # Fleet section
│   ├── footer.tsx          # Footer
│   ├── hero.tsx            # Hero section
│   ├── navigation.tsx      # Navigation bar
│   ├── packages.tsx        # Packages section
│   ├── testimonials.tsx    # Testimonials section
│   └── whatsapp-button.tsx # WhatsApp floating button
├── lib/
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Utility functions
├── public/
│   ├── data/               # JSON data files
│   │   ├── fleet.json
│   │   ├── packages.json
│   │   └── globalConfig.json
│   └── LogoFavicon.png
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 Design System

### Colors
- **Primary**: Volcanic Orange (#FF6B35) & Gold (#F7931E)
- **Background**: Deep Charcoal (#1a1a1a) & Charcoal Light (#2d2d2d)
- **Accent**: Sage Green (#8B9D83)

### Key Features
- **Glassmorphism**: Frosted glass effect with blur
- **Text Gradient**: Volcanic orange to gold gradient
- **Glow Effects**: Button hover effects with shadow
- **Smooth Animations**: Scroll reveals and hover states

## 📝 Configuration

### WhatsApp Number
Update the WhatsApp number in the components:
- `components/packages.tsx`
- `components/fleet.tsx`
- `components/whatsapp-button.tsx`

Change `6285155058577` to your WhatsApp number.

### Data Management
Edit JSON files in `public/data/`:
- `packages.json` - Tour packages
- `fleet.json` - Vehicle fleet
- `globalConfig.json` - Global settings

## 🌍 Multi-language Support

The framework for multi-language support is in place with a language selector in the navigation. To fully implement:

1. Create translation files for each language
2. Use a library like `next-intl` or `i18next`
3. Update components to use translation keys

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean
- Railway

## 📊 Performance

- Fast page loads with Turbopack
- Optimized images (when using Next.js Image)
- Code splitting and lazy loading
- Static generation for optimal performance

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 📞 Contact

- **Phone**: +62 851-5505-8577
- **Email**: info@bromotrip.com
- **Location**: Jawa Timur, Indonesia

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS
- Framer Motion for smooth animations
- Lucide for beautiful icons
