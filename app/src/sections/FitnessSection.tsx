import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FitnessSection() {
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
        {/* Browser Mockup */}
        <div className="w-full max-w-xl bg-white border border-black rounded-lg overflow-hidden shadow-2xl">
          {/* Browser Header */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 border-b border-black">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-black" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-black" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-black" />
          </div>

          {/* Website Content */}
          <div className="p-3 sm:p-4 md:p-6 relative">
            {/* Nav */}
            <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8">
              <span className="font-bold text-xs sm:text-sm tracking-wider">VITALFIT</span>
              <div className="hidden sm:flex gap-3 md:gap-6 text-[10px] md:text-xs">
                <span className="underline">HOME</span>
                <span className="text-gray-400">PIANI</span>
                <span className="text-gray-400 hidden md:inline">CHI SIAMO</span>
                <span className="text-gray-400 hidden md:inline">CONTATTI</span>
              </div>
              <button className="bg-black text-white text-[10px] sm:text-xs px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full whitespace-nowrap">
                Inizia ora
              </button>
            </div>

            {/* Hero Content */}
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <div className="flex-1">
                <h3 className="text-lg sm:text-2xl md:text-3xl font-medium leading-tight mb-2 sm:mb-3 md:mb-4">
                  TRASFORMA<br />
                  IL TUO<br />
                  STILE DI VITA
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed">
                  Raggiungi i tuoi obiettivi.<br />
                  Inizia il tuo percorso.
                </p>
              </div>

              {/* Bodybuilder Silhouette */}
              <div className="relative flex-shrink-0">
                <svg viewBox="0 0 200 250" className="w-24 h-32 sm:w-32 sm:h-40 md:w-48 md:h-60">
                  {/* Bodybuilder silhouette */}
                  <path
                    d="M100 20 C120 20 130 35 130 50 C130 60 125 70 115 75 C130 80 150 90 160 110 C170 130 165 150 155 170 C150 180 145 190 140 200 L140 250 L120 250 L120 210 L110 210 L110 250 L90 250 L90 210 L80 210 L80 250 L60 250 L60 200 C55 190 50 180 45 170 C35 150 30 130 40 110 C50 90 70 80 85 75 C75 70 70 60 70 50 C70 35 80 20 100 20Z"
                    fill="black"
                  />
                  {/* Arm flex */}
                  <ellipse cx="160" cy="100" rx="30" ry="20" fill="black" />
                </svg>

                {/* Stats Cards - Responsive sizes */}
                <div className="absolute top-2 sm:top-6 md:top-10 right-0 bg-black text-white p-1.5 sm:p-2 md:p-3 rounded-md sm:rounded-lg text-[8px] sm:text-[10px] md:text-xs">
                  <p className="text-gray-400">Daily</p>
                  <p className="font-bold">230bpm</p>
                  <div className="flex gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
                    <div className="w-0.5 sm:w-1 h-2 sm:h-3 md:h-4 bg-white rounded-full" />
                    <div className="w-0.5 sm:w-1 h-3 sm:h-4 md:h-5 bg-white rounded-full" />
                    <div className="w-0.5 sm:w-1 h-2 sm:h-2 md:h-3 bg-white rounded-full" />
                    <div className="w-0.5 sm:w-1 h-3 sm:h-5 md:h-6 bg-white rounded-full" />
                    <div className="w-0.5 sm:w-1 h-2 sm:h-3 md:h-4 bg-white rounded-full" />
                  </div>
                </div>

                <div className="absolute bottom-2 sm:bottom-6 md:bottom-10 left-0 bg-white border border-black p-1.5 sm:p-2 md:p-3 rounded-md sm:rounded-lg text-[8px] sm:text-[10px] md:text-xs">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-black rounded-full mb-1 sm:mb-2" />
                  <p className="text-gray-400">Heart</p>
                  <p className="font-bold">230bpm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="mt-4 sm:mt-6 md:mt-8 text-xs sm:text-sm text-black/70 text-center px-4">
          Design energico e dinamico per coinvolgere gli utenti fin dal primo impatto.
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
