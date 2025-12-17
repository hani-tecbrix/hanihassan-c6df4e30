import { Download } from 'lucide-react';

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
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
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
            <h2 className="text-6xl md:text-8xl font-display tracking-tighter leading-[0.9]">
              BOLD<br />
              COMMUNICATION<br />
              <span className="stroke-text-white">IMPACT</span>
            </h2>
            <p className="text-xl md:text-2xl opacity-70 max-w-md">
              Creating digital experiences that merge the precision of engineering with the soul of communication design.
            </p>

            <a
              href="#"
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
