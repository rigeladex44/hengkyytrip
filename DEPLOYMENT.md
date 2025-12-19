# BromoTrip Deployment Guide

## Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/rigeladex44/traveltrip.git
cd traveltrip
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

Visit http://localhost:3000

### Production Build

```bash
npm run build
npm start
```

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

1. **Push to GitHub**
```bash
git push origin main
```

2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Vercel will auto-detect Next.js and configure everything

3. **Deploy**
- Click "Deploy"
- Your site will be live in minutes!

**Custom Domain**
- Go to Project Settings → Domains
- Add your custom domain
- Follow DNS configuration instructions

### Option 2: Netlify

1. **Build Settings**
```
Build command: npm run build
Publish directory: .next
```

2. **Deploy**
```bash
npm install netlify-cli -g
netlify deploy --prod
```

### Option 3: DigitalOcean App Platform

1. **Create App**
- Connect your GitHub repository
- Select branch
- Configure build settings:
  - Build Command: `npm run build`
  - Run Command: `npm start`

2. **Environment Variables**
- Add any required environment variables
- See `.env.example` for reference

### Option 4: AWS Amplify

1. **Connect Repository**
- Go to AWS Amplify Console
- Connect your GitHub repository

2. **Build Settings**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Option 5: Railway

1. **Create New Project**
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

2. **Configure**
- Add environment variables
- Set custom domain (optional)

### Option 6: Self-Hosted (VPS/Dedicated Server)

1. **Install Node.js on server**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. **Clone and build**
```bash
git clone https://github.com/rigeladex44/traveltrip.git
cd traveltrip
npm install
npm run build
```

3. **Use PM2 for process management**
```bash
npm install -g pm2
pm2 start npm --name "bromotrip" -- start
pm2 save
pm2 startup
```

4. **Setup Nginx as reverse proxy**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

5. **SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=6285155058577
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=BromoTrip
```

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test WhatsApp booking links
- [ ] Check mobile responsiveness
- [ ] Test language selector
- [ ] Verify all packages and fleet items display
- [ ] Test navigation and footer links
- [ ] Check contact information
- [ ] Verify favicon and metadata
- [ ] Test on multiple browsers
- [ ] Check page load speed
- [ ] Setup analytics (optional)
- [ ] Configure custom domain
- [ ] Setup SSL certificate

## Performance Optimization

### Images
- Use Next.js Image component for optimization
- Convert images to WebP format
- Implement lazy loading

### Caching
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
    ]
  },
}
```

### Analytics
Add Google Analytics:
```javascript
// app/layout.tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID" />
```

## Monitoring

### Error Tracking
Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Vercel Analytics (if using Vercel)

### Performance Monitoring
- Google PageSpeed Insights
- Lighthouse CI
- Web Vitals tracking

## Support

For issues or questions:
- Email: info@bromotrip.com
- Phone: +62 851-5505-8577

## Updates

To update the site after deployment:

```bash
git pull origin main
npm install
npm run build
pm2 restart bromotrip  # if using PM2
```

For Vercel/Netlify, just push to your repository - automatic deployments will handle the rest!
