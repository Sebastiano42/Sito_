import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ZoomSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const innerCircleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const circle = circleRef.current;
    const innerCircle = innerCircleRef.current;

    if (!section || !title || !circle || !innerCircle) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 0.8,
        },
      });

      // Title fades in
      tl.fromTo(title,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      // Small circle appears
      .fromTo(innerCircle,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out' }
      )
      // Zoom in dramatically
      .to(circle,
        { scale: 15, duration: 0.8, ease: 'power2.in' }
      )
      // Inner content reveals
      .to(innerCircle,
        { scale: 0.5, opacity: 0.5, duration: 0.3, ease: 'power2.out' },
        '-=0.4'
      )
      // Title fades during zoom
      .to(title,
        { opacity: 0, y: -100, duration: 0.4 },
        '-=0.6'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center noise-overlay"
      style={{ backgroundColor: '#c8cfe8' }}
    >
      {/* Title */}
      <div ref={titleRef} className="text-center mb-16 px-6 relative z-20">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-6xl md:text-8xl font-medium text-gray-900">8</span>
          <h2 className="text-4xl md:text-6xl font-medium text-gray-900 uppercase">
            Dettaglio
          </h2>
        </div>
        <p className="text-gray-700 text-sm md:text-base max-w-lg mx-auto mt-6">
          Le transizioni zoom creano continuità narrativa tra diverse visualizzazioni.
          L'attenzione dell'utente viene guidata attraverso i contenuti in modo naturale.
        </p>
      </div>

      {/* Zoom Circle Container */}
      <div
        ref={circleRef}
        className="relative w-32 h-32 md:w-48 md:h-48 rounded-full bg-gray-900 flex items-center justify-center"
      >
        <div
          ref={innerCircleRef}
          className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white"
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-gray-900/20" />
      <div className="absolute bottom-1/4 right-1/4 w-6 h-6 rounded-full bg-gray-900/20" />
    </section>
  );
}
