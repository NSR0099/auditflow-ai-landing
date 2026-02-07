const logos = [
  "Acme Corp",
  "Globex",
  "Soylent",
  "Initech",
  "Umbrella",
  "Hooli",
];

const TrustSignals = () => {
  return (
    <section className="bg-background py-10 border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Trusted by leading audit firms
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((name) => (
            <span
              key={name}
              className="select-none text-xl font-bold tracking-tight text-muted-foreground hover:text-primary transition-colors"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
