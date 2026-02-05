import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Global ScrollTrigger optimizations
 * Called once during app initialization
 */
export const initializeScrollOptimizations = () => {
  // Batch ScrollTrigger refresh calls for better performance
  ScrollTrigger.config({
    limitCallbacks: true, // Throttle callbacks to max 1 per tick
    syncInterval: 17, // ~60fps (1000ms / 60fps = 16.67ms)
  });

  // Optimize RAF (RequestAnimationFrame) calls
  gsap.ticker.lagSmoothing(1000, 16);

  // Use batching for multiple ScrollTriggers
  ScrollTrigger.defaults({
    // Markers only in development
    markers: false,
  });
};

/**
 * Cleanup all ScrollTriggers when component unmounts
 * Prevents memory leaks
 */
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((st) => st.kill());
};

/**
 * Refresh ScrollTriggers after layout changes
 * Use debounced version to avoid excessive calls
 */
let refreshTimeout: number;
export const refreshScrollTriggers = (delay = 100) => {
  clearTimeout(refreshTimeout);
  refreshTimeout = setTimeout(() => {
    ScrollTrigger.refresh();
  }, delay);
};

/**
 * Create optimized ScrollTrigger with lazy initialization
 * Only creates ScrollTrigger when element is near viewport
 */
export const createLazyScrollTrigger = (
  element: HTMLElement,
  animationConfig: gsap.TweenVars,
  observerOptions: IntersectionObserverInit = {}
) => {
  const { threshold = 0, rootMargin = '200px' } = observerOptions;

  return new Promise<ScrollTrigger>((resolve) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is near viewport, create ScrollTrigger
            const animation = gsap.to(element, animationConfig);
            if (animation.scrollTrigger) {
              resolve(animation.scrollTrigger);
            }
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
  });
};

/**
 * Batch create multiple ScrollTriggers with stagger
 * More efficient than creating them individually
 */
export const batchScrollTriggers = (
  elements: HTMLElement[],
  animationConfig: gsap.TweenVars,
  batchConfig: {
    interval?: number;
    batchMax?: number;
  } = {}
) => {
  const { interval = 0.1, batchMax = 3 } = batchConfig;

  ScrollTrigger.batch(elements, {
    interval,
    batchMax,
    onEnter: (batch) => {
      gsap.to(batch, {
        ...animationConfig,
        stagger: interval,
      });
    },
  });
};
