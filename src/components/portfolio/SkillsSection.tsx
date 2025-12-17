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

const SkillsSection = ({ onHoverStart, onHoverEnd }: SkillsSectionProps) => {
  return (
    <section id="about" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-10">
        <span className="text-[25vw] font-display uppercase leading-none">SKILLS</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="bg-foreground text-primary px-6 py-2 text-xl md:text-3xl font-mono uppercase tracking-widest mb-6 -rotate-2 inline-block">Methodology</h2>
          <p className="text-3xl md:text-5xl font-bold max-w-[720px] leading-tight">
            "Design is not just what it looks like. <span className="bg-card text-foreground px-2">Design is how it works.</span>"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="bg-card text-foreground p-8 h-80 flex flex-col justify-between hover:-translate-y-4 transition-transform duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-foreground"
              onMouseEnter={onHoverStart}
              onMouseLeave={onHoverEnd}
            >
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

        <div className="mt-16 border-t-2 border-foreground pt-8 flex flex-wrap justify-between items-center font-mono font-bold text-lg md:text-2xl gap-4">
          <span>TOOLS:</span>
          <span>FIGMA</span>
          <span>ADOBE SUITE</span>
          <span>HTML5 / CSS3</span>
          <span>REACT</span>
          <span>TAILWIND</span>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
