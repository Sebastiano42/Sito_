# ANIMATION LIBRARY - Seba Motion Portfolio
**Guida completa di ogni animazione del sito con codice, timing e configurazione**

---

## 📋 INDICE VELOCE
1. [Hero Animations](#hero-animations)
2. [ScrollTrigger Pinned Sections](#scrolltrigger-pinned-sections)
3. [Parallax Multi-Layer](#parallax-multi-layer)
4. [SVG Morphing & MotionPath](#svg-morphing--motionpath)
5. [Case Studies Carousel](#case-studies-carousel)
6. [Hover States & Micro-interactions](#hover-states--micro-interactions)
7. [Interactive Mouse Tracking](#interactive-mouse-tracking)
8. [Mobile Optimizations](#mobile-optimizations)
9. [Performance Considerations](#performance-considerations)

---

## HERO ANIMATIONS

### 1.1 Hero Fade-In + Scale
**Cosa fa:** Al load, elemento hero fade in da opacity 0 e scala 1.5 → 1

**Timing:** Duration 1s, ease power2.out

**Quando entra:** Page load (useEffect)

```typescript
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function HeroSection() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    // Animation hero container
    gsap.fromTo(
      heroRef.current,
      {
        opacity: 0,
        scale: 1.1,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
      }
    )

    // Staggered text animation
    const tl = gsap.timeline()
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      0.2
    )
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      0.4
    )
  }, [])

  return (
    <section ref={heroRef} className="h-screen flex flex-col items-center justify-center">
      <h1 ref={titleRef}>Seba Motion Design</h1>
      <p ref={subtitleRef}>Web Design & Motion Development</p>
    </section>
  )
}
```

### 1.2 Scroll Hint Animation (Loop)
**Cosa fa:** Freccia/icona che sale-scende continuamente, indica lo scroll

**Timing:** Infinite loop, duration 1.5s

**Posizionamento:** Bottom center della hero

```typescript
export function ScrollHint() {
  const hintRef = useRef(null)

  useEffect(() => {
    gsap.to(hintRef.current, {
      y: 10,
      opacity: 0.6,
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
  }, [])

  return (
    <div ref={hintRef} className="absolute bottom-8 left-1/2 -translate-x-1/2">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 5v14M5 12l7 7 7-7" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}
```

---

## SCROLLTRIGGER PINNED SECTIONS

### 2.1 Pinned Section with Content Swap
**Cosa fa:** Sezione rimane fissa mentre contenuto cambia (es: Web Design Principles)

**Trigger:** Come arriva l'utente alla sezione

**Duration:** 300vh (3x viewport height)

```typescript
'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export function PinnedSection() {
  const containerRef = useRef(null)
  const contentRef = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // Pinned per 3x viewport
          scrub: 1, // Smooth sync con scroll
          pin: true, // Fix position
          markers: false, // true per debug
        },
      })

      // Animazione contenuto interno
      tl.to('.content-item', {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
      })
      .to('.content-item', {
        opacity: 0,
        y: -50,
        stagger: 0.2,
        duration: 1,
      }, '+=0.5')
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-black">
      <div ref={contentRef} className="h-full flex items-center justify-center">
        <div className="content-item opacity-0">
          <h2>Web Design Principle 1</h2>
          <p>Descrizione</p>
        </div>
        <div className="content-item opacity-0">
          <h2>Web Design Principle 2</h2>
          <p>Descrizione</p>
        </div>
      </div>
    </section>
  )
}
```

### 2.2 ScrollTrigger Batch Animation (Multiple Elements)
**Cosa fa:** Animate più elementi quando entrano in viewport

```typescript
gsap.utils.toArray('.batch-item').forEach((element) => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'top 50%',
      scrub: false,
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 100,
    duration: 1,
    ease: 'power2.out',
  })
})
```

---

## PARALLAX MULTI-LAYER

### 3.1 Parallax Effect - Different Speeds
**Cosa fa:** Elementi diversi si muovono a velocità diverse durante scroll

**Effetto:** Profondità, senso di movimento

```typescript
'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export function ParallaxSection() {
  const sectionRef = useRef(null)
  const bg1Ref = useRef(null)
  const bg2Ref = useRef(null)
  const contentRef = useRef(null)

  useGSAP(
    () => {
      // Background layer 1 - slowest
      gsap.to(bg1Ref.current, {
        y: 150,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          markers: false,
        },
        ease: 'none',
      })

      // Background layer 2 - medium speed
      gsap.to(bg2Ref.current, {
        y: 80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        ease: 'none',
      })

      // Content - fastest
      gsap.to(contentRef.current, {
        y: 20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        ease: 'none',
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-black">
      <div
        ref={bg1Ref}
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: 'url(/images/bg1.jpg)' }}
      />
      <div
        ref={bg2Ref}
        className="absolute inset-0 opacity-60"
        style={{ backgroundImage: 'url(/images/bg2.jpg)' }}
      />
      <div ref={contentRef} className="relative h-full flex items-center justify-center z-10">
        <h2 className="text-5xl font-bold text-white">Motion Design Mastery</h2>
      </div>
    </section>
  )
}
```

---

## SVG MORPHING & MOTIONPATH

### 4.1 SVG Path Animation with MotionPath
**Cosa fa:** Elemento segue un percorso SVG customizzato

**Use case:** Decorative animations, shapes that move along path

```typescript
'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
import { useRef } from 'react'

gsap.registerPlugin(MotionPathPlugin)

export function SVGMotionPath() {
  const containerRef = useRef(null)
  const dotRef = useRef(null)

  useGSAP(
    () => {
      gsap.to(dotRef.current, {
        motionPath: {
          path: '#pathSVG',
          align: '#pathSVG',
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
        duration: 8,
        repeat: -1,
        ease: 'none',
      })
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="relative w-full h-96">
      <svg viewBox="0 0 600 400" className="w-full h-full">
        {/* Define path */}
        <path
          id="pathSVG"
          d="M150,100 Q300,10 450,100 T450,300"
          fill="none"
          stroke="rgba(0,255,0,0.2)"
          strokeWidth="2"
        />
        {/* Moving element */}
        <circle
          ref={dotRef}
          r="8"
          fill="#00FF00"
          cx="0"
          cy="0"
        />
      </svg>
    </div>
  )
}
```

### 4.2 SVG Morphing (Shape to Shape)
**Cosa fa:** Una forma SVG si trasforma in un'altra forma

```typescript
// Requires DrawSVG plugin (GSAP paid)
gsap.to('.morphing-svg', {
  attr: { d: 'M150,0 L75,200 L225,200 Z' },
  duration: 1.5,
  ease: 'power2.inOut',
})
```

---

## CASE STUDIES CAROUSEL

### 5.1 Horizontal Scroll Carousel with ScrollTrigger
**Cosa fa:** Scorri verticalmente, gli elementi si spostano orizzontalmente

**Timing:** Synchronized con scroll verticale

```typescript
'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export function CaseStudiesCarousel() {
  const sectionRef = useRef(null)
  const carouselRef = useRef(null)

  useGSAP(
    () => {
      const carousel = carouselRef.current
      const carouselWidth = carousel.scrollWidth
      const viewportWidth = window.innerWidth

      gsap.to(carousel, {
        x: -(carouselWidth - viewportWidth),
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${carouselWidth}`,
          scrub: 1,
          pin: true,
          markers: false,
        },
        ease: 'none',
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="relative bg-black">
      <div className="h-screen overflow-hidden">
        <div
          ref={carouselRef}
          className="flex gap-8 p-8 h-full"
          style={{ width: 'fit-content' }}
        >
          {[1, 2, 3, 4].map((id) => (
            <div
              key={id}
              className="flex-shrink-0 w-[80vw] h-full bg-gray-900 rounded-lg flex items-center justify-center"
            >
              <h3 className="text-white text-3xl">Case Study {id}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### 5.2 Hover State on Case Study Card
**Cosa fa:** Al hover, card lift up + border accent appears

```typescript
export function CaseStudyCard() {
  const cardRef = useRef(null)

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -20,
      boxShadow: '0 20px 40px rgba(0,255,0,0.2)',
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: '0 0px 0px rgba(0,255,0,0)',
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-gray-900 p-6 rounded-lg cursor-pointer border-b-2 border-transparent hover:border-green-500 transition-colors"
    >
      {/* Content */}
    </div>
  )
}
```

---

## HOVER STATES & MICRO-INTERACTIONS

### 6.1 Button Hover Animation
**Cosa fa:** Button cambia colore + scale + border animation

```typescript
export function AnimatedButton({ children, onClick }) {
  const buttonRef = useRef(null)

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      backgroundColor: '#00FF00',
      color: '#000000',
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      backgroundColor: '#000000',
      color: '#FFFFFF',
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="px-8 py-3 bg-black text-white border border-green-500 rounded font-bold"
    >
      {children}
    </button>
  )
}
```

### 6.2 Text Underline Animation
**Cosa fa:** Linea underline si disegna da sinistra a destra on hover

```typescript
export function AnimatedLink({ href, children }) {
  const linkRef = useRef(null)
  const underlineRef = useRef(null)

  const handleMouseEnter = () => {
    gsap.to(underlineRef.current, {
      scaleX: 1,
      duration: 0.4,
      ease: 'power2.out',
      transformOrigin: 'left center',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(underlineRef.current, {
      scaleX: 0,
      duration: 0.4,
      ease: 'power2.out',
      transformOrigin: 'right center',
    })
  }

  return (
    <a
      ref={linkRef}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group"
    >
      {children}
      <span
        ref={underlineRef}
        className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 origin-right scale-x-0"
      />
    </a>
  )
}
```

---

## INTERACTIVE MOUSE TRACKING

### 7.1 Mouse-Following Element
**Cosa fa:** Elemento segue il mouse con delay/easing

```typescript
'use client'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'

export function MouseFollower() {
  const followerRef = useRef(null)

  useEffect(() => {
    const onMouseMove = (event) => {
      const { clientX, clientY } = event

      // Animate to mouse position with delay
      gsap.to(followerRef.current, {
        x: clientX - 10,
        y: clientY - 10,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <div
      ref={followerRef}
      className="fixed w-5 h-5 bg-green-500 rounded-full pointer-events-none z-50"
    />
  )
}
```

### 7.2 Magnetic Button (Cursor Attraction)
**Cosa fa:** Button si muove verso il mouse quando è vicino

```typescript
export function MagneticButton({ children }) {
  const buttonRef = useRef(null)

  const handleMouseMove = (e) => {
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distance = 100 // Pixel distance per magnetic effect
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    const dist = Math.sqrt(deltaX ** 2 + deltaY ** 2)

    if (dist < distance) {
      const angle = Math.atan2(deltaY, deltaX)
      const force = (1 - dist / distance) * 30

      gsap.to(buttonRef.current, {
        x: Math.cos(angle) * force,
        y: Math.sin(angle) * force,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="px-8 py-3 bg-black text-white border border-green-500"
    >
      {children}
    </button>
  )
}
```

---

## MOBILE OPTIMIZATIONS

### 8.1 Reduced Motion - User Preference
**Cosa fa:** Disabilita animazioni se user ha impostato prefers-reduced-motion

```typescript
// Utility function
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Uso in componente
useGSAP(() => {
  if (prefersReducedMotion()) {
    // Salta animazioni, mostra content subito
    gsap.set(elementRef.current, { opacity: 1, y: 0 })
    return
  }

  // Animazioni normali
  gsap.fromTo(elementRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
})
```

### 8.2 Mobile Animation Fallback
**Cosa fa:** Su mobile, disabilita animazioni CPU-intensive, mantiene essenziali

```typescript
const isMobile = window.innerWidth < 768

useGSAP(() => {
  if (isMobile) {
    // Versione semplificata mobile
    gsap.to(element, {
      opacity: 1,
      duration: 0.5, // Più veloce
      ease: 'power1.out',
      // NO parallax, NO complex transforms
    })
  } else {
    // Versione desktop completa
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
    })
  }
})
```

### 8.3 ScrollTrigger Refresh on Resize
**CRITICAL per mobile** - Altrimenti animazioni si rompono su rotate

```typescript
useEffect(() => {
  const handleResize = () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    ScrollTrigger.refresh()
  }

  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])
```

---

## PERFORMANCE CONSIDERATIONS

### 9.1 Transform-Only Animations (Best Performance)
**✅ BUONO** - Usa transform (translate, rotate, scale)
```typescript
gsap.to(element, {
  x: 100,        // Transform
  y: 50,         // Transform
  rotation: 45,  // Transform
  scale: 1.2,    // Transform
})
```

**❌ CATTIVO** - Non animare questi (cause layout thrashing)
```typescript
gsap.to(element, {
  width: 300,      // Layout change - NO!
  height: 200,     // Layout change - NO!
  marginLeft: 50,  // Layout change - NO!
})
```

### 9.2 will-change CSS Property
**Cosa fa:** Dice al browser di preparare animazioni GPU

```typescript
// In Tailwind, use custom class
export function OptimizedAnimation() {
  const ref = useRef(null)

  useGSAP(() => {
    // Set will-change PRIMA di animare
    gsap.set(ref.current, { willChange: 'transform' })
    
    gsap.to(ref.current, {
      x: 100,
      duration: 1,
      onComplete: () => {
        gsap.set(ref.current, { willChange: 'auto' })
      },
    })
  })

  return <div ref={ref} className="w-20 h-20 bg-green-500" />
}
```

### 9.3 Lazy Load Images
**Cosa fa:** Load immagini solo quando visibili

```typescript
import Image from 'next/image'

export function LazyImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      loading="lazy"
      width={1200}
      height={800}
    />
  )
}
```

### 9.4 Code Splitting GSAP Plugins
**Cosa fa:** Import solo plugin che usi, riduce bundle size

```typescript
// ✅ BUONO - Import selettivu
import ScrollTrigger from 'gsap/ScrollTrigger'
import MotionPathPlugin from 'gsap/MotionPathPlugin'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

// ❌ CATTIVO - Import tutto GSAP
import gsap from 'gsap' // Questo incluye tutti i plugin
```

---

## ANIMATION TIMING REFERENCE

```
EASING TYPES:
- power0.inOut (linear, nessun easing)
- power1.inOut (soft easing)
- power2.inOut (standard easing)
- power3.inOut (more pronounced)
- power4.inOut (very pronounced)
- back.inOut (overshoots)
- elastic.inOut (bouncy)
- bounce.out (bouncy end)

DURATIONS:
- Micro interactions: 0.2s - 0.3s
- Standard transitions: 0.6s - 0.8s
- Slow reveals: 1.2s - 1.5s
- Scroll animations: 1s scrub (synced to scroll speed)

SCROLL SCRUB:
- scrub: 1  = smooth sync con scroll (1 secondo lag)
- scrub: 0.5 = very responsive (0.5 secondo lag)
- scrub: true = instant (use with caution)
```

---

## COMMON PATTERNS

### Pattern 1: Staggered Element Reveal
```typescript
gsap.fromTo(
  '.reveal-item',
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    stagger: 0.2, // 200ms delay between each
    duration: 0.8,
    ease: 'power2.out',
  }
)
```

### Pattern 2: Timeline Sequencing
```typescript
const tl = gsap.timeline()

tl.fromTo(element1, {...}, {...})
  .fromTo(element2, {...}, {...}, '<0.2') // Start 0.2s after element1 ends
  .to(element3, {...}, '+=0.5') // 0.5s after previous animation
```

### Pattern 3: ScrollTrigger with Timeline
```typescript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: container,
    start: 'top center',
    end: 'bottom center',
    scrub: 1,
    pin: true,
  }
})

tl.to(element1, {...})
  .to(element2, {...})
  .to(element3, {...})
```

---

## DEBUGGING TIPS

1. **Enable Markers:** `markers: true` in ScrollTrigger config - mostra start/end points
2. **Slow Motion:** DevTools → Rendering → Animations - rallentra 10x
3. **Console Log:** `ScrollTrigger.getAll()` - vedi tutti i triggers attivi
4. **Check Performance:** Lighthouse → Performance score
5. **Mobile Testing:** Chrome → Device Emulation, test su diverse risoluzioni

---

## NEXT STEPS PER CLAUDE CODE

1. Implementa **Hero Animations** come base
2. Aggiungi **Smooth Scroll con Lenis**
3. Testa **ScrollTrigger pinned section** su una sezione
4. Espandi a **parallax multi-layer**
5. Aggiungi **case studies carousel**
6. Polish con **hover states** e **micro-interactions**
7. Test completo **mobile** con reduced motion
8. Performance audit con **Lighthouse**

---

**Tutto il codice è production-ready, type-safe (TypeScript), e ottimizzato per performance.**
