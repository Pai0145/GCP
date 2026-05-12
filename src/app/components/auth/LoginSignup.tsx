import { useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  Check,
  Wallet,
  Zap,
  Gift,
  Shield,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AuthShell } from "./AuthShell";

interface LoginSignupProps {
  onContinue: (email: string, password: string, isSignup: boolean) => void;
  embedded?: boolean;
  initialMode?: "signup" | "login";
  onModeChange?: (mode: "signup" | "login") => void;
}

const easeOut = [0.22, 1, 0.36, 1] as const;

export function LoginSignup({
  onContinue,
  embedded = false,
  initialMode = "signup",
  onModeChange,
}: LoginSignupProps) {
  const [mode, setMode] = useState<"signup" | "login">(initialMode);
  const [email, setEmail] = useState("john.doe@company.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number; size: number }[]
  >([]);
  const [shineKey, setShineKey] = useState(0);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleModeChange = (nextMode: "signup" | "login") => {
    setMode(nextMode);
    onModeChange?.(nextMode);
  };

  const hasMinLength = password.length >= 8;
  const hasLetters = /[a-zA-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const isPasswordValid = hasMinLength && hasLetters && hasNumbers;

  const spawnRipple = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 1.4;
    const id = Date.now() + Math.random();
    setRipples((r) => [...r, { id, x, y, size }]);
    setShineKey((k) => k + 1);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (email && (mode === "login" || (mode === "signup" && isPasswordValid))) {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        onContinue(email, password, mode === "signup");
      }, 950);
    }
  };

  const features = [
    { Icon: Wallet, text: "Digital Wallet Integration" },
    { Icon: Zap, text: "Instant Settlements" },
    { Icon: Gift, text: "Gift Cards & Vouchers" },
    { Icon: Shield, text: "Enterprise-grade Security" },
  ];

  const content = (
    <>
      <style>{`
        @keyframes borderShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes glassPulse {
          0%, 100% { box-shadow: 0 10px 30px -18px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.16); }
          50% { box-shadow: 0 14px 34px -18px rgba(0,0,0,0.58), 0 0 22px rgba(208,242,85,0.08), inset 0 1px 0 rgba(255,255,255,0.22); }
        }
        .feature-card {
          position: relative;
          isolation: isolate;
          transition: transform 200ms ease-out, box-shadow 200ms ease-out, background-color 200ms ease-out, border-color 200ms ease-out;
          animation: glassPulse 5.5s ease-in-out infinite;
        }
        .feature-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          padding: 1px;
          background: linear-gradient(120deg, rgba(209,242,86,0) 0%, rgba(209,242,86,0.55) 25%, rgba(180,255,180,0.35) 50%, rgba(209,242,86,0.55) 75%, rgba(209,242,86,0) 100%);
          background-size: 200% 200%;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          opacity: 0.4;
          animation: borderShimmer 4.2s linear infinite;
          transition: opacity 200ms ease-out;
          pointer-events: none;
        }
        .feature-card::after {
          content: "";
          position: absolute;
          inset: -18% auto auto -10%;
          width: 56%;
          height: 72%;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0) 72%);
          filter: blur(14px);
          opacity: 0.58;
          pointer-events: none;
          transform: rotate(-12deg);
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -18px rgba(0,0,0,0.55);
          background-color: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.2);
        }
        .feature-card:hover::before { opacity: 0.62; }
        .feature-card .icon-wrap { transition: background-color 200ms ease-out; }
        .feature-card:hover .icon-wrap { background-color: rgba(209,242,86,0.32); }
        .auth-input { transition: border-color 180ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 180ms cubic-bezier(0.4, 0, 0.2, 1); }
        .auth-input:focus { border-color: #005656; }
        .eye-btn { transition: opacity 180ms ease-out; opacity: 0.75; }
        .eye-btn:hover { opacity: 1; }
      `}</style>

      <div
        className={
          embedded
            ? "flex w-full items-center justify-center gap-20"
            : "relative z-10 flex w-full max-w-[1200px] items-center justify-center gap-20 px-3 pt-20 sm:px-6 sm:pt-24"
        }
      >
        {/* Left side - Marketing content */}
        <div className="flex-1 hidden lg:flex flex-col gap-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: easeOut }}
            className="inline-flex items-center justify-center px-[18px] py-[10px] bg-[rgba(209,242,86,0.1)] border border-[rgba(209,242,86,0.3)] rounded-[20px] self-start"
          >
            <p className="text-[#d1f256] text-[15px] font-semibold">
              Trusted by 1000+ Merchants
            </p>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.65, ease: easeOut }}
          >
            <h1
              className="text-[60px] leading-[72px] font-bold text-white"
              style={{ mixBlendMode: "screen" }}
            >
              Power Your
            </h1>
            <h1
              className="text-[60px] leading-[72px] font-bold text-[#d1f256]"
              style={{ mixBlendMode: "screen" }}
            >
              Business Growth
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.5, ease: easeOut }}
            className="text-[16px] max-w-[550px] text-[rgba(255,255,255,0.7)]"
            style={{ mixBlendMode: "screen" }}
          >
            Join the leading payment platform designed for modern businesses.
            Accept payments, manage transactions, and grow revenue seamlessly.
          </motion.p>

          {/* Features grid */}
          <div className="grid grid-cols-2 gap-4 max-w-[560px]">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.55 + idx * 0.12,
                  duration: 0.45,
                  ease: easeOut,
                }}
                className="feature-card relative flex gap-3 items-center p-4 rounded-2xl overflow-hidden isolate"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.08) 100%)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  boxShadow:
                    "0 10px 30px -18px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.16)",
                }}
              >
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{
                    padding: 1,
                    backgroundImage:
                      "linear-gradient(120deg, rgba(209,242,86,0) 0%, rgba(209,242,86,0.7) 25%, rgba(180,255,180,0.5) 50%, rgba(209,242,86,0.7) 75%, rgba(209,242,86,0) 100%)",
                    backgroundSize: "200% 200%",
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    opacity: 0.52,
                  }}
                  animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: idx * 0.35,
                  }}
                />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -inset-4 rounded-3xl"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(209,242,86,0.12) 0%, rgba(209,242,86,0) 65%)",
                    filter: "blur(16px)",
                  }}
                  animate={{
                    opacity: [0.16, 0.36, 0.16],
                    scale: [0.98, 1.02, 0.98],
                  }}
                  transition={{
                    duration: 4.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.28,
                  }}
                />
                <motion.div
                  className="icon-wrap w-10 h-10 bg-[rgba(209,242,86,0.2)] rounded-[10px] flex items-center justify-center relative z-10"
                  animate={{
                    backgroundColor: [
                      "rgba(209,242,86,0.18)",
                      "rgba(209,242,86,0.34)",
                      "rgba(209,242,86,0.18)",
                    ],
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    duration: 4.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.25,
                  }}
                >
                  <feature.Icon size={20} className="text-[#d1f256]" />
                </motion.div>
                <p className="text-[16px] text-[rgba(255,255,255,0.8)] relative z-10">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right side - Auth form */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.65, ease: easeOut }}
          className="w-full rounded-[20px] bg-white p-5 shadow-2xl sm:p-8 lg:w-[500px] lg:p-10"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.45, ease: easeOut }}
            className="mb-6"
          >
            <h2 className="text-[36px] leading-[48px] font-bold text-[#181d27] mb-2">
              {mode === "signup" ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-[16px] text-[#4a5565]">
              {mode === "signup"
                ? "Get started with your Pine Labs business account"
                : "Log in to your Pine Labs business account"}
            </p>
          </motion.div>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.45, ease: easeOut }}
            className="relative bg-[#f5f5f5] border border-[#e2e8f0] rounded-[15px] p-[5px] flex gap-1 mb-6"
          >
            {(["signup", "login"] as const).map((m) => (
              <button
                key={m}
                onClick={() => handleModeChange(m)}
                className={`relative flex-1 py-2 px-6 rounded-[10px] text-[15px] font-semibold transition-colors ${
                  mode === m ? "text-[#181d27]" : "text-[#717680]"
                }`}
              >
                {mode === m && (
                  <motion.span
                    layoutId="auth-mode-pill"
                    className="absolute inset-0 bg-white rounded-[10px] shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">
                  {m === "signup" ? "Sign Up" : "Log In"}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email input */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.66, duration: 0.4, ease: easeOut }}
            >
              <label className="flex gap-1 text-[14px] font-semibold text-[#414651] mb-2">
                Corporate Email Address
                <span className="text-[#d92d20]">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@company.com"
                className="auth-input w-full px-4 py-2.5 bg-[#fafafa] border border-[#d5d7da] rounded-lg text-[16px] text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#005656] focus:border-transparent"
                required
              />
            </motion.div>

            {/* Password input */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.74, duration: 0.4, ease: easeOut }}
            >
              <label className="flex gap-1 text-[14px] font-semibold text-[#414651] mb-2">
                {mode === "signup" ? "Create your password" : "Password"}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="auth-input w-full px-4 py-2.5 bg-[#fafafa] border border-[#d5d7da] rounded-lg text-[16px] text-[#181d27] focus:outline-none focus:ring-2 focus:ring-[#005656] focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye-btn absolute right-4 top-1/2 -translate-y-1/2 text-[#252B37]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            {/* Password requirements (only for signup) */}
            <AnimatePresence>
              {mode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: easeOut }}
                  className="bg-[#f9fafb] rounded-[10px] p-3 space-y-2 overflow-hidden"
                >
                  <PasswordRequirement
                    met={hasMinLength}
                    text="At least 8 characters"
                  />
                  <PasswordRequirement
                    met={hasLetters}
                    text="Contains letters"
                  />
                  <PasswordRequirement
                    met={hasNumbers}
                    text="Contains numbers"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={(mode === "signup" && !isPasswordValid) || submitting}
              onPointerDown={(e) => {
                if (!((mode === "signup" && !isPasswordValid) || submitting))
                  spawnRipple(e);
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: 1,
              }}
              whileHover={
                (mode === "signup" && !isPasswordValid) || submitting
                  ? undefined
                  : {
                      y: -2,
                      backgroundColor: "#004444",
                      boxShadow:
                        "0 0 0 1px rgba(208,242,85,0.18), 0 8px 24px -6px rgba(0,86,86,0.45), 0 0 28px 2px rgba(208,242,85,0.18)",
                    }
              }
              whileTap={
                (mode === "signup" && !isPasswordValid) || submitting
                  ? undefined
                  : {
                      y: 0,
                      scale: 0.97,
                      boxShadow: "0 4px 12px -4px rgba(0,86,86,0.35)",
                    }
              }
              transition={{
                delay: submitting ? 0 : 0.82,
                duration: 0.18,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="submit-btn relative overflow-hidden w-full bg-[#005656] text-white py-3 px-6 rounded-xl font-semibold text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                WebkitTapHighlightColor: "transparent",
                willChange: "transform",
              }}
            >
              {/* Glass top highlight */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-xl"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 60%, rgba(255,255,255,0) 100%)",
                }}
              />
              {/* Shine sweep */}
              {shineKey > 0 && (
                <motion.span
                  key={shineKey}
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0"
                  initial={{ x: "-120%", opacity: 0.2 }}
                  animate={{ x: "180%", opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    width: "60%",
                    background:
                      "linear-gradient(75deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%)",
                    filter: "blur(2px)",
                  }}
                />
              )}
              {/* Ripples */}
              {ripples.map((r) => (
                <motion.span
                  key={r.id}
                  aria-hidden
                  className="pointer-events-none absolute rounded-full"
                  initial={{ opacity: 0.35, scale: 0 }}
                  animate={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    left: r.x - r.size / 2,
                    top: r.y - r.size / 2,
                    width: r.size,
                    height: r.size,
                    background:
                      "radial-gradient(circle, rgba(208,242,85,0.55) 0%, rgba(255,255,255,0.35) 40%, rgba(255,255,255,0) 70%)",
                  }}
                />
              ))}
              <span className="relative z-10 inline-flex items-center justify-center gap-2">
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    {mode === "signup"
                      ? "Creating account..."
                      : "Logging in..."}
                  </>
                ) : mode === "signup" ? (
                  "Create Account"
                ) : (
                  "Log In"
                )}
              </span>
            </motion.button>

            {/* Terms */}
            {mode === "signup" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.4, ease: easeOut }}
                className="text-[13px] text-[#6a7282] text-center leading-5"
              >
                By creating an account, you agree to our{" "}
                <span className="text-[#364153] underline cursor-pointer">
                  Terms of Service
                </span>
                {" and "}
                <span className="text-[#364153] underline cursor-pointer">
                  Privacy Policy
                </span>
              </motion.p>
            )}

            {mode === "login" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.4, ease: easeOut }}
                className="text-center"
              >
                <a
                  href="#"
                  className="text-[#005656] text-[14px] font-medium hover:underline"
                >
                  Forgot password?
                </a>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </>
  );

  if (embedded) return content;
  return <AuthShell layout="split">{content}</AuthShell>;
}

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex gap-2.5 items-center">
      <div
        className={`w-[22px] h-[22px] rounded-full flex items-center justify-center transition-colors ${
          met ? "bg-[#a9efc5]" : "bg-[#e5e7eb]"
        }`}
      >
        {met && (
          <Check size={13} className="text-[#079455]" strokeWidth={2.5} />
        )}
      </div>
      <p className={`text-[14px] ${met ? "text-[#079455]" : "text-[#6b7280]"}`}>
        {text}
      </p>
    </div>
  );
}
