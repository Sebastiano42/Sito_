import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OffsetSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const number = numberRef.current;
    const title = titleRef.current;
    const text = textRef.current;
    const menu = menuRef.current;
    const cards = cardsRef.current;
    const grid = gridRef.current;

    if (!section || !number || !title || !text || !menu || !cards || !grid) return;

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

      tl.fromTo(number,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      .fromTo(title,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(text,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
        '-=0.1'
      )
      .fromTo(menu.children,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.2, stagger: 0.15, ease: 'power2.out' },
        '-=0.1'
      )
      .fromTo(cards.children,
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.3, stagger: 0.12, ease: 'back.out(1.2)' },
        '-=0.2'
      )
      .fromTo(grid.children,
        { scale: 0, opacity: 0, rotation: -45 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.2, stagger: 0.08, ease: 'elastic.out(1, 0.5)' },
        '-=0.3'
      )
      .to([number, title, menu, text, cards, grid],
        { opacity: 0, y: -30, duration: 0.4 },
        '+=0.3'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center py-12"
      style={{ backgroundColor: '#c8cfe8' }}
    >
      {/* Title */}
      <div className="flex items-center gap-6 mb-6 px-6">
        <div ref={numberRef} className="text-6xl md:text-8xl font-medium text-gray-900">
          2
        </div>
        <div ref={titleRef}>
          <h2 className="text-4xl md:text-6xl font-medium text-gray-900 uppercase">
            Gerarchia
          </h2>
        </div>
      </div>

      {/* Description */}
      <div ref={textRef} className="max-w-lg px-6 text-center mb-8">
        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
          L'organizzazione visiva degli elementi guida l'utente attraverso l'interfaccia.
          Ogni elemento ha il suo posto e il suo momento, creando un percorso
          intuitivo e coinvolgente.
        </p>
      </div>

      {/* Menu items with stagger */}
      <div ref={menuRef} className="flex flex-wrap justify-center gap-4 mb-8 px-6">
        <div className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium">Home</div>
        <div className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium">About</div>
        <div className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium">Services</div>
        <div className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium">Portfolio</div>
        <div className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium">Contact</div>
      </div>

      {/* Card grid with stagger */}
      <div ref={cardsRef} className="flex flex-wrap justify-center gap-4 mb-8 px-6 max-w-2xl">
        <div className="w-32 h-32 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-900/10 flex items-center justify-center">
          <span className="text-3xl">🎨</span>
        </div>
        <div className="w-32 h-32 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-900/10 flex items-center justify-center">
          <span className="text-3xl">🚀</span>
        </div>
        <div className="w-32 h-32 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-900/10 flex items-center justify-center">
          <span className="text-3xl">💡</span>
        </div>
        <div className="w-32 h-32 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-900/10 flex items-center justify-center">
          <span className="text-3xl">⚡</span>
        </div>
      </div>

      {/* Grid with complex stagger */}
      <div ref={gridRef} className="grid grid-cols-6 gap-3 px-6">
        <div className="w-8 h-8 bg-gray-900 rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-900 rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-900 rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-900 rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-900 rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-900 rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-900 rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-900 rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-900 rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-900 rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-900 rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-900 rounded-lg"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full border border-gray-900/10" />
      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full border border-gray-900/10" />
      <div className="absolute top-1/3 right-20 w-4 h-4 bg-gray-900/20 rounded-full" />
    </section>
  );
}
