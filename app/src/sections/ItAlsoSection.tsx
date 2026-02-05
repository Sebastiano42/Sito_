import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ItAlsoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const badge = badgeRef.current;
    const svg = svgRef.current;

    if (!section || !badge || !svg) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.8,
        },
      });

      tl.fromTo(badge,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out' }
      )
      .fromTo(svg.querySelectorAll('path, line, circle, rect'),
        { strokeDashoffset: 1000, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.6, stagger: 0.02 },
        '-=0.2'
      )
      .to([badge, svg],
        { opacity: 0, scale: 0.8, duration: 0.4 },
        '+=0.3'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center"
    >
      {/* SVG Line Art */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Left side curved lines */}
        <path
          d="M0 400 Q200 400 300 300 Q400 200 400 0"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <path
          d="M0 500 Q250 500 350 400 Q450 300 450 100"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <path
          d="M0 600 Q300 600 400 500 Q500 400 500 200"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />

        {/* Right side curved lines */}
        <path
          d="M1920 400 Q1720 400 1620 300 Q1520 200 1520 0"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <path
          d="M1920 500 Q1670 500 1570 400 Q1470 300 1470 100"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <path
          d="M1920 600 Q1620 600 1520 500 Q1420 400 1420 200"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />

        {/* Center horizontal lines */}
        <line
          x1="200"
          y1="540"
          x2="800"
          y2="540"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <line
          x1="1120"
          y1="540"
          x2="1720"
          y2="540"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />

        {/* Vertical lines */}
        <line
          x1="400"
          y1="540"
          x2="400"
          y2="800"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <line
          x1="1520"
          y1="540"
          x2="1520"
          y2="800"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />

        {/* Oval shape around badge */}
        <ellipse
          cx="960"
          cy="540"
          rx="200"
          ry="80"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />

        {/* Small circles */}
        <circle
          cx="960"
          cy="400"
          r="4"
          fill="white"
        />
        <circle
          cx="960"
          cy="680"
          r="4"
          fill="white"
        />
      </svg>

      {/* Center Badge */}
      <div
        ref={badgeRef}
        className="relative z-10 bg-white px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 rounded-full mx-4"
      >
        <span className="text-black text-2xl sm:text-3xl md:text-5xl font-medium whitespace-nowrap">Perché tutti</span>
      </div>

      {/* Small dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
        <div className="w-3 h-3 bg-white rounded-full" />
      </div>
    </section>
  );
}
