import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Hook to detect and respect prefers-reduced-motion
 * Also configures GSAP globally when reduced motion is preferred
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);

      // Configure GSAP based on preference
      if (event.matches) {
        gsap.globalTimeline.timeScale(20); // Speed up all animations
        gsap.defaults({ duration: 0.01 });
      } else {
        gsap.globalTimeline.timeScale(1);
        gsap.defaults({ duration: 0.5 });
      }
    };

    // Initial GSAP config
    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(20);
      gsap.defaults({ duration: 0.01 });
    }

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [prefersReducedMotion]);

  return prefersReducedMotion;
}

/**
 * Get animation duration based on reduced motion preference
 * Use this for inline duration values
 */
export function getAnimationDuration(normalDuration: number, reducedMotion: boolean): number {
  return reducedMotion ? 0.01 : normalDuration;
}

/**
 * Get scrub value based on reduced motion preference
 */
export function getScrubValue(normalScrub: number, reducedMotion: boolean): number | boolean {
  return reducedMotion ? false : normalScrub;
}
