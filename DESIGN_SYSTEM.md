# DESIGN SYSTEM - Seba Motion Portfolio
**Guida visiva completa per mantenere consistenza estetica**

---

## 📋 QUICK REFERENCE

| Elemento | Valore | Note |
|----------|--------|------|
| **Palette Primaria** | #000000 (Black) | Sfondo principale |
| **Palette Secondaria** | #FFFFFF (White) | Testo primario |
| **Accent Color** | #00FF00 (Neon Green) | Highlights, hover, CTA |
| **Neutral Gray** | #808080 | Testo secondario, dividers |
| **Headings Font** | Inter Tight / Space Grotesk | Bold, geometric, modern |
| **Body Font** | Inter | Clean, leggibile, moderno |
| **Border Radius** | 0px | Sharp corners (Zajno style) |
| **Spacing Base** | 8px grid system | Multiples: 8, 16, 24, 32, 48, 64 |

---

## COLOR PALETTE

### Primary Colors

#### Black - #000000 (RGB: 0, 0, 0)
- **Usage:** Background principale, text dark
- **Accessibility:** Massimo contrasto con bianco
- **Variants:**
  - Pure Black: #000000
  - Almost Black: #0A0A0A
  - Charcoal: #1A1A1A

```css
/* Tailwind config */
colors: {
  black: '#000000',
  'black-dark': '#0A0A0A',
  'black-light': '#1A1A1A',
}
```

#### White - #FFFFFF (RGB: 255, 255, 255)
- **Usage:** Testo primario, card backgrounds, highlights
- **Accessibility:** Massimo contrasto con nero
- **Variants:**
  - Pure White: #FFFFFF
  - Off-White: #F8F8F8
  - Light Gray: #F0F0F0

```css
colors: {
  white: '#FFFFFF',
  'white-off': '#F8F8F8',
  'white-light': '#F0F0F0',
}
```

#### Neon Green - #00FF00 (RGB: 0, 255, 0)
- **Usage:** Accent, hover states, borders, CTA buttons
- **Accessibility:** Evita su nero per testo piccolo - troppo aggressivo
- **Variants:**
  - Bright Green: #00FF00
  - Green Fade (20% opacity): rgba(0, 255, 0, 0.2)
  - Green Fade (10% opacity): rgba(0, 255, 0, 0.1)

```css
colors: {
  green: {
    500: '#00FF00',
    'fade-20': 'rgba(0, 255, 0, 0.2)',
    'fade-10': 'rgba(0, 255, 0, 0.1)',
  }
}
```

### Neutral Colors

#### Grays
```
#F8F8F8 - White space, very light bg
#F0F0F0 - Light backgrounds
#E0E0E0 - Subtle dividers, borders
#808080 - Neutral text (secondary)
#404040 - Dark text (lower contrast)
#1A1A1A - Almost black, dark sections
```

### Color Usage Guide

| Component | Background | Text | Border | Hover |
|-----------|-----------|------|--------|-------|
| **Button Primary** | #000000 | #FFFFFF | #00FF00 | #00FF00 bg |
| **Button Secondary** | transparent | #000000 | #000000 | #000000 bg |
| **Card** | #FFFFFF | #000000 | #E0E0E0 | border #00FF00 |
| **Hero Section** | #000000 | #FFFFFF | - | #00FF00 accent |
| **Input Field** | #F8F8F8 | #000000 | #E0E0E0 | border #00FF00 |
| **Link** | transparent | #000000 | #000000 | underline #00FF00 |

---

## TYPOGRAPHY

### Font Stack

#### Headings: Inter Tight / Space Grotesk
```css
font-family: 'Inter Tight', 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
font-weight: 700-900; /* Bold weights only */
letter-spacing: -0.02em; /* Tight spacing per impact */
line-height: 1.1; /* Tight line height */
```

**Rationale:** Modern, geometric, bold. Zajno usa font sans-serif con weight molto alto per visual impact.

#### Body: Inter
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
font-weight: 400-500;
letter-spacing: 0;
line-height: 1.6; /* Comfortable reading */
```

**Why Inter:** Highly legible, modern, purpose-built for screens.

### Font Sizes & Scaling

**Responsive Typography using CSS clamp()** - automatically scales between breakpoints

```css
/* H1 - Main Headline */
h1 {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 900;
  line-height: 1.1;
}

/* H2 - Section Headings */
h2 {
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 800;
  line-height: 1.15;
}

/* H3 - Subsections */
h3 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.2;
}

/* Body Text */
p {
  font-size: clamp(1rem, 2vw, 1.125rem);
  font-weight: 400;
  line-height: 1.6;
}

/* Small Text */
small {
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  font-weight: 400;
}

/* Caption */
.caption {
  font-size: clamp(0.75rem, 1vw, 0.875rem);
  font-weight: 400;
  color: #808080;
}
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
export default {
  theme: {
    fontFamily: {
      sans: [
        'Inter',
        'Inter Tight',
        'Space Grotesk',
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
      // Using clamp for responsive sizing
      xs: 'clamp(0.75rem, 1vw, 0.875rem)',
      sm: 'clamp(0.875rem, 1.5vw, 1rem)',
      base: 'clamp(1rem, 2vw, 1.125rem)',
      lg: 'clamp(1.125rem, 2.5vw, 1.25rem)',
      xl: 'clamp(1.25rem, 3vw, 1.5rem)',
      '2xl': 'clamp(1.5rem, 4vw, 2.5rem)',
      '3xl': 'clamp(2rem, 6vw, 3.5rem)',
      '4xl': 'clamp(2.5rem, 8vw, 5rem)',
    },
  },
}
```

### Text Styles Reference

#### Hero Headline
```
Size: clamp(2.5rem, 8vw, 5rem)
Weight: 900
Family: Inter Tight
Spacing: -0.02em
Line Height: 1.1
Color: #FFFFFF
```

#### Section Heading
```
Size: clamp(2rem, 6vw, 3.5rem)
Weight: 800
Family: Inter Tight
Spacing: -0.02em
Line Height: 1.15
Color: #000000 (on white) / #FFFFFF (on black)
```

#### Body Copy
```
Size: clamp(1rem, 2vw, 1.125rem)
Weight: 400
Family: Inter
Line Height: 1.6
Color: #808080 (secondary) / #000000 (primary)
Max-width: 65 characters (optimal reading)
```

#### Interactive Text (Links)
```
Size: inherit
Weight: 400
Decoration: underline
Color: #000000
Hover: underline #00FF00
```

---

## SPACING SYSTEM

### Base Unit: 8px Grid

```
0px = 0
4px = 0.5 units
8px = 1 unit
12px = 1.5 units
16px = 2 units
24px = 3 units
32px = 4 units
48px = 6 units
64px = 8 units
96px = 12 units
128px = 16 units
```

### Tailwind Spacing Config

```typescript
export default {
  theme: {
    spacing: {
      0: '0px',
      1: '0.25rem',      // 4px
      2: '0.5rem',       // 8px
      3: '0.75rem',      // 12px
      4: '1rem',         // 16px
      6: '1.5rem',       // 24px
      8: '2rem',         // 32px
      12: '3rem',        // 48px
      16: '4rem',        // 64px
      24: '6rem',        // 96px
      32: '8rem',        // 128px
    },
  },
}
```

### Section Spacing

```css
/* Horizontal padding - responsive */
section {
  padding-left: clamp(1.5rem, 5vw, 4rem);
  padding-right: clamp(1.5rem, 5vw, 4rem);
}

/* Vertical spacing between sections */
section {
  padding-top: clamp(2rem, 8vh, 6rem);
  padding-bottom: clamp(2rem, 8vh, 6rem);
}

/* Grid gap */
.grid {
  gap: clamp(1rem, 3vw, 2rem);
}

/* Component internal spacing */
.button {
  padding: clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem);
}
```

---

## BORDERS & SHADOWS

### Border Radius
```
0px - Sharp corners (PRIMARY - Zajno style)
4px - Subtle rounding (inputs, small cards)
8px - Moderate rounding (medium components)
12px - Rounded (larger elements)
9999px - Fully rounded (badges, pills)
```

**Design Decision:** Utilizziamo principalmente **0px** per mantenere lo stile sharp e moderno di Zajno.

### Borders

```css
/* Primary border */
border: 2px solid #000000;

/* Accent border (on hover) */
border-bottom: 2px solid #00FF00;

/* Subtle divider */
border: 1px solid #E0E0E0;

/* Interactive focus */
outline: 2px solid #00FF00;
outline-offset: 2px;
```

### Shadows

**Principle:** Minimal shadows, prefer flat design

```css
/* Subtle shadow - used sparingly */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

/* Card hover - accent glow */
box-shadow: 0 20px 40px rgba(0, 255, 0, 0.2);

/* Text shadow - rare, only for legibility on images */
text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
```

---

## BUTTON STYLES

### Primary Button
```
Background: #000000
Text: #FFFFFF
Border: 2px solid #00FF00
Padding: clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem)
Border-radius: 0px
Font-weight: 700
Transition: all 0.3s power2.out

Hover State:
  Background: #00FF00
  Text: #000000
  Box-shadow: 0 10px 20px rgba(0, 255, 0, 0.3)

Active State:
  Transform: scale(0.95)

Focus State:
  Outline: 2px solid #00FF00
  Outline-offset: 4px
```

```jsx
<button className="
  bg-black text-white
  border-2 border-green-500
  px-6 py-3 md:px-8 md:py-4
  font-bold
  rounded-none
  transition-all duration-300 ease-out
  hover:bg-green-500 hover:text-black hover:shadow-lg
  active:scale-95
  focus:outline-2 focus:outline-green-500 focus:outline-offset-4
">
  Click me
</button>
```

### Secondary Button
```
Background: transparent
Text: #000000
Border: 2px solid #000000
Padding: clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem)
Border-radius: 0px
Font-weight: 700

Hover State:
  Background: #000000
  Text: #FFFFFF
  Border-color: #000000

Active State:
  Transform: scale(0.95)
```

### CTA Button (Contact Form)
```
Same as Primary Button, but:
  Animation: Pulse on hover (scale 1.05)
  Font-size: clamp(1rem, 2vw, 1.125rem)
  Width: full on mobile, auto on desktop
```

---

## CARD STYLES

### Standard Card
```
Background: #FFFFFF
Border: 1px solid #E0E0E0
Border-bottom: 2px solid transparent
Padding: clamp(1.5rem, 3vw, 2rem)
Border-radius: 0px
Box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05)
Transition: all 0.3s ease-out

Hover State:
  Border-bottom: 2px solid #00FF00
  Box-shadow: 0 20px 40px rgba(0, 255, 0, 0.2)
  Transform: translateY(-4px)
```

### Case Study Card
```
Same as Standard, but:
  Min-width: 80vw (on carousel)
  Aspect-ratio: 1 / 1 (square on mobile, var on desktop)
  Image: full-width, object-cover
  Overlay: dark gradient on hover (reveal text)
```

### Project Card (Services)
```
Background: transparent
Border: 2px solid #000000
Padding: clamp(1.5rem, 3vw, 2rem)
Border-radius: 0px
Text-align: center

Hover State:
  Background: #000000
  Text: #FFFFFF
  Border-color: #00FF00
```

---

## INPUT FIELDS & FORMS

### Text Input
```
Background: #F8F8F8
Border: 2px solid #E0E0E0
Border-radius: 0px
Padding: 12px 16px
Font-family: Inter
Font-size: clamp(1rem, 2vw, 1.125rem)
Color: #000000
Placeholder-color: #808080

Focus State:
  Background: #FFFFFF
  Border-color: #00FF00
  Outline: none
  Box-shadow: 0 0 0 3px rgba(0, 255, 0, 0.1)

Disabled State:
  Background: #E0E0E0
  Color: #808080
  Cursor: not-allowed
```

```jsx
<input
  type="text"
  className="
    w-full
    bg-gray-50 text-black
    border-2 border-gray-200
    px-4 py-3
    rounded-none
    text-base
    placeholder-gray-500
    transition-all duration-300
    focus:bg-white focus:border-green-500 focus:shadow-lg focus:outline-none
    disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed
  "
  placeholder="Your message"
/>
```

### Textarea
```
Same as input, but:
  Min-height: 120px
  Resize: vertical only
  Font-family: monospace (optional)
```

### Form Labels
```
Font-size: clamp(0.875rem, 1.5vw, 1rem)
Font-weight: 600
Color: #000000
Margin-bottom: 8px
Uppercase: optional (for accent)
Letter-spacing: 0.05em
```

---

## DIVIDERS & SEPARATORS

### Line Divider
```css
border-top: 1px solid #E0E0E0;
margin: 2rem 0;
```

### Accent Divider
```css
border-top: 2px solid #00FF00;
margin: 2rem 0;
opacity: 0.3;
```

### Spacer
```css
height: clamp(2rem, 8vh, 4rem);
```

---

## VISUAL GRID

### Mobile (< 768px)
```
1 column
Padding: 1.5rem horizontal
Gap: 1rem
Full-width cards
```

### Tablet (768px - 1024px)
```
2 columns
Padding: 2rem horizontal
Gap: 1.5rem
Cards adjust to fit
```

### Desktop (> 1024px)
```
3-4 columns
Padding: 4rem horizontal
Gap: 2rem
Fixed card widths
```

---

## ANIMATION TIMING & EASING

### Durations
```
Fast: 0.2s - 0.3s (micro-interactions)
Standard: 0.6s - 0.8s (normal transitions)
Slow: 1.2s - 1.5s (reveal, entrance)
Scroll: scrub: 1 (synced to scroll)
```

### Easing Functions
```
power0.out = Linear (no easing)
power2.out = Standard smooth
power3.out = Pronounced smooth
power4.out = Very smooth
back.out = Overshoot slightly
elastic.out = Bouncy
```

**Default:** `power2.out` for most animations

---

## ACCESSIBILITY REQUIREMENTS

### Color Contrast
```
WCAG AA minimum: 4.5:1
Recommended: 7:1

Black on White: ✅ 21:1 (excellent)
Black on Neon Green: ⚠️  1.2:1 (fail - don't use for text)
White on Black: ✅ 21:1 (excellent)
Gray #808080 on White: ✅ 4.5:1 (adequate)
```

### Font Sizing
```
Minimum: 16px (mobile)
Body: 18px - 20px (optimal)
Headings: 24px - 48px (scaled)
Small text (captions): 12px - 14px
```

### Focus Indicators
```
Outline: 2px solid #00FF00
Outline-offset: 4px
Visible on all interactive elements
Never hidden or set to outline: none
```

### Motion
```
Respect prefers-reduced-motion
No auto-play animations
No infinite loops without pause option
Animation duration: max 5 seconds
```

---

## RESPONSIVE BREAKPOINTS

```typescript
// Tailwind breakpoints
export default {
  theme: {
    screens: {
      'xs': '320px',   // Small phones
      'sm': '640px',   // Phones
      'md': '768px',   // Tablets
      'lg': '1024px',  // Small laptops
      'xl': '1280px',  // Laptops
      '2xl': '1536px', // Large screens
    },
  },
}
```

**Mobile-First Approach:** Progetta per mobile, espandi per desktop

---

## DARK MODE CONSIDERATIONS

**Atual:** Non abbiamo dark mode (bianco/nero semplice)

**Future Phase 2:** Se aggiungiamo dark mode:
```css
/* Light mode (current) */
:root {
  --bg-primary: #FFFFFF;
  --text-primary: #000000;
  --accent: #00FF00;
}

/* Dark mode (future) */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #000000;
    --text-primary: #FFFFFF;
    --accent: #00FF00;
  }
}
```

---

## USAGE EXAMPLES

### Hero Section
```jsx
<section className="h-screen w-full bg-black flex items-center justify-center">
  <div className="text-center px-6">
    <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl text-white leading-tight">
      Seba Motion Design
    </h1>
    <p className="text-gray-400 text-lg mt-6">
      Web Design & Motion Development
    </p>
  </div>
</section>
```

### Card Section
```jsx
<div className="bg-white border-2 border-gray-200 border-b-4 border-b-green-500 p-6 rounded-none hover:shadow-lg transition-all">
  <h3 className="font-heading font-bold text-2xl text-black">Case Study</h3>
  <p className="text-gray-600 mt-2">Description of work</p>
</div>
```

### Interactive Button
```jsx
<button className="
  bg-black text-white
  border-2 border-green-500
  px-8 py-3
  font-bold
  transition-all duration-300
  hover:bg-green-500 hover:text-black hover:shadow-lg
  active:scale-95
">
  Get Started
</button>
```

---

## DESIGN TOKENS (CSS Variables)

```css
:root {
  /* Colors */
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-green: #00FF00;
  --color-gray-dark: #1A1A1A;
  --color-gray: #808080;
  --color-gray-light: #E0E0E0;

  /* Typography */
  --font-heading: 'Inter Tight', 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-size-base: clamp(1rem, 2vw, 1.125rem);
  --line-height-tight: 1.1;
  --line-height-normal: 1.6;

  /* Spacing */
  --spacing-unit: 8px;
  --padding-x: clamp(1.5rem, 5vw, 4rem);
  --padding-y: clamp(2rem, 8vh, 6rem);

  /* Timing */
  --duration-fast: 0.3s;
  --duration-normal: 0.6s;
  --duration-slow: 1.2s;
  --easing-standard: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## FINAL CHECKLIST

- ✅ Color palette applied consistently
- ✅ Typography scaled responsively
- ✅ Spacing maintains 8px grid
- ✅ Buttons have clear hover states
- ✅ Cards have visual hierarchy
- ✅ Focus indicators visible
- ✅ Contrast ratios WCAG AA
- ✅ Mobile-first design
- ✅ Animations respect prefers-reduced-motion
- ✅ No magic numbers - use tokens

---

**Design System Version:** 1.0
**Last Updated:** 2026-02-04
**Status:** Production Ready
