import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [counter, setCounter] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Subtle entrance - line draws in
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: 'power2.out' },
      0
    );

    // Counter fades in gently
    tl.fromTo(
      counterRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      0.3
    );

    // Text fades in after counter
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      0.5
    );

    // Animate counter from 0 to 100 - faster
    const counterTween = gsap.to(
      { value: 0 },
      {
        value: 100,
        duration: 2,
        delay: 0.3,
        ease: 'power2.inOut',
        onUpdate: function () {
          setCounter(Math.floor(this.targets()[0].value));
        },
        onComplete: () => {
          // Quick but smooth exit animation
          const exitTl = gsap.timeline({
            onComplete: () => onComplete(),
          });

          // Counter and text fade out
          exitTl.to([counterRef.current, textRef.current], {
            opacity: 0,
            y: -30,
            duration: 0.5,
            ease: 'power2.inOut',
          }, 0);

          // Line retracts
          exitTl.to(lineRef.current, {
            scaleX: 0,
            duration: 0.6,
            ease: 'power2.inOut',
          }, 0.1);

          // Final fade out - quick
          exitTl.to(loaderRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: 'power1.out',
          }, 0.3);
        },
      }
    );

    return () => {
      counterTween.kill();
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
    >
      {/* Minimal horizontal line */}
      <div
        ref={lineRef}
        className="absolute top-1/2 left-0 right-0 h-px bg-black/10 origin-left"
      />

      {/* Clean counter */}
      <div ref={counterRef} className="relative">
        <span
          className="text-[clamp(8rem,20vw,16rem)] font-medium text-black leading-none tracking-tighter"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {counter.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Description text */}
      <p
        ref={textRef}
        className="mt-8 text-black/70 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed text-center px-4"
      >
        Preparando la tua esperienza creativa
      </p>
    </div>
  );
};

export default Loader;
