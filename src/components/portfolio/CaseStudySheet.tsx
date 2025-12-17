import { useState, useEffect } from 'react';
import { X, MoveUpRight, Hash, Zap, TrendingUp } from 'lucide-react';

interface Project {
  image: string;
  title: string;
  category: string;
  description: string;
}

interface CaseStudySheetProps {
  project: Project | null;
  onClose: () => void;
}

const CaseStudySheet = ({ project, onClose }: CaseStudySheetProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (project) {
      setTimeout(() => setIsVisible(true), 10);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }
  }, [project]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500);
  };

  if (!project) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex justify-end transition-colors duration-500 ${isVisible ? 'bg-black/60 backdrop-blur-sm' : 'bg-transparent pointer-events-none'}`}>
      <div className="absolute inset-0" onClick={handleClose}></div>
      <div className={`relative w-full md:w-[60vw] lg:w-[50vw] h-full bg-surface-darker text-secondary-foreground overflow-y-auto shadow-2xl transform transition-transform duration-500 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={handleClose} className="absolute top-6 right-6 z-50 p-2 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 group">
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
        <div className="w-full h-[40vh] relative overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-darker to-transparent"></div>
          <div className="absolute bottom-8 left-8 md:left-12">
            <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-bold font-mono uppercase tracking-widest mb-4 inline-block">{project.category}</span>
            <h2 className="text-5xl md:text-7xl font-display uppercase leading-none tracking-tighter mt-2">{project.title}</h2>
          </div>
        </div>
        <div className="p-8 md:p-12 space-y-12">
          <div className="flex flex-wrap gap-8 border-b border-secondary pb-8">
            <div><h4 className="text-muted-foreground text-xs font-mono uppercase tracking-widest mb-1">Role</h4><p className="font-bold">Lead Product Designer</p></div>
            <div><h4 className="text-muted-foreground text-xs font-mono uppercase tracking-widest mb-1">Timeline</h4><p className="font-bold">3 Months</p></div>
            <div><h4 className="text-muted-foreground text-xs font-mono uppercase tracking-widest mb-1">Tech</h4><p className="font-bold">Figma, React, Python</p></div>
          </div>
          <div className="group">
            <h3 className="text-2xl font-display uppercase text-primary mb-4 flex items-center gap-2"><Hash size={20} /> The Challenge</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">{project.description}</p>
          </div>
          <div>
            <h3 className="text-2xl font-display uppercase text-primary mb-4 flex items-center gap-2"><Zap size={20} /> The Solution</h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">We implemented a radical, AI-driven design system that adapts to user behavior in real-time.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary p-4 border border-border"><h5 className="font-bold text-secondary-foreground mb-1">Generative UI</h5><p className="text-sm text-muted-foreground">Dynamic layouts based on content density.</p></div>
              <div className="bg-secondary p-4 border border-border"><h5 className="font-bold text-secondary-foreground mb-1">Neuromorphic Design</h5><p className="text-sm text-muted-foreground">Soft, organic interactions that feel natural.</p></div>
            </div>
          </div>
          <div className="bg-primary p-8 text-primary-foreground -mx-8 md:-mx-12">
            <h3 className="text-xl font-display uppercase mb-6 flex items-center gap-2 border-b border-primary-foreground/20 pb-4"><TrendingUp size={20} /> Impact Metrics</h3>
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center"><div className="text-4xl md:text-5xl font-display">140%</div><div className="text-xs font-mono uppercase tracking-widest mt-1 opacity-70">Engagement</div></div>
              <div className="text-center"><div className="text-4xl md:text-5xl font-display">2.5s</div><div className="text-xs font-mono uppercase tracking-widest mt-1 opacity-70">Load Time</div></div>
              <div className="text-center"><div className="text-4xl md:text-5xl font-display">50k+</div><div className="text-xs font-mono uppercase tracking-widest mt-1 opacity-70">Daily Users</div></div>
            </div>
          </div>
          <div className="pt-8">
            <button className="w-full py-6 border border-border hover:bg-secondary-foreground hover:text-secondary transition-colors duration-300 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">View Live Project <MoveUpRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudySheet;
