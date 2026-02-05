import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GameSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    if (!section || !left || !right) return;

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

      tl.fromTo(left,
        { x: '-100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
      .fromTo(right,
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '<'
      )
      .to([left, right],
        { opacity: 0, duration: 0.5 },
        '+=0.5'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex flex-col md:flex-row"
    >
      {/* Left Side - White */}
      <div
        ref={leftRef}
        className="w-full md:w-1/2 h-1/2 md:h-full bg-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-6 md:py-0"
      >
        {/* Phone Mockup - Responsive sizes */}
        <div className="relative w-48 sm:w-56 md:w-64 h-[360px] sm:h-[420px] md:h-[500px] bg-white border-3 sm:border-4 border-black rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-28 md:w-32 h-4 sm:h-5 md:h-6 bg-black rounded-b-xl z-10" />

          {/* Screen Content */}
          <div className="h-full flex flex-col p-2 sm:p-3 md:p-4 pt-6 sm:pt-7 md:pt-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-2 sm:mb-3 md:mb-4">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-1.5 h-1.5 bg-white rounded-sm" />
                  <div className="w-1.5 h-1.5 bg-white rounded-sm" />
                  <div className="w-1.5 h-1.5 bg-white rounded-sm" />
                  <div className="w-1.5 h-1.5 bg-white rounded-sm" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold">EPIC QUEST</p>
                <p className="text-[8px] text-gray-400">avventura</p>
              </div>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </div>

            {/* Character */}
            <div className="flex-1 flex flex-col items-center justify-center">
              {/* Sparkles */}
              <div className="flex gap-2 mb-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="black">
                  <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
                </svg>
                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="black">
                  <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
                </svg>
              </div>

              {/* Paladin Character */}
              <svg viewBox="0 0 100 120" className="w-20 sm:w-24 md:w-32 h-28 sm:h-32 md:h-40">
                {/* Helmet */}
                <rect x="35" y="5" width="30" height="35" rx="5" stroke="black" strokeWidth="2" fill="none" />
                <line x1="40" y1="15" x2="60" y2="15" stroke="black" strokeWidth="1" />
                <line x1="40" y1="22" x2="60" y2="22" stroke="black" strokeWidth="1" />
                <line x1="40" y1="29" x2="60" y2="29" stroke="black" strokeWidth="1" />
                
                {/* Body */}
                <rect x="40" y="45" width="20" height="35" stroke="black" strokeWidth="2" fill="none" />
                
                {/* Shield */}
                <ellipse cx="30" cy="65" rx="10" ry="18" stroke="black" strokeWidth="2" fill="none" />
                
                {/* Sword */}
                <line x1="65" y1="50" x2="80" y2="85" stroke="black" strokeWidth="3" />
                <line x1="62" y1="80" x2="68" y2="86" stroke="black" strokeWidth="2" />
                
                {/* Legs */}
                <line x1="45" y1="80" x2="42" y2="110" stroke="black" strokeWidth="2" />
                <line x1="55" y1="80" x2="58" y2="110" stroke="black" strokeWidth="2" />
              </svg>

              {/* Sparkles */}
              <div className="flex gap-2 mt-2">
                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="black">
                  <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
                </svg>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="black">
                  <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
                </svg>
              </div>

              {/* Character Info */}
              <div className="text-center mt-2 sm:mt-3 md:mt-4">
                <p className="font-bold text-sm sm:text-base md:text-lg">Cavaliere</p>
                <p className="text-[10px] sm:text-xs text-gray-500">liv. 4 (7421 exp)</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full px-2 sm:px-3 md:px-4 mt-2 sm:mt-3 md:mt-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-3/5 bg-black rounded-full" />
                </div>
                <div className="flex justify-between text-[8px] text-gray-400 mt-1">
                  <span>5000 exp</span>
                  <span>12000 exp</span>
                </div>
              </div>

              {/* Button */}
              <button className="mt-2 sm:mt-3 md:mt-4 w-full mx-2 sm:mx-3 md:mx-4 bg-black text-white py-2 sm:py-2.5 md:py-3 rounded-full text-[10px] sm:text-xs font-medium flex items-center justify-center gap-1 sm:gap-2">
                <span className="text-yellow-400">&#10022;</span>
                SALI DI LIVELLO
                <span className="text-yellow-400">&#10022;</span>
              </button>

              {/* Icons */}
              <div className="flex justify-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="black" strokeWidth="2">
                    <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
                    <path d="M13 19l6-6" />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="black" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="black" strokeWidth="2">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="mt-4 sm:mt-6 md:mt-8 text-xs sm:text-sm text-black/70 text-center px-4">
          Interfacce mobile che catturano l'attenzione e migliorano l'engagement.
        </p>
      </div>

      {/* Right Side - Black */}
      <div
        ref={rightRef}
        className="w-full md:w-1/2 h-1/2 md:h-full bg-black flex items-center justify-center"
      >
        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full" />
      </div>
    </section>
  );
}
