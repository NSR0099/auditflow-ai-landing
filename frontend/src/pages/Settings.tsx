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
import { Bell, Shield, Palette, Globe } from "lucide-react";

const settingsItems = [
  {
    icon: Bell,
    title: "Notifications",
    description: "Manage email and push notification preferences",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Two-factor authentication and password settings",
  },
  {
    icon: Palette,
    title: "Appearance",
    description: "Theme, language, and display preferences",
  },
  {
    icon: Globe,
    title: "Integrations",
    description: "Connect with ERP, accounting software, and APIs",
  },
];

const Settings = () => {
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
        <h1 className="mb-8 text-2xl font-bold text-foreground">Settings</h1>

        <div className="grid gap-4">
          {settingsItems.map((item) => (
            <Card
              key={item.title}
              className="cursor-pointer border-border/60 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription className="text-sm">{item.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Settings;
