# Motion Portfolio - Interactive Scrollytelling Website

> **A high-performance portfolio showcasing web design and motion design mastery**
> Inspired by [motion.zajno.com](https://motion.zajno.com)

---

## 🎯 Project Overview

An interactive scrollytelling portfolio that educates visitors about web design and motion design principles while showcasing case studies and generating leads through seamless contact integration.

**Domain:** seba.dev
**Tech Stack:** Next.js 14 + TypeScript + GSAP + Lenis + Tailwind CSS
**Phase:** MVP - Fedele Replica

---

## 📋 Project Structure

```
seba-motion/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout (Lenis wrapper)
│   ├── page.tsx             # Homepage (all sections)
│   ├── globals.css          # Global styles
│   └── api/contact/         # Contact form endpoint
├── components/              # React components
│   ├── Navigation.tsx       # Main navigation
│   ├── Hero.tsx            # Hero section
│   ├── sections/           # All page sections
│   ├── Contact.tsx         # Contact form
│   └── Footer.tsx          # Footer
├── lib/                    # Utilities & hooks
│   ├── gsap-setup.ts       # GSAP configuration
│   ├── animations.ts       # Reusable animations
│   └── hooks/              # Custom React hooks
├── public/                 # Static assets
└── Documentation files     # ANIMATION_LIBRARY, STACK_GUIDE, DESIGN_SYSTEM
```

---

## 🚀 Development Phases

### ✅ Phase 1: Foundation Setup
**Status:** 🔄 In Progress
**Goal:** Setup Next.js 14 with GSAP + Lenis foundation

- [ ] Create Next.js 14 project with TypeScript
- [ ] Install dependencies (GSAP, Lenis, Tailwind)
- [ ] Configure TypeScript + Tailwind + Prettier
- [ ] Setup folder structure
- [ ] Configure GSAP plugins (ScrollTrigger, MotionPath)
- [ ] Create GSAP setup utility
- [ ] Setup Lenis smooth scroll
- [ ] Create base layout with Lenis wrapper

**Deliverable:** Working Next.js foundation ready for animations

---

### Phase 2: Hero & Core Animations
**Status:** ⏳ Pending
**Goal:** Hero section with fade-in, smooth scroll, first ScrollTrigger example

- [ ] Create Hero component with fade-in + scale animation
- [ ] Add scroll hint animation (loop)
- [ ] Implement Lenis smooth scroll globally
- [ ] Test ScrollTrigger basic functionality
- [ ] Create reusable animation hooks

**Deliverable:** Animated Hero section with smooth scrolling

---

### Phase 3: Educational Sections
**Status:** ⏳ Pending
**Goal:** Web Design Principles (pinned) + Motion Design Mastery (parallax)

- [ ] Section 1: Pinned section with content swap (ScrollTrigger)
- [ ] Section 2: Parallax multi-layer background
- [ ] Batch animation for multiple elements
- [ ] Mobile-friendly animation fallbacks
- [ ] Test performance on scroll

**Deliverable:** Two educational sections with advanced scroll animations

---

### Phase 4: Case Studies Carousel
**Status:** ⏳ Pending
**Goal:** Horizontal scroll carousel with 3-4 case studies

- [ ] Create horizontal scroll carousel component
- [ ] Implement ScrollTrigger horizontal scroll
- [ ] Add case study cards with hover states
- [ ] Card lift + border accent on hover
- [ ] Add case study data (JSON)
- [ ] Optimize for mobile

**Deliverable:** Interactive case studies carousel

---

### Phase 5: Services & Interactive Demo
**Status:** ⏳ Pending
**Goal:** Services grid + mouse-driven interactive element

- [ ] Create services/expertise grid
- [ ] Add reveal animations on scroll
- [ ] Implement mouse-following element
- [ ] Create magnetic button effect
- [ ] SVG motion path animation
- [ ] Test interactivity on different devices

**Deliverable:** Services section + interactive demo

---

### Phase 6: Contact & Footer
**Status:** ⏳ Pending
**Goal:** Contact form + WhatsApp integration + footer

- [ ] Create contact form (React Hook Form + Zod)
- [ ] Add WhatsApp button integration
- [ ] Form validation + error handling
- [ ] Connect to Arura PHP backend endpoint
- [ ] Add social links in footer
- [ ] Test form submission flow

**Deliverable:** Working contact form with WhatsApp integration

---

### Phase 7: Polish & Optimization
**Status:** ⏳ Pending
**Goal:** Mobile optimization, performance tuning, accessibility

- [ ] Mobile-specific animation fallbacks
- [ ] Implement prefers-reduced-motion
- [ ] Optimize images (WebP + lazy loading)
- [ ] Code splitting for GSAP plugins
- [ ] ScrollTrigger.refresh() on resize
- [ ] Accessibility audit (WCAG AA)
- [ ] Lighthouse performance audit (target > 90)
- [ ] Fix any performance bottlenecks

**Deliverable:** Optimized, accessible, high-performance site

---

### Phase 8: Deployment
**Status:** ⏳ Pending
**Goal:** Deploy to Vercel + domain setup + backend testing

- [ ] Push code to GitHub repository
- [ ] Connect repository to Vercel
- [ ] Setup environment variables
- [ ] Configure domain seba.dev
- [ ] Upload PHP contact handler to Arura
- [ ] Test contact form on production
- [ ] Enable automatic deployments
- [ ] Final production testing

**Deliverable:** Live production site at seba.dev

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | Next.js 14+ (App Router) | React framework with SSR/SSG |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **Animation** | GSAP 3.12+ | Professional scroll animations |
| **Smooth Scroll** | Lenis | Premium smooth scrolling |
| **Forms** | React Hook Form + Zod | Form handling + validation |
| **Deployment** | Vercel | Frontend hosting |
| **Backend** | Arura PHP | Contact form handler |

---

## 🎨 Design System

### Colors
- **Primary:** #000000 (Black) - Main background
- **Secondary:** #FFFFFF (White) - Primary text
- **Accent:** #00FF00 (Neon Green) - Highlights, hover, CTA
- **Neutral:** #808080 (Gray) - Secondary text

### Typography
- **Headings:** Inter Tight / Space Grotesk (Bold, 700-900)
- **Body:** Inter (Regular, 400-500)
- **Sizing:** Responsive with CSS clamp()

### Spacing
- **Base Unit:** 8px grid system
- **Section Padding:** clamp(1.5rem, 5vw, 4rem) horizontal
- **Section Margin:** clamp(2rem, 8vh, 6rem) vertical

---

## 📊 Performance Targets

- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Lighthouse Score:** > 90 (all metrics)

---

## 🧪 Animation Patterns

### Hero Animations
- Fade-in + scale (1.5s, power2.out)
- Staggered text reveal
- Scroll hint loop animation

### ScrollTrigger Patterns
- Pinned sections with content swap
- Parallax multi-layer backgrounds
- Horizontal scroll carousel
- Batch reveal animations

### Micro-interactions
- Button hover (scale + color change)
- Card lift on hover
- Text underline animation
- Magnetic button effect

---

## 📚 Documentation

- **[ANIMATION_LIBRARY.md](ANIMATION_LIBRARY.md)** - Complete animation code reference
- **[STACK_GUIDE.md](STACK_GUIDE.md)** - Tech stack setup guide
- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** - Visual design guidelines
- **[PDR_Motion_Portfolio.json](PDR_Motion_Portfolio.json)** - Full project requirements

---

## 🚀 Quick Start

### Prerequisites
```bash
node --version  # Need 18+
npm --version
```

### Installation
```bash
# Create Next.js project
npx create-next-app@latest seba-motion \
  --typescript \
  --tailwind \
  --app \
  --eslint \
  --import-alias '@/*'

cd seba-motion

# Install dependencies
npm install gsap @gsap/react @studio-freight/lenis
npm install react-hook-form zod @hookform/resolvers
npm install -D prettier @typescript-eslint/eslint-plugin
```

### Development
```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint
npm run format       # Format with Prettier
```

---

## 🎯 Success Criteria

### Performance
- ✅ Lighthouse score > 90
- ✅ FCP < 1.5s, LCP < 2.5s
- ✅ Smooth 60fps animations

### Design
- ✅ Pixel-perfect implementation of design system
- ✅ Consistent spacing (8px grid)
- ✅ Sharp, modern aesthetic

### Functionality
- ✅ All scroll animations working perfectly
- ✅ Mobile experience equals desktop quality
- ✅ Contact form submitting successfully
- ✅ WhatsApp integration working

### Accessibility
- ✅ WCAG AA compliance
- ✅ prefers-reduced-motion support
- ✅ Keyboard navigation
- ✅ ARIA labels on interactive elements

---

## 🤝 Contributing

This is a personal portfolio project. Each phase will be developed iteratively with continuous testing and optimization.

**Development Workflow:**
1. Complete phase implementation
2. Test on desktop + mobile
3. Run Lighthouse audit
4. Fix issues before moving to next phase
5. Document changes and learnings

---

## 📝 Notes for Future Agents

### Critical Patterns to Follow
1. **Always use `useGSAP` hook** - Avoid dependency issues
2. **Lenis wrapper in layout.tsx** - Apply smooth scroll globally
3. **ScrollTrigger.refresh() on resize** - Essential for mobile
4. **Lazy load images** - Use next/image with loading='lazy'
5. **Conditional animations** - Simplify for mobile

### Common Pitfalls to Avoid
- ❌ Don't use GSAP without ScrollTrigger.refresh() on resize
- ❌ Don't animate layout properties (width, height) - use transform
- ❌ Don't lazy load hero images - impacts LCP
- ❌ Don't forget mobile fallbacks - desktop animations too heavy
- ❌ Don't use setTimeout/setInterval - use GSAP timeline

### Testing Checklist
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile (iOS + Android)
- [ ] Test with slow network (throttled)
- [ ] Test with prefers-reduced-motion enabled
- [ ] Run Lighthouse audit
- [ ] Check console for errors

---

## 📞 Contact & Support

**Developer:** Sebastiano Moniaci (s£ba)
**Domain:** seba.dev
**Project Type:** Motion Design Portfolio
**Status:** In Development

---

**Last Updated:** 2026-02-04
**Version:** 1.0.0-alpha
**Phase:** Foundation Setup
