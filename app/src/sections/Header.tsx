import { useState, useEffect, forwardRef, type ForwardedRef } from 'react';
import { Menu, X } from 'lucide-react';

const Header = forwardRef(function Header(_props: {}, ref: ForwardedRef<HTMLDivElement>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={ref} className="contents">
      {/* Single Header - mix-blend-difference per l'hero, normale dopo scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isVisible ? '' : 'mix-blend-difference'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 lg:px-10">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex gap-0.5">
              {/* Circle 1 with crescent shape */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8c1.85 0 3.55.63 4.9 1.69L12 12V4c4.41 0 8 3.59 8 8s-3.59 8-8 8z"/>
                </svg>
              </div>
              {/* Circle 2 with crescent shape */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8c1.85 0 3.55.63 4.9 1.69L12 12V4c4.41 0 8 3.59 8 8s-3.59 8-8 8z"/>
                </svg>
              </div>
            </div>
            <span className="hidden sm:inline text-white text-sm font-medium tracking-wide border border-white/30 px-4 py-2 rounded-full">
              marco.design
            </span>
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/30 text-white text-xs sm:text-sm font-medium hover:bg-white/10 transition-colors"
          >
            <span>{isMenuOpen ? 'close' : 'menu'}</span>
            {isMenuOpen ? <X size={14} className="sm:w-4 sm:h-4" /> : <Menu size={14} className="sm:w-4 sm:h-4" />}
          </button>
        </div>
      </header>

      {/* Full Screen Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-all duration-700 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{
          transform: isMenuOpen ? 'scale(1)' : 'scale(0.95)',
          transformOrigin: 'top right',
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 right-20 w-64 h-64 border border-white/5 rounded-full"
            style={{
              transform: isMenuOpen ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)',
              opacity: isMenuOpen ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: isMenuOpen ? '0.3s' : '0s',
            }}
          />
          <div
            className="absolute bottom-20 left-20 w-48 h-48 border border-white/5 rounded-full"
            style={{
              transform: isMenuOpen ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(180deg)',
              opacity: isMenuOpen ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: isMenuOpen ? '0.4s' : '0s',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{
              transform: isMenuOpen ? 'scaleX(1)' : 'scaleX(0)',
              opacity: isMenuOpen ? 1 : 0,
              transition: 'all 0.6s ease-out',
              transitionDelay: isMenuOpen ? '0.5s' : '0s',
            }}
          />
        </div>

        <div className="flex flex-col items-center justify-center h-full gap-6 md:gap-8 relative z-10">
          {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map(
            (item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="group relative text-white text-3xl md:text-6xl font-medium transition-all duration-300 flex items-center gap-4 md:gap-6"
                style={{
                  transitionDelay: isMenuOpen ? `${index * 80}ms` : '0ms',
                  transform: isMenuOpen ? 'translateY(0)' : 'translateY(30px)',
                  opacity: isMenuOpen ? 1 : 0,
                }}
              >
                <span className="text-xs md:text-sm text-white/40 font-light group-hover:text-white/60 transition-colors">
                  0{index + 1}
                </span>
                <span className="relative">
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500 ease-out" />
                </span>
                <span className="text-xs md:text-sm text-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  →
                </span>
              </a>
            )
          )}

          {/* Bottom decoration */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-white/20"
                style={{
                  transitionDelay: isMenuOpen ? `${(i + 5) * 80}ms` : '0ms',
                  transform: isMenuOpen ? 'scale(1)' : 'scale(0)',
                  opacity: isMenuOpen ? 1 : 0,
                  transition: 'all 0.5s ease-out',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

Header.displayName = 'Header';

export default Header;
