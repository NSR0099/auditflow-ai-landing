import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Building2, FileText } from "lucide-react";

const Profile = () => {
  const { isLoggedIn, user, updateProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    ownerName: user?.ownerName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const initials = user?.ownerName
    ? user.ownerName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-2xl font-bold text-foreground">Profile</h1>

        <Card className="border-border/60">
          <CardHeader className="border-b border-border/40 bg-gradient-to-r from-primary/5 to-accent/20">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-lg text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">{user?.ownerName}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  {user?.businessName}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5 text-muted-foreground">
                  <User className="h-3.5 w-3.5" /> Owner Name
                </Label>
                {editing ? (
                  <Input name="ownerName" value={form.ownerName} onChange={handleChange} />
                ) : (
                  <p className="rounded-md bg-muted/50 px-3 py-2 text-sm text-foreground">{user?.ownerName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5 text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" /> Email
                </Label>
                {editing ? (
                  <Input name="email" value={form.email} onChange={handleChange} />
                ) : (
                  <p className="rounded-md bg-muted/50 px-3 py-2 text-sm text-foreground">{user?.email || "Not set"}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5 text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" /> Phone
                </Label>
                {editing ? (
                  <Input name="phone" value={form.phone} onChange={handleChange} />
                ) : (
                  <p className="rounded-md bg-muted/50 px-3 py-2 text-sm text-foreground">{user?.phone || "Not set"}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> Location
                </Label>
                {editing ? (
                  <Input name="location" value={form.location} onChange={handleChange} />
                ) : (
                  <p className="rounded-md bg-muted/50 px-3 py-2 text-sm text-foreground">{user?.location || "Not set"}</p>
                )}
              </div>
            </div>

            {/* Read-only fields */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5 text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5" /> Business Name
                </Label>
                <p className="rounded-md bg-muted/50 px-3 py-2 text-sm text-foreground">{user?.businessName}</p>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5 text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" /> Registration No.
                </Label>
                <p className="rounded-md bg-muted/50 px-3 py-2 text-sm text-foreground">{user?.registrationNo}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              {editing ? (
                <>
                  <Button onClick={handleSave}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
                </>
              ) : (
                <Button onClick={() => setEditing(true)}>Edit Profile</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
