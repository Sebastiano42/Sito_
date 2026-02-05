import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from './useInView';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  animationConfig?: gsap.TweenVars;
}

/**
 * Combined hook that uses IntersectionObserver + GSAP ScrollTrigger
 * Only initializes ScrollTrigger when element is near viewport
 * Significantly improves performance by not creating unnecessary ScrollTriggers
 */
export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '100px',
    triggerOnce = false,
    animationConfig,
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const { isInView, hasBeenInView } = useInView({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const scrollTriggerRef = useRef<ScrollTrigger | undefined | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Only create ScrollTrigger when element is in view
    if (isInView && !scrollTriggerRef.current) {
      if (animationConfig) {
        const animation = gsap.to(element, {
          ...animationConfig,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            ...(animationConfig.scrollTrigger || {}),
          },
        });

        scrollTriggerRef.current = animation.scrollTrigger;
      }
    }

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [isInView, hasBeenInView, animationConfig]);

  return { ref: elementRef, isInView, hasBeenInView };
};
