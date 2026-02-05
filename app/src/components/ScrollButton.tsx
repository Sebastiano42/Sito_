import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function ScrollButton() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;

          // Show button after scrolling past 200px
          const shouldBeVisible = scrollY > 200;
          if (shouldBeVisible !== isVisible) {
            setIsVisible(shouldBeVisible);
          }

          // Determine if we're closer to top or bottom
          const scrollPercentage = scrollY / (documentHeight - windowHeight);
          const shouldBeAtTop = scrollPercentage < 0.5;
          if (shouldBeAtTop !== isAtTop) {
            setIsAtTop(shouldBeAtTop);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, isAtTop]);

  // Animate button visibility
  useEffect(() => {
    if (!buttonRef.current) return;

    gsap.killTweensOf(buttonRef.current);

    if (isVisible) {
      gsap.to(buttonRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [isVisible]);

  // Animate arrow rotation
  useEffect(() => {
    if (!arrowRef.current) return;

    gsap.killTweensOf(arrowRef.current);

    gsap.to(arrowRef.current, {
      rotation: isAtTop ? 180 : 0,
      duration: 0.4,
      ease: 'power2.inOut',
    });
  }, [isAtTop]);

  const handleClick = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    // Button press animation
    gsap.to(buttonRef.current, {
      scale: 0.9,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'elastic.out(1, 0.5)',
          onComplete: () => {
            isAnimating.current = false;
          },
        });
      },
    });

    // Smooth scroll
    const target = isAtTop ? document.documentElement.scrollHeight : 0;
    window.scrollTo({
      top: target,
      behavior: 'smooth',
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-black rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:bg-gray-900 transition-shadow duration-300"
      style={{ opacity: 0, transform: 'scale(0.8) translateY(20px)' }}
      aria-label={isAtTop ? 'Vai in fondo' : 'Torna su'}
    >
      <div
        ref={arrowRef}
        className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"
      >
        <svg
          width="20"
          height="20"
          className="sm:w-6 sm:h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </div>
    </button>
  );
}
