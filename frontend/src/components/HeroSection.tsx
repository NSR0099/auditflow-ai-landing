import { ArrowRight, ScanLine, FileSearch, ShieldCheck, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";

import DynamicBackground from "@/components/DynamicBackground";

const HeroSection = () => {
  const { isLoggedIn } = useAuth();
  return (
    <section className="relative overflow-hidden bg-primary pb-20 pt-10">
      {/* Glow Effect */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-accent/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Financial Risk Intelligence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            AI-Powered Financial Intelligence{" "}
            <span className="text-accent block mt-2">
              for the Modern Enterprise.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 sm:text-xl"
          >
            See 100% of your data. Detect fraud instantly. Ensure compliance with confidence using our autonomous auditing agent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            {isLoggedIn ? (
              <Button size="lg" className="h-12 gap-2 rounded-md bg-accent px-8 text-base font-bold text-accent-foreground hover:bg-accent/90 shadow-[0_0_20px_-5px_hsl(var(--accent))]" asChild>
                <Link to="/dashboard">
                  <LayoutDashboard className="h-5 w-5" />
                  Go to Dashboard
                </Link>
              </Button>
            ) : (
              <Button size="lg" className="h-12 gap-2 rounded-md bg-accent px-8 text-base font-bold text-accent-foreground hover:bg-accent/90 shadow-[0_0_20px_-5px_hsl(var(--accent))]" asChild>
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            )}
            <Button size="lg" variant="outline" className="h-12 gap-2 rounded-md border-primary-foreground/20 bg-transparent px-8 text-base font-bold text-white hover:bg-primary-foreground/10 hover:text-white" asChild>
              <a href="#features">See Features</a>
            </Button>
          </motion.div>
        </div>

        {/* Stats bar - Integrated into Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {[
            { icon: ScanLine, value: "99.9%", label: "Transaction Coverage" },
            { icon: FileSearch, value: "0.01%", label: "False Positive Rate" },
            { icon: ShieldCheck, value: "100%", label: "Audit Readiness" },
          ].map((stat) => (
            <div key={stat.label} className="group rounded-md border border-primary-foreground/10 bg-primary-foreground/5 p-6 text-center backdrop-blur-sm transition-all hover:border-accent/50">
              <div className="flex flex-col items-center justify-center gap-3">
                <stat.icon className="h-8 w-8 text-accent" />
                <span className="text-3xl font-bold text-white tracking-tight">{stat.value}</span>
              </div>
              <p className="mt-2 text-sm font-medium text-primary-foreground/60 uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
