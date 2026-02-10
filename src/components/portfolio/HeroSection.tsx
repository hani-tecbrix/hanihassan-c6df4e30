import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  scrollY: number;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const HeroSection = ({ scrollY, onHoverStart, onHoverEnd }: HeroSectionProps) => {
  return (
    <header className="relative min-h-screen flex flex-col justify-center px-4 md:px-12 pt-20 overflow-hidden halftone-overlay">
      {/* Grunge collage decorative elements */}
      <div className="absolute top-12 left-8 w-32 h-5 tape-strip opacity-60 hidden md:block" style={{ '--float-rotate': '-2deg' } as React.CSSProperties}></div>
      <div className="absolute bottom-32 right-16 w-24 h-4 tape-strip opacity-40 hidden md:block" style={{ transform: 'rotate(5deg)' }}></div>
      
      {/* Ink splatter accents */}
      <div className="absolute top-1/4 left-0 w-64 h-64 ink-splatter opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 ink-splatter opacity-40 pointer-events-none"></div>

      {/* Distressed grid lines */}
      <div className="absolute top-0 right-1/4 w-px h-full bg-foreground/5 hidden md:block" style={{ backgroundImage: 'repeating-linear-gradient(180deg, hsl(var(--foreground) / 0.08) 0px, hsl(var(--foreground) / 0.08) 6px, transparent 6px, transparent 12px)' }}></div>
      <div className="absolute top-1/3 left-0 w-full h-px" style={{ backgroundImage: 'repeating-linear-gradient(90deg, hsl(var(--foreground) / 0.08) 0px, hsl(var(--foreground) / 0.08) 8px, transparent 8px, transparent 16px)' }}></div>

      {/* Scattered paper scraps */}
      <div className="absolute top-20 left-1/3 w-16 h-12 bg-primary/10 rotate-12 border border-primary/20 pointer-events-none hidden md:block collage-float" style={{ '--float-rotate': '12deg' } as React.CSSProperties}></div>
      <div className="absolute bottom-40 left-16 w-10 h-14 bg-foreground/5 -rotate-6 border border-foreground/10 pointer-events-none hidden md:block collage-float" style={{ '--float-rotate': '-6deg', animationDelay: '1.5s' } as React.CSSProperties}></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Sticky Note - now with grunge jitter */}
        <div 
          className="absolute -right-4 md:right-12 top-0 md:top-8 w-64 md:w-72 z-30 rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-105 cursor-default grunge-jitter"
          style={{ transform: `rotate(3deg) translateY(${scrollY * 0.15}px)` }}
        >
          <div className="bg-primary p-5 shadow-[6px_6px_0px_0px_hsl(var(--foreground))] relative">
            {/* Tape strip on sticky note */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 tape-strip"></div>
            <p className="text-primary-foreground text-xs md:text-sm leading-relaxed font-medium">
              Merging creative coding, rigorous design systems, and strategic branding, I build digital experiences that are not only usable, but <span className="font-bold underline decoration-2 decoration-wavy">distinctive</span>, <span className="font-bold underline decoration-2 decoration-wavy">cohesive</span>, and <span className="font-bold underline decoration-2 decoration-wavy">memorable</span>.
            </p>
          </div>
        </div>

        <div className="overflow-hidden relative">
          <h1
            className="text-[15vw] leading-[0.85] font-display tracking-tighter text-foreground uppercase transform transition-transform duration-1000 ease-out inline-block relative"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            HANI
            <span className="absolute top-4 -right-2 md:-right-24 text-lg md:text-2xl font-mono tracking-widest text-primary -rotate-6 normal-case font-bold z-50 whitespace-nowrap stamp-effect">
              aka #greenhani
            </span>
          </h1>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between">
          <div className="overflow-hidden">
            <h1
              className="text-[15vw] leading-[0.85] font-display tracking-tighter text-primary uppercase mix-blend-multiply relative z-20"
              style={{ transform: `translateY(-${scrollY * 0.1}px)` }}
            >
              HASSAN
            </h1>
          </div>

          <div
            className="mb-4 md:mb-12 md:mr-12 flex flex-col items-start md:items-end z-20"
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
          >
            <div className="bg-foreground text-background p-4 md:p-6 shadow-[10px_10px_0px_0px_hsl(var(--primary))] rotate-3 hover:rotate-0 transition-transform duration-500 relative screen-print grunge-jitter">
              {/* Torn corner effect */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-background rotate-45 origin-bottom-left"></div>
              <p className="text-4xl md:text-6xl font-bold font-mono">15+</p>
              <p className="text-xs tracking-widest uppercase mt-1 text-primary">Years Exp.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-0 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between pt-6 relative distressed-border border-t-4">
          <div className="text-xl md:text-3xl font-bold uppercase tracking-tight max-w-xl">
            Expert Designer <span className="bg-primary text-primary-foreground px-2 -rotate-1 inline-block">UI / UX / AI</span>
          </div>
          <div className="flex gap-4">
            <span className="text-sm font-mono opacity-60">SCROLL FOR IMPACT</span>
            <ChevronDown className="animate-bounce" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
