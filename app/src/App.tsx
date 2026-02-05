import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Loader from './components/Loader';
import ScrollButton from './components/ScrollButton';
import { initializeScrollOptimizations } from './utils/scrollOptimization';
import { useReducedMotion } from './hooks/useReducedMotion';
import Header from './sections/Header';
import HeroSection from './sections/HeroSection';
import GoodAnimationSection from './sections/GoodAnimationSection';
import ItAlsoSection from './sections/ItAlsoSection';
import ControlsSection from './sections/ControlsSection';
import YourSection from './sections/YourSection';
import AttentionSection from './sections/AttentionSection';
import BrandSection from './sections/BrandSection';
import FitnessSection from './sections/FitnessSection';
import GameSection from './sections/GameSection';
import ArchitectSection from './sections/ArchitectSection';
import InteractionSection from './sections/InteractionSection';
import TechniquesSection from './sections/TechniquesSection';
import EasingSection from './sections/EasingSection';
import OffsetSection from './sections/OffsetSection';
import FadeSection from './sections/FadeSection';
import TransformSection from './sections/TransformSection';
import MaskingSection from './sections/MaskingSection';
import DimensionSection from './sections/DimensionSection';
import ParallaxSection from './sections/ParallaxSection';
import ZoomSection from './sections/ZoomSection';
import ResourcesSection from './sections/ResourcesSection';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Initialize reduced motion detection globally
  useReducedMotion();

  // Animate content entrance after loader - smooth and fluid
  useEffect(() => {
    if (!isLoading && showContent) {
      const tl = gsap.timeline({
        defaults: { ease: 'power1.out' }
      });

      // Very gentle fade in of main container
      tl.fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power1.inOut' }
      );

      // Header fades in smoothly
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power1.out' },
        '-=0.5'
      );

      // Hero section fades in very smoothly
      tl.fromTo(
        heroRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power1.out' },
        '-=0.5'
      );
    }
  }, [isLoading, showContent]);

  useEffect(() => {
    // Initialize global scroll optimizations
    initializeScrollOptimizations();

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after setup
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeout);
      lenis.destroy();
      gsap.ticker.remove(() => {});
    };
  }, []);

  return (
    <>
      {isLoading && (
        <Loader
          onComplete={() => {
            setIsLoading(false);
            // Small delay to ensure smooth transition
            setTimeout(() => setShowContent(true), 100);
          }}
        />
      )}
      {!isLoading && showContent && (
        <div ref={contentRef} className="relative" style={{ opacity: 0 }}>
          <Header ref={headerRef} />
          <main>
            <HeroSection ref={heroRef} />
          <GoodAnimationSection />
          <ItAlsoSection />
          <ControlsSection />
          <YourSection />
          <AttentionSection />
          <BrandSection />
          <FitnessSection />
          <GameSection />
          <ArchitectSection />
          <InteractionSection />
          <TechniquesSection />
          <EasingSection />
          <OffsetSection />
          <FadeSection />
          <TransformSection />
          <MaskingSection />
          <DimensionSection />
          <ParallaxSection />
          <ZoomSection />
          <ResourcesSection />
        </main>
        <Footer />
        <ScrollButton />
      </div>
      )}
    </>
  );
}

export default App;
