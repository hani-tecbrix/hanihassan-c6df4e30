interface ClientsSectionProps {
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const clients = [
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
];

const ClientsSection = ({ onHoverStart, onHoverEnd }: ClientsSectionProps) => {
  return (
    <section className="py-24 px-4 md:px-12 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Trusted By</span>
          <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight mt-4">
            Brands I've Worked With
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center">
          {clients.map((client, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center p-6 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-500 group"
              onMouseEnter={onHoverStart}
              onMouseLeave={onHoverEnd}
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-8 md:h-10 w-auto object-contain filter invert group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
