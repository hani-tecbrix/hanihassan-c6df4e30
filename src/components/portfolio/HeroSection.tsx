import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  scrollY: number;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const HeroSection = ({ scrollY, onHoverStart, onHoverEnd }: HeroSectionProps) => {
  return (
    <header className="relative min-h-screen flex flex-col justify-center px-4 md:px-12 pt-20 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-px h-full bg-foreground/5 hidden md:block"></div>
      <div className="absolute top-1/3 left-0 w-full h-px bg-foreground/5"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="overflow-hidden relative">
          <h1
            className="text-[15vw] leading-[0.85] font-display tracking-tighter text-foreground uppercase transform transition-transform duration-1000 ease-out inline-block relative"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            HANI
            <span className="absolute top-4 -right-2 md:-right-24 text-lg md:text-2xl font-mono tracking-widest text-primary -rotate-6 normal-case font-bold z-50 whitespace-nowrap">
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
            <div className="bg-foreground text-background p-4 md:p-6 shadow-[10px_10px_0px_0px_hsl(var(--primary))] rotate-3 hover:rotate-0 transition-transform duration-500">
              <p className="text-4xl md:text-6xl font-bold font-mono">15+</p>
              <p className="text-xs tracking-widest uppercase mt-1 text-primary">Years Exp.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-0 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between border-t-4 border-foreground pt-6">
          <div className="text-xl md:text-3xl font-bold uppercase tracking-tight max-w-xl">
            Expert Designer <span className="bg-primary text-primary-foreground px-2">UI / UX / AI</span>
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
