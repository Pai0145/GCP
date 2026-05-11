import { useEffect, useState } from "react";
import { PageShell } from "./components/onboarding/Layout";
import {
  ScreenAccountOwner,
  ScreenBeforeYouBegin,
  ScreenBusinessIdentity,
  ScreenCompanyAddress,
  ScreenSignatory,
  ScreenReviewSubmit,
  ScreenTermsPage1,
  ScreenTermsPage2,
  ScreenTermsPage3,
  ScreenTermsPage4,
  ScreenAadhaarOTP,
  ScreenSuccess,
} from "./components/onboarding/Screens";
import { LoginSignup } from "./components/auth/LoginSignup";
import { OTPVerification } from "./components/auth/OTPVerification";
import { AuthShell } from "./components/auth/AuthShell";
import { AuthToOnboardTransition } from "./components/auth/AuthToOnboardTransition";
import { AnalyzingTransition } from "./components/onboarding/AnalyzingTransition";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FORM_PAGE_MOTION = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] as const },
};

const SCREEN_LABELS: Record<number, string> = {
  [-1]: "Login / Signup",
  0: "OTP Verification",
  1: "Before You Begin",
  2: "Account Owner",
  3: "Business Identity",
  4: "Company Address",
  5: "Signatory",
  6: "Review & Submit",
  7: "Terms — Page 1",
  8: "Terms — Page 2",
  9: "Terms — Page 3",
  10: "Terms — Page 4",
  11: "Aadhaar OTP",
  12: "Success",
};
const MIN_SCREEN = -1;
const MAX_SCREEN = 12;

function DemoNav({ screen, setScreen }: { screen: number; setScreen: (n: number) => void }) {
  const prev = () => setScreen(Math.max(MIN_SCREEN, screen - 1));
  const next = () => setScreen(Math.min(MAX_SCREEN, screen + 1));
  const btn =
    "pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-black/55 text-white backdrop-blur-md border border-white/15 shadow-lg hover:bg-black/75 transition disabled:opacity-30 disabled:cursor-not-allowed";
  return (
    <div className="fixed inset-0 z-[200] pointer-events-none">
      <button
        aria-label="Previous screen"
        onClick={prev}
        disabled={screen <= MIN_SCREEN}
        className={`${btn} absolute left-3 top-1/2 -translate-y-1/2`}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        aria-label="Next screen"
        onClick={next}
        disabled={screen >= MAX_SCREEN}
        className={`${btn} absolute right-3 top-1/2 -translate-y-1/2`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

// -1: Login/Signup, 0: OTP Verification
// 1: BeforeYouBegin, 2: AccountOwner, 3: BusinessIdentity,
// 4: CompanyAddress, 5: Signatory, 6: ReviewSubmit,
// 7-10: Terms pages, 11: Aadhaar OTP, 12: Success (final)
const SIDEBAR_STEP_FOR_SCREEN: Record<number, number> = {
  1: 0, 2: 1, 3: 2, 4: 2, 5: 3, 6: 4,
  7: 4, 8: 4, 9: 4, 10: 4, 11: 4,
};
const SUB_FOR_SCREEN: Record<number, string | undefined> = {
  3: "identity",
  4: "address",
};
const COMPLETED_SUBS_FOR_SCREEN: Record<number, string[]> = {
  4: ["identity"],
  5: ["identity", "address"],
  6: ["identity", "address"],
  7: ["identity", "address"],
  8: ["identity", "address"],
  9: ["identity", "address"],
  10: ["identity", "address"],
  11: ["identity", "address"],
};
const COMPLETED_FOR_SCREEN: Record<number, number[]> = {
  1: [], 2: [], 3: [1], 4: [1], 5: [1, 2], 6: [1, 2, 3],
  7: [1, 2, 3, 4], 8: [1, 2, 3, 4], 9: [1, 2, 3, 4], 10: [1, 2, 3, 4], 11: [1, 2, 3, 4],
};

export default function App() {
  // Start at -1 for login/signup
  const [screen, setScreen] = useState(-1);
  const [furthestFormScreen, setFurthestFormScreen] = useState(1);
  const [authEmail, setAuthEmail] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [transitionContext, setTransitionContext] = useState<"documents" | "signing">("documents");
  const [state, setState] = useState({
    fullName: "John Doe",
    email: "john@company.com",
    mobile: "",
    spend: "",
    idType: "GSTIN",
    idValue: "29AABCP1234F1Z5",
    billingSame: true,
    sameAsOwner: true,
    sigName: "John Doe",
    sigEmail: "john@company.com",
    sigMobile: "",
    designation: "",
    sigConfirm: false,
    declaration: false,
    termsPage1Accepted: false,
    termsPage2Accepted: false,
    termsPage3Accepted: false,
    termsPage4Accepted: false,
    aadhaarOTP: "",
    esignVerified: false,
    panNumber: "",
    panName: "",
    panVerified: false,
  });

  const handleAuthContinue = (email: string, password: string, signup: boolean) => {
    setAuthEmail(email);
    setIsSignup(signup);
    setState((current) => ({
      ...current,
      email,
      sigEmail: current.sameAsOwner ? email : current.sigEmail,
    }));
    setScreen(0); // Move to OTP verification
  };

  const handleOTPVerify = () => {
    setTransitioning(true);
    // Trigger transition animation
    window.setTimeout(() => setScreen(1), 600);
    window.setTimeout(() => setTransitioning(false), 1800);
  };

  const handleBeforeYouBeginContinue = (nextScreen: number) => {
    // Show analyzing screen
    setTransitionContext("documents");
    setAnalyzing(true);
  };

  const handleAnalyzingComplete = () => {
    setAnalyzing(false);
    // Smooth transition to next screen
    window.setTimeout(() => setScreen(transitionContext === "signing" ? 12 : 2), 300);
  };

  const handleSignComplete = () => {
    setTransitionContext("signing");
    setAnalyzing(true);
  };

  const handleStepClick = (stepId: number, subId?: string) => {
    switch (stepId) {
      case 1: setScreen(2); break;
      case 2:
        if (subId === "address") setScreen(4);
        else setScreen(3);
        break;
      case 3: setScreen(5); break;
      case 4: setScreen(6); break;
    }
  };

  useEffect(() => {
    if (screen >= 1 && screen <= 11) {
      setFurthestFormScreen((current) => Math.max(current, screen));
    }
  }, [screen]);

  // Auth screens (-1, 0) don't use the onboarding shell; screen 1 uses the shell without the sidebar.
  const showSidebar = screen >= 2 && screen <= 10;
  const sidebarStep = SIDEBAR_STEP_FOR_SCREEN[screen] ?? 4;
  const progressScreen = screen >= 1 && screen <= 11 ? Math.max(screen, furthestFormScreen) : furthestFormScreen;
  const completed = COMPLETED_FOR_SCREEN[progressScreen] || [1, 2, 3, 4];
  const currentSub = SUB_FOR_SCREEN[screen];
  const completedSubs = COMPLETED_SUBS_FOR_SCREEN[progressScreen];

  // Auth screens render without PageShell. Before You Begin uses PageShell so it gets the shared top bar and background.
  let content: React.ReactNode;
  if (analyzing) {
    content = (
      <motion.div
        key="analyzing"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <AnalyzingTransition
          onComplete={handleAnalyzingComplete}
          stepOneText={transitionContext === "signing" ? "Applying your Aadhaar eSign to all documents..." : undefined}
          stepTwoText={transitionContext === "signing" ? "Finalizing signed terms and conditions..." : undefined}
          successTitle={transitionContext === "signing" ? "Signed successfully..." : undefined}
          successText={transitionContext === "signing" ? "Your terms and conditions have been digitally signed." : undefined}
        />
      </motion.div>
    );
  } else if (screen === -1) {
    content = (
      <AuthShell layout="split">
        <motion.div
          key="login"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="w-full"
        >
          <LoginSignup embedded onContinue={handleAuthContinue} />
        </motion.div>
      </AuthShell>
    );
  } else if (screen === 0) {
    content = (
      <AuthShell layout="centered">
        <motion.div
          key="otp"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="w-full"
        >
          <OTPVerification
            embedded
            email={authEmail}
            onVerify={handleOTPVerify}
            onBack={() => setScreen(-1)}
          />
        </motion.div>
      </AuthShell>
    );
  } else if (screen === 1) {
    content = (
      <motion.div
        key="before-begin"
        initial={FORM_PAGE_MOTION.initial}
        animate={FORM_PAGE_MOTION.animate}
        exit={FORM_PAGE_MOTION.exit}
        transition={FORM_PAGE_MOTION.transition}
      >
        <PageShell
          currentStep={1}
          completed={[]}
          showSidebar={false}
          onSaveExit={() => setScreen(-1)}
        >
          <ScreenBeforeYouBegin go={handleBeforeYouBeginContinue} state={state} setState={setState} />
        </PageShell>
      </motion.div>
    );
  } else {
    content = (
      <motion.div
        key={screen >= 7 && screen <= 10 ? "terms-pages" : `screen-${screen}`}
        initial={FORM_PAGE_MOTION.initial}
        animate={FORM_PAGE_MOTION.animate}
        exit={FORM_PAGE_MOTION.exit}
        transition={FORM_PAGE_MOTION.transition}
      >
        <PageShell
        currentStep={sidebarStep}
        completed={completed}
        currentSub={currentSub}
        completedSubs={completedSubs}
        showSidebar={showSidebar}
        onSaveExit={() => setScreen(1)}
        onStepClick={handleStepClick}
      >
        {screen === 2 && <ScreenAccountOwner go={setScreen} state={state} setState={setState} />}
        {screen === 3 && <ScreenBusinessIdentity go={setScreen} state={state} setState={setState} />}
        {screen === 4 && <ScreenCompanyAddress go={setScreen} state={state} setState={setState} />}
        {screen === 5 && <ScreenSignatory go={setScreen} state={state} setState={setState} />}
        {screen === 6 && <ScreenReviewSubmit go={setScreen} state={state} setState={setState} />}
        {screen === 7 && <ScreenTermsPage1 go={setScreen} state={state} setState={setState} />}
        {screen === 8 && <ScreenTermsPage2 go={setScreen} state={state} setState={setState} />}
        {screen === 9 && <ScreenTermsPage3 go={setScreen} state={state} setState={setState} />}
        {screen === 10 && <ScreenTermsPage4 go={(next: number) => next === 12 ? handleSignComplete() : setScreen(next)} state={state} setState={setState} />}
        {screen === 11 && <ScreenAadhaarOTP go={setScreen} state={state} setState={setState} />}
        {screen === 12 && <ScreenSuccess state={state} />}


        </PageShell>
      </motion.div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {content}
      </AnimatePresence>
      <AnimatePresence>
        {transitioning && <AuthToOnboardTransition key="auth-transition" />}
      </AnimatePresence>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3">
        <button
          aria-label="Previous screen"
          onClick={() => setScreen(Math.max(MIN_SCREEN, screen - 1))}
          disabled={screen <= MIN_SCREEN}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-black/55 text-white backdrop-blur-md border border-white/15 shadow-lg hover:bg-black/75 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          aria-label="Next screen"
          onClick={() => setScreen(Math.min(MAX_SCREEN, screen + 1))}
          disabled={screen >= MAX_SCREEN}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-black/55 text-white backdrop-blur-md border border-white/15 shadow-lg hover:bg-black/75 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
