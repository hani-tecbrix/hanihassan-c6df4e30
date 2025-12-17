const Marquee = () => {
  return (
    <div className="bg-foreground text-background py-6 overflow-hidden whitespace-nowrap border-y border-primary">
      <div className="inline-flex animate-marquee">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="text-4xl md:text-6xl font-display uppercase tracking-tighter mx-8 flex items-center gap-4">
            Digital Innovation <span className="text-primary text-2xl">●</span> AI Strategy <span className="text-primary text-2xl">●</span> UX Engineering <span className="text-primary text-2xl">●</span> Branding <span className="text-primary text-2xl">●</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
