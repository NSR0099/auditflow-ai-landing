import { useState, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { ShieldCheck, ArrowLeft, Send, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";
import { addSignup } from "@/lib/auth";

const HCAPTCHA_SITE_KEY = "10000000-ffff-ffff-ffff-000000000000";

const SignUp = () => {
  const navigate = useNavigate();
  const captchaRef = useRef<HCaptcha>(null);

  const [form, setForm] = useState({
    ownerName: "",
    businessName: "",
    email: "",
    phone: "",
    registrationNo: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onCaptchaVerify = useCallback((token: string) => {
    setCaptchaToken(token);
    setCaptchaError(false);
  }, []);

  const onCaptchaExpire = useCallback(() => {
    setCaptchaToken(null);
  }, []);

  const onCaptchaError = useCallback(() => {
    setCaptchaError(true);
    setCaptchaToken(null);
  }, []);

  const handleCaptchaBypass = () => {
    setCaptchaToken("bypass-preview-mode");
    setCaptchaError(false);
    toast({
      title: "Captcha Bypassed",
      description: "Captcha verification skipped (preview mode). Will work on published site.",
    });
  };

  const isFieldsValid =
    form.ownerName.trim() &&
    form.businessName.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.registrationNo.trim() &&
    form.location.trim() &&
    form.password.trim() &&
    form.confirmPassword.trim();

  const isFormValid = isFieldsValid && captchaToken;

  const handleSendOtp = () => {
    if (!isFormValid) {
      toast({
        title: "Incomplete form",
        description: "Please fill all fields and complete the captcha.",
        variant: "destructive",
      });
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please re-enter.",
        variant: "destructive",
      });
      return;
    }
    if (form.password.length < 8) {
      toast({
        title: "Weak password",
        description: "Password must be at least 8 characters.",
        variant: "destructive",
      });
      return;
    }
    setOtpSent(true);
    toast({
      title: "OTP Sent",
      description: `A verification code has been sent to ${form.phone}.`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      addSignup({
        ownerName: form.ownerName,
        businessName: form.businessName,
        email: form.email,
        phone: form.phone,
        registrationNo: form.registrationNo,
        location: form.location,
        password: form.password,
      });
      setLoading(false);
      toast({
        title: "Account Created!",
        description: "Welcome to VyaparAI. Redirecting to login…",
      });
      setTimeout(() => navigate("/login"), 1500);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-secondary/30 via-background to-accent/20" />

      <header className="border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-foreground">VyaparAI</span>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-xl shadow-primary/5">
            <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Register your business with VyaparAI</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input id="ownerName" name="ownerName" placeholder="John Doe" value={form.ownerName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" name="businessName" placeholder="Acme Corp" value={form.businessName} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="john@acme.com" value={form.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="registrationNo">Registration No.</Label>
                  <Input id="registrationNo" name="registrationNo" placeholder="GST/CIN number" value={form.registrationNo} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" placeholder="Mumbai, India" value={form.location} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Min 8 characters"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* hCaptcha with fallback */}
              <div className="flex flex-col items-center gap-3 pt-2">
                {captchaToken && !captchaError ? (
                  <div className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/5 px-4 py-3 text-sm text-success">
                    <CheckCircle2 className="h-5 w-5" />
                    Captcha verified
                  </div>
                ) : (
                  <>
                    <HCaptcha
                      sitekey={HCAPTCHA_SITE_KEY}
                      onVerify={onCaptchaVerify}
                      onExpire={onCaptchaExpire}
                      onError={onCaptchaError}
                      ref={captchaRef}
                    />
                    {captchaError && (
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-2">
                          Captcha couldn't load (common in preview/iframe environments)
                        </p>
                        <Button type="button" variant="outline" size="sm" onClick={handleCaptchaBypass} className="gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Bypass for Preview
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {!otpSent ? (
                <Button type="button" className="w-full gap-2" size="lg" onClick={handleSendOtp} disabled={!isFormValid}>
                  <Send className="h-4 w-4" />
                  Send OTP
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Enter OTP</Label>
                    <p className="text-xs text-muted-foreground">
                      A 6-digit code was sent to {form.phone} — enter any 6 digits for demo
                    </p>
                    <div className="flex justify-center">
                      <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? "Creating Account…" : "Verify & Sign Up"}
                  </Button>
                </div>
              )}
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
