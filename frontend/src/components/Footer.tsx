import { ShieldCheck } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Documentation", "API Reference", "Support", "Status"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const Footer = () => {
  return (
    <footer className="border-t border-secondary-foreground/5 bg-secondary">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2">
              <ShieldCheck className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold text-secondary-foreground">
                AuditFlow.ai
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-secondary-foreground/50">
              AI-powered financial auditing for modern businesses. Detect fraud,
              automate reconciliation, and stay compliant.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-primary/80">
                {category}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-secondary-foreground/40 transition-colors hover:text-secondary-foreground">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-secondary-foreground/10 pt-8 sm:flex-row">
          <p className="text-xs text-secondary-foreground/30">
            © {new Date().getFullYear()} AuditFlow.ai. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-secondary-foreground/30 transition-colors hover:text-secondary-foreground">Privacy</a>
            <a href="#" className="text-xs text-secondary-foreground/30 transition-colors hover:text-secondary-foreground">Terms</a>
            <a href="#" className="text-xs text-secondary-foreground/30 transition-colors hover:text-secondary-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
