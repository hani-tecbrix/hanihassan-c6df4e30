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

    const cardWidth = 384; // approx width of each card (w-96)
    let animationId: number;
    let lastTime = 0;
    const speed = 50; // pixels per second

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

  return (
    <section id="journey" className="py-24 px-4 md:px-12 bg-card relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="hidden md:flex flex-col justify-between w-24 border-r border-border pr-6">
            <div className="h-full relative">
              <h2 className="text-8xl font-display tracking-tighter uppercase origin-top-left rotate-90 absolute top-0 left-8 whitespace-nowrap stroke-text">
                The Journey
              </h2>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-4xl md:text-7xl font-bold leading-tight mb-16">
              FROM GRAPHIC ROOTS TO <br />
              <span className="text-primary">AI-DRIVEN UX STRATEGY.</span>
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
                  className="flex-shrink-0 w-[85vw] sm:w-80 md:w-96 border-r border-b border-foreground p-8 md:p-12 hover:bg-primary hover:text-primary-foreground transition-colors duration-500 relative snap-start group"
                  onMouseEnter={onHoverStart}
                  onMouseLeave={onHoverEnd}
                >
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-xs md:text-sm font-mono border border-current px-2 py-1 rounded-full">{job.period}</span>
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
                className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-4 font-bold uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-colors duration-300 group shadow-[5px_5px_0px_0px_hsl(var(--primary))] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
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
