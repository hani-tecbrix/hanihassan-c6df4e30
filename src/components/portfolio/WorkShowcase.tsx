import { Eye } from 'lucide-react';

interface Project {
  image: string;
  title: string;
  category: string;
  description: string;
}

interface WorkShowcaseProps {
  onSelectProject: (project: Project) => void;
}

const workImages = {
  branding: [
    { url: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop", title: "Apex FinTech", category: "Branding" },
    { url: "https://images.unsplash.com/photo-1626785774573-4b799314346d?q=80&w=600&auto=format&fit=crop", title: "Neon Energy", category: "Branding" },
    { url: "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=600&auto=format&fit=crop", title: "Flux Arch", category: "Branding" },
    { url: "https://images.unsplash.com/photo-1541560052-77ec1bbc09f7?q=80&w=600&auto=format&fit=crop", title: "Urban Pulse", category: "Branding" }
  ],
  app: [
    { url: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=600&auto=format&fit=crop", title: "Zenith Health", category: "App Design" },
    { url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=600&auto=format&fit=crop", title: "Crypto Flow", category: "Web App" },
    { url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop", title: "Skyline Realty", category: "Mobile" },
    { url: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=600&auto=format&fit=crop", title: "Dash Logistics", category: "SaaS" }
  ],
  social: [
    { url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop", title: "Vogue Campaign", category: "Social" },
    { url: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=600&auto=format&fit=crop", title: "Tech Launch", category: "Social" },
    { url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop", title: "Eco Aware", category: "Social" },
    { url: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=600&auto=format&fit=crop", title: "Music Fest", category: "Social" }
  ]
};

const WorkShowcase = ({ onSelectProject }: WorkShowcaseProps) => {
  const handleClick = (item: typeof workImages.branding[0], description: string) => {
    onSelectProject({
      image: item.url,
      title: item.title,
      category: item.category,
      description
    });
  };

  return (
    <section id="work" className="py-32 bg-card overflow-hidden relative">
      <div className="absolute top-0 right-0 p-12 z-20 pointer-events-none">
        <h2 className="text-8xl font-display tracking-tighter stroke-text opacity-20 uppercase">Selected Work</h2>
      </div>

      <div className="transform -rotate-6 scale-110 -my-12">
        {/* Row 1: Branding */}
        <div className="flex gap-8 mb-8 animate-marquee-slow">
          {[...workImages.branding, ...workImages.branding, ...workImages.branding].map((item, i) => (
            <div
              key={`brand-${i}`}
              onClick={() => handleClick(item, "A comprehensive rebranding initiative focused on modernizing the visual identity while retaining core brand values. We developed a cohesive design system that scales across digital and physical touchpoints.")}
              className="flex-shrink-0 w-80 h-52 bg-muted overflow-hidden shadow-lg border-2 border-foreground group relative cursor-pointer"
            >
              <img src={item.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" alt={item.title} />
              <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Eye className="text-background" size={32} />
              </div>
              <div className="absolute bottom-0 left-0 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 uppercase z-10">{item.title}</div>
            </div>
          ))}
        </div>

        {/* Row 2: Apps */}
        <div className="flex gap-8 mb-8 animate-marquee-reverse">
          {[...workImages.app, ...workImages.app, ...workImages.app].map((item, i) => (
            <div
              key={`app-${i}`}
              onClick={() => handleClick(item, "Designed a mobile-first experience prioritizing speed and accessibility. The app features intuitive navigation patterns and a simplified user flow that reduced drop-off rates by 40%.")}
              className="flex-shrink-0 w-96 h-64 bg-muted overflow-hidden shadow-lg border-2 border-foreground group relative cursor-pointer"
            >
              <img src={item.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" alt={item.title} />
              <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Eye className="text-background" size={32} />
              </div>
              <div className="absolute bottom-0 left-0 bg-foreground text-primary text-xs font-bold px-2 py-1 uppercase z-10">{item.title}</div>
            </div>
          ))}
        </div>

        {/* Row 3: Social */}
        <div className="flex gap-8 animate-marquee">
          {[...workImages.social, ...workImages.social, ...workImages.social].map((item, i) => (
            <div
              key={`social-${i}`}
              onClick={() => handleClick(item, "High-impact social media campaign designed to stop the scroll. We utilized bold typography and kinetic motion graphics to drive engagement across Instagram and TikTok.")}
              className="flex-shrink-0 w-72 h-72 bg-muted overflow-hidden shadow-lg border-2 border-foreground group relative cursor-pointer"
            >
              <img src={item.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" alt={item.title} />
              <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Eye className="text-background" size={32} />
              </div>
              <div className="absolute bottom-0 left-0 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 uppercase z-10">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkShowcase;
