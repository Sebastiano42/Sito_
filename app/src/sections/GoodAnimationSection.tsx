import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GoodAnimationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const circle = circleRef.current;
    const line = lineRef.current;

    if (!section || !text || !circle || !line) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 0.8,
        },
      });

      // Phase 1: Elements enter (0% - 30%)
      tl.fromTo(line,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.3 },
        0
      );

      tl.fromTo(circle,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out' },
        0.1
      );

      tl.fromTo(text,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        0.1
      );

      // Phase 2: Stay visible (30% - 60%)
      // Nothing happens - content stays in place

      // Phase 3: Exit (60% - 100%)
      tl.to(text,
        { y: -80, opacity: 0, duration: 0.4, ease: 'power2.in' },
        0.6
      );

      tl.to(circle,
        { scale: 0.5, opacity: 0, duration: 0.3 },
        0.65
      );

      tl.to(line,
        { scaleX: 0, duration: 0.3 },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Horizontal Line */}
      <div 
        ref={lineRef}
        className="absolute top-1/2 left-0 right-0 h-px bg-white/30 origin-left"
      />

      {/* Center Circle with dot */}
      <div
        ref={circleRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/50 flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full" />
        </div>
      </div>

      {/* Main Text */}
      <div ref={textRef} className="text-center px-4 sm:px-6 z-20">
        <h2 className="text-[6vw] sm:text-[7vw] md:text-[5.5vw] lg:text-[4.5vw] font-medium text-white uppercase leading-[1.15] tracking-tight">
          IL DESIGN È COMUNICAZIONE
        </h2>
        <h2 className="text-[6vw] sm:text-[7vw] md:text-[5.5vw] lg:text-[4.5vw] font-medium text-white uppercase leading-[1.15] tracking-tight">
          OGNI PIXEL HA UNO SCOPO
        </h2>
        <h2 className="text-[6vw] sm:text-[7vw] md:text-[5.5vw] lg:text-[4.5vw] font-medium text-white uppercase leading-[1.15] tracking-tight">
          OGNI INTERAZIONE
        </h2>
        <h2 className="text-[6vw] sm:text-[7vw] md:text-[5.5vw] lg:text-[4.5vw] font-medium text-white uppercase leading-[1.15] tracking-tight">
          RACCONTA UNA STORIA
          <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-white rounded-full ml-2 sm:ml-3 align-middle" />
        </h2>
      </div>
    </section>
  );
}
