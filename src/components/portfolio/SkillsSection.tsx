import { Cpu, Layers, Award, Zap } from 'lucide-react';

interface SkillsSectionProps {
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const skills = [
  { icon: <Cpu size={40} />, title: "Artificial Intelligence", desc: "Blending aesthetics with data-driven AI strategy." },
  { icon: <Layers size={40} />, title: "User Experience", desc: "Research-backed flows and intuitive architectures." },
  { icon: <Award size={40} />, title: "Brand Identity", desc: "Visual storytelling that cuts through the noise." },
  { icon: <Zap size={40} />, title: "Prototyping", desc: "High-fidelity interactions in Figma & Code." }
];

// Collage-style rotations for each card
const cardRotations = [-1.5, 1, -0.8, 1.3];
const cardOffsets = [0, 6, -4, 8];

const SkillsSection = ({ onHoverStart, onHoverEnd }: SkillsSectionProps) => {
  return (
    <section id="about" className="py-24 bg-primary text-primary-foreground relative overflow-hidden halftone-overlay">
      {/* Grunge collage decorative elements */}
      <div className="absolute inset-0 screen-print opacity-40 pointer-events-none"></div>
      
      {/* Tape strips */}
      <div className="absolute top-12 left-16 w-36 h-5 tape-strip opacity-40 hidden md:block collage-float" style={{ '--float-rotate': '-3deg' } as React.CSSProperties}></div>
      <div className="absolute bottom-20 right-24 w-24 h-4 tape-strip opacity-30 hidden md:block" style={{ transform: 'rotate(6deg)' }}></div>
      
      {/* Ink splatter */}
      <div className="absolute top-0 right-0 w-80 h-80 ink-splatter opacity-40 pointer-events-none"></div>
      
      {/* Paper scraps */}
      <div className="absolute top-1/4 right-12 w-14 h-10 bg-foreground/5 rotate-[20deg] border border-foreground/10 pointer-events-none hidden md:block collage-float" style={{ '--float-rotate': '20deg', animationDelay: '1s' } as React.CSSProperties}></div>
      <div className="absolute bottom-1/3 left-8 w-10 h-14 bg-foreground/5 -rotate-[12deg] border border-foreground/10 pointer-events-none hidden md:block collage-float" style={{ '--float-rotate': '-12deg', animationDelay: '2.5s' } as React.CSSProperties}></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-10">
        <span className="text-[25vw] font-display uppercase leading-none">SKILLS</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="bg-foreground text-primary px-6 py-2 text-xl md:text-3xl font-mono uppercase tracking-widest mb-6 -rotate-2 inline-block stamp-effect grunge-jitter">Methodology</h2>
          <p className="text-3xl md:text-5xl font-bold max-w-[720px] leading-tight">
            "Design is not just what it looks like. <span className="bg-card text-foreground px-2 -rotate-1 inline-block">Design is how it works.</span>"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="bg-card text-foreground p-8 h-80 flex flex-col justify-between hover:-translate-y-4 transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-foreground relative grunge-jitter"
              style={{ transform: `rotate(${cardRotations[idx]}deg)`, marginTop: `${cardOffsets[idx]}px` }}
              onMouseEnter={onHoverStart}
              onMouseLeave={onHoverEnd}
            >
              {/* Tape strip on top */}
              {idx % 2 === 0 && (
                <div className="absolute -top-2.5 left-6 w-14 h-4 tape-strip z-10"></div>
              )}
              {/* Pin on others */}
              {idx % 2 !== 0 && (
                <div className="absolute -top-1.5 right-6 w-3 h-3 rounded-full bg-primary shadow-md z-10 border border-primary-foreground/30"></div>
              )}
              
              {/* Torn corner */}
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary/10 rotate-45 origin-bottom-right translate-x-1/2 translate-y-1/2"></div>
              
              <div className="text-primary">{skill.icon}</div>
              <div>
                <h3 className="text-2xl font-display uppercase mb-2 leading-none">{skill.title}</h3>
                <p className="text-sm font-medium opacity-70">{skill.desc}</p>
              </div>
              <div className="w-full h-1 bg-foreground/10 mt-4 overflow-hidden">
                <div className="h-full bg-foreground w-1/3 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 flex flex-wrap justify-between items-center font-mono font-bold text-lg md:text-2xl gap-4 distressed-border border-t-2">
          <span>TOOLS:</span>
          <span className="stamp-effect">FIGMA</span>
          <span>ADOBE SUITE</span>
          <span className="stamp-effect">HTML5 / CSS3</span>
          <span>REACT</span>
          <span className="stamp-effect">TAILWIND</span>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
