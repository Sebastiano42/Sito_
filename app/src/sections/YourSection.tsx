import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function YourSection() {
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
        { x: -200, rotation: -30, opacity: 0 },
        { x: 0, rotation: -15, opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
      .fromTo(svg.querySelectorAll('path, line, circle'),
        { strokeDashoffset: 1000, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.6, stagger: 0.02 },
        '-=0.2'
      )
      .to([badge, svg],
        { opacity: 0, y: 100, duration: 0.4 },
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
        {/* Diagonal lines */}
        <line
          x1="0"
          y1="800"
          x2="600"
          y2="200"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <line
          x1="100"
          y1="900"
          x2="700"
          y2="300"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <line
          x1="200"
          y1="1000"
          x2="800"
          y2="400"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />

        {/* Curved organic shapes */}
        <path
          d="M0 600 Q300 600 400 500 Q500 400 500 200"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <path
          d="M0 700 Q400 700 500 600 Q600 500 600 300"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />

        {/* Right side vertical structure */}
        <rect
          x="1400"
          y="200"
          width="200"
          height="600"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <line
          x1="1400"
          y1="350"
          x2="1600"
          y2="350"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <line
          x1="1400"
          y1="500"
          x2="1600"
          y2="500"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <line
          x1="1400"
          y1="650"
          x2="1600"
          y2="650"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />

        {/* Top right curved lines */}
        <path
          d="M1920 100 Q1700 100 1600 200 Q1500 300 1500 500"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />

        {/* Center dot */}
        <circle
          cx="960"
          cy="540"
          r="6"
          fill="white"
        />
      </svg>

      {/* Badge - rotated */}
      <div
        ref={badgeRef}
        className="absolute left-1/2 -translate-x-1/2 md:left-[20%] md:translate-x-0 top-[45%] z-10"
        style={{ transform: 'rotate(-15deg)' }}
      >
        <div className="bg-white px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-full">
          <span className="text-black text-2xl sm:text-3xl md:text-5xl font-medium">meritano</span>
        </div>
      </div>
    </section>
  );
}
