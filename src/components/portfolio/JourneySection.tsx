import { useRef, useState, useEffect } from 'react';
import { MoveUpRight, Download } from 'lucide-react';

interface JourneySectionProps {
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const experienceData = [
  { company: "TecBrix", role: "Expert AI/UI/UX", period: "Mar 2024 - Present", desc: "Driving innovation at the intersection of AI and design. Building next-gen user experiences." },
  { company: "Vaival Technologies", role: "Expert AI/UI/UX", period: "Aug 2019 - Mar 2024", desc: "Leading the convergence of AI and UX. Crafting intuitive interfaces for complex systems." },
  { company: "IQVIS Technologies", role: "Senior UI/UX Designer", period: "Feb 2010 - Aug 2019", desc: "Delivered high-impact design solutions for global enterprise clients." },
  { company: "SoftSolution", role: "Lead Design Department", period: "Mar 2008 - Aug 2018", desc: "Managed design teams and rigorous UI engineering workflows." },
  { company: "Soft Source Inc.", role: "Web Designer", period: "Aug 2009 - Nov 2009", desc: "Early adoption of responsive web standards and layout design." },
  { company: "Aesthetics Mgt.", role: "Senior Graphic Designer", period: "Dec 2007 - Aug 2009", desc: "Specialized in brand identity and print layouts." },
  { company: "Creative Consultant", role: "Graphic Designer", period: "Jan 2006 - Nov 2007", desc: "Foundation in visual communication and commercial art." },
  { company: "Connoisseur School", role: "Graphic Designer", period: "May 2002 - Dec 2005", desc: "Educational material design and layout typography." }
];

const JourneySection = ({ onHoverStart, onHoverEnd }: JourneySectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide effect with smooth animation
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || isPaused || isDragging) return;

    let animationId: number;
    let lastTime = 0;
    const speed = 50;

    const animate = (currentTime: number) => {
      if (lastTime === 0) lastTime = currentTime;
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const maxScroll = container.scrollWidth - container.clientWidth;
      const nextScroll = container.scrollLeft + speed * deltaTime;
      
      if (nextScroll >= maxScroll) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft = nextScroll;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || !scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    e.preventDefault();
  };

  const handleMouseLeaveOrUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Random rotation for collage feel per card
  const rotations = [-1.2, 0.8, -0.5, 1.1, -0.9, 0.6, -1.5, 0.4];

  return (
    <section id="journey" className="py-24 px-4 md:px-12 bg-card relative screen-print overflow-hidden">
      {/* Grunge ink splatter background */}
      <div className="absolute inset-0 ink-splatter opacity-30 pointer-events-none"></div>
      
      {/* Floating tape strips */}
      <div className="absolute top-8 right-20 w-28 h-5 tape-strip opacity-50 hidden md:block collage-float" style={{ '--float-rotate': '3deg' } as React.CSSProperties}></div>
      <div className="absolute bottom-16 left-12 w-20 h-4 tape-strip opacity-40 hidden md:block" style={{ transform: 'rotate(-4deg)' }}></div>
      
      {/* Paper scrap decorations */}
      <div className="absolute top-1/3 right-8 w-12 h-16 bg-primary/8 rotate-[15deg] border border-primary/15 pointer-events-none hidden md:block collage-float" style={{ '--float-rotate': '15deg', animationDelay: '2s' } as React.CSSProperties}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="hidden md:flex flex-col justify-between w-24 border-r pr-6 distressed-border">
            <div className="h-full relative">
              <h2 className="text-8xl font-display tracking-tighter uppercase origin-top-left rotate-90 absolute top-0 left-8 whitespace-nowrap stroke-text">
                The Journey
              </h2>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-4xl md:text-7xl font-bold leading-tight mb-16 relative">
              FROM GRAPHIC ROOTS TO <br />
              <span className="text-primary relative">
                AI-DRIVEN UX STRATEGY.
                {/* Underline scribble effect */}
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30" style={{ backgroundImage: 'repeating-linear-gradient(90deg, hsl(var(--primary)) 0px, hsl(var(--primary)) 6px, transparent 6px, transparent 10px)' }}></span>
              </span>
            </h3>

            <div
              ref={scrollRef}
              className={`flex overflow-x-auto border-t border-foreground hide-scrollbar pb-6 snap-x snap-mandatory ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              onMouseDown={handleMouseDown}
              onMouseLeave={() => { handleMouseLeaveOrUp(); setIsPaused(false); }}
              onMouseUp={handleMouseLeaveOrUp}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsPaused(true)}
            >
              {experienceData.map((job, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[85vw] sm:w-80 md:w-96 border-r border-b border-foreground p-8 md:p-12 hover:bg-primary hover:text-primary-foreground transition-colors duration-500 relative snap-start group grunge-jitter"
                  style={{ transform: `rotate(${rotations[idx]}deg)`, marginTop: idx % 2 === 0 ? '0' : '8px' }}
                  onMouseEnter={onHoverStart}
                  onMouseLeave={onHoverEnd}
                >
                  {/* Tape strip on alternating cards */}
                  {idx % 3 === 0 && (
                    <div className="absolute -top-2 left-8 w-16 h-4 tape-strip z-10"></div>
                  )}
                  {/* Pin dot on other cards */}
                  {idx % 3 !== 0 && (
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-sm z-10"></div>
                  )}
                  
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-xs md:text-sm font-mono border border-current px-2 py-1 stamp-effect">{job.period}</span>
                    <MoveUpRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <h4 className="text-2xl font-display uppercase mb-2 leading-none">{job.company}</h4>
                  <h5 className="text-lg font-mono opacity-80 mb-4">{job.role}</h5>
                  <p className="text-base opacity-70 leading-relaxed max-w-sm">{job.desc}</p>
                  <div className="absolute bottom-4 right-4 text-6xl font-display opacity-5 group-hover:opacity-20 transition-opacity">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </div>
                </div>
              ))}
              <div className="flex-shrink-0 w-8 md:w-16 h-auto"></div>
            </div>

            {/* Download Resume Link */}
            <div className="mt-8 flex justify-end">
              <a 
                href="/Hani_Hassan_UI_UX_Resume.pdf" 
                download 
                className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-4 font-bold uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-colors duration-300 group shadow-[5px_5px_0px_0px_hsl(var(--primary))] hover:translate-x-1 hover:translate-y-1 hover:shadow-none grunge-jitter"
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
              >
                <Download className="group-hover:animate-bounce" size={20} />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
