import { useState } from "react";
import { ShieldCheck, Menu, X, LogOut, User, Settings, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = user?.ownerName
    ? user.ownerName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background shadow-sm">
      <div className="mx-auto flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary">
            <ShieldCheck className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">
            AuditFlow<span className="text-accent">.ai</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        {!isLoggedIn && (
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-muted-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {isLoggedIn && (
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              to="/dashboard"
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-accent"
            >
              Dashboard
            </Link>
          </nav>
        )}

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          {isLoggedIn ? (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 rounded-md border border-border p-1.5 pr-3 transition-colors hover:bg-muted">
                    <Avatar className="h-8 w-8 rounded-md">
                      <AvatarFallback className="bg-primary text-xs text-primary-foreground rounded-md">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-semibold text-foreground">
                      {user?.ownerName || "User"}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2 rounded-md" align="end">
                  <div className="mb-2 border-b border-border px-3 pb-2">
                    <p className="text-sm font-medium text-foreground">{user?.ownerName}</p>
                    <p className="text-xs text-muted-foreground">{user?.businessName}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-muted-foreground hover:text-accent">
                Log in
              </Link>
              <Button className="h-10 rounded-md bg-accent px-6 text-sm font-bold text-accent-foreground shadow-md shadow-accent/20 hover:bg-accent/90" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-4">
            {!isLoggedIn &&
              navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            {isLoggedIn && (
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-3 text-base font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-accent"
              >
                Dashboard
              </Link>
            )}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full gap-2 rounded-md h-11 border-input text-muted-foreground">
                    <User className="h-4 w-4" /> Profile
                  </Button>
                </Link>
                <Button variant="destructive" className="w-full gap-2 rounded-md h-11" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="w-full rounded-md h-11 border-input text-muted-foreground font-semibold" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="w-full rounded-md h-11 bg-accent text-accent-foreground font-bold shadow-md hover:bg-accent/90" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
