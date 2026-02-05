import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TechniquesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const section = sectionRef.current;
    const badge1 = badge1Ref.current;
    const badge2 = badge2Ref.current;
    const badge3 = badge3Ref.current;
    const text = textRef.current;

    if (!section || !badge1 || !badge2 || !badge3 || !text) return;

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

      tl.fromTo(badge1,
        { x: -200, rotation: -20, opacity: 0 },
        { x: 0, rotation: -5, opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      .fromTo(badge2,
        { x: 200, rotation: 20, opacity: 0 },
        { x: 0, rotation: 5, opacity: 1, duration: 0.3, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(badge3,
        { y: 100, rotation: -10, opacity: 0 },
        { y: 0, rotation: -3, opacity: 1, duration: 0.3, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(text,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
        '-=0.1'
      )
      .to([badge1, badge2, badge3, text],
        { opacity: 0, y: -50, duration: 0.4 },
        '+=0.3'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Badges */}
      <div className="relative w-full max-w-4xl h-48 sm:h-56 md:h-64 mb-8 md:mb-12 px-4">
        <div
          ref={badge1Ref}
          className="absolute top-0 left-[5%] sm:left-[10%] lg:left-[20%]"
        >
          <div className="bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-full transform -rotate-6 transition-all duration-300 ease-out hover:bg-black hover:scale-105 group cursor-pointer">
            <span className="text-black text-lg sm:text-xl md:text-3xl font-medium transition-colors duration-300 group-hover:text-white">WEB DESIGN</span>
          </div>
        </div>

        <div
          ref={badge2Ref}
          className="absolute top-12 sm:top-16 right-[5%] sm:right-[10%] lg:right-[20%]"
        >
          <div className="bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-full transform rotate-6 transition-all duration-300 ease-out hover:bg-black hover:scale-105 group cursor-pointer">
            <span className="text-black text-lg sm:text-xl md:text-3xl font-medium transition-colors duration-300 group-hover:text-white">UI/UX DESIGN</span>
          </div>
        </div>

        <div
          ref={badge3Ref}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        >
          <div className="bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-full transform -rotate-3 transition-all duration-300 ease-out hover:bg-black hover:scale-105 group cursor-pointer">
            <span className="text-black text-lg sm:text-xl md:text-3xl font-medium transition-colors duration-300 group-hover:text-white">BRANDING</span>
          </div>
        </div>
      </div>

      {/* Description text */}
      <div ref={textRef} className="max-w-2xl px-6 text-center">
        <p className="text-white/70 text-sm md:text-base leading-relaxed">
          Offro servizi completi di design digitale: dalla creazione di siti web
          responsive al design di interfacce utente intuitive, fino allo sviluppo
          di identità visive che distinguono il tuo brand dalla concorrenza.
        </p>
      </div>

      {/* Decorative shapes */}
      <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full border border-white/10" />
      <div className="absolute top-20 right-20 w-16 h-16 rounded-full border border-white/10" />
    </section>
  );
}
