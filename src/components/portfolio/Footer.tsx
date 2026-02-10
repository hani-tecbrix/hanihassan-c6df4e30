import { Mail, Calendar, Linkedin, MessageCircle } from 'lucide-react';
import { BehanceIcon, XIcon } from './SocialIcons';

interface FooterProps {
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const Footer = ({ onHoverStart, onHoverEnd }: FooterProps) => {
  const socials = [
    { Icon: Linkedin, href: "https://linkedin.com/in/greenhani" },
    { Icon: XIcon, href: "https://x.com/greenhani" },
    { Icon: BehanceIcon, href: "https://behance.net/greenhani" }
  ];

  return (
    <footer id="contact" className="bg-foreground text-background pt-24 pb-12 px-4 md:px-12 relative overflow-hidden screen-print">
      {/* Grunge collage overlays */}
      <div className="absolute inset-0 halftone-overlay pointer-events-none opacity-60"></div>
      <div className="absolute inset-0 ink-splatter opacity-20 pointer-events-none"></div>
      
      {/* Tape strips */}
      <div className="absolute top-6 left-1/4 w-32 h-5 tape-strip opacity-30 hidden md:block collage-float" style={{ '--float-rotate': '2deg' } as React.CSSProperties}></div>
      <div className="absolute top-16 right-16 w-20 h-4 tape-strip opacity-25 hidden md:block" style={{ transform: 'rotate(-5deg)' }}></div>
      
      {/* Paper scraps */}
      <div className="absolute bottom-1/3 right-8 w-16 h-12 bg-background/5 rotate-[18deg] border border-background/10 pointer-events-none hidden md:block collage-float" style={{ '--float-rotate': '18deg', animationDelay: '1.5s' } as React.CSSProperties}></div>
      <div className="absolute top-1/2 left-4 w-10 h-16 bg-primary/8 -rotate-[10deg] border border-primary/15 pointer-events-none hidden md:block collage-float" style={{ '--float-rotate': '-10deg', animationDelay: '3s' } as React.CSSProperties}></div>

      {/* Distressed top border */}
      <div className="absolute top-0 left-0 w-full h-1 distressed-border border-t-2 border-primary"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 relative z-10">
        <div>
          <h2 className="text-[12vw] leading-none font-display tracking-tighter text-primary mix-blend-screen hover:skew-x-6 transition-transform origin-left cursor-default grunge-jitter">
            LET'S TALK
          </h2>
          <div className="mt-8 flex flex-col gap-4 text-xl md:text-2xl font-light">
            <div className="flex items-center gap-6 flex-wrap">
              <a
                href="mailto:inbox@hanihassan.com"
                className="hover:text-primary transition-colors flex items-center gap-3 group"
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
              >
                <Mail className="group-hover:rotate-12 transition-transform" /> inbox@hanihassan.com
              </a>
              <a
                href="https://wa.me/923074457776"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-3 group"
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
              >
                <MessageCircle className="group-hover:rotate-12 transition-transform" /> +92 307 445 7776
              </a>
            </div>
            <a
              href="https://calendly.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-3 group stamp-effect w-fit"
              onMouseEnter={onHoverStart}
              onMouseLeave={onHoverEnd}
            >
              <Calendar className="group-hover:rotate-12 transition-transform" /> Book a Strategy Call
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6 items-start md:items-end">
          <div className="flex gap-4">
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-border rounded-full flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300 grunge-jitter"
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
              >
                <social.Icon width={20} height={20} />
              </a>
            ))}
          </div>
          <p className="text-sm opacity-40 font-mono stamp-effect">© 2048 Hani Hassan. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
