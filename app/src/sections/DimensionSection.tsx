import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DimensionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const layers = layersRef.current;

    if (!section || !title || !layers) return;

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
      // Layers appear with 3D effect (parallax depth)
      .fromTo(Array.from(layers.children),
        { z: -500, opacity: 0, scale: 0.5 },
        {
          z: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.2,
          ease: 'power2.out',
        }
      )
      // Float animation
      .to(layers.children[0],
        { y: -20, duration: 0.4, ease: 'sine.inOut' },
        '-=0.2'
      )
      .to(layers.children[1],
        { y: -40, duration: 0.4, ease: 'sine.inOut' },
        '-=0.3'
      )
      .to(layers.children[2],
        { y: -60, duration: 0.4, ease: 'sine.inOut' },
        '-=0.3'
      )
      // Fade out
      .to([title, ...Array.from(layers.children)],
        { opacity: 0, z: 200, duration: 0.4, stagger: 0.1 },
        '+=0.3'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center noise-overlay"
      style={{
        backgroundColor: '#c8cfe8',
        perspective: '1000px',
      }}
    >
      {/* Title */}
      <div ref={titleRef} className="text-center mb-16 px-6 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-6xl md:text-8xl font-medium text-gray-900">6</span>
          <h2 className="text-4xl md:text-6xl font-medium text-gray-900 uppercase text-left">
            Profondità<br />& Spazio
          </h2>
        </div>
        <p className="text-gray-700 text-sm md:text-base max-w-lg mx-auto mt-6">
          Il movimento in profondità crea un effetto 3D immersivo. Layer sovrapposti
          e elementi fluttuanti aggiungono dimensione spaziale alle interfacce.
        </p>
      </div>

      {/* 3D Layers */}
      <div ref={layersRef} className="relative" style={{ transformStyle: 'preserve-3d' }}>
        <div
          className="w-40 h-40 md:w-52 md:h-52 bg-gray-900/80 rounded-3xl absolute top-0 left-0"
          style={{ transform: 'translateZ(0px)' }}
        />
        <div
          className="w-40 h-40 md:w-52 md:h-52 bg-gray-900/60 rounded-3xl absolute top-8 left-8"
          style={{ transform: 'translateZ(-50px)' }}
        />
        <div
          className="w-40 h-40 md:w-52 md:h-52 bg-gray-900/40 rounded-3xl absolute top-16 left-16"
          style={{ transform: 'translateZ(-100px)' }}
        />
      </div>
    </section>
  );
}
