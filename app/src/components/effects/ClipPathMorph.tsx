import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ClipPathMorphProps {
  triggerRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  startRadius?: string;
  endRadius?: string;
  duration?: number;
}

/**
 * ClipPathMorph Component
 * Animates clip-path circle expansion/contraction based on scroll
 * Used for dramatic reveal effects
 */
export default function ClipPathMorph({
  triggerRef,
  children,
  startRadius = '0%',
  endRadius = '100%',
  duration = 1,
}: ClipPathMorphProps) {
  const morphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const morph = morphRef.current;
    const trigger = triggerRef.current;

    if (!morph || !trigger) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        morph,
        { clipPath: `circle(${startRadius} at 50% 50%)` },
        {
          clipPath: `circle(${endRadius} at 50% 50%)`,
          duration,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger,
            start: 'top center',
            end: 'center center',
            scrub: 0.5,
          },
        }
      );
    }, morph);

    return () => ctx.revert();
  }, [triggerRef, startRadius, endRadius, duration]);

  return (
    <div
      ref={morphRef}
      style={{
        clipPath: `circle(${startRadius} at 50% 50%)`,
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </div>
  );
}
