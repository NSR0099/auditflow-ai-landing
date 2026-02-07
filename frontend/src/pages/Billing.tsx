import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Check } from "lucide-react";

const Billing = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-2xl font-bold text-foreground">Billing</h1>

        <Card className="border-border/60">
          <CardHeader className="border-b border-border/40 bg-gradient-to-r from-primary/5 to-accent/20">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Current Plan</CardTitle>
                <CardDescription>Professional — ₹14,999/month</CardDescription>
              </div>
              <Badge className="bg-success/10 text-success border-success/30">Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-success" /> Up to 5,000 invoices/month
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-success" /> Advanced AI fraud detection
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-success" /> Priority support
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-success" /> Up to 10 users
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="gap-2">
                <CreditCard className="h-4 w-4" /> Manage Subscription
              </Button>
              <Button variant="outline">View Invoices</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Billing;
