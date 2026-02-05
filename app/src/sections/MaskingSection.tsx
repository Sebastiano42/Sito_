import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MaskingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const maskContainerRef = useRef<HTMLDivElement>(null);
  const innerBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const maskContainer = maskContainerRef.current;
    const innerBox = innerBoxRef.current;

    if (!section || !title || !maskContainer || !innerBox) return;

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
      // Mask expands with clip-path
      .fromTo(maskContainer,
        { clipPath: 'circle(20% at 50% 50%)', opacity: 0 },
        { clipPath: 'circle(70% at 50% 50%)', opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
      // Inner element moves and scales
      .to(innerBox,
        { scale: 1.5, rotate: 180, duration: 0.5, ease: 'power2.inOut' },
        '-=0.2'
      )
      .to(innerBox,
        { x: 50, scale: 1, rotate: 360, duration: 0.5, ease: 'power2.inOut' }
      )
      // Fade out
      .to([title, maskContainer],
        { opacity: 0, y: -30, duration: 0.3 },
        '+=0.3'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center noise-overlay"
      style={{ backgroundColor: '#fdfcfa' }}
    >
      {/* Title */}
      <div ref={titleRef} className="text-center mb-16 px-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-6xl md:text-8xl font-medium text-gray-900">5</span>
          <h2 className="text-4xl md:text-6xl font-medium text-gray-900 uppercase">
            Focus
          </h2>
        </div>
        <p className="text-gray-700 text-sm md:text-base max-w-lg mx-auto mt-6">
          Gli elementi visivi si muovono all'interno di contenitori creando senso
          di profondità e spazio. L'attenzione dell'utente viene guidata naturalmente.
        </p>
      </div>

      {/* Masked Container */}
      <div
        ref={maskContainerRef}
        className="w-64 h-64 md:w-80 md:h-80 bg-gray-900/10 rounded-3xl flex items-center justify-center overflow-hidden"
        style={{ clipPath: 'circle(20% at 50% 50%)' }}
      >
        <div
          ref={innerBoxRef}
          className="w-32 h-32 bg-gray-900 rounded-2xl"
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 left-10 w-12 h-12 rounded-full border-2 border-gray-900/20" />
      <div className="absolute bottom-1/3 right-10 w-16 h-16 rounded-full border-2 border-gray-900/20" />
    </section>
  );
}
