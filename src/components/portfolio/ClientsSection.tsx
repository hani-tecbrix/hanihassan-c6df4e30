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
  const topRow = clients.slice(0, 3);
  const bottomRow = clients.slice(3, 6);

  return (
    <section className="py-24 px-4 md:px-12 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-20">
          {/* Left side - Title */}
          <div className="lg:w-1/3 flex-shrink-0">
            <h2 className="text-3xl md:text-4xl font-display tracking-tight">
              Trusted Partners
            </h2>
            <p className="text-muted-foreground mt-4 text-sm md:text-base">
              Collaborating with innovative companies and tools
            </p>
          </div>

          {/* Right side - Logos in 2 rows */}
          <div className="lg:w-2/3 flex flex-col gap-8">
            <div className="flex flex-wrap justify-start items-center gap-8 md:gap-12">
              {topRow.map((client, idx) => (
                <div
                  key={idx}
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-500 group"
                  onMouseEnter={onHoverStart}
                  onMouseLeave={onHoverEnd}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-6 md:h-8 w-auto object-contain filter invert group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-start items-center gap-8 md:gap-12">
              {bottomRow.map((client, idx) => (
                <div
                  key={idx}
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-500 group"
                  onMouseEnter={onHoverStart}
                  onMouseLeave={onHoverEnd}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-6 md:h-8 w-auto object-contain filter invert group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
