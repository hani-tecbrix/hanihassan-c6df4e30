import { Mail, Calendar, Linkedin } from 'lucide-react';
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
    <footer id="contact" className="bg-foreground text-background pt-24 pb-12 px-4 md:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div>
          <h2 className="text-[12vw] leading-none font-display tracking-tighter text-primary mix-blend-screen hover:skew-x-6 transition-transform origin-left cursor-default">
            LET'S TALK
          </h2>
          <div className="mt-8 flex flex-col gap-4 text-xl md:text-2xl font-light">
            <a
              href="mailto:inbox@hanihassan.com"
              className="hover:text-primary transition-colors flex items-center gap-3 group"
              onMouseEnter={onHoverStart}
              onMouseLeave={onHoverEnd}
            >
              <Mail className="group-hover:rotate-12 transition-transform" /> inbox@hanihassan.com
            </a>
            <a
              href="https://calendly.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-3 group"
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
                className="w-12 h-12 border border-border rounded-full flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
              >
                <social.Icon width={20} height={20} />
              </a>
            ))}
          </div>
          <p className="text-sm opacity-40 font-mono">© 2048 Hani Hassan. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
