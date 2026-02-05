import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ControlsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const mobileSvgRef = useRef<SVGSVGElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const badge = badgeRef.current;
    const svg = svgRef.current;
    const mobileSvg = mobileSvgRef.current;
    const circles = circlesRef.current;

    if (!section || !badge) return;

    const isMobile = window.innerWidth < 768;

    // On mobile, ensure mobileSvg exists before proceeding
    if (isMobile && !mobileSvg) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: isMobile ? '+=150%' : '+=150%',
          pin: true,
          scrub: 0.8,
        },
      });

      if (isMobile) {
        // ========================================
        // MOBILE ANIMATION SEQUENCE - WOW EFFECT
        // ========================================

        // Phase 1: DRAMATIC ENTRANCE (0% - 20%)
        // Badge appears with elastic bounce from scale 0
        tl.fromTo(badge,
          { scale: 0, opacity: 0, rotation: -15 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.25,
            ease: 'back.out(2)' // Elastic overshoot effect
          }
        )

        // Phase 2: CIRCLES EXPLOSION (10% - 30%)
        // Decorative circles expand outward in sequence
        if (circles && circles.children.length > 0) {
          tl.fromTo(circles.children,
            { scale: 0, opacity: 0, rotation: -45 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.3,
              stagger: 0.06, // Sequential appearance
              ease: 'power2.out'
            },
            '-=0.15' // Overlap with badge entrance
          );
        }

        tl

        // Phase 3: SVG LINES DRAWING (20% - 50%)
        // Geometric lines draw in from edges
        const mobileSvgElements = mobileSvg?.querySelectorAll('path, line, circle, rect');
        if (mobileSvgElements && mobileSvgElements.length > 0) {
          tl.fromTo(mobileSvgElements,
            { strokeDashoffset: 500, opacity: 0 },
            {
              strokeDashoffset: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.025, // Smooth sequential draw
              ease: 'power1.inOut'
            },
            '-=0.15'
          );
        }

        tl

        // Phase 4: MICRO-BOUNCE ON COMPLETE (50% - 55%)
        // Badge reacts when lines complete drawing
        .to(badge,
          {
            scale: 1.08,
            duration: 0.08,
            ease: 'power2.out',
            yoyo: true, // Bounce up then back
            repeat: 1
          },
          '-=0.1'
        )

        // Phase 5: ALIVE持続 ANIMATION (55% - 85%)
        // Badge stays visible with continuous subtle animations
        .to(badge,
          {
            y: -8, // Floating up
            scale: 1.02, // Slight pulse
            rotation: 2, // Gentle tilt
            duration: 0.3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 1 // Float up, then down
          }
        )

        // Circles orbital rotation during hold phase
        if (circles && circles.children.length > 0) {
          tl.to(circles.children,
            {
              rotation: 360, // Full rotation
              duration: 0.4,
              ease: 'none', // Linear rotation
              stagger: {
                each: 0.1,
                from: 'start'
              }
            },
            '<' // Start with badge float
          );
        }

        tl

        // Phase 6: FINAL PULSE (85% - 90%)
        // One last attention-grabbing pulse
        .to(badge,
          {
            scale: 1.06,
            duration: 0.08,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 1
          }
        )

        // Phase 7: ELEGANT EXIT (90% - 100%)
        // Everything scales out smoothly
        const exitElements: (HTMLDivElement | SVGSVGElement)[] = [badge];
        if (circles) exitElements.push(circles);
        if (mobileSvg) exitElements.push(mobileSvg);

        tl.to(exitElements,
          {
            scale: 0.85,
            opacity: 0,
            rotation: 5,
            duration: 0.25,
            ease: 'power2.in'
          },
          '+=0.1'
        );

        // ========================================
        // CONTINUOUS BACKGROUND ANIMATIONS (Mobile)
        // Run independently of scroll timeline
        // ========================================

        // Subtle continuous breathing effect on badge
        gsap.to(badge, {
          scale: 1.015,
          duration: 1.8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1, // Infinite loop
          paused: false
        });

        // Gentle rotation oscillation
        gsap.to(badge, {
          rotation: 1.5,
          duration: 2.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        });

      } else {
        // ========================================
        // DESKTOP ANIMATION - ORIGINAL PRESERVED
        // ========================================

        // Badge slides in from right
        tl.fromTo(badge,
          { x: 200, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
        )

        // SVG elements draw in with stagger
        .fromTo(svg?.querySelectorAll('path, line, circle, rect, ellipse') || [],
          { strokeDashoffset: 1000, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, duration: 0.6, stagger: 0.02 },
          '-=0.2'
        )

        // Slide out to left
        .to([badge, svg],
          { opacity: 0, x: -200, duration: 0.4 },
          '+=0.3'
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center"
    >
      {/* Desktop SVG Line Art */}
      <svg
        ref={svgRef}
        className="hidden md:block absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Left side - grid-like structure */}
        <rect x="100" y="200" width="300" height="400" stroke="white" strokeWidth="1" fill="none" strokeDasharray="1000" strokeDashoffset="1000" />
        <line x1="100" y1="300" x2="400" y2="300" stroke="white" strokeWidth="1" strokeDasharray="1000" strokeDashoffset="1000" />
        <line x1="100" y1="400" x2="400" y2="400" stroke="white" strokeWidth="1" strokeDasharray="1000" strokeDashoffset="1000" />
        <line x1="100" y1="500" x2="400" y2="500" stroke="white" strokeWidth="1" strokeDasharray="1000" strokeDashoffset="1000" />
        <line x1="200" y1="200" x2="200" y2="600" stroke="white" strokeWidth="1" strokeDasharray="1000" strokeDashoffset="1000" />
        <line x1="300" y1="200" x2="300" y2="600" stroke="white" strokeWidth="1" strokeDasharray="1000" strokeDashoffset="1000" />
        <path d="M0 300 Q100 300 150 250 Q200 200 200 100" stroke="white" strokeWidth="1" fill="none" strokeDasharray="1000" strokeDashoffset="1000" />
        <path d="M0 400 Q150 400 200 350 Q250 300 250 150" stroke="white" strokeWidth="1" fill="none" strokeDasharray="1000" strokeDashoffset="1000" />
        <path d="M1920 200 Q1700 200 1600 300 Q1500 400 1500 600" stroke="white" strokeWidth="1" fill="none" strokeDasharray="1000" strokeDashoffset="1000" />
        <path d="M1920 350 Q1750 350 1680 420 Q1610 490 1610 650" stroke="white" strokeWidth="1" fill="none" strokeDasharray="1000" strokeDashoffset="1000" />
        <path d="M1920 500 Q1800 500 1750 550 Q1700 600 1700 750" stroke="white" strokeWidth="1" fill="none" strokeDasharray="1000" strokeDashoffset="1000" />
        <circle cx="960" cy="540" r="6" fill="white" />
        <line x1="500" y1="540" x2="1420" y2="540" stroke="white" strokeWidth="1" strokeDasharray="1000" strokeDashoffset="1000" />
      </svg>

      {/* Mobile SVG Line Art - Simplified & Larger */}
      <svg
        ref={mobileSvgRef}
        className="md:hidden absolute inset-0 w-full h-full"
        viewBox="0 0 400 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Simplified geometric patterns - mobile friendly */}
        {/* Top curves */}
        <path d="M0 150 Q100 150 150 200 Q200 250 200 350" stroke="white" strokeWidth="2" fill="none" strokeDasharray="500" strokeDashoffset="500" />
        <path d="M400 150 Q300 150 250 200 Q200 250 200 350" stroke="white" strokeWidth="2" fill="none" strokeDasharray="500" strokeDashoffset="500" />

        {/* Bottom curves */}
        <path d="M0 650 Q100 650 150 600 Q200 550 200 450" stroke="white" strokeWidth="2" fill="none" strokeDasharray="500" strokeDashoffset="500" />
        <path d="M400 650 Q300 650 250 600 Q200 550 200 450" stroke="white" strokeWidth="2" fill="none" strokeDasharray="500" strokeDashoffset="500" />

        {/* Vertical lines */}
        <line x1="50" y1="200" x2="50" y2="600" stroke="white" strokeWidth="1.5" strokeDasharray="500" strokeDashoffset="500" />
        <line x1="350" y1="200" x2="350" y2="600" stroke="white" strokeWidth="1.5" strokeDasharray="500" strokeDashoffset="500" />

        {/* Horizontal lines */}
        <line x1="50" y1="350" x2="150" y2="350" stroke="white" strokeWidth="1.5" strokeDasharray="500" strokeDashoffset="500" />
        <line x1="250" y1="400" x2="350" y2="400" stroke="white" strokeWidth="1.5" strokeDasharray="500" strokeDashoffset="500" />

        {/* Center dot */}
        <circle cx="200" cy="400" r="4" fill="white" />
      </svg>

      {/* Decorative circles - Mobile only */}
      <div ref={circlesRef} className="md:hidden absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-16 h-16 rounded-full border-2 border-white/20" />
        <div className="absolute top-[25%] right-[15%] w-12 h-12 rounded-full border-2 border-white/30" />
        <div className="absolute bottom-[20%] left-[15%] w-14 h-14 rounded-full border-2 border-white/25" />
        <div className="absolute bottom-[25%] right-[10%] w-10 h-10 rounded-full border-2 border-white/20" />
      </div>

      {/* Badge - Responsive positioning and sizing */}
      <div
        ref={badgeRef}
        className="absolute z-10 md:right-[15%] md:top-[40%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0"
      >
        <div className="bg-white px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6 rounded-full shadow-2xl">
          <span className="text-black text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight">in fondo in fondo</span>
        </div>
      </div>
    </section>
  );
}
