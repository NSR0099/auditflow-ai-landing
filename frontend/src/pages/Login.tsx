import { useState, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { ShieldCheck, ArrowLeft, LogIn, Send, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";
import { lookupBusiness, useAuth } from "@/lib/auth";
import DynamicBackground from "@/components/DynamicBackground";

const HCAPTCHA_SITE_KEY = "10000000-ffff-ffff-ffff-000000000000";

const Login = () => {
  const navigate = useNavigate();
  const captchaRef = useRef<HCaptcha>(null);
  const { login } = useAuth();

  const [registrationNo, setRegistrationNo] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRegistrationNo(value);
    const match = lookupBusiness(value.trim());
    setBusinessName(match || "");
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

  const isFormValid =
    registrationNo.trim() &&
    businessName.trim() &&
    password.trim() &&
    captchaToken;

  const handleSendOtp = () => {
    if (!isFormValid) {
      toast({
        title: "Incomplete form",
        description: "Please fill all fields and complete the captcha.",
        variant: "destructive",
      });
      return;
    }
    setOtpSent(true);
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your registered phone.",
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
      login({
        ownerName: "User",
        businessName,
        email: "",
        phone: "",
        registrationNo,
        location: "",
      });
      setLoading(false);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${businessName}!`,
      });
      setTimeout(() => navigate("/"), 1200);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <DynamicBackground />

      <header className="border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-foreground">VyaparAI</span>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-xl shadow-primary/5">
            <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">Log in to your VyaparAI account</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="registrationNo">Registration No.</Label>
                <Input
                  id="registrationNo"
                  placeholder="Enter your GST/CIN number"
                  value={registrationNo}
                  onChange={handleRegNoChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={businessName}
                  placeholder="Auto-filled from registration"
                  readOnly
                  className="bg-muted/50"
                />
                {registrationNo.trim() && !businessName && (
                  <p className="text-xs text-destructive">
                    No business found. Please sign up first.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
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
                      A 6-digit code was sent to your phone — enter any 6 digits for demo
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
                  <Button type="submit" className="w-full gap-2" size="lg" disabled={loading}>
                    <LogIn className="h-4 w-4" />
                    {loading ? "Logging in…" : "Verify & Log In"}
                  </Button>
                </div>
              )}
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-primary hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
