import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useLanguage } from "@/contexts/LanguageContext";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOTP = () => {
    if (phone.length === 10) {
      setStep("otp");
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      navigate("/profile-setup");
    }
  };

  const handleGuestMode = () => {
    navigate("/home");
  };

  return (
    <div className="app-container min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-5 pt-16 pb-8 text-center fade-in-up">
        <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl font-bold text-primary-foreground">SM</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-1">
          {t.login.appName}
        </h1>
        <p className="text-muted-foreground">
          {t.login.tagline}
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5">
        {step === "phone" ? (
          <div className="fade-in-up">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Login to continue support
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              This helps us remember your teaching context.
            </p>

            <div className="relative mb-6">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">+91</span>
              </div>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="98765 43210"
                className="h-14 pl-20 text-lg"
              />
            </div>

            <Button
              onClick={handleSendOTP}
              disabled={phone.length !== 10}
              className="w-full h-14 text-base font-semibold rounded-xl gap-2 mb-4"
            >
              {t.login.sendOtp}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        ) : (
          <div className="fade-in-up">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Enter the 6-digit OTP sent to your phone
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {t.login.sentTo} +91 {phone}
            </p>

            <div className="flex justify-center mb-6">
              <InputOTP
                value={otp}
                onChange={setOtp}
                maxLength={6}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="w-12 h-14 text-xl" />
                  <InputOTPSlot index={1} className="w-12 h-14 text-xl" />
                  <InputOTPSlot index={2} className="w-12 h-14 text-xl" />
                  <InputOTPSlot index={3} className="w-12 h-14 text-xl" />
                  <InputOTPSlot index={4} className="w-12 h-14 text-xl" />
                  <InputOTPSlot index={5} className="w-12 h-14 text-xl" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6}
              className="w-full h-14 text-base font-semibold rounded-xl gap-2 mb-4"
            >
              {t.login.verifyBtn}
              <ArrowRight className="w-5 h-5" />
            </Button>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setStep("phone")}
                className="text-sm text-primary font-medium"
              >
                {t.login.changePhone}
              </button>
              <button
                onClick={() => {}}
                className="text-sm text-primary font-medium"
              >
                Resend OTP
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Guest Mode */}
      <footer className="px-5 pb-12 fade-in-up-delay-1">
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-border"></div>
            <span className="px-4 text-sm text-muted-foreground">Or</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>
          <Button
            onClick={handleGuestMode}
            variant="secondary"
            className="w-full h-14 text-base font-semibold rounded-xl"
          >
            Continue without login
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            You can try the app before signing in.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
