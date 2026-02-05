import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TransformSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const shape = shapeRef.current;

    if (!section || !title || !shape) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: 0.8,
        },
      });

      // Title fades in
      tl.fromTo(title,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      // Shape morphs: circle -> square -> rounded square -> pill
      .fromTo(shape,
        { borderRadius: '50%', rotate: 0, scale: 1 },
        { borderRadius: '0%', rotate: 90, scale: 1.2, duration: 0.4, ease: 'power2.inOut' }
      )
      .to(shape,
        { borderRadius: '20%', rotate: 180, scale: 1, duration: 0.4, ease: 'power2.inOut' }
      )
      .to(shape,
        { borderRadius: '50px', rotate: 270, scale: 0.9, duration: 0.4, ease: 'power2.inOut' }
      )
      // Fade out
      .to([title, shape],
        { opacity: 0, y: -50, duration: 0.3 },
        '+=0.3'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      style={{ backgroundColor: '#c8cfe8' }}
    >
      {/* Title */}
      <div ref={titleRef} className="text-center mb-16 px-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-6xl md:text-8xl font-medium text-gray-900">4</span>
          <h2 className="text-4xl md:text-6xl font-medium text-gray-900 uppercase text-left">
            Forme<br />& Coerenza
          </h2>
        </div>
        <p className="text-gray-700 text-sm md:text-base max-w-lg mx-auto mt-6">
          Le trasformazioni geometriche creano continuità visiva mentre gli elementi
          cambiano forma. Un linguaggio visivo coerente mantiene gli utenti coinvolti.
        </p>
      </div>

      {/* Morphing Shape */}
      <div
        ref={shapeRef}
        className="w-32 h-32 md:w-48 md:h-48 bg-gray-900"
        style={{ borderRadius: '50%' }}
      />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-20 w-4 h-4 bg-gray-900/20 rounded-full" />
      <div className="absolute bottom-1/4 left-20 w-6 h-6 bg-gray-900/20 rounded-full" />
    </section>
  );
}
