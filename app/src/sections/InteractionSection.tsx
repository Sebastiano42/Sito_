import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function InteractionSection() {
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
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
      .to(text,
        { y: -100, opacity: 0, duration: 0.5, ease: 'power2.in' },
        '+=0.5'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center"
    >
      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-6 h-6 bg-white rounded-full" />
      </div>

      <div ref={textRef} className="text-center px-6 z-10">
        <h2 className="text-[6vw] md:text-[5vw] lg:text-[4vw] font-medium text-white uppercase leading-[1.1] tracking-tight">
          Il design non è solo estetica. È guidare l'utente, creare connessioni e generare risultati
        </h2>
      </div>
    </section>
  );
}
