import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    if (!section || !text) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 0.8,
        },
      });

      tl.fromTo(text,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
      .to(text,
        { x: 100, opacity: 0, duration: 0.5, ease: 'power2.in' },
        '+=0.5'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-black overflow-hidden flex items-center"
    >
      <div ref={textRef} className="px-6 lg:px-20 max-w-6xl">
        <h2 className="text-[6vw] md:text-[5vw] lg:text-[4vw] font-medium text-white uppercase leading-[1.1] tracking-tight">
          Ogni progetto racconta una storia. Il mio compito è tradurre la tua visione in un'esperienza digitale che conquisti il tuo pubblico
        </h2>
      </div>

      {/* Decorative dot */}
      <div className="absolute top-1/2 right-20 w-4 h-4 bg-white rounded-full" />
    </section>
  );
}
