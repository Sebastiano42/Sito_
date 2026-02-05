import { useEffect, useRef, useState, forwardRef, type ForwardedRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

gsap.registerPlugin(ScrollTrigger);

const heroSlides = [
  {
    id: 1,
    title: 'WEB',
    subtitle: 'DESIGNER',
    description: 'Creo esperienze digitali che combinano estetica e funzionalità, trasformando le tue idee in interfacce memorabili.',
  },
  {
    id: 2,
    title: 'CREATIVE',
    subtitle: 'SOLUTIONS',
    description: 'Ogni progetto è unico. Sviluppo soluzioni su misura che riflettono l\'identità del tuo brand e coinvolgono il tuo pubblico.',
  },
  {
    id: 3,
    title: 'DIGITAL',
    subtitle: 'EXPERIENCES',
    description: 'Dal concept al prodotto finale: design responsivo, interazioni fluide e attenzione ai dettagli per risultati eccellenti.',
  },
];

const HeroSection = forwardRef(function HeroSection(_props: {}, forwardedRef: ForwardedRef<HTMLDivElement>) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const graphicElement1Ref = useRef<HTMLDivElement>(null);
  const graphicElement2Ref = useRef<HTMLDivElement>(null);
  const graphicElement3Ref = useRef<HTMLDivElement>(null);
  const graphicElement4Ref = useRef<HTMLDivElement>(null);
  const graphicElement5Ref = useRef<HTMLDivElement>(null);
  const graphicElement6Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const splideRef = useRef<any>(null);
  const bgLayer1Ref = useRef<HTMLDivElement>(null);
  const bgLayer2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const graphic1 = graphicElement1Ref.current;
    const graphic2 = graphicElement2Ref.current;
    const graphic3 = graphicElement3Ref.current;
    const graphic4 = graphicElement4Ref.current;
    const graphic5 = graphicElement5Ref.current;
    const graphic6 = graphicElement6Ref.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const line = lineRef.current;
    const bottomText = bottomTextRef.current;

    if (!section || !graphic1 || !graphic2 || !graphic3 || !graphic4 || !title || !subtitle || !line || !bottomText) return;

    const ctx = gsap.context(() => {
      // Wait for App entrance animation to complete, then animate smoothly
      const baseDelay = 1.2; // Increased delay to avoid conflicts

      // Initial animation - graphic elements with smooth entrance (no elastic)
      gsap.fromTo(graphic1,
        { scale: 0, opacity: 0, x: -150, y: -150 },
        { scale: 1, opacity: 1, x: 0, y: 0, duration: 1.2, ease: 'back.out(1.2)', delay: baseDelay + 0.1 }
      );

      gsap.fromTo(graphic2,
        { scale: 0, opacity: 0, x: 150, y: -150 },
        { scale: 1, opacity: 1, x: 0, y: 0, duration: 1.2, ease: 'back.out(1.2)', delay: baseDelay + 0.2 }
      );

      gsap.fromTo(graphic3,
        { scale: 0, opacity: 0, x: -150, y: 150 },
        { scale: 1, opacity: 1, x: 0, y: 0, duration: 1.2, ease: 'back.out(1.2)', delay: baseDelay + 0.3 }
      );

      gsap.fromTo(graphic4,
        { scale: 0, opacity: 0, x: 150, y: 150 },
        { scale: 1, opacity: 1, x: 0, y: 0, duration: 1.2, ease: 'back.out(1.2)', delay: baseDelay + 0.4 }
      );

      // Elements 5 & 6 - subtle fade in
      if (graphic5) {
        gsap.fromTo(graphic5,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out', delay: baseDelay + 0.5 }
        );
      }

      if (graphic6) {
        gsap.fromTo(graphic6,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out', delay: baseDelay + 0.6 }
        );
      }

      // Line draws in - starts earlier, very subtle
      gsap.fromTo(line,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power2.out', delay: baseDelay - 0.2 }
      );

      // Text slides up - starts early for smooth appearance
      gsap.fromTo([title, subtitle],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: baseDelay, stagger: 0.1 }
      );

      // Bottom text fades in
      gsap.fromTo(bottomText,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: baseDelay + 0.3 }
      );

      // Scroll animation - elements stay visible longer
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Graphic elements fade out and scale down smoothly
      const allGraphics = [graphic1, graphic2, graphic3, graphic4];
      if (graphic5) allGraphics.push(graphic5);
      if (graphic6) allGraphics.push(graphic6);

      scrollTl.to(allGraphics,
        { scale: 0.2, opacity: 0, ease: 'power2.inOut', stagger: 0.03 },
        0.4
      );

      // Text slides out (50% - 80%)
      scrollTl.fromTo([title, subtitle],
        { y: 0, opacity: 1 },
        { y: '-30vh', opacity: 0, ease: 'power2.in' },
        0.5
      );

      // Line retracts (60% - 90%)
      scrollTl.fromTo(line,
        { scaleX: 1 },
        { scaleX: 0, ease: 'power2.in' },
        0.6
      );

      // Bottom text fades (70% - 100%)
      scrollTl.fromTo(bottomText,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -20, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  // Smooth text transition synchronized with slider
  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const bottomText = bottomTextRef.current;

    if (!title || !subtitle || !bottomText) return;

    // Very smooth cross-fade without movement
    const tl = gsap.timeline();

    tl.to([title, subtitle], {
      opacity: 0,
      duration: 0.4,
      ease: 'power1.inOut',
    })
    .to([title, subtitle], {
      opacity: 1,
      duration: 0.4,
      ease: 'power1.inOut',
    }, '+=0.1')
    .to(bottomText, {
      opacity: 0,
      duration: 0.3,
      ease: 'power1.inOut',
    }, 0)
    .to(bottomText, {
      opacity: 1,
      duration: 0.3,
      ease: 'power1.inOut',
    }, '+=0.15');
  }, [currentSlide]);

  // Mouse parallax effect for background and graphic elements (throttled)
  useEffect(() => {
    let ticking = false;
    let mouseX = 0;
    let mouseY = 0;

    const updateParallax = () => {
      const x = mouseX;
      const y = mouseY;

      // Batch all GSAP animations with overwrite to prevent conflicts
      const elements = [
        { ref: bgLayer1Ref, x: x * 15, y: y * 15, duration: 0.8 },
        { ref: bgLayer2Ref, x: x * 30, y: y * 30, duration: 0.8 },
        { ref: graphicElement1Ref, x: x * 25, y: y * 25, duration: 0.8 },
        { ref: graphicElement2Ref, x: -x * 30, y: -y * 30, duration: 1 },
        { ref: graphicElement3Ref, x: x * 20, y: -y * 20, duration: 0.9 },
        { ref: graphicElement4Ref, x: -x * 35, y: y * 35, duration: 1.1 },
        { ref: graphicElement5Ref, x: x * 15, y: y * 15, duration: 0.7 },
        { ref: graphicElement6Ref, x: -x * 20, y: -y * 20, duration: 0.9 },
      ];

      elements.forEach(({ ref, x, y, duration }) => {
        if (ref.current) {
          gsap.to(ref.current, {
            x,
            y,
            duration,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      });

      ticking = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const currentSlideData = heroSlides[currentSlide];

  // Combine refs
  const combinedRef = (node: HTMLDivElement | null) => {
    sectionRef.current = node;
    if (typeof forwardedRef === 'function') {
      forwardedRef(node);
    } else if (forwardedRef) {
      forwardedRef.current = node;
    }
  };

  return (
    <section
      ref={combinedRef}
      className="relative h-screen w-full bg-white overflow-hidden flex flex-col items-center justify-center noise-overlay"
    >
      {/* Background Parallax Elements - Hidden on mobile */}
      <div
        ref={bgLayer1Ref}
        className="hidden md:block absolute top-20 right-20 w-32 h-32 rounded-full border border-black/5"
        style={{ zIndex: 1 }}
      />
      <div
        ref={bgLayer2Ref}
        className="hidden md:block absolute bottom-32 left-32 w-24 h-24 rounded-full bg-black/3"
        style={{ zIndex: 1 }}
      />

      {/* Horizontal Line - very subtle, especially on mobile */}
      <div
        ref={lineRef}
        className="absolute top-1/2 left-0 right-0 h-px bg-black/10 md:bg-black/20 origin-left"
      />

      {/* Floating Graphic Elements - Clean & Minimal with WOW animations */}
      {/* Element 1: Simple circle - top left */}
      <div
        ref={graphicElement1Ref}
        className="hidden sm:block absolute top-[30%] left-[15%] z-10 group cursor-pointer transition-all duration-300 hover:scale-110"
      >
        <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="black"
            strokeWidth="1.5"
            opacity="0.3"
            className="group-hover:opacity-60 transition-opacity duration-300"
          />
          <circle cx="50" cy="5" r="3" fill="black" opacity="0.6" />
        </svg>
      </div>

      {/* Element 2: Minimal square - top right */}
      <div
        ref={graphicElement2Ref}
        className="hidden sm:block absolute top-[32%] right-[18%] z-10 group cursor-pointer transition-all duration-300 hover:scale-110"
      >
        <div className="w-14 h-14 md:w-16 md:h-16 rotate-45 border border-black/25 relative group-hover:border-black/50 transition-colors duration-300">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-black/40 rounded-full" />
        </div>
      </div>

      {/* Element 3: Cross/plus - bottom left */}
      <div
        ref={graphicElement3Ref}
        className="hidden sm:block absolute top-[62%] left-[22%] z-10 group cursor-pointer transition-all duration-500 hover:scale-110 hover:rotate-45"
      >
        <svg className="w-12 h-12 md:w-16 md:h-16" viewBox="0 0 100 100">
          <line
            x1="50" y1="20" x2="50" y2="80"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.35"
            className="group-hover:opacity-70 transition-opacity duration-300"
          />
          <line
            x1="20" y1="50" x2="80" y2="50"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.35"
            className="group-hover:opacity-70 transition-opacity duration-300"
          />
        </svg>
      </div>

      {/* Element 4: Triangle - bottom right */}
      <div
        ref={graphicElement4Ref}
        className="hidden sm:block absolute top-[60%] right-[16%] z-10 group cursor-pointer transition-all duration-300 hover:scale-110"
      >
        <svg className="w-14 h-14 md:w-18 md:h-18" viewBox="0 0 100 100">
          <polygon
            points="50,20 85,80 15,80"
            fill="none"
            stroke="black"
            strokeWidth="1.5"
            opacity="0.3"
            className="group-hover:opacity-60 transition-opacity duration-300"
          />
          <circle cx="50" cy="50" r="2" fill="black" opacity="0.4" />
        </svg>
      </div>

      {/* Element 5: Small dot - left side */}
      <div
        ref={graphicElement5Ref}
        className="hidden md:block absolute top-[46%] left-[10%] z-10 group cursor-pointer"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-black/30 group-hover:bg-black/60 group-hover:scale-[2] transition-all duration-300" />
      </div>

      {/* Element 6: Dashed circle - right side */}
      <div
        ref={graphicElement6Ref}
        className="hidden md:block absolute top-[48%] right-[10%] z-10 group cursor-pointer transition-all duration-300 hover:scale-110"
      >
        <svg className="w-14 h-14 md:w-16 md:h-16" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="black"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            opacity="0.25"
            className="group-hover:opacity-50 transition-opacity duration-300"
          />
        </svg>
      </div>

      {/* Dynamic Title Text */}
      <div ref={titleRef} className="relative z-20">
        <h1 className="text-[12vw] sm:text-[15vw] md:text-[12vw] lg:text-[10vw] font-medium tracking-tighter leading-none text-black flex items-center">
          {currentSlideData.title.split('').map((char, i) => (
            <span key={i} className={char === 'O' ? 'relative' : ''}>
              {char === 'O' ? (
                <>
                  <span className="text-transparent">O</span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-[8vw] h-[8vw] rounded-full border-4 border-black flex items-center justify-center">
                      <span className="w-3 h-3 bg-black rounded-full" />
                    </span>
                  </span>
                </>
              ) : char}
            </span>
          ))}
        </h1>
      </div>

      {/* Dynamic Subtitle Text */}
      <div ref={subtitleRef} className="relative z-0 mt-[-2vw]">
        <h1 className="text-[12vw] sm:text-[15vw] md:text-[12vw] lg:text-[10vw] font-medium tracking-tighter leading-none text-black">
          {currentSlideData.subtitle}
        </h1>
      </div>

      {/* Slider at bottom - Centered */}
      <div className="absolute bottom-20 sm:bottom-28 md:bottom-32 left-0 right-0 z-30 flex justify-center">
        <div className="w-full max-w-md px-4 sm:px-6">
          <Splide
            ref={splideRef}
            options={{
              type: 'loop',
              perPage: 3,
              perMove: 1,
              gap: '1.5rem',
              padding: { left: 0, right: 0 },
              focus: 'center',
              arrows: false,
              pagination: false,
              speed: 1000,
              easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
              autoplay: true,
              interval: 5000,
              pauseOnHover: true,
              pauseOnFocus: false,
              updateOnMove: true,
              trimSpace: false,
              drag: true,
              flickPower: 400,
              flickMaxPages: 1,
              breakpoints: {
                1024: {
                  perPage: 2,
                  gap: '1.25rem',
                  speed: 900,
                },
                640: {
                  perPage: 1,
                  gap: '1rem',
                  speed: 800,
                },
              },
            }}
            onMove={(splide: any) => {
              // Update immediately when slider starts moving for better sync
              setCurrentSlide(splide.index);
            }}
          >
            {heroSlides.map((slide, index) => (
              <SplideSlide key={slide.id}>
                <div
                  className="px-4 py-4 sm:py-5 cursor-pointer touch-manipulation"
                  onClick={() => {
                    if (splideRef.current?.splide) {
                      splideRef.current.splide.go(index);
                    }
                  }}
                >
                <div className={`text-sm sm:text-base md:text-lg font-medium transition-colors ${
                  currentSlide === index ? 'text-black' : 'text-black/60 active:text-black/80'
                }`}>
                  0{slide.id}
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
        </div>
      </div>

      {/* Bottom description text - dynamic, mobile optimized */}
      <div ref={bottomTextRef} className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-4 right-4 sm:left-6 sm:right-6 lg:left-10 lg:right-10">
        <p className="text-black/70 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed">
          {currentSlideData.description}
        </p>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
