import { motion } from "framer-motion";
import {
  ScanLine,
  ShieldAlert,
  BarChart3,
  Zap,
  FileCheck,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: ScanLine,
    title: "Intelligent Invoice Scanning",
    description: "Automatically extract, validate, and reconcile invoice data with 99.7% accuracy using advanced OCR and AI models.",
    iconBg: "bg-primary/10 text-primary group-hover:bg-primary",
  },
  {
    icon: ShieldAlert,
    title: "Fraud Detection Engine",
    description: "Detect duplicate invoices, suspicious patterns, and anomalies in real-time before they impact your bottom line.",
    iconBg: "bg-destructive/10 text-destructive group-hover:bg-destructive",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Comprehensive dashboards with actionable insights into cash flow, spending trends, and audit health scores.",
    iconBg: "bg-success/10 text-success group-hover:bg-success",
  },
  {
    icon: Zap,
    title: "Automated Reconciliation",
    description: "Match transactions across bank statements, ledgers, and invoices automatically — saving hours of manual effort.",
    iconBg: "bg-gold/10 text-gold group-hover:bg-gold",
  },
  {
    icon: FileCheck,
    title: "Compliance & Reporting",
    description: "Generate audit-ready reports compliant with GST, SOX, and IFRS standards with one click.",
    iconBg: "bg-primary/10 text-primary group-hover:bg-primary",
  },
  {
    icon: Globe,
    title: "Multi-Currency Support",
    description: "Handle international transactions with real-time exchange rate conversion and multi-jurisdiction tax compliance.",
    iconBg: "bg-success/10 text-success group-hover:bg-success",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24 sm:py-32 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-md bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            Features
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Everything you need for <br className="hidden sm:block" />
            intelligent auditing.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Our AI-powered platform handles the heavy lifting so your finance
            team can focus on strategy, not spreadsheets.
          </p>
        </div>

        <motion.div
          className="mx-auto mt-20 grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group relative overflow-hidden rounded-md border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-accent/30 hover:-translate-y-1"
            >
              <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-md transition-colors duration-300 bg-secondary group-hover:bg-accent`}>
                <feature.icon className="h-7 w-7 text-accent group-hover:text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold text-primary">
                {feature.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
