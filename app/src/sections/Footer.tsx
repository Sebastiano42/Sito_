import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(content,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="relative w-full bg-black py-20 lg:py-32">
      <div ref={contentRef} className="px-6 lg:px-20">
        {/* Main CTA */}
        <div className="max-w-4xl mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-[7vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] font-medium text-white mb-4 sm:mb-6 leading-[1.1]">
            Hai un progetto in mente? Parliamone
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-xl">
            Sono sempre alla ricerca di nuove sfide creative. Che si tratti di un
            sito web, un'app o un rebrand completo, sono qui per aiutarti.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <div>
            <h3 className="text-white/40 text-sm uppercase tracking-wider mb-4">
              Navigazione
            </h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Servizi', 'Portfolio'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-white hover:text-white/60 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white/40 text-sm uppercase tracking-wider mb-4">
              Servizi
            </h3>
            <ul className="space-y-2">
              {['Web Design', 'UI/UX', 'Branding', 'Motion'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-white hover:text-white/60 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white/40 text-sm uppercase tracking-wider mb-4">
              Social
            </h3>
            <ul className="space-y-2">
              {['Behance', 'Dribbble', 'LinkedIn', 'Instagram'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white hover:text-white/60 transition-colors inline-flex items-center gap-1">
                    {item}
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white/40 text-sm uppercase tracking-wider mb-4">
              Contatti
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hello@marco.design" className="text-white hover:text-white/60 transition-colors">
                  hello@marco.design
                </a>
              </li>
              <li className="text-white/60">Milano, Italia</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8c1.85 0 3.55.63 4.9 1.69L12 12V4c4.41 0 8 3.59 8 8s-3.59 8-8 8z"/>
                </svg>
              </div>
              <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8c1.85 0 3.55.63 4.9 1.69L12 12V4c4.41 0 8 3.59 8 8s-3.59 8-8 8z"/>
                </svg>
              </div>
            </div>
            <span className="text-white text-sm font-medium">marco.design</span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
            <p className="text-white/40 text-sm">
              © 2024 Marco Rossi. Tutti i diritti riservati.
            </p>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <span>Site by</span>
              <a
                href="https://github.com/anthropics/claude"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/60 transition-colors inline-flex items-center gap-1 font-medium"
              >
                Claude Code
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
