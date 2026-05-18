import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Loader2,
  Lock,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router";
import pineLabsLogoImg from "../../../../pinelabs logo.png";
import LiquidEther from "./LiquidEther";

export const PRIMARY = "#005656";
export const PRIMARY_DEEP = "#003434";
export const LIME = "#d0f255";
export const TEXT = "#101828";
export const TEXT_2 = "#364153";
export const MUTED = "#4a5565";
export const MUTED_2 = "#99a1af";
export const BORDER = "#e5e7eb";
export const BORDER_INPUT = "#d5d7da";
export const BG_SUBTLE = "#f9fafb";
export const SUCCESS = "#008236";
export const SUCCESS_BG = "#f0fdf4";
export const SUCCESS_BORDER = "#b9f8cf";
export const REQUIRED = "#fb2c36";

export const HEADER_GRADIENT =
  "linear-gradient(90deg, #005656 0%, #006565 50%, #007A7A 100%)";

export const STEPS: {
  id: number;
  label: string;
  subs?: { id: string; label: string }[];
}[] = [
  { id: 1, label: "Document upload" },
  { id: 2, label: "Basic details" },
  {
    id: 3,
    label: "Organisation Details",
    subs: [
      { id: "identity", label: "Business identity" },
      { id: "address", label: "Registered address" },
    ],
  },
  { id: 4, label: "Authorised signatory" },
  {
    id: 5,
    label: "Review and Submit",
    subs: [
      { id: "terms", label: "Terms & Conditions" },
      { id: "aadhaar", label: "Aadhaar eSign" },
      { id: "signature", label: "Signature" },
    ],
  },
];

export function TopNav({
  onSaveExit,
  autosaveKey,
}: {
  onSaveExit?: () => void;
  autosaveKey?: string;
}) {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!autosaveKey) return;

    setIsSaving(true);
    const timer = window.setTimeout(() => setIsSaving(false), 850);
    return () => window.clearTimeout(timer);
  }, [autosaveKey]);

  return (
    <header
      className="h-[60px] sm:h-[70px] flex items-center justify-center backdrop-blur sticky top-0 z-50"
      style={{
        background: "rgba(255,255,255,0.95)",
        borderBottom: "1px solid rgba(229,231,235,0.6)",
      }}
    >
      <div
        className="w-full flex items-center justify-between px-4 sm:px-6 md:px-8 xl:px-[80px]"
        style={{ maxWidth: 1440 }}
      >
        <div className="flex items-center gap-3 sm:gap-6 min-w-0 flex-1">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="h-6 sm:h-7 shrink-0"
            style={{ width: "auto" }}
            aria-label="Pine Labs home"
          >
            <img
              src={pineLabsLogoImg}
              alt="Pine Labs"
              className="h-full w-auto object-contain"
            />
          </button>
          <div
            className="h-5 sm:h-6 w-px hidden sm:block"
            style={{ background: "#d1d5dc" }}
          />
          <div className="min-w-0 flex-1">
            <div
              className="uppercase truncate"
              style={{
                color: PRIMARY,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.08em",
                lineHeight: "14px",
              }}
            >
              Corporate Onboarding
            </div>
            <div
              className="truncate hidden sm:block"
              style={{
                color: TEXT,
                fontWeight: 600,
                fontSize: 12,
                lineHeight: "18px",
              }}
            >
              Gift Card Procurement
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold sm:flex"
            style={{
              color: isSaving ? PRIMARY : SUCCESS,
              background: isSaving ? "#f7fee7" : SUCCESS_BG,
              // border: `1px solid ${isSaving ? "#d9f99d" : SUCCESS_BORDER}`,
            }}
          >
            {isSaving ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <CheckCircle2 size={14} />
            )}
            {isSaving ? "Autosaving..." : "Saved"}
          </div>
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-full transition hover:bg-[#f9fafb] sm:size-10"
            style={{
              color: PRIMARY,
              border: `1px solid ${BORDER_INPUT}`,
              background: "#fff",
            }}
            aria-label="Profile"
          >
            <UserRound size={18} />
          </button>
          <div
            className="hidden h-8 w-px sm:block"
            style={{ background: BORDER_INPUT }}
            aria-hidden="true"
          />
          <button
            onClick={onSaveExit}
            className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-[8px] sm:rounded-[10px] text-xs sm:text-sm hover:bg-[#f9fafb] transition shrink-0"
            style={{
              color: "#252b37",
              fontWeight: 600,
              border: `1px solid ${BORDER_INPUT}`,
              background: "#fff",
            }}
          >
            <span className="hidden sm:inline">Save & Log out</span>
            <span className="sm:hidden">Save</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function SidebarComponent({
  currentStep,
  completed,
  currentSub,
  completedSubs,
  onStepClick,
}: {
  currentStep: number;
  completed: number[];
  currentSub?: string;
  completedSubs?: string[];
  onStepClick?: (step: number, subId?: string) => void;
}) {
  return (
    <aside className="hidden lg:block w-[360px] xl:w-[408px] shrink-0 self-start sticky top-[94px] pr-8 xl:pr-10">
      <motion.div
        className="rounded-[24px] p-6"
        style={{
          background: "rgba(255,255,255,0.6)",
          border: `1px solid ${BORDER_INPUT}`,
          boxShadow:
            "0 4px 6px -2px rgba(16,24,40,0.05), 0 10px 15px -3px rgba(16,24,40,0.05)",
          backdropFilter: "blur(8px)",
        }}
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
        >
          <div
            style={{
              color: TEXT,
              fontWeight: 700,
              fontSize: 20,
              lineHeight: "28px",
            }}
          >
            Account Setup
          </div>
          <div style={{ color: MUTED, fontSize: 12, lineHeight: "18px" }}>
            {currentStep} of {STEPS.length} steps
          </div>
        </motion.div>

        <motion.ol
          className="mt-6 space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.07, delayChildren: 0.18 },
            },
          }}
        >
          {STEPS.map((step, index) => {
            const isComplete = completed.includes(step.id);
            const isActive = step.id === currentStep;
            const isClickable = isComplete || isActive;
            const hasNextStep = index < STEPS.length - 1;
            const hasActiveSubs = Boolean(step.subs && isActive);
            const stepLineColor =
              isComplete || isActive ? "rgba(0, 86, 86, 0.34)" : BORDER_INPUT;

            return (
              <motion.li
                key={step.id}
                onClick={() =>
                  isClickable && onStepClick && onStepClick(step.id)
                }
                className={`relative ${isClickable && onStepClick ? "cursor-pointer" : ""}`}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                {hasNextStep && (
                  <div
                    aria-hidden="true"
                    className={`absolute left-[28px] top-[44px] w-[3px] rounded-full ${
                      hasActiveSubs ? "h-[16px]" : "bottom-[-16px]"
                    }`}
                    style={{ background: stepLineColor }}
                  />
                )}
                <AnimatePresence mode="wait" initial={false}>
                  {isActive ? (
                    <motion.div
                      key="active"
                      className="relative z-10 rounded-[12px] p-4"
                      style={{
                        background: HEADER_GRADIENT,
                        boxShadow:
                          "0 2px 4px -1px rgba(0,0,0,0.06), 0 4px 6px -1px rgba(0,0,0,0.10)",
                      }}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          layout
                          className="size-7 rounded-[8px] flex items-center justify-center text-xs"
                          style={{
                            background: "rgba(255,255,255,0.2)",
                            color: "#fff",
                            fontWeight: 700,
                            lineHeight: "16px",
                          }}
                          initial={{ scale: 0.6 }}
                          animate={{ scale: [0.6, 1.15, 1] }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                          {step.id}
                        </motion.div>
                        <span
                          style={{
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: 16,
                            lineHeight: "19.5px",
                          }}
                        >
                          {step.label}
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="inactive"
                      className="relative z-10 rounded-[12px] p-4"
                      style={{
                        background: isComplete ? "#F3FCF6" : BG_SUBTLE,
                        border: `1px solid ${isComplete ? "#77D4A3" : BORDER_INPUT}`,
                      }}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="size-7 rounded-[8px] flex items-center justify-center text-xs"
                          style={{
                            background: isComplete ? PRIMARY : "#fff",
                            color: isComplete ? "#fff" : MUTED_2,
                            fontWeight: 700,
                            lineHeight: "16px",
                            fontSize: isComplete ? 0 : 12,
                            border: isComplete ? "none" : `1px solid ${BORDER}`,
                          }}
                          animate={
                            isComplete ? { scale: [1, 1.18, 1] } : { scale: 1 }
                          }
                          transition={{ duration: 0.45, ease: "easeOut" }}
                        >
                          {isComplete && (
                            <Check className="size-4" strokeWidth={3} />
                          )}
                          {isComplete ? "✓" : step.id}
                        </motion.div>
                        <span
                          style={{
                            color: TEXT_2,
                            fontWeight: 600,
                            fontSize: 16,
                            lineHeight: "19.5px",
                          }}
                        >
                          {step.label}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence initial={false}>
                  {step.subs && isActive && (
                    <motion.ul
                      key="subs"
                      className="relative ml-[29px] mt-3 space-y-1 overflow-hidden pl-0"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute left-[2px] top-[-12px] bottom-[13px] w-px"
                        style={{ background: "rgba(0, 86, 86, 0.22)" }}
                      />
                      {step.subs.map((sub, i) => {
                        const subActive = currentSub === sub.id;
                        const subDone = completedSubs?.includes(sub.id);
                        const isSubClickable = subDone || subActive;
                        return (
                          <motion.li
                            key={sub.id}
                            onClick={(e) => {
                              if (isSubClickable && onStepClick) {
                                e.stopPropagation();
                                onStepClick(step.id, sub.id);
                              }
                            }}
                            className={`relative flex min-h-[26px] items-center py-1 pl-0 pr-2 ${isSubClickable && onStepClick ? "cursor-pointer" : ""}`}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.05 + i * 0.05,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          >
                            <div
                              className="relative z-10 size-1.5 rounded-full"
                              style={{
                                background: subDone
                                  ? SUCCESS
                                  : subActive
                                    ? PRIMARY
                                    : "#D0D5DD",
                              }}
                            />
                            <span
                              className={subActive ? "ml-3 rounded-full px-3 py-1" : "ml-3 px-0 py-1"}
                              style={{
                                background: subActive
                                  ? "rgba(0,86,86,0.12)"
                                  : "transparent",
                                color: subActive
                                  ? PRIMARY
                                  : subDone
                                    ? TEXT
                                    : MUTED,
                                fontWeight: subActive ? 600 : 500,
                                fontSize: 12,
                                lineHeight: "18px",
                              }}
                            >
                              {sub.label}
                            </span>
                          </motion.li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ol>
      </motion.div>
    </aside>
  );
}

// Memoize the Sidebar to prevent re-renders when props haven't changed
export const Sidebar = React.memo(SidebarComponent);

export function Footer() {
  return (
    <footer
      className="py-3 sm:py-4 text-xs flex items-center justify-center"
      style={{
        color: MUTED,
        borderTop: `1px solid ${BORDER}`,
        background: "#fff",
      }}
    >
      <div
        className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 px-4 sm:px-8 md:px-12 xl:px-[120px]"
        style={{ maxWidth: 1440 }}
      >
        <div className="text-center sm:text-left">
          © 2026 Pine Labs. All rights reserved.
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <a className="hover:text-[#005656] transition" href="#">
            Terms of use
          </a>
          <a className="hover:text-[#005656] transition" href="#">
            Privacy policy
          </a>
          <a className="hover:text-[#005656] transition" href="#">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}

export function MobileStepsAccordion({
  currentStep,
  completed,
  currentSub,
  completedSubs,
  totalSteps,
  progressPercent,
  onStepClick,
}: any) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="sticky top-[60px] z-40 border-b bg-white/95 backdrop-blur sm:top-[70px] lg:hidden"
      style={{ borderColor: BORDER }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 sm:px-6 py-3 flex flex-col gap-2 transition-colors active:bg-gray-50"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span style={{ color: TEXT, fontWeight: 700, fontSize: 13 }}>
              Account Setup
            </span>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{
                background: BG_SUBTLE,
                color: PRIMARY,
                border: `1px solid ${BORDER}`,
              }}
            >
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {open ? (
              <ChevronUp className="size-4 text-gray-400" />
            ) : (
              <ChevronDown className="size-4 text-gray-400" />
            )}
          </div>
        </div>
      </button>

      {open && (
        <div
          className="px-4 sm:px-6 pb-4 pt-2 border-t bg-gray-50/50"
          style={{ borderColor: BORDER }}
        >
          <ol className="space-y-2.5">
            {STEPS.map((step) => {
              const isComplete = completed.includes(step.id);
              const isActive = step.id === currentStep;
              const isClickable = isComplete || isActive;
              return (
                <li
                  key={step.id}
                  onClick={(e) => {
                    if (isClickable && onStepClick) {
                      e.stopPropagation();
                      onStepClick(step.id);
                    }
                  }}
                  className={isClickable && onStepClick ? "cursor-pointer" : ""}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="size-6 rounded-lg flex items-center justify-center text-xs shrink-0 transition-colors"
                      style={{
                        background: isActive
                          ? PRIMARY
                          : isComplete
                            ? SUCCESS_BG
                            : "#fff",
                        color: isActive
                          ? "#fff"
                          : isComplete
                            ? SUCCESS
                            : MUTED_2,
                        fontWeight: 700,
                        border: isComplete
                          ? `1px solid ${SUCCESS_BORDER}`
                          : isActive
                            ? "none"
                            : `1px solid ${BORDER}`,
                      }}
                    >
                      {isComplete ? "✓" : step.id}
                    </div>
                    <span
                      style={{
                        color: isActive ? TEXT : TEXT_2,
                        fontWeight: isActive ? 700 : 500,
                        fontSize: 13,
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                  {step.subs && isActive && (
                    <ul
                      className="mt-2 ml-[11px] pl-5 space-y-2 border-l"
                      style={{ borderColor: BORDER }}
                    >
                      {step.subs.map((sub) => {
                        const subActive = currentSub === sub.id;
                        const subDone = completedSubs?.includes(sub.id);
                        const isSubClickable = subDone || subActive;
                        return (
                          <li
                            key={sub.id}
                            onClick={(e) => {
                              if (isSubClickable && onStepClick) {
                                e.stopPropagation();
                                onStepClick(step.id, sub.id);
                              }
                            }}
                            className={`flex items-center gap-2 ${isSubClickable && onStepClick ? "cursor-pointer" : ""}`}
                          >
                            <div
                              className="size-1.5 rounded-full"
                              style={{
                                background: subDone
                                  ? SUCCESS
                                  : subActive
                                    ? PRIMARY
                                    : "#D0D5DD",
                              }}
                            />
                            <span
                              style={{
                                color: subActive
                                  ? PRIMARY
                                  : subDone
                                    ? TEXT
                                    : MUTED,
                                fontWeight: subActive ? 600 : 500,
                                fontSize: 12,
                              }}
                            >
                              {sub.label}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}

export function PageShell({
  currentStep,
  completed,
  currentSub,
  completedSubs,
  showSidebar = true,
  children,
  onSaveExit,
  onStepClick,
  autosaveKey,
  progressPercent,
}: {
  currentStep: number;
  completed: number[];
  currentSub?: string;
  completedSubs?: string[];
  showSidebar?: boolean;
  children: React.ReactNode;
  onSaveExit?: () => void;
  onStepClick?: (step: number, subId?: string) => void;
  autosaveKey?: string;
  progressPercent?: number;
}) {
  const totalSteps = STEPS.length;
  const setupProgressPercent =
    progressPercent ?? (completed.length / totalSteps) * 100;

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-x-hidden"
      style={{
        color: TEXT,
        backgroundColor: "#FFFFFF",
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(250,255,255,0.88) 48%, rgba(255,255,255,0.98) 100%)",
          }}
        />
        <div className="absolute inset-0 min-h-full opacity-90">
          <LiquidEther
            colors={["#FFFFF0", "#FAFFD6", "#F0F9AE", "#DBEF78", "#D0F255"]}
            mouseForce={8}
            cursorSize={220}
            resolution={0.5}
            isViscous={false}
            iterationsPoisson={24}
            autoDemo
            autoSpeed={0.62}
            autoIntensity={1.5}
            autoResumeDelay={1200}
            autoRampDuration={0.45}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.56) 0%, rgba(255,255,247,0.7) 48%, rgba(255,255,247,0.92) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1 w-full">
        <TopNav onSaveExit={onSaveExit} autosaveKey={autosaveKey} />

        {/* Mobile progress bar and steps accordion */}
        {showSidebar && (
          <MobileStepsAccordion
            currentStep={currentStep}
            completed={completed}
            currentSub={currentSub}
            completedSubs={completedSubs}
            totalSteps={totalSteps}
            progressPercent={setupProgressPercent}
            onStepClick={onStepClick}
          />
        )}

        <div className="flex-1 flex justify-center pb-36 sm:pb-28 md:pb-32">
          <div
            className="flex justify-center w-full"
            style={{ maxWidth: 1440 }}
          >
            <div className="flex items-start w-full px-3 pt-4 sm:px-6 sm:pt-8 md:px-8 lg:pt-16 xl:px-[80px]">
              {showSidebar && (
                <Sidebar
                  currentStep={currentStep}
                  completed={completed}
                  currentSub={currentSub}
                  completedSubs={completedSubs}
                  onStepClick={onStepClick}
                />
              )}
              <main
                className={`flex-1 min-w-0 flex overflow-visible ${
                  showSidebar
                    ? "lg:ml-12 xl:ml-16 justify-start"
                    : "justify-center"
                }`}
              >
                <div className="w-full">{children}</div>
              </main>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export function FormCard({
  eyebrow,
  title,
  subtitle,
  progress,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  progress?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="mx-auto rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden w-full"
      style={{
        maxWidth: 1040,
        background: "rgba(255,255,255,0.85)",
        boxShadow: "0 25px 50px -12px rgba(16,24,40,0.1)",
        backdropFilter: "blur(8px)",
        marginBottom: 8,
      }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="px-5 sm:px-8 md:px-10 py-5 sm:py-6"
        style={{ background: HEADER_GRADIENT }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
          <div className="flex-1 min-w-0">
            {eyebrow && (
              <div
                className="inline-flex items-center justify-center rounded-full px-2.5 py-1 uppercase sm:px-3"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.11em",
                }}
              >
                {eyebrow}
              </div>
            )}
            <h1
              className={eyebrow ? "mt-2.5 sm:mt-3" : ""}
              style={{
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 600,
                lineHeight: "30px",
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className="mt-1.5 text-sm sm:text-base"
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: 13,
                  lineHeight: "20px",
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </motion.div>
      <motion.div
        className="px-5 sm:px-8 md:px-10 pt-5 sm:pt-6 pb-6 sm:pb-8 md:pb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14, duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <span
        className="size-1.5 rounded-full shrink-0"
        style={{ background: PRIMARY }}
      />
      <span style={{ color: TEXT, fontWeight: 700, fontSize: 14 }}>
        {children}
      </span>
    </div>
  );
}

export function StickyActionBar({
  left,
  children,
}: {
  left?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 py-3 sm:py-4 md:py-5 flex items-center justify-center z-40"
      style={{
        background: "rgba(255,255,255,0.98)",
        boxShadow: "0 -1px 3px 0 rgba(10,13,18,0.05)",
        borderTop: `1px solid ${BORDER}`,
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="w-full flex flex-col items-stretch gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-8 xl:px-[80px]"
        style={{ maxWidth: 1440 }}
      >
        <div className="min-w-0 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <Lock className="size-3.5 shrink-0" style={{ color: PRIMARY }} />
            <p
              className="min-w-0 text-[12px]"
              style={{
                color: "#717680",
                fontWeight: 400,
                lineHeight: "16.5px",
                letterSpacing: "0.06px",
              }}
            >
              All information is encrypted
            </p>
          </div>
          {left && <div className="min-w-0">{left}</div>}
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3 sm:shrink-0">
          {children}
        </div>
      </div>
    </div>
  );
}
