import { useState, useEffect } from 'react';
import CaseStudySheet from '@/components/portfolio/CaseStudySheet';
import ContactSheet from '@/components/portfolio/ContactSheet';
import GenerativeCanvas from '@/components/portfolio/GenerativeCanvas';
import CustomCursor from '@/components/portfolio/CustomCursor';
import Navigation from '@/components/portfolio/Navigation';
import HeroSection from '@/components/portfolio/HeroSection';
import Marquee from '@/components/portfolio/Marquee';
import JourneySection from '@/components/portfolio/JourneySection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import WorkShowcase from '@/components/portfolio/WorkShowcase';
import ProfileSection from '@/components/portfolio/ProfileSection';
import Footer from '@/components/portfolio/Footer';

interface Project {
  image: string;
  title: string;
  category: string;
  description: string;
}

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleHoverStart = () => setIsHovering(true);
  const handleHoverEnd = () => setIsHovering(false);

  return (
    <div className="bg-background min-h-screen font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden relative text-foreground">
      {/* Sheets */}
      <CaseStudySheet project={selectedProject} onClose={() => setSelectedProject(null)} />
      <ContactSheet isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Custom Cursor */}
      <CustomCursor mousePosition={mousePosition} isHovering={isHovering} />

      {/* Noise Overlay */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-40 noise-overlay"></div>

      {/* Navigation */}
      <Navigation onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd} />

      {/* Hero */}
      <HeroSection scrollY={scrollY} onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd} />

      {/* Marquee */}
      <Marquee />

      {/* Journey */}
      <JourneySection onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd} />

      {/* Skills */}
      <SkillsSection onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd} />

      {/* Work */}
      <WorkShowcase onSelectProject={setSelectedProject} />

      {/* Profile */}
      <ProfileSection onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd} />

      {/* Snake Game */}
      <section className="border-t border-primary">
        <div className="bg-surface-dark py-8 text-center border-b border-primary/20">
          <h3 className="text-primary font-mono tracking-widest uppercase">The Concept Consumer</h3>
          <p className="text-muted-foreground text-xs mt-1">Collect the 7 Steps of Innovation</p>
        </div>
        <GenerativeCanvas onComplete={() => setIsContactOpen(true)} />
      </section>

      {/* Footer */}
      <Footer onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd} />
    </div>
  );
};

export default Index;
