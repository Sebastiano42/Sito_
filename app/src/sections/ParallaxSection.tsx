import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer4Ref = useRef<HTMLDivElement>(null);
  const layer5Ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const layer1 = layer1Ref.current;
    const layer2 = layer2Ref.current;
    const layer3 = layer3Ref.current;
    const layer4 = layer4Ref.current;
    const layer5 = layer5Ref.current;

    if (!section || !title || !layer1 || !layer2 || !layer3 || !layer4 || !layer5) return;

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

      // Title fades in
      tl.fromTo(title,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      // Layers move at different speeds (parallax) - 5 layers for enhanced depth
      .fromTo(layer1,
        { y: 100, opacity: 0 },
        { y: -50, opacity: 1, duration: 0.8, ease: 'none' },
        0.2
      )
      .fromTo(layer2,
        { y: 120, opacity: 0 },
        { y: -80, opacity: 0.9, duration: 0.8, ease: 'none' },
        0.2
      )
      .fromTo(layer3,
        { y: 140, opacity: 0 },
        { y: -120, opacity: 0.8, duration: 0.8, ease: 'none' },
        0.2
      )
      .fromTo(layer4,
        { y: 160, opacity: 0 },
        { y: -160, opacity: 0.7, duration: 0.8, ease: 'none' },
        0.2
      )
      .fromTo(layer5,
        { y: 180, opacity: 0 },
        { y: -200, opacity: 0.6, duration: 0.8, ease: 'none' },
        0.2
      )
      // Fade out
      .to([title, layer1, layer2, layer3, layer4, layer5],
        { opacity: 0, duration: 0.3 },
        '+=0.4'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });

      if (layer1Ref.current) {
        gsap.to(layer1Ref.current, {
          x: x * 10,
          y: y * 10,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
      if (layer2Ref.current) {
        gsap.to(layer2Ref.current, {
          x: x * 25,
          y: y * 25,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
      if (layer3Ref.current) {
        gsap.to(layer3Ref.current, {
          x: x * 40,
          y: y * 40,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
      if (layer4Ref.current) {
        gsap.to(layer4Ref.current, {
          x: x * 55,
          y: y * 55,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
      if (layer5Ref.current) {
        gsap.to(layer5Ref.current, {
          x: x * 70,
          y: y * 70,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center noise-overlay"
      style={{ backgroundColor: '#fdfcfa' }}
    >
      {/* Title */}
      <div ref={titleRef} className="text-center mb-16 px-6 relative z-20">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-6xl md:text-8xl font-medium text-gray-900">7</span>
          <h2 className="text-4xl md:text-6xl font-medium text-gray-900 uppercase">
            Immersione
          </h2>
        </div>
        <p className="text-gray-700 text-sm md:text-base max-w-lg mx-auto mt-6">
          Cinque layer che si muovono a velocità diverse creano una percezione di
          profondità migliorata. L'interazione con il mouse aggiunge coinvolgimento.
        </p>
      </div>

      {/* Parallax Layers - 5 layers for enhanced depth */}
      <div className="relative w-full h-96 flex items-center justify-center">
        <div
          ref={layer1Ref}
          className="absolute w-16 h-16 bg-gray-900/10 rounded-full"
          style={{ zIndex: 1 }}
        />
        <div
          ref={layer2Ref}
          className="absolute w-24 h-24 bg-gray-900/20 rounded-full"
          style={{ zIndex: 2 }}
        />
        <div
          ref={layer3Ref}
          className="absolute w-32 h-32 bg-gray-900/40 rounded-full"
          style={{ zIndex: 3 }}
        />
        <div
          ref={layer4Ref}
          className="absolute w-40 h-40 bg-gray-900/60 rounded-full"
          style={{ zIndex: 4 }}
        />
        <div
          ref={layer5Ref}
          className="absolute w-48 h-48 bg-gray-900/80 rounded-full"
          style={{ zIndex: 5 }}
        />
      </div>

      {/* Hint text */}
      <div className="absolute bottom-10 text-center text-gray-700/60 text-xs md:text-sm">
        Muovi il mouse per vedere l'effetto parallax a 5 layer
      </div>
    </section>
  );
}
