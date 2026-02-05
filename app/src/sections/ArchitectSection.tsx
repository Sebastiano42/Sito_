import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ArchitectSection() {
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
      className="relative h-screen w-full overflow-hidden flex flex-col md:flex-row noise-overlay"
    >
      {/* Left Side - Black */}
      <div
        ref={leftRef}
        className="w-full md:w-1/2 h-1/2 md:h-full bg-black flex items-center justify-center order-2 md:order-1"
      >
        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full" />
      </div>

      {/* Right Side - White */}
      <div
        ref={rightRef}
        className="w-full md:w-1/2 h-1/2 md:h-full bg-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-6 md:py-0 order-1 md:order-2"
      >
        {/* Browser Mockup */}
        <div className="w-full max-w-2xl bg-white border border-black rounded-lg overflow-hidden shadow-2xl">
          {/* Browser Header */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 border-b border-black">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-black" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-black" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-black" />
          </div>

          {/* Website Content */}
          <div className="p-3 sm:p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Left Column */}
              <div>
                <p className="text-[10px] sm:text-xs mb-4 sm:mb-6 md:mb-8">spazio</p>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight mb-4 sm:mb-6 md:mb-8">
                  studio<br />creativo
                </h3>
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black mt-1 flex-shrink-0" />
                    <p className="text-[10px] sm:text-xs text-gray-600">
                      Progettiamo spazi che ispirano. Il nostro approccio unisce funzionalità e bellezza per creare ambienti unici.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black mt-1 rotate-45 flex-shrink-0" />
                    <p className="text-[10px] sm:text-xs text-gray-600">
                      il segreto dei nostri progetti di successo
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="relative">
                <p className="text-[10px] sm:text-xs text-gray-400 text-right mb-2 sm:mb-4">
                  via roma 15,<br />
                  milano<br />
                  italia
                </p>

                {/* Building Illustration */}
                <svg viewBox="0 0 300 200" className="w-full mt-2 sm:mt-4">
                  {/* Building */}
                  <rect x="50" y="80" width="200" height="120" stroke="black" strokeWidth="1" fill="none" />
                  
                  {/* Windows */}
                  <rect x="70" y="100" width="40" height="30" stroke="black" strokeWidth="1" fill="none" />
                  <line x1="90" y1="100" x2="90" y2="130" stroke="black" strokeWidth="0.5" />
                  <line x1="70" y1="115" x2="110" y2="115" stroke="black" strokeWidth="0.5" />
                  
                  <rect x="130" y="100" width="40" height="30" stroke="black" strokeWidth="1" fill="none" />
                  <rect x="190" y="100" width="40" height="30" stroke="black" strokeWidth="1" fill="none" />
                  
                  {/* Door */}
                  <rect x="130" y="160" width="40" height="40" stroke="black" strokeWidth="1" fill="none" />
                  
                  {/* Trees */}
                  <circle cx="40" cy="170" r="20" stroke="black" strokeWidth="1" fill="none" />
                  <circle cx="260" cy="170" r="20" stroke="black" strokeWidth="1" fill="none" />
                  
                  {/* Arrow Button */}
                  <circle cx="250" cy="60" r="25" fill="black" />
                  <path d="M245 55 L255 60 L245 65" stroke="white" strokeWidth="2" fill="none" />
                  <line x1="250" y1="60" x2="265" y2="60" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="mt-4 sm:mt-6 md:mt-8 text-xs sm:text-sm text-black/70 text-center max-w-md px-4">
          Design minimalista ed elegante che riflette professionalità e competenza.
        </p>
      </div>
    </section>
  );
}
