import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AttentionSection() {
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
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
      .fromTo(svg.querySelectorAll('path, line, circle, ellipse'),
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
        {/* Left side - Key shape */}
        <circle
          cx="250"
          cy="400"
          r="80"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <circle
          cx="250"
          cy="400"
          r="40"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <rect
          x="230"
          y="480"
          width="40"
          height="200"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <line
          x1="270"
          y1="620"
          x2="320"
          y2="620"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <line
          x1="270"
          y1="650"
          x2="300"
          y2="650"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />

        {/* Right side - Plant/leaves */}
        <ellipse
          cx="1600"
          cy="750"
          rx="100"
          ry="40"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <path
          d="M1600 710 L1600 500"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <ellipse
          cx="1550"
          cy="550"
          rx="60"
          ry="30"
          stroke="white"
          strokeWidth="1"
          fill="none"
          transform="rotate(-30 1550 550)"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <ellipse
          cx="1650"
          cy="530"
          rx="60"
          ry="30"
          stroke="white"
          strokeWidth="1"
          fill="none"
          transform="rotate(30 1650 530)"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <ellipse
          cx="1600"
          cy="450"
          rx="50"
          ry="25"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />

        {/* Eye shape around badge */}
        <path
          d="M760 540 Q960 440 1160 540 Q960 640 760 540"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />

        {/* Top curved lines */}
        <path
          d="M200 100 Q400 100 500 200 Q600 300 600 500"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <path
          d="M1720 100 Q1520 100 1420 200 Q1320 300 1320 500"
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

      {/* Badge */}
      <div
        ref={badgeRef}
        className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[20%] top-[40%] z-10"
      >
        <div className="bg-white px-5 sm:px-8 md:px-10 py-4 sm:py-5 rounded-full">
          <span className="text-black text-xl sm:text-2xl md:text-5xl font-medium whitespace-nowrap">un po' di emozione</span>
        </div>
      </div>
    </section>
  );
}
