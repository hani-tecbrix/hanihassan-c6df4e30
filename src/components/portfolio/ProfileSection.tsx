import { Download } from 'lucide-react';
import haniPhoto from '@/assets/hani_hassan.jpg';

interface ProfileSectionProps {
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const ProfileSection = ({ onHoverStart, onHoverEnd }: ProfileSectionProps) => {
  return (
    <section className="py-24 bg-surface-dark text-secondary-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative aspect-[3/4] bg-secondary overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <img
                src={haniPhoto}
                alt="Hani Hassan Portrait"
                className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-8 right-8 bg-primary text-primary-foreground p-4 font-display text-xl leading-none shadow-[5px_5px_0px_0px_white]">
                HANI<br />HASSAN
              </div>
            </div>
            <div className="absolute top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-primary"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-primary"></div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-display tracking-tight leading-[1.1]">
              Not just a designer.<br />
              A <span className="text-primary">System Thinker.</span>
            </h2>
            
            <div className="space-y-4 text-lg md:text-xl opacity-80 max-w-xl">
              <p>
                I started as a graphic designer, fell in love with code, and now I live in the space between. I don't just hand off designs; I build prototypes that function.
              </p>
              <p>
                My work is driven by a curiosity for what's next. Whether it's experimenting with Three.js or training custom LoRA models for UI generation, I'm always looking for the edge.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span className="text-primary">🎨</span> Visual
                </h3>
                <ul className="space-y-1 text-sm opacity-60">
                  <li>UI / Visual Design</li>
                  <li>3D & Motion</li>
                  <li>Branding</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span className="text-primary">💻</span> Technical
                </h3>
                <ul className="space-y-1 text-sm opacity-60">
                  <li>Front-end Dev</li>
                  <li>Creative Coding</li>
                  <li>Prompt Engineering</li>
                </ul>
              </div>
            </div>

            <a
              href="/Hani_Hassan_UI_UX_Resume.pdf"
              download="Hani_Hassan_UI_UX_Resume.pdf"
              className="bg-secondary-foreground text-secondary px-8 py-5 text-lg font-bold hover:bg-primary hover:text-primary-foreground transition-colors duration-300 flex items-center gap-3 w-fit group shadow-[5px_5px_0px_0px_hsl(var(--primary))] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              onMouseEnter={onHoverStart}
              onMouseLeave={onHoverEnd}
            >
              <Download className="group-hover:animate-bounce" size={24} /> DOWNLOAD RESUME
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
