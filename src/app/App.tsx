import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  CreditCard,
  Gift,
  Globe2,
  LayoutDashboard,
  Menu,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";
import lottie from "lottie-web";
import { AnimatePresence, motion } from "motion/react";
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import { AuthShell } from "./components/auth/AuthShell";
import { LoginSignup } from "./components/auth/LoginSignup";
import { OTPVerification } from "./components/auth/OTPVerification";
import { AnalyzingTransition } from "./components/onboarding/AnalyzingTransition";
import { PageShell, STEPS } from "./components/onboarding/Layout";
import {
  ScreenAadhaarOTP,
  ScreenAccountOwner,
  ScreenAuthorisedSignoffPending,
  ScreenBeforeYouBegin,
  ScreenBusinessIdentity,
  ScreenCompanyAddress,
  ScreenOpeningSingzy,
  ScreenReviewSubmit,
  ScreenSignatoryHandoffComplete,
  ScreenSignatoryRejectedEmailPreview,
  ScreenSignedDocumentsEmailPreview,
  ScreenSignatory,
  ScreenSuccess,
  ScreenSuccessEmailPreview,
  ScreenTermsPage1,
  ScreenTermsPage2,
  ScreenTermsPage3,
  ScreenTermsPage4,
} from "./components/onboarding/Screens";
import pineLogo from "../../pinelabs logo.png";
import pineBg from "../../bg pinlabs.png";
import fastLoadingAnimation from "../imports/fastloading-transition.json";
import landingImage from "../imports/landing image.png";

const stats = [
  { value: "10M+", label: "Gift Cards issued" },
  { value: "600+", label: "Catalogue of Brands" },
  { value: "24 hr", label: "Support Network" },
];

const solutions = [
  {
    icon: Gift,
    title: "Employee rewards",
    copy: "Send digital gift cards for festivals, milestones, contests, wellness budgets, and recognition moments.",
  },
  {
    icon: WalletCards,
    title: "Customer incentives",
    copy: "Power acquisition campaigns, refunds, loyalty rewards, and co-branded stored value programs.",
  },
  {
    icon: Building2,
    title: "Channel payouts",
    copy: "Manage dealer, distributor, and sales partner incentives with approvals, limits, and audit-ready records.",
  },
];

const workflow = [
  "Upload recipients or connect your HRMS",
  "Choose brand, value, theme, and delivery date",
  "Approve budgets and dispatch instantly",
  "Track redemption, breakage, and campaign ROI",
];

const brands = [
  "Retail",
  "Travel",
  "Food",
  "Fuel",
  "Wellness",
  "Entertainment",
];

const ONBOARDING_PATHS: Record<number, string> = {
  1: "/onboarding/begin",
  2: "/onboarding/account-owner",
  3: "/onboarding/business-identity",
  4: "/onboarding/company-address",
  5: "/onboarding/signatory",
  6: "/onboarding/review",
  7: "/onboarding/terms/1",
  8: "/onboarding/terms/2",
  9: "/onboarding/terms/3",
  10: "/onboarding/terms/4",
  11: "/onboarding/esign",
  12: "/onboarding/success",
};

const SCREEN_BY_PATH: Record<string, number> = {
  "/onboarding/begin": 1,
  "/onboarding/account-owner": 2,
  "/onboarding/business-identity": 3,
  "/onboarding/company-address": 4,
  "/onboarding/signatory": 5,
  "/onboarding/review": 6,
  "/onboarding/terms/1": 7,
  "/onboarding/terms/2": 8,
  "/onboarding/terms/3": 9,
  "/onboarding/terms/4": 10,
  "/onboarding/esign": 11,
  "/onboarding/success": 12,
  "/onboarding/success/preview": 12,
  "/onboarding/signed-documents/preview": 12,
  "/onboarding/esign-rejected/preview": 12,
};

const SIDEBAR_STEP_FOR_SCREEN: Record<number, number> = {
  1: 1,
  2: 2,
  3: 2,
  4: 2,
  5: 3,
  6: 4,
  7: 4,
  8: 4,
  9: 4,
  10: 4,
  11: 4,
  12: 4,
};

const SUB_FOR_SCREEN: Record<number, string | undefined> = {
  2: "required-info",
  3: "required-info",
  4: "organisation-address",
};

const COMPLETED_SUBS_FOR_SCREEN: Record<number, string[]> = {
  4: ["required-info"],
  5: ["required-info", "organisation-address"],
  6: ["required-info", "organisation-address"],
  7: ["required-info", "organisation-address"],
  8: ["required-info", "organisation-address"],
  9: ["required-info", "organisation-address"],
  10: ["required-info", "organisation-address"],
  11: ["required-info", "organisation-address"],
  12: ["required-info", "organisation-address"],
};

const COMPLETED_FOR_SCREEN: Record<number, number[]> = {
  1: [],
  2: [1],
  3: [1],
  4: [1],
  5: [1, 2],
  6: [1, 2, 3],
  7: [1, 2, 3],
  8: [1, 2, 3],
  9: [1, 2, 3],
  10: [1, 2, 3],
  11: [1, 2, 3],
  12: [1, 2, 3, 4],
};

const PROGRESS_WEIGHTS_BY_CLICK: Record<number, number> = {
  1: 2,
  2: 1,
  3: 1,
  4: 1,
  5: 1,
  6: 1,
  7: 0.25,
  8: 0.25,
  9: 0.25,
  10: 0.25,
  11: 1,
};

const TOTAL_PROGRESS_WEIGHT = Object.values(PROGRESS_WEIGHTS_BY_CLICK).reduce(
  (total, weight) => total + weight,
  0,
);

function getProgressPercent(progressScreen: number) {
  if (progressScreen >= 12) return 100;

  const completedWeight = Object.entries(PROGRESS_WEIGHTS_BY_CLICK).reduce(
    (total, [screen, weight]) =>
      Number(screen) < progressScreen ? total + weight : total,
    0,
  );

  return Math.round((completedWeight / TOTAL_PROGRESS_WEIGHT) * 100);
}

const initialOnboardingState = {
  fullName: "John Doe",
  email: "john.doe@company.com",
  mobile: "",
  spend: "",
  idType: "GSTIN",
  idValue: "29AABCP1234F1Z5",
  billingSame: true,
  sameAsOwner: true,
  sigName: "John Doe",
  sigEmail: "john.doe@company.com",
  sigMobile: "",
  designation: "",
  sigConfirm: false,
  declaration: false,
  termsPage1Accepted: false,
  termsPage2Accepted: false,
  termsPage3Accepted: false,
  termsPage4Accepted: false,
  aadhaarOTP: "",
  aadhaarNumber: "",
  esignVerified: false,
  awaitingAuthorisedSignoff: false,
  actingAsAuthorisedSignatory: false,
  delegatedSignoffCompleted: false,
  signatoryReadyToReturn: false,
  signatoryRejected: false,
  manualVerification: false,
  panDocumentScenario: "",
  businessCategory: "",
  businessCategoryOther: "",
  tanNumber: "",
  registeredAddressLine1: "4th Floor, Tower B, Building 9, DLF Cyber City",
  registeredAddressLine2: "",
  registeredCity: "Gurugram",
  registeredState: "Haryana",
  registeredPinCode: "122002",
  registeredCountry: "India",
  billingAddressLine1: "",
  billingAddressLine2: "",
  billingCity: "",
  billingState: "",
  billingPinCode: "",
  billingCountry: "India",
  billingGstCertificate: null as null | { name: string; ext: string; size: string },
  panNumber: "AABCP1234F",
  panName: "PINE LABS LIMITED",
  panVerified: true,
};

export default function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [logoTransitionOpen, setLogoTransitionOpen] = useState(false);

  const startAuthTransition = useCallback(() => {
    setLogoTransitionOpen(true);
    window.setTimeout(() => navigate("/signup"), 2500);
    window.setTimeout(() => setLogoTransitionOpen(false), 2720);
  }, [navigate]);

  useEffect(() => {
    if (location.pathname !== "/landing") return;
    if (window.sessionStorage.getItem("onboardingFlowMode")) return;
    window.sessionStorage.setItem("onboardingFlowMode", "all");
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<FlowSelectorPage />} />
        <Route
          path="/landing"
          element={<LandingPage onStartAuth={startAuthTransition} />}
        />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/onboarding/*" element={<OnboardingFlow />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <AnimatePresence>
        {logoTransitionOpen && <LandingAuthBridge />}
      </AnimatePresence>
    </>
  );
}

function FlowSelectorPage() {
  const navigate = useNavigate();

  const chooseFlow = (mode: "happy" | "all") => {
    window.sessionStorage.setItem("onboardingFlowMode", mode);
    navigate("/landing");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#06161d] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 20%, rgba(208,242,85,0.18) 0%, rgba(208,242,85,0) 28%), radial-gradient(circle at 80% 16%, rgba(0,168,137,0.18) 0%, rgba(0,168,137,0) 26%), linear-gradient(160deg, #031217 0%, #08263c 48%, #0a1b22 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, transparent 78%)",
        }}
      />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#d0f255]">
            Onboarding Modes
          </p>
          <h1 className="mt-4 text-[40px] font-semibold leading-[1.02] text-white sm:text-[58px] lg:text-[72px]">
            Choose how you want to demo the onboarding journey.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#c4d4de] sm:text-lg sm:leading-8">
            Start with the cleanest happy path, or keep every scenario chooser
            enabled so reviewers can test success and error states from the same
            experience.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {[
            {
              key: "happy" as const,
              icon: Sparkles,
              title: "Happy Flow",
              copy: "Every upload follows the success path automatically. No scenario popup appears during onboarding.",
              cta: "Open happy flow",
              accent: "#d0f255",
              bg: "linear-gradient(180deg, rgba(208,242,85,0.18) 0%, rgba(208,242,85,0.06) 100%)",
            },
            {
              key: "all" as const,
              icon: ShieldCheck,
              title: "All Case Scenarios",
              copy: "Keep the scenario chooser enabled so teams can trigger success and error states for every upload interaction.",
              cta: "Open all scenarios",
              accent: "#8be3c8",
              bg: "linear-gradient(180deg, rgba(9,105,105,0.36) 0%, rgba(9,105,105,0.12) 100%)",
            },
          ].map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.button
                key={option.key}
                type="button"
                onClick={() => chooseFlow(option.key)}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.14 + index * 0.08,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="group rounded-[28px] border border-white/10 p-7 text-left shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl transition"
                style={{
                  background: option.bg,
                }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.08)", color: option.accent }}
                >
                  <Icon size={26} />
                </div>
                <h2 className="mt-6 text-[30px] font-semibold leading-tight text-white">
                  {option.title}
                </h2>
                <p className="mt-4 max-w-lg text-[15px] leading-7 text-[#d4e1e8]">
                  {option.copy}
                </p>
                <div
                  className="mt-8 inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-black transition group-hover:translate-x-1"
                  style={{
                    background: option.key === "happy" ? "#d0f255" : "#0f3d49",
                    color: option.key === "happy" ? "#042126" : "#ffffff",
                  }}
                >
                  {option.cta}
                  <ArrowRight size={18} />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function ScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname]);

  return null;
}

function LandingAuthBridge() {
  const lottieContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!lottieContainerRef.current) return;

    const animation = lottie.loadAnimation({
      container: lottieContainerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: fastLoadingAnimation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet",
      },
    });

    return () => animation.destroy();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden bg-[#f8fff7]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(140deg, rgba(255,255,255,0.98) 0%, rgba(241,255,232,0.98) 48%, rgba(224,250,239,0.98) 100%)",
        }}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0.9, scale: 1.01 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute h-[68vmax] w-[68vmax] rounded-full bg-[#d0f255]/30 blur-3xl"
        initial={{ scale: 0.45, x: "-28%", y: "18%", opacity: 0 }}
        animate={{ scale: 1.08, x: "16%", y: "-10%", opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="relative flex h-40 w-40 items-center justify-center"
        initial={{ opacity: 0, scale: 0.82, y: 16 }}
        animate={{
          opacity: 1,
          scale: [0.82, 1.08, 1],
          y: [16, -4, 0],
        }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Pine Labs loading animation"
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-[-18px] rounded-[42px] border border-[#d0f255]/50"
          initial={{ opacity: 0, scale: 0.78 }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.78, 1.18, 1.34] }}
          transition={{ duration: 1.25, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          ref={lottieContainerRef}
          className="relative h-24 w-24"
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.16, duration: 0.42, ease: "easeOut" }}
          aria-hidden="true"
        />
      </motion.div>
    </motion.div>
  );
}

function AuthPage({ mode }: { mode: "signup" | "login" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const playIntro = Boolean(
    (location.state as { playIntro?: boolean } | null)?.playIntro,
  );

  return (
    <AuthShell layout="split" intro={playIntro}>
      <LoginSignup
        embedded
        initialMode={mode}
        onModeChange={(nextMode) => navigate(`/${nextMode}`)}
        onContinue={(email) => navigate("/verify", { state: { email } })}
      />
    </AuthShell>
  );
}

function VerifyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email =
    (location.state as { email?: string } | null)?.email ??
    "john.doe@company.com";

  return (
    <AuthShell layout="centered">
      <OTPVerification
        embedded
        email={email}
        onBack={() => navigate("/signup")}
        onVerify={() => navigate("/onboarding/begin")}
      />
    </AuthShell>
  );
}

function OnboardingFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState(initialOnboardingState);
  const [transitionContext, setTransitionContext] = useState<
    "documents" | "basicDetails" | "signing" | "signz" | null
  >(null);
  const screen = SCREEN_BY_PATH[location.pathname] ?? 1;
  const [progressScreen, setProgressScreen] = useState(screen);
  const normalizedOwnerEmail = (state.email || "").trim().toLowerCase();
  const normalizedSignatoryEmail = (state.sigEmail || "").trim().toLowerCase();
  const usesSameEmailSignatoryFlow =
    Boolean(normalizedOwnerEmail) &&
    normalizedOwnerEmail === normalizedSignatoryEmail;
  const usesDelegatedEmailFlow =
    Boolean(normalizedSignatoryEmail) &&
    normalizedOwnerEmail !== normalizedSignatoryEmail;
  const hideReviewSubs = screen === 6 && !state.actingAsAuthorisedSignatory;
  const isSingzyFlowView = screen >= 7 && screen <= 11;
  const isEmailTemplateScreen =
    location.pathname === "/onboarding/success/preview" ||
    location.pathname === "/onboarding/signed-documents/preview" ||
    location.pathname === "/onboarding/esign-rejected/preview" ||
    state.awaitingAuthorisedSignoff;
  const steps = hideReviewSubs
    ? STEPS.map((step) =>
        step.id === 5
          ? {
              ...step,
              subs: undefined,
            }
          : step,
      )
    : STEPS;

  useEffect(() => {
    if (
      screen !== 12 ||
      !state.awaitingAuthorisedSignoff ||
      !state.delegatedSignoffCompleted ||
      state.signatoryRejected ||
      transitionContext
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      setTransitionContext("signing");
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [
    screen,
    state.awaitingAuthorisedSignoff,
    state.delegatedSignoffCompleted,
    state.signatoryRejected,
    transitionContext,
  ]);

  const go = (
    nextScreen: number,
    options?: { skipSigningTransition?: boolean },
  ) => {
    if (nextScreen === screen) return;

    setProgressScreen((current) => Math.max(current, nextScreen));

    if (screen === 1 && nextScreen === 2) {
      setTransitionContext("documents");
      return;
    }

    if (screen === 2 && nextScreen === 3) {
      setTransitionContext("basicDetails");
      return;
    }

    if (
      nextScreen === 12 &&
      !options?.skipSigningTransition &&
      !state.actingAsAuthorisedSignatory &&
      !state.awaitingAuthorisedSignoff
    ) {
      setTransitionContext("signing");
      return;
    }

    navigate(ONBOARDING_PATHS[nextScreen] ?? "/onboarding/begin");
  };

  const handleRejectSigningSession = () => {
    const confirmed = window.confirm(
      "Close this signing session? The corporate onboarding page will show this request as rejected.",
    );

    if (!confirmed) return;

    setState((current) => ({
      ...current,
      awaitingAuthorisedSignoff: true,
      actingAsAuthorisedSignatory: false,
      delegatedSignoffCompleted: false,
      signatoryReadyToReturn: false,
      signatoryRejected: false,
    }));
    setTransitionContext(null);
    go(12, { skipSigningTransition: true });

    window.setTimeout(() => {
      setState((current) => ({
        ...current,
        awaitingAuthorisedSignoff: true,
        actingAsAuthorisedSignatory: false,
        delegatedSignoffCompleted: false,
        signatoryReadyToReturn: false,
        signatoryRejected: true,
      }));
    }, 2000);
  };

  const handleTransitionComplete = useCallback(() => {
    if (transitionContext === "documents") {
      setTransitionContext(null);
      navigate(ONBOARDING_PATHS[2]);
      return;
    }

    if (transitionContext === "signing") {
      setState((current) => ({
        ...current,
        awaitingAuthorisedSignoff: false,
        delegatedSignoffCompleted: false,
        actingAsAuthorisedSignatory: false,
        signatoryReadyToReturn: false,
        signatoryRejected: false,
      }));
      setTransitionContext(null);
      navigate(ONBOARDING_PATHS[12]);
      return;
    }

    if (transitionContext === "signz") {
      setTransitionContext(null);
      navigate(ONBOARDING_PATHS[7]);
      return;
    }

    if (transitionContext === "basicDetails") {
      setTransitionContext(null);
      navigate(ONBOARDING_PATHS[3]);
    }
  }, [navigate, transitionContext]);

  const handleStepClick = (stepId: number, subId?: string) => {
    if (stepId === 1) go(1);
    if (stepId === 2) go(subId === "organisation-address" ? 4 : 2);
    if (stepId === 3) go(5);
    if (stepId === 4) go(6);
  };

  if (transitionContext) {
    const isBasicDetails = transitionContext === "basicDetails";
    const isSigning = transitionContext === "signing";
    const isOpeningSingzy = transitionContext === "signz";
    const isManualVerification =
      transitionContext === "documents" && state.manualVerification;

    if (isOpeningSingzy) {
      return <ScreenOpeningSingzy onComplete={handleTransitionComplete} />;
    }

    return (
      <AnalyzingTransition
        onComplete={handleTransitionComplete}
        successOnly={isBasicDetails}
        successIcon={
          isManualVerification ? "warning" : isBasicDetails ? "profile" : "check"
        }
        stepOneText={
          isSigning
            ? "Applying your Aadhar eSign to all documents..."
            : isManualVerification
              ? "Trying to verify your uploaded documents..."
            : undefined
        }
        stepTwoText={
          isSigning
            ? "Finalizing signed terms and conditions..."
            : isManualVerification
              ? "Auto-verification is unavailable right now..."
              : undefined
        }
        stepThreeText={
          transitionContext === "documents"
            ? "Verifying your PAN details..."
            : undefined
        }
        successTitle={
          isBasicDetails
            ? `Welcome, ${state.fullName || "there"}`
            : isSigning
              ? "Signed successfully..."
              : isManualVerification
                ? "Manual review required"
              : undefined
        }
        successText={
          isBasicDetails
            ? "Your account details are saved. Let's continue your onboarding."
            : isSigning
              ? "Your terms and conditions have been digitally signed."
              : isManualVerification
                ? "We couldn't auto-verify your details, so our team will review them manually."
              : undefined
        }
      />
    );
  }

  const showSidebar = screen >= 1 && screen <= 10 && !isSingzyFlowView;
  const sidebarStep = SIDEBAR_STEP_FOR_SCREEN[screen] ?? 5;
  const completed = COMPLETED_FOR_SCREEN[screen] ?? [];
  const currentSub =
    state.esignVerified && screen >= 7 && screen <= 10
      ? "signature"
      : SUB_FOR_SCREEN[screen];
  const completedSubs =
    state.esignVerified && screen >= 7 && screen <= 10
      ? ["terms", "aadhaar"]
      : COMPLETED_SUBS_FOR_SCREEN[screen];
  const progressPercent = getProgressPercent(Math.max(progressScreen, screen));

  let content: React.ReactNode = (
    <ScreenBeforeYouBegin
      go={go}
      state={state}
      setState={setState}
      progress={progressPercent}
    />
  );

  if (screen === 2)
    content = (
      <ScreenAccountOwner
        go={go}
        state={state}
        setState={setState}
        progress={progressPercent}
      />
    );
  if (screen === 3)
    content = (
      <ScreenAccountOwner
        go={go}
        state={state}
        setState={setState}
        progress={progressPercent}
      />
    );
  if (screen === 4)
    content = (
      <ScreenCompanyAddress
        go={go}
        state={state}
        setState={setState}
        progress={progressPercent}
      />
    );
  if (screen === 5)
    content = (
      <ScreenSignatory
        go={go}
        state={state}
        setState={setState}
        progress={progressPercent}
      />
    );
  if (screen === 6)
    content = (
      <ScreenReviewSubmit
        go={go}
        state={state}
        setState={setState}
        onOpenSingzy={() => {
          setProgressScreen((current) => Math.max(current, 7));
          setTransitionContext("signz");
        }}
        progress={progressPercent}
      />
    );
  if (screen === 7)
    content = (
      <ScreenTermsPage1
        go={go}
        state={state}
        setState={setState}
        progress={progressPercent}
      />
    );
  if (screen === 8)
    content = (
      <ScreenTermsPage2
        go={go}
        state={state}
        setState={setState}
        progress={progressPercent}
      />
    );
  if (screen === 9)
    content = (
      <ScreenTermsPage3
        go={go}
        state={state}
        setState={setState}
        progress={progressPercent}
      />
    );
  if (screen === 10)
    content = (
      <ScreenTermsPage4
        go={go}
        state={state}
        setState={setState}
        progress={progressPercent}
      />
    );
  if (screen === 11)
    content = (
      <ScreenAadhaarOTP
        go={go}
        state={state}
        setState={setState}
        progress={progressPercent}
      />
    );
  if (screen === 12 && location.pathname === "/onboarding/success/preview") {
    content = (
      <ScreenSuccessEmailPreview
        state={state}
        onBack={() => navigate("/onboarding/success")}
      />
    );
  } else if (screen === 12) {
    content = (
      <ScreenSuccess
        state={state}
        onOpenDemoPreview={() => navigate("/onboarding/success/preview")}
      />
    );
  }
  if (
    screen === 12 &&
    state.signatoryReadyToReturn &&
    location.pathname === "/onboarding/signed-documents/preview"
  ) {
    content = (
      <ScreenSignedDocumentsEmailPreview
        state={state}
        onContinueOnboarding={() => {
          setState({
            ...state,
            awaitingAuthorisedSignoff: true,
            actingAsAuthorisedSignatory: false,
            delegatedSignoffCompleted: true,
            signatoryReadyToReturn: false,
            signatoryRejected: false,
          });
          navigate("/onboarding/success");
        }}
      />
    );
  } else if (screen === 12 && state.signatoryReadyToReturn) {
    content = (
      <ScreenSignatoryHandoffComplete
        state={state}
        onOpenEmailPreview={() => navigate("/onboarding/signed-documents/preview")}
      />
    );
  }
  if (screen === 12 && state.awaitingAuthorisedSignoff) {
    if (
      state.signatoryRejected &&
      location.pathname === "/onboarding/esign-rejected/preview"
    ) {
      content = (
        <ScreenSignatoryRejectedEmailPreview
          state={state}
          onGoToOnboarding={() => {
            setState({
              ...state,
              awaitingAuthorisedSignoff: false,
              actingAsAuthorisedSignatory: false,
              delegatedSignoffCompleted: false,
              signatoryReadyToReturn: false,
              signatoryRejected: false,
            });
            go(5, { skipSigningTransition: true });
          }}
        />
      );
    } else {
    content = (
      <ScreenAuthorisedSignoffPending
        state={state}
        onOpenSingzyFromEmail={() => {
          setState({
            ...state,
            awaitingAuthorisedSignoff: false,
            actingAsAuthorisedSignatory: true,
            delegatedSignoffCompleted: false,
            signatoryReadyToReturn: false,
            signatoryRejected: false,
            esignVerified: false,
            aadhaarOTP: "",
            aadhaarConsent: false,
            aadhaarNumber: "",
          });
          setProgressScreen((current) => Math.max(current, 7));
          setTransitionContext("signz");
        }}
        onEditSignatory={() => {
          setState({
            ...state,
            awaitingAuthorisedSignoff: false,
            actingAsAuthorisedSignatory: false,
            delegatedSignoffCompleted: false,
            signatoryReadyToReturn: false,
            signatoryRejected: false,
          });
          go(5, { skipSigningTransition: true });
        }}
        onResend={() => {
          setState({
            ...state,
            awaitingAuthorisedSignoff: true,
            actingAsAuthorisedSignatory: false,
            delegatedSignoffCompleted: false,
            signatoryReadyToReturn: false,
            signatoryRejected: false,
          });
        }}
        onOpenRejectedEmail={() =>
          navigate("/onboarding/esign-rejected/preview")
        }
      />
    );
    }
  }

  return (
    <PageShell
      currentStep={sidebarStep}
      completed={completed}
      currentSub={currentSub}
      completedSubs={completedSubs}
      showSidebar={showSidebar}
      animatedBackground={!isSingzyFlowView && !isEmailTemplateScreen}
      onSaveExit={() => navigate("/")}
      onStepClick={handleStepClick}
      autosaveKey={`${screen}:${JSON.stringify(state)}`}
      progressPercent={progressPercent}
      steps={steps}
      signzRejectEnabled={
        isSingzyFlowView &&
        state.actingAsAuthorisedSignatory &&
        !state.signatoryReadyToReturn
      }
      onSignzReject={handleRejectSigningSession}
      hideAccountActions={isSingzyFlowView}
    >
      {content}
    </PageShell>
  );
}

function LandingPage({ onStartAuth }: { onStartAuth: () => void }) {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-white text-[#081c2d]">
      <header className="sticky top-0 z-50 border-b border-[#d9e6df] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-3"
            aria-label="Pine Labs home"
          >
            <img src={pineLogo} alt="Pine Labs" className="h-8 w-auto" />
          </button>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-[#345066] lg:flex">
            {["Products", "Solutions", "Developers", "Resources"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-[#008d7d]"
                >
                  {item}
                </a>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#contact"
              className="inline-flex min-w-[120px] items-center justify-center gap-3 rounded-full bg-[#d0f255] px-4 py-3.5 text-[15px] font-black text-[#003434] transition hover:bg-[#c4ee39] hover:shadow-[0_18px_34px_rgba(208,242,85,0.36)]"
            >
              Contact us
            </a>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-md border border-[#c9d9d3] bg-white text-[#0d2b41] lg:hidden"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-white">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url(${pineBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-14 pt-10 sm:px-5 sm:pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="flex flex-col justify-center">
            {/* <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-md border border-[#bde7d5] bg-[#effbf5] px-3 py-2 text-sm font-bold text-[#007265]">
              <Sparkles size={16} />
              Pine Labs inspired gift card platform
            </div> */}
            <h1 className="max-w-3xl text-[36px] font-semibold leading-[1.06] tracking-normal text-[#08263c] sm:text-[58px] lg:text-[70px]">
              Gift Smarter. Grow Faster.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#4b6476] sm:mt-6 sm:text-lg sm:leading-8">
              Simplify employee rewards, customer incentives, and business
              gifting with instant digital gift cards.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <button
                type="button"
                onClick={onStartAuth}
                className="inline-flex w-full min-w-[200px] items-center justify-center gap-3 rounded-full bg-[#d0f255] px-8 py-4 text-[16px] font-black text-[#011919] transition hover:bg-[#c4ee39] hover:shadow-[0_18px_34px_rgba(208,242,85,0.36)] sm:w-auto sm:px-12"
              >
                Get started
                <ArrowRight size={22} strokeWidth={2.4} />
              </button>
              {/* <a
                href="#solutions"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#b7cbc3] bg-white px-6 py-3.5 font-bold text-[#08263c] transition hover:border-[#008d7d] hover:text-[#008d7d]"
              >
                Explore solutions
              </a> */}
            </div>
            <div className="mt-10 hidden max-w-2xl gap-4 lg:grid lg:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="border-l-2 border-[#00a889] pl-4"
                >
                  <p className="text-3xl font-black text-[#08263c]">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-[#5e7483]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-[260px] items-center sm:min-h-[320px] lg:min-h-[520px]">
            <motion.div
              className="relative mx-auto flex h-[240px] w-full max-w-[560px] items-center justify-center overflow-hidden bg-white sm:h-[360px] lg:ml-auto lg:h-[520px] lg:max-w-[640px]"
              style={{
                borderRadius: 12,
                clipPath: "inset(0 round 12px)",
              }}
              initial={{ opacity: 0, scale: 1.12, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={landingImage}
                alt="Corporate gift card platform preview"
                className="block h-full w-full object-cover"
                style={{
                  borderRadius: 16,
                  clipPath: "inset(0 round 12px)",
                }}
                draggable={false}
              />
            </motion.div>
          </div>

          <div className="grid max-w-2xl gap-4 sm:grid-cols-3 lg:hidden">
            {stats.map((item) => (
              <div
                key={item.label}
                className="border-l-2 border-[#00a889] pl-4"
              >
                <p className="text-3xl font-black text-[#08263c]">
                  {item.value}
                </p>
                <p className="mt-1 text-sm leading-5 text-[#5e7483]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#008d7d]">
              Solutions
            </p>
            <h2 className="mt-3 text-4xl leading-tight text-[#08263c] sm:text-5xl">
              One platform for every gifting motion.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#587082]">
              Build programs that feel delightful to recipients and predictable
              to procurement, finance, and HR teams.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {solutions.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[8px] border border-[#d8e7e0] bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#e9f9f1] text-[#008d7d]">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-5 text-xl text-[#08263c]">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[#5d7282]">{item.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="products" className="bg-[#08263c] py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#8be3c8]">
              Platform
            </p>
            <h2 className="mt-3 text-4xl leading-tight sm:text-5xl">
              Gift cards, governance, and growth in one operating layer.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#c6d6df]">
              Configure brands, denominations, budgets, messages, expiry rules,
              and redemption reporting without creating manual spreadsheets for
              every campaign.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              [
                LayoutDashboard,
                "Campaign command center",
                "Track programs, budgets, recipients, and redemptions in a live dashboard.",
              ],
              [
                CreditCard,
                "Digital and physical fulfilment",
                "Issue instant e-gift cards or branded physical cards for high-touch campaigns.",
              ],
              [
                Globe2,
                "Multi-brand catalogue",
                "Offer curated categories across retail, food, travel, wellness, and entertainment.",
              ],
              [
                BadgeCheck,
                "Enterprise compliance",
                "Role-based approvals, KYC-ready onboarding, invoice trails, and secure delivery.",
              ],
            ].map(([Icon, title, copy]) => {
              const FeatureIcon = Icon as typeof LayoutDashboard;
              return (
                <div
                  key={title as string}
                  className="flex gap-4 rounded-[8px] border border-white/12 bg-white/[0.04] p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#00a889] text-white">
                    <FeatureIcon size={21} />
                  </div>
                  <div>
                    <h3 className="text-xl">{title as string}</h3>
                    <p className="mt-1 leading-7 text-[#c6d6df]">
                      {copy as string}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#008d7d]">
              How it works
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl leading-tight text-[#08263c] sm:text-5xl">
              From campaign brief to recipient delight in four steps.
            </h2>
          </div>
          <div className="grid gap-4">
            {workflow.map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-[8px] border border-[#d8e7e0] bg-white p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#08263c] text-sm font-black text-white">
                  {index + 1}
                </span>
                <p className="text-lg font-bold text-[#173850]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="resources"
        className="border-y border-[#d8e7e0] bg-white py-16"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#008d7d]">
                Catalogue
              </p>
              <h2 className="mt-3 text-4xl leading-tight text-[#08263c]">
                Give recipients real choice.
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-w-[520px]">
              {brands.map((brand) => (
                <div
                  key={brand}
                  className="flex items-center gap-2 rounded-[8px] border border-[#d8e7e0] bg-[#fbfdfc] px-4 py-3 font-bold text-[#173850]"
                >
                  <CheckCircle2 size={18} className="text-[#008d7d]" />
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-8 rounded-[8px] bg-[#eaf8f1] p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#007265]">
              Ready for launch
            </p>
            <h2 className="mt-3 text-4xl leading-tight text-[#08263c]">
              Design your next corporate gifting program.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#4d6677]">
              Set up bulk digital gift cards, employee rewards, partner
              incentives, or customer campaigns with a platform made for
              enterprise teams.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#08263c] px-6 py-3.5 font-bold text-white transition hover:bg-[#123c58]"
          >
            Talk to sales
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <footer id="contact" className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-[#d8e7e0] px-5 py-8 text-sm text-[#607686] lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <img src={pineLogo} alt="Pine Labs" className="h-8 w-fit" />
          <p>
            Corporate gift cards, rewards, loyalty, and prepaid solutions for
            modern enterprises.
          </p>
          <a
            href="mailto:sales@example.com"
            className="font-bold text-[#008d7d]"
          >
            sales@example.com
          </a>
        </div>
      </footer>
    </main>
  );
}
