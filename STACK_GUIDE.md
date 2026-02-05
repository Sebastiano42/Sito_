# STACK GUIDE - Seba Motion Portfolio
**Configurazione tecnica completa e step-by-step setup**

---

## 📦 TECHNOLOGY STACK OVERVIEW

```
Frontend Framework:   Next.js 14+ (App Router)
Language:             TypeScript
Styling:              Tailwind CSS + CSS Modules
Animation:            GSAP 3.12+ (ScrollTrigger, MotionPath)
Smooth Scroll:        Lenis (@studio-freight/lenis)
Forms:                React Hook Form + Zod
Package Manager:      pnpm (preferred) or npm
Runtime:              Node.js 18+
Deployment:           Vercel (frontend)
Backend:              Arura FTP (contact form PHP)
Version Control:      Git + GitHub
```

---

## 🚀 INSTALLATION GUIDE

### Prerequisites
```bash
# Check Node.js version (need 18+)
node --version

# Check npm version
npm --version

# Optional: Install pnpm (faster, recommended)
npm install -g pnpm
pnpm --version
```

### Step 1: Create Next.js Project

```bash
# Using create-next-app with TypeScript
npx create-next-app@latest seba-motion \
  --typescript \
  --tailwind \
  --app \
  --eslint \
  --no-git \
  --import-alias '@/*'

cd seba-motion
```

**This installs:**
- ✅ Next.js 14 with App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ ESLint

### Step 2: Install Animation Libraries

```bash
# GSAP (animation engine)
pnpm add gsap

# GSAP plugins (must be installed separately)
pnpm add gsap/ScrollTrigger
pnpm add gsap/MotionPathPlugin
pnpm add gsap/SplitText

# GSAP React helper
pnpm add @gsap/react

# Lenis (smooth scroll)
pnpm add @studio-freight/lenis

# Framer Motion (optional, for simple micro-interactions)
pnpm add framer-motion
```

### Step 3: Install Form & Validation Libraries

```bash
# Form handling
pnpm add react-hook-form

# Validation schema
pnpm add zod @hookform/resolvers

# Email sending (optional, for backend integration)
pnpm add resend
```

### Step 4: Install Dev Dependencies

```bash
pnpm add -D \
  typescript \
  @types/react \
  @types/node \
  tailwindcss \
  postcss \
  autoprefixer \
  eslint \
  eslint-config-next \
  prettier \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser
```

### Complete package.json

```json
{
  "name": "seba-motion",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write ."
  },
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "next": "^14.1.0",
    "gsap": "^3.12.2",
    "@gsap/react": "^2.1.1",
    "@studio-freight/lenis": "^1.0.37",
    "react-hook-form": "^7.51.0",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.4",
    "framer-motion": "^10.16.16"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/react": "^18.2.0",
    "@types/node": "^20.10.0",
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.1.0",
    "prettier": "^3.1.1",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "@typescript-eslint/parser": "^6.15.0"
  }
}
```

---

## 🛠️ PROJECT STRUCTURE

```
seba-motion/
├── app/
│   ├── layout.tsx              # Root layout (Lenis wrapper)
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles
│   └── api/
│       └── contact/
│           └── route.ts        # Contact form endpoint
├── components/
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── sections/
│   │   ├── WebDesignSection.tsx
│   │   ├── MotionDesignSection.tsx
│   │   ├── CaseStudiesSection.tsx
│   │   ├── ServicesSection.tsx
│   │   └── InteractiveSection.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── AnimatedButton.tsx
├── lib/
│   ├── gsap-setup.ts           # GSAP configuration
│   ├── animations.ts           # Reusable animation functions
│   ├── utils.ts
│   └── hooks/
│       ├── useGSAPAnimations.ts
│       ├── useLenis.ts
│       └── useScrollTrigger.ts
├── public/
│   ├── images/
│   ├── videos/
│   └── icons/
├── styles/
│   └── globals.css
├── .env.local                  # Environment variables
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── prettier.config.js
├── .eslintrc.json
└── package.json
```

---

## ⚙️ CONFIGURATION FILES

### next.config.ts

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Add your image hosting domains here
    ],
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-UA-Compatible',
            value: 'IE=edge',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ]
  },

  // Redirects for old URLs (if needed in phase 2)
  async redirects() {
    return []
  },
}

export default nextConfig
```

### tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        green: {
          500: '#00FF00',
          'fade-20': 'rgba(0, 255, 0, 0.2)',
          'fade-10': 'rgba(0, 255, 0, 0.1)',
        },
        gray: {
          50: '#F8F8F8',
          100: '#F0F0F0',
          200: '#E0E0E0',
          500: '#808080',
          900: '#1A1A1A',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        heading: [
          'Inter Tight',
          'Space Grotesk',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
      fontSize: {
        xs: 'clamp(0.75rem, 1vw, 0.875rem)',
        sm: 'clamp(0.875rem, 1.5vw, 1rem)',
        base: 'clamp(1rem, 2vw, 1.125rem)',
        lg: 'clamp(1.125rem, 2.5vw, 1.25rem)',
        xl: 'clamp(1.25rem, 3vw, 1.5rem)',
        '2xl': 'clamp(1.5rem, 4vw, 2.5rem)',
        '3xl': 'clamp(2rem, 6vw, 3.5rem)',
        '4xl': 'clamp(2.5rem, 8vw, 5rem)',
      },
      spacing: {
        'section-x': 'clamp(1.5rem, 5vw, 4rem)',
        'section-y': 'clamp(2rem, 8vh, 6rem)',
      },
      borderRadius: {
        none: '0px',
      },
    },
  },
  plugins: [],
}

export default config
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### prettier.config.js

```javascript
module.exports = {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'always',
  printWidth: 100,
  proseWrap: 'always',
}
```

### .eslintrc.json

```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "react/display-name": "off",
    "@next/next/no-html-link-for-pages": "off",
    "react-hooks/exhaustive-deps": "warn",
    "prefer-const": "warn"
  }
}
```

---

## 🔧 GSAP SETUP

### lib/gsap-setup.ts

```typescript
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
import SplitText from 'gsap/SplitText'

// Register plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, SplitText)

// Global GSAP defaults
gsap.defaults({
  ease: 'power2.out',
  duration: 0.6,
})

// ScrollTrigger defaults
ScrollTrigger.defaults({
  markers: false, // Set to true for debugging
  scrub: 1,
})

export { gsap, ScrollTrigger, MotionPathPlugin, SplitText }
```

### lib/hooks/useGSAPAnimations.ts

```typescript
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

interface UseGSAPAnimationOptions {
  scope?: React.RefObject<HTMLElement>
  dependencies?: any[]
  revertOnUnmount?: boolean
}

export function useGSAPAnimation(
  callback: () => void,
  options?: UseGSAPAnimationOptions
) {
  const scope = useRef<HTMLElement>(null)

  useGSAP(callback, {
    scope: options?.scope || scope,
    dependencies: options?.dependencies,
    revertOnUnmount: options?.revertOnUnmount ?? true,
  })

  return scope
}

// Helper for reduced motion preference
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Helper for mobile detection
export function isMobileDevice() {
  return window.innerWidth < 768
}
```

---

## 📋 ENVIRONMENT VARIABLES

### .env.local

```bash
# Contact form endpoint (backend)
NEXT_PUBLIC_CONTACT_ENDPOINT=https://seba.dev/api/contact.php

# WhatsApp integration
NEXT_PUBLIC_WHATSAPP_NUMBER=+39XXXXXXXXX

# Optional: Analytics
NEXT_PUBLIC_GA_ID=
```

---

## 🚢 DEPLOYMENT SETUP

### Vercel Deployment

**Prerequisites:**
- GitHub account
- Vercel account
- Domain registered (seba.dev)

**Steps:**

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/seba/seba-motion.git
git push -u origin main
```

2. **Connect to Vercel:**
- Go to vercel.com
- Click "New Project"
- Import GitHub repository
- Configure settings:
  - Framework: Next.js
  - Build Command: `next build`
  - Output Directory: `.next`
  - Environment Variables: Add from `.env.local`

3. **Setup Domain:**
- Go to Vercel Project Settings → Domains
- Add `seba.dev`
- Follow DNS configuration instructions
- Point domain nameserver to Vercel

4. **Enable Auto-Deployments:**
- Automatic deployment on every push to main
- Preview deployments for PR

### Backend: Arura PHP Setup

**Contact Form Handler:**

Create `/api/contact.php` on Arura server:

```php
<?php
// Enable CORS
header('Access-Control-Allow-Origin: https://seba.dev');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Process form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);

    // Validate input
    $name = sanitize($json['name'] ?? '');
    $email = sanitize($json['email'] ?? '');
    $message = sanitize($json['message'] ?? '');

    // Rate limiting (optional)
    $ip = $_SERVER['REMOTE_ADDR'];
    // Store attempts in cache/database

    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing fields']);
        exit;
    }

    // Send email
    $to = 'seba@seba.dev';
    $subject = "Nuovo messaggio da {$name}";
    $body = "Nome: {$name}\nEmail: {$email}\n\nMessaggio:\n{$message}";
    $headers = "From: {$email}\r\nReply-To: {$email}";

    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Email sent']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to send email']);
    }
    exit;
}

function sanitize($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}
?>
```

**Upload via FTP:**
- Use FileZilla or similar FTP client
- Connect to Arura SFTP
- Upload `contact.php` to `/public_html/api/`

---

## 🔐 SECURITY CHECKLIST

- ✅ HTTPS enabled (automatic on Vercel)
- ✅ Environment variables not exposed
- ✅ CORS configured properly
- ✅ Form input validated & sanitized
- ✅ Rate limiting on contact form
- ✅ No sensitive data in git
- ✅ .gitignore configured
- ✅ Headers security configured

### .gitignore

```
# Dependencies
node_modules/
.pnpm-store/

# Environment
.env.local
.env.*.local

# Build
.next/
out/
dist/

# IDE
.vscode/
.idea/
*.swp
*.swo
.DS_Store

# OS
Thumbs.db
desktop.ini
```

---

## 📊 PERFORMANCE OPTIMIZATION

### Image Optimization

```typescript
import Image from 'next/image'

export default function OptimizedImage() {
  return (
    <Image
      src="/images/hero.jpg"
      alt="Hero image"
      width={1200}
      height={800}
      priority={false} // Set to true only for hero images
      loading="lazy" // Default, but be explicit
      quality={75} // Balance quality/size
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
    />
  )
}
```

### Bundle Size Monitoring

```bash
# Check bundle size
pnpm build

# Analyze (using next/bundle-analyzer)
pnpm add -D @next/bundle-analyzer
```

### Performance Budget

- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Total Bundle Size:** < 500KB (gzipped)
- **Lighthouse Score:** > 90

---

## 📝 COMMON COMMANDS

```bash
# Development
pnpm dev              # Start dev server (localhost:3000)

# Building
pnpm build            # Production build
pnpm start            # Run production build locally

# Code quality
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier

# Type checking
pnpm tsc --noEmit     # TypeScript check

# All at once
pnpm build && pnpm lint && pnpm format
```

---

## 🐛 DEBUGGING TIPS

### Enable GSAP Markers
In `lib/gsap-setup.ts`, set `markers: true`:
```typescript
ScrollTrigger.defaults({
  markers: true, // Shows start/end points
})
```

### Chrome DevTools
1. Open DevTools (F12)
2. Go to Performance tab
3. Record animation, check FPS
4. Check Coverage tab for unused CSS/JS

### Lighthouse Audit
1. DevTools → Lighthouse tab
2. Run audit
3. Check performance score
4. Follow recommendations

---

## 📚 USEFUL RESOURCES

- **GSAP Docs:** https://gsap.com/docs/v3/
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs
- **React Docs:** https://react.dev

---

## ✅ SETUP COMPLETION CHECKLIST

- ✅ Node.js 18+ installed
- ✅ Create Next.js project
- ✅ Install dependencies (GSAP, Lenis, forms)
- ✅ Configure TypeScript, Tailwind, Prettier
- ✅ Setup folder structure
- ✅ Configure GSAP plugins
- ✅ Create environment variables
- ✅ Setup GitHub repository
- ✅ Connect Vercel
- ✅ Configure domain DNS
- ✅ Create Arura contact form endpoint
- ✅ Test locally (`pnpm dev`)
- ✅ Deploy to Vercel
- ✅ Run Lighthouse audit (target > 90)

**Stack is ready for Claude Code! 🚀**
