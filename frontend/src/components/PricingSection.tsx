import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

const plans = [
  {
    name: "Starter",
    price: "₹4,999",
    period: "/month",
    description: "Perfect for small businesses just getting started.",
    features: [
      "Up to 500 invoices/month",
      "Basic fraud detection",
      "Email support",
      "GST compliance reports",
      "Single user access",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Professional",
    price: "₹14,999",
    period: "/month",
    description: "For growing teams that need powerful automation.",
    features: [
      "Up to 5,000 invoices/month",
      "Advanced AI fraud detection",
      "Priority support & onboarding",
      "Multi-currency support",
      "Up to 10 users",
      "Custom compliance reports",
      "API access",
    ],
    highlighted: true,
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions for large-scale operations.",
    features: [
      "Unlimited invoices",
      "Dedicated AI model training",
      "24/7 premium support",
      "On-premise deployment option",
      "Unlimited users",
      "Custom integrations",
      "SLA guarantee",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

const PricingSection = () => {
  const handleSubscribe = (planName: string) => {
    toast({
      title: "Plan Selected",
      description: `You have selected the ${planName} plan. Redirecting to payment...`,
    });
  };

  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-background">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            Pricing
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Plans that scale with your business
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free, upgrade when you're ready. No hidden fees.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 ${plan.highlighted
                ? "border-primary bg-gradient-to-b from-primary/5 via-card to-card shadow-xl shadow-primary/15 ring-2 ring-primary/20"
                : "border-border/60 bg-card shadow-sm hover:border-primary/20 hover:shadow-md"
                }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-primary/80 px-5 py-1 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/20">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.highlighted ? "default" : "outline"}
                size="lg"
                onClick={() => handleSubscribe(plan.name)}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
