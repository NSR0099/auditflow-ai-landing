import { motion } from "framer-motion";
import { Upload, Brain, FileCheck, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Documents",
    description: "Drop your invoices, receipts, or bank statements. We support PDF, Excel, CSV, and image formats.",
  },
  {
    icon: Brain,
    step: "02",
    title: "AI Processes Data",
    description: "Our AI engine scans, extracts, and cross-references data points across all your documents in seconds.",
  },
  {
    icon: FileCheck,
    step: "03",
    title: "Review Findings",
    description: "Get a detailed report highlighting discrepancies, anomalies, and compliance gaps with suggested actions.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Take Action",
    description: "Approve findings, generate audit reports, and export data to your ERP or accounting software seamlessly.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Teal-navy gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary/10" />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent)) 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />

      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl">
            From upload to insight in minutes
          </h2>
          <p className="mt-4 text-lg text-secondary-foreground/50">
            Four simple steps to transform your financial auditing process.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="relative">
            <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent lg:left-1/2 lg:block" />

            <div className="space-y-12 lg:space-y-16">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`relative flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                >
                  <div className="flex-1 lg:text-left">
                    <div className={index % 2 === 1 ? "lg:text-right" : ""}>
                      <span className="text-sm font-bold text-primary">
                        Step {step.step}
                      </span>
                      <h3 className="mt-2 text-xl font-semibold text-secondary-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-md text-secondary-foreground/50">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-primary/40 bg-secondary shadow-lg shadow-primary/20">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>

                  <div className="hidden flex-1 lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
