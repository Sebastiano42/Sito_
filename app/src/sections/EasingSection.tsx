import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EasingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const curvesRef = useRef<HTMLDivElement>(null);
  const demosRef = useRef<HTMLDivElement>(null);

  const handleNavigation = (direction: 'prev' | 'next') => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const allSections = Array.from(document.querySelectorAll('section'));
    const currentIndex = allSections.indexOf(currentSection);

    const targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    const targetSection = allSections[targetIndex];

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const curves = curvesRef.current;
    const demos = demosRef.current;

    if (!section || !title || !curves || !demos) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 0.8,
        },
      });

      tl.fromTo(title,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      .fromTo(curves.children,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(demos,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
        '-=0.2'
      )
      .to([title, curves, demos],
        { opacity: 0, y: -50, duration: 0.4 },
        '+=0.5'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center py-8 md:py-12"
      style={{ backgroundColor: '#c8cfe8' }}
    >
      {/* Header */}
      <div ref={titleRef} className="text-center mb-6 md:mb-12 px-6">
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-3 md:mb-4">
          <span className="text-5xl md:text-8xl font-medium text-gray-900">1</span>
          <h2 className="text-xl md:text-4xl font-medium text-gray-900 uppercase text-left">
            Fluidità<br />e Movimento
          </h2>
        </div>
        <p className="text-gray-700 text-xs md:text-base max-w-lg mx-auto">
          Le animazioni fluide guidano l'occhio dell'utente e rendono l'esperienza
          più naturale. Ogni transizione è studiata per comunicare in modo efficace.
        </p>
      </div>

      {/* Easing curves */}
      <div ref={curvesRef} className="flex flex-wrap justify-center gap-3 md:gap-8 px-6">
        {/* Linear */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border border-gray-900/20 flex items-center justify-center bg-white/30">
            <svg width="60" height="60" viewBox="0 0 80 80" className="overflow-visible md:w-20 md:h-20">
              <line x1="10" y1="70" x2="70" y2="10" stroke="black" strokeWidth="2" />
              <circle cx="10" cy="70" r="4" fill="black" />
              <circle cx="70" cy="10" r="4" fill="black" />
              <text x="75" y="75" fontSize="8" fill="black">t</text>
            </svg>
          </div>
          <span className="mt-2 text-xs md:text-sm font-medium text-gray-900 underline">Linear</span>
        </div>

        {/* Ease */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border border-gray-900/20 flex items-center justify-center bg-white/30">
            <svg width="60" height="60" viewBox="0 0 80 80" className="overflow-visible md:w-20 md:h-20">
              <path d="M10 70 Q40 70 70 10" stroke="black" strokeWidth="2" fill="none" />
              <circle cx="10" cy="70" r="4" fill="black" />
              <circle cx="70" cy="10" r="4" fill="black" />
              <text x="75" y="75" fontSize="8" fill="black">t</text>
            </svg>
          </div>
          <span className="mt-2 text-xs md:text-sm font-medium text-gray-900 underline">Ease</span>
        </div>

        {/* Ease-in */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border border-gray-900/20 flex items-center justify-center bg-white/30">
            <svg width="60" height="60" viewBox="0 0 80 80" className="overflow-visible md:w-20 md:h-20">
              <path d="M10 70 Q20 70 70 10" stroke="black" strokeWidth="2" fill="none" />
              <circle cx="10" cy="70" r="4" fill="black" />
              <circle cx="70" cy="10" r="4" fill="black" />
              <text x="75" y="75" fontSize="8" fill="black">t</text>
            </svg>
          </div>
          <span className="mt-2 text-xs md:text-sm font-medium text-gray-900 underline">Ease-in</span>
        </div>

        {/* Ease-out */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border border-gray-900/20 flex items-center justify-center bg-white/30">
            <svg width="60" height="60" viewBox="0 0 80 80" className="overflow-visible md:w-20 md:h-20">
              <path d="M10 70 Q60 10 70 10" stroke="black" strokeWidth="2" fill="none" />
              <circle cx="10" cy="70" r="4" fill="black" />
              <circle cx="70" cy="10" r="4" fill="black" />
              <text x="75" y="75" fontSize="8" fill="black">t</text>
            </svg>
          </div>
          <span className="mt-2 text-xs md:text-sm font-medium text-gray-900 underline">Ease-out</span>
        </div>

        {/* Cubic (Ease-in-out) */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border border-gray-900/20 flex items-center justify-center bg-white/30">
            <svg width="60" height="60" viewBox="0 0 80 80" className="overflow-visible md:w-20 md:h-20">
              <path d="M10 70 C20 70, 30 50, 40 40 C50 30, 60 10, 70 10" stroke="black" strokeWidth="2" fill="none" />
              <circle cx="10" cy="70" r="4" fill="black" />
              <circle cx="70" cy="10" r="4" fill="black" />
              <text x="75" y="75" fontSize="8" fill="black">t</text>
            </svg>
          </div>
          <span className="mt-2 text-xs md:text-sm font-medium text-gray-900 underline">Cubic</span>
        </div>
      </div>

      {/* Interactive Demos */}
      <div ref={demosRef} className="mt-6 md:mt-12 max-w-3xl px-6 w-full">
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gray-900/10">
          <h3 className="text-base md:text-lg font-medium text-gray-900 mb-3 md:mb-4 text-center">
            Il Movimento in Azione
          </h3>
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
            {/* Demo 1: Button Hover */}
            <div className="text-center">
              <p className="text-[10px] md:text-xs text-gray-600 mb-2">Button Hover</p>
              <button className="px-3 py-2 md:px-6 md:py-3 bg-gray-900 text-white text-xs md:text-sm rounded-full hover:scale-110 transition-transform duration-300 ease-out">
                Hover
              </button>
            </div>

            {/* Demo 2: Modal Open */}
            <div className="text-center">
              <p className="text-[10px] md:text-xs text-gray-600 mb-2">Modal</p>
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-gray-900 rounded-lg animate-[scale-in_1s_ease-in-out_infinite]" />
            </div>

            {/* Demo 3: Slide In */}
            <div className="text-center">
              <p className="text-[10px] md:text-xs text-gray-600 mb-2">Slide</p>
              <div className="w-12 h-3 md:w-16 md:h-4 bg-gray-900 rounded-full animate-[slide_2s_cubic-bezier(0.65,0,0.35,1)_infinite]" />
            </div>
          </div>

          {/* Case Study Links */}
          <div className="border-t border-gray-900/10 pt-3 md:pt-4">
            <p className="text-[10px] md:text-xs text-gray-600 mb-2 md:mb-3 text-center">Approfondisci:</p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              <a
                href="https://easings.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] md:text-xs px-3 py-1.5 md:px-4 md:py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors"
              >
                Easings.net
              </a>
              <a
                href="https://cubic-bezier.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] md:text-xs px-3 py-1.5 md:px-4 md:py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors"
              >
                Cubic Bezier
              </a>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] md:text-xs px-3 py-1.5 md:px-4 md:py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors"
              >
                MDN Docs
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows - Funzionali */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <button
          onClick={() => handleNavigation('prev')}
          className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors hover:scale-110"
          aria-label="Previous section"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <button
          onClick={() => handleNavigation('next')}
          className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors hover:scale-110"
          aria-label="Next section"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
