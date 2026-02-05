import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const resources = [
  { name: 'Ristorante Bella Vista', category: 'Web Design', url: '#' },
  { name: 'TechStart Solutions', category: 'UI/UX', url: '#' },
  { name: 'Studio Legale Martini', category: 'Branding', url: '#' },
  { name: 'Eco Green Energy', category: 'Web Design', url: '#' },
  { name: 'Fashion House Milano', category: 'E-commerce', url: '#' },
  { name: 'Clinica Salute Plus', category: 'UI/UX', url: '#' },
  { name: 'Agenzia Viaggi Mondo', category: 'Web Design', url: '#' },
  { name: 'Startup Innovate', category: 'Branding', url: '#' },
  { name: 'Palestra FitLife', category: 'Web Design', url: '#' },
  { name: 'Immobiliare Casa Dolce', category: 'UI/UX', url: '#' },
  { name: 'Caffetteria Aroma', category: 'Branding', url: '#' },
  { name: 'Digital Agency 360', category: 'E-commerce', url: '#' },
];

export default function ResourcesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;

    if (!section || !title || !grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(title,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.8,
          },
        }
      );

      gsap.fromTo(Array.from(grid.children),
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.8,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const courseCount = resources.filter(r => r.category === 'Web Design' || r.category === 'UI/UX').length;
  const articleCount = resources.filter(r => r.category === 'Branding' || r.category === 'E-commerce').length;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-20 px-6 lg:px-10"
      style={{ backgroundColor: '#0c0b0b' }}
    >
      {/* Title */}
      <div ref={titleRef} className="text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-medium text-white uppercase mb-6">
          Progetti Selezionati
        </h2>
        <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-4">
          Una selezione dei progetti più significativi realizzati per clienti
          di diversi settori. Ogni progetto racconta una storia unica.
        </p>
        <div className="text-white/50 text-sm">
          {courseCount} progetti • {articleCount} brand
        </div>
      </div>

      {/* Resources Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto"
      >
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:border-white/30"
          >
            <div className="flex flex-col h-full">
              <div className="text-xs uppercase tracking-wider text-white/40 mb-3">
                {resource.category}
              </div>
              <h3 className="text-white text-lg md:text-xl font-medium mb-2 group-hover:text-white/90 transition-colors">
                {resource.name}
              </h3>
              <div className="mt-auto pt-4 flex items-center text-white/60 group-hover:text-white/80 transition-colors">
                <span className="text-sm">Scopri</span>
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
