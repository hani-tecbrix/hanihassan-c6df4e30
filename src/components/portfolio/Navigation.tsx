interface NavigationProps {
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const Navigation = ({ onHoverStart, onHoverEnd }: NavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-6 md:p-10 z-40 mix-blend-exclusion text-background">
      <div
        className="text-xl font-bold tracking-tighter"
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
      >
        HH.
      </div>
      <div className="flex gap-6 text-sm font-medium tracking-widest uppercase">
        <a
          href="#journey"
          className="hover:text-primary transition-colors"
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
        >
          Journey
        </a>
        <a
          href="#work"
          className="hover:text-primary transition-colors"
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
        >
          Work
        </a>
        <a
          href="#about"
          className="hover:text-primary transition-colors"
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
        >
          About
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
