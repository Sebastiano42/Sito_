import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FadeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const number = numberRef.current;
    const boxes = boxesRef.current;

    if (!section || !title || !number || !boxes) return;

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

      // Title and number fade in
      tl.fromTo([number, title],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out', stagger: 0.1 }
      )
      // Boxes fade in with stagger and movement
      .fromTo(boxes.children,
        { y: 40, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.15, ease: 'power2.out' },
        '-=0.2'
      )
      // Hold for viewing
      .to({}, { duration: 0.5 })
      // Fade out
      .to([number, title, ...Array.from(boxes.children)],
        { opacity: 0, y: -30, duration: 0.4, stagger: 0.05 },
        '+=0.3'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      style={{ backgroundColor: '#fdfcfa' }}
    >
      {/* Title */}
      <div className="flex items-center gap-6 mb-12 px-6">
        <div ref={numberRef} className="text-6xl md:text-8xl font-medium text-gray-900">
          3
        </div>
        <div ref={titleRef}>
          <h2 className="text-4xl md:text-6xl font-medium text-gray-900 uppercase">
            Transizioni
          </h2>
        </div>
      </div>

      {/* Description */}
      <div className="max-w-2xl px-6 text-center mb-16">
        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
          Le transizioni eleganti collegano le diverse parti dell'interfaccia,
          creando un flusso continuo che accompagna l'utente nella sua esperienza
          di navigazione.
        </p>
      </div>

      {/* Animated Boxes */}
      <div ref={boxesRef} className="flex flex-wrap justify-center gap-6 px-6">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gray-900/80 backdrop-blur" />
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gray-900/60 backdrop-blur" />
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gray-900/40 backdrop-blur" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-16 h-16 rounded-full border border-gray-900/10" />
      <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full border border-gray-900/10" />
    </section>
  );
}
