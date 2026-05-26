import { useEffect, useMemo, useRef, useState } from "react";
import Lottie from "lottie-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate as animateMV,
} from "motion/react";
import { TopNav } from "./Layout";
import successTickRaw from "./successTick.json";
import diplomaVerifiedIcon from "../../../imports/Diploma Verified.svg";
import mapPointWaveIcon from "../../../imports/Map Point Wave.svg";
import plateIcon from "../../../imports/Plate.svg";
import uploadMinimalisticIcon from "../../../imports/Upload Minimalistic.svg";
import penNewSquareIcon from "../../../imports/Pen New Square.png";
import pineLabsLogoImg from "../../../../pinelabs logo.png";
import signatureImg from "../../../imports/Screenshot 2026-04-17 at 12.33.38 PM 1.png";
import successImg from "../../../imports/success.png";
import signzTermsPage1Img from "../../../imports/signz-terms/page-1.png";
import signzTermsPage2Img from "../../../imports/signz-terms/page-2.png";
import signzTermsPage3Img from "../../../imports/signz-terms/page-3.png";
import signzTermsPage4Img from "../../../imports/signz-terms/page-4.png";
import signzTermsSignedPage1Img from "../../../imports/signz-terms-signed/page-1.png";
import signzTermsSignedPage2Img from "../../../imports/signz-terms-signed/page-2.png";
import signzTermsSignedPage3Img from "../../../imports/signz-terms-signed/page-3.png";
import signzTermsSignedPage4Img from "../../../imports/signz-terms-signed/page-4.png";

function AnimatedPercent({
  value,
  duration = 1.1,
  delay = 0.4,
}: {
  value: number;
  duration?: number;
  delay?: number;
}) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    const controls = animateMV(mv, value, {
      duration,
      delay,
      ease: [0.34, 1.56, 0.64, 1],
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [value, duration, delay, mv, rounded]);
  return <>{display}</>;
}
import {
  Sparkles,
  ShieldCheck,
  Zap,
  FileText,
  Check,
  CheckCircle2,
  CircleAlert,
  Building2,
  Loader2,
  Info,
  Upload,
  ChevronDown,
  ChevronRight,
  Lock,
  Users,
  ShoppingBag,
  Settings as SettingsIcon,
  Download,
  Mail,
  Phone,
  ArrowRight,
  X,
  Trash2,
  RefreshCw,
} from "lucide-react";

type Nav = (n: number) => void;

const PRIMARY = "#005656";
const PRIMARY_HOVER = "#003434";
const LIME = "#d0f255";
const SUCCESS = "#008236";
const SUCCESS_BG = "#f0fdf4";
const SUCCESS_BORDER = "#b9f8cf";
const TEXT = "#101828";
const TEXT_2 = "#364153";
const MUTED = "#4a5565";
const MUTED_2 = "#99a1af";
const BORDER = "#e5e7eb";
const BORDER_INPUT = "#d5d7da";
const BG_SOFT = "#f9fafb";
const REQUIRED = "#fb2c36";
const HEADER_GRADIENT =
  "linear-gradient(90deg, #005656 0%, #006565 50%, #007A7A 100%)";
const GIFT_CARD_PROCUREMENT_DEMO_URL =
  "https://www.figma.com/proto/5INxfo3oiLHKltD4Jc0Jqu/GC-Procurement_Corporate-Portal?node-id=671-67129&viewport=-6018%2C-1301%2C0.07&t=wRlZ2PtAWqnyJlMm-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=671%3A67129&show-proto-sidebar=1&page-id=653%3A20540";

const SUCCESS_TICK_GREEN = [0, 130 / 255, 54 / 255, 1];
const SUCCESS_TICK_TEAL = [0, 86 / 255, 86 / 255, 0.16];
const SPEND_OPTIONS = [
  "5 Lacs - 10 Lacs",
  "10 Lacs - 50 Lacs",
  "50 Lacs - 1 Crore",
  "Above 1 Crore",
];

const BUSINESS_CATEGORY_OPTIONS = [
  "Retail",
  "Food & Beverage",
  "Travel & Hospitality",
  "Healthcare",
  "Education",
  "Financial Services",
  "Technology",
  "Manufacturing",
  "E-commerce",
  "Others",
];

function usesSameEmailSignatoryFlow(state: any) {
  const ownerEmail = (state.email || "").trim().toLowerCase();
  const signatoryEmail = (state.sigEmail || "").trim().toLowerCase();
  return Boolean(ownerEmail) && ownerEmail === signatoryEmail;
}

function usesDelegatedEmailHandoff(state: any) {
  const ownerEmail = (state.email || "").trim().toLowerCase();
  const signatoryEmail = (state.sigEmail || "").trim().toLowerCase();
  return Boolean(signatoryEmail) && ownerEmail !== signatoryEmail;
}

function getRethemedSuccessTick() {
  const cloned = JSON.parse(JSON.stringify(successTickRaw));

  if (Array.isArray(cloned.layers)) {
    cloned.layers = cloned.layers.filter((layer: any) => layer.ind !== 35);
  }

  const visit = (node: any) => {
    if (!node || typeof node !== "object") return;

    if (node.ty === "st" && node.c?.a === 0 && Array.isArray(node.c.k)) {
      const key = node.c.k;
      if (key.length === 4 && key.every((value: number) => value === 1)) {
        node.c.k = SUCCESS_TICK_GREEN;
      } else if (
        key.length === 4 &&
        Math.abs(key[0] - 0) < 0.001 &&
        Math.abs(key[1] - 0.208) < 0.01 &&
        Math.abs(key[2] - 0.133) < 0.01
      ) {
        node.c.k = SUCCESS_TICK_TEAL;
      }
    }

    Object.values(node).forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach(visit);
      } else if (value && typeof value === "object") {
        visit(value);
      }
    });
  };

  visit(cloned);
  return cloned;
}

type Ripple = { id: number; x: number; y: number; size: number };

function PrimaryButton({
  children,
  disabled,
  onClick,
  className = "",
  icon = true,
}: any) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [shineKey, setShineKey] = useState(0);

  const spawnRipple = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.PointerEvent<HTMLButtonElement>,
  ) => {
    if (disabled) return;
    const target = e.currentTarget as HTMLButtonElement;
    const rect = target.getBoundingClientRect();
    const x = (e as any).clientX - rect.left;
    const y = (e as any).clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 1.4;
    const id = Date.now() + Math.random();
    setRipples((r) => [...r, { id, x, y, size }]);
    setShineKey((k) => k + 1);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
  };

  return (
    <motion.button
      onClick={onClick}
      onPointerDown={(e) => {
        if (!disabled) spawnRipple(e);
      }}
      disabled={disabled}
      initial={false}
      whileHover={
        disabled
          ? undefined
          : {
              y: -2,
              backgroundColor: PRIMARY_HOVER,
              boxShadow:
                "0 0 0 1px rgba(208,242,85,0.18), 0 8px 24px -6px rgba(0,86,86,0.45), 0 0 28px 2px rgba(208,242,85,0.18)",
            }
      }
      whileTap={
        disabled
          ? undefined
          : {
              y: 0,
              scale: 0.97,
              boxShadow: "0 4px 12px -4px rgba(0,86,86,0.35)",
            }
      }
      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
      className={`relative inline-flex w-full min-w-[100px] items-center justify-center gap-2 overflow-hidden rounded-[10px] px-4 py-2.5 text-sm sm:w-auto sm:min-w-[120px] sm:rounded-[12px] sm:px-6 sm:py-3 ${className}`}
      style={{
        background: disabled ? "#D0D5DD" : PRIMARY,
        color: "#fff",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        WebkitTapHighlightColor: "transparent",
        willChange: "transform",
      }}
    >
      {/* Glass top highlight */}
      {!disabled && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[10px] sm:rounded-t-[12px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 60%, rgba(255,255,255,0) 100%)",
          }}
        />
      )}

      {/* Shine sweep on tap */}
      {!disabled && shineKey > 0 && (
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

      <span className="relative z-10 inline-flex items-center gap-2">
        <span>{children}</span>
        {icon && (
          <motion.span
            initial={false}
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
          >
            <ArrowRight className="size-4" />
          </motion.span>
        )}
      </span>
    </motion.button>
  );
}

function SecondaryButton({ children, onClick, className = "" }: any) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, backgroundColor: BG_SOFT }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`w-full min-w-[100px] rounded-[8px] px-3 py-2 text-xs sm:w-auto sm:min-w-[120px] sm:rounded-[10px] sm:px-4 sm:py-2.5 sm:text-sm ${className}`}
      style={{
        background: "#fff",
        color: "#252b37",
        fontWeight: 600,
        border: `1px solid ${BORDER_INPUT}`,
      }}
    >
      {children}
    </motion.button>
  );
}

function GhostLink({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="max-w-full truncate text-xs transition hover:underline sm:text-sm"
      style={{ color: PRIMARY, fontWeight: 600 }}
    >
      {children}
    </button>
  );
}

function FieldLabel({ children, optional, required }: any) {
  return (
    <label
      className="block mb-2"
      style={{
        color: TEXT_2,
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "20px",
      }}
    >
      {children}
      {required && (
        <span className="ml-1" style={{ color: REQUIRED }}>
          *
        </span>
      )}
      {optional && (
        <span
          className="ml-1.5 text-sm"
          style={{ color: MUTED, fontWeight: 400 }}
        >
          (optional)
        </span>
      )}
    </label>
  );
}

function TextInput({ valid, ...props }: any) {
  const isReadOnly = Boolean(props.readOnly || props.disabled);

  return (
    <div className="relative">
      <input
        {...props}
        className="w-full px-4 py-2.5 rounded-[8px] outline-none transition"
        style={{
          border: `1px solid ${BORDER_INPUT}`,
          color: props.value ? TEXT : MUTED,
          background: isReadOnly ? BG_SOFT : "#fff",
          fontSize: 14,
          lineHeight: "21px",
          cursor: isReadOnly ? "not-allowed" : "text",
        }}
        onFocus={(e) => {
          if (isReadOnly) return;
          e.currentTarget.style.borderColor = PRIMARY;
        }}
        onBlur={(e) => {
          if (isReadOnly) return;
          e.currentTarget.style.borderColor = BORDER_INPUT;
        }}
      />
      <AnimatePresence>
        {valid && (
          <motion.span
            key="verified"
            initial={{ opacity: 0, scale: 0.6, x: 8 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 px-2.5 py-1 rounded-[10px]"
            style={{
              background: SUCCESS_BG,
              border: `1px solid ${SUCCESS_BORDER}`,
            }}
          >
            <CheckCircle2 className="size-3.5" style={{ color: SUCCESS }} />
            <span style={{ color: SUCCESS, fontWeight: 700, fontSize: 11 }}>
              Verified
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

function Select({ value, onChange, options, placeholder }: any) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-[8px] bg-white px-4 py-2.5 pr-10 outline-none transition"
        style={{
          border: `1px solid ${BORDER_INPUT}`,
          color: value ? TEXT : MUTED_2,
          fontSize: 14,
          lineHeight: "21px",
          minHeight: 44,
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2"
        style={{ color: MUTED }}
      />
    </div>
  );
}

function SpendChipGroup({
  value,
  onChange,
}: {
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 sm:gap-4">
      {SPEND_OPTIONS.map((option) => {
        const selected = value === option;

        return (
          <motion.button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className="w-full rounded-[8px] px-4 py-2 text-sm transition sm:w-auto sm:text-[15px]"
            style={{
              background: selected ? "#f0fdf4" : "#fff",
              border: `1px solid ${selected ? SUCCESS_BORDER : BORDER_INPUT}`,
              color: selected ? PRIMARY : TEXT,
              fontWeight: selected ? 700 : 500,
              boxShadow: selected ? "0 0 0 3px rgba(0,130,54,0.06)" : "none",
            }}
            whileHover={{
              y: -1,
              borderColor: selected ? SUCCESS_BORDER : PRIMARY,
            }}
            whileTap={{ scale: 0.98 }}
          >
            {option}
          </motion.button>
        );
      })}
    </div>
  );
}

function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6 sm:mb-8 max-w-3xl mx-auto">
      <h1
        className="text-2xl sm:text-[30px] leading-8 sm:leading-[38px]"
        style={{
          color: TEXT,
          fontFamily: "var(--font-display)",
          fontWeight: 600,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className="mt-1 sm:mt-1.5 text-sm sm:text-sm"
          style={{ color: MUTED, lineHeight: "21px" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Card({ children, className = "", style: extraStyle = {} }: any) {
  return (
    <div
      className={`rounded-[16px] sm:rounded-[24px] ${className}`}
      style={{
        background: "rgba(255,255,255,0.85)",
        border: "1px solid rgba(229,231,235,0.6)",
        boxShadow:
          "0px 10px 15px 0px rgba(16,24,40,0.05), 0px 4px 6px 0px rgba(16,24,40,0.05)",
        backdropFilter: "blur(8px)",
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

function HeadingBullet() {
  return (
    <motion.span
      className="relative inline-flex size-3.5 shrink-0 overflow-hidden rounded-full"
      style={{
        background: PRIMARY,
        boxShadow: "0px 0px 12px rgba(0, 86, 86, 0.50)",
        outline: "2px solid rgba(255, 255, 255, 0.20)",
        outlineOffset: "-2px",
        transform: "translateZ(0)",
      }}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        className="absolute inset-y-0 w-7"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.60) 50%, rgba(0, 0, 0, 0) 100%)",
          willChange: "transform",
        }}
        initial={{ x: -30 }}
        animate={{ x: 18 }}
        transition={{
          duration: 2.4,
          ease: [0.45, 0, 0.2, 1],
          repeat: Infinity,
          repeatDelay: 2.8,
        }}
      />
    </motion.span>
  );
}

function SectionHeading({ children }: any) {
  return (
    <motion.div
      className="mb-6 flex items-center gap-2.5"
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <HeadingBullet />
      <h2
        style={{
          color: TEXT,
          fontWeight: 700,
          fontSize: 20,
          lineHeight: "28px",
        }}
      >
        {children}
      </h2>
    </motion.div>
  );
}

function FormCard({
  eyebrow,
  title,
  subtitle,
  progress,
  children,
  maxWidth = 960,
  animateIn = true,
  hideHeader = false,
  bodyClassName = "",
}: any) {
  return (
    <motion.div
      className="mx-auto w-full rounded-[16px] sm:rounded-[24px] overflow-hidden"
      style={{
        maxWidth,
        background: "rgba(255,255,255,0.85)",
        boxShadow: "0px 25px 50px -12px rgba(16,24,40,0.10)",
        backdropFilter: "blur(8px)",
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {!hideHeader && (
        <div
          className="px-5 py-4 sm:px-10 sm:py-6 relative"
          style={{
            background: HEADER_GRADIENT,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 12px rgba(0,86,86,0.18)",
          }}
        >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-6">
          <div className="flex-1 min-w-0">
            {eyebrow && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center justify-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase text-[9px] sm:text-[10px]"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.9)",
                  fontWeight: 700,
                  letterSpacing: "0.11em",
                }}
              >
                {eyebrow}
              </motion.div>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className={`${eyebrow ? "mt-2 sm:mt-3" : ""} text-xl sm:text-[30px] leading-7 sm:leading-[38px]`}
              style={{
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
              }}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-1 sm:mt-1.5 text-xs sm:text-sm leading-[18px] sm:leading-[21px]"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          {/* Progress indicator on desktop */}
          {progress !== undefined && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="hidden sm:flex flex-col items-end gap-2 shrink-0"
            >
              <div className="text-right">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: [0.8, 1, 1.18, 1],
                    textShadow: [
                      `0 0 0px ${LIME}00`,
                      `0 0 0px ${LIME}00`,
                      `0 0 16px ${LIME}cc`,
                      `0 0 0px ${LIME}00`,
                    ],
                  }}
                  transition={{
                    delay: 0.35,
                    duration: 1.4,
                    times: [0, 0.3, 0.85, 1],
                    ease: "easeOut",
                  }}
                  className="text-2xl font-bold"
                  style={{ color: LIME }}
                >
                  <AnimatedPercent value={progress} delay={0.4} duration={1} />%
                </motion.div>
                <div
                  className="text-[10px] uppercase tracking-wider mt-0.5"
                  style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}
                >
                  Complete
                </div>
              </div>
              <div className="relative w-40 h-2 rounded-full overflow-visible">
                <div
                  className="absolute inset-0 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <motion.div
                    className="h-full rounded-full relative overflow-hidden"
                    style={{
                      background: `linear-gradient(90deg, ${LIME} 0%, #b8e024 100%)`,
                      boxShadow: `0 0 12px ${LIME}80`,
                    }}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${progress}%`,
                      boxShadow: [
                        `0 0 0px ${LIME}00`,
                        `0 0 18px ${LIME}cc`,
                        `0 0 12px ${LIME}80`,
                      ],
                    }}
                    transition={{
                      delay: 0.4,
                      duration: 1,
                      ease: [0.34, 1.56, 0.64, 1],
                      boxShadow: {
                        delay: 1.1,
                        duration: 0.6,
                        times: [0, 0.4, 1],
                      },
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
                      }}
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{
                        delay: 0.6,
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </div>
                {/* Leading-edge spark */}
                <motion.div
                  className="absolute top-1/2 size-2 rounded-full pointer-events-none"
                  style={{
                    background: "#fff",
                    boxShadow: `0 0 10px 2px ${LIME}, 0 0 18px 4px ${LIME}66`,
                    translateY: "-50%",
                  }}
                  initial={{ left: "0%", opacity: 0, scale: 0.4 }}
                  animate={{
                    left: `${progress}%`,
                    opacity: [0, 1, 1, 0],
                    scale: [0.4, 1, 1.3, 0.6],
                  }}
                  transition={{
                    left: {
                      delay: 0.4,
                      duration: 1,
                      ease: [0.34, 1.56, 0.64, 1],
                    },
                    opacity: {
                      delay: 0.4,
                      duration: 1.4,
                      times: [0, 0.1, 0.85, 1],
                    },
                    scale: {
                      delay: 0.4,
                      duration: 1.4,
                      times: [0, 0.3, 0.85, 1],
                    },
                  }}
                />
                {/* Persistent lime ball at leading edge */}
                <motion.div
                  className="absolute top-1/2 rounded-full pointer-events-none"
                  style={{
                    background: LIME,
                    width: 14,
                    height: 14,
                    translateX: "-50%",
                    translateY: "-50%",
                    border: "2px solid rgba(255,255,255,0.9)",
                  }}
                  initial={{ left: "0%", opacity: 0, scale: 0 }}
                  animate={{
                    left: `${progress}%`,
                    opacity: 1,
                    scale: 1,
                    boxShadow: [
                      `0 0 0px ${LIME}00, 0 0 0px ${LIME}00`,
                      `0 0 12px 2px ${LIME}, 0 0 22px 6px ${LIME}80`,
                      `0 0 8px 1px ${LIME}cc, 0 0 16px 3px ${LIME}66`,
                    ],
                  }}
                  transition={{
                    left: {
                      delay: 0.4,
                      duration: 1,
                      ease: [0.34, 1.56, 0.64, 1],
                    },
                    opacity: { delay: 0.5, duration: 0.4 },
                    scale: {
                      delay: 0.5,
                      duration: 0.5,
                      ease: [0.34, 1.56, 0.64, 1],
                    },
                    boxShadow: {
                      delay: 1.4,
                      duration: 2,
                      times: [0, 0.5, 1],
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    },
                  }}
                />
                {/* Celebration ping at landing */}
                <motion.div
                  className="absolute top-1/2 rounded-full pointer-events-none"
                  style={{
                    left: `${progress}%`,
                    width: 8,
                    height: 8,
                    translateX: "-50%",
                    translateY: "-50%",
                    border: `2px solid ${LIME}`,
                  }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: [0, 0.9, 0], scale: [0.4, 2.6, 3.2] }}
                  transition={{ delay: 1.25, duration: 0.7, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Progress bar for mobile */}
        {progress !== undefined && (
          <motion.div
            className="mt-4 flex items-center gap-3 sm:hidden"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div
              className="relative h-1.5 flex-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.2)" }}
            >
              <motion.div
                className="h-full rounded-full relative overflow-hidden"
                style={{
                  background: `linear-gradient(90deg, ${LIME} 0%, #b8e024 100%)`,
                  boxShadow: `0 0 10px ${LIME}80`,
                }}
                initial={{ width: 0 }}
                animate={{
                  width: `${progress}%`,
                  boxShadow: [
                    `0 0 0px ${LIME}00`,
                    `0 0 16px ${LIME}cc`,
                    `0 0 10px ${LIME}80`,
                  ],
                }}
                transition={{
                  delay: 0.4,
                  duration: 1,
                  ease: [0.34, 1.56, 0.64, 1],
                  boxShadow: {
                    delay: 1.1,
                    duration: 0.6,
                    times: [0, 0.4, 1],
                  },
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
                  }}
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    delay: 0.6,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              {/* Leading-edge spark (mobile) */}
              <motion.div
                className="absolute top-1/2 size-2 rounded-full pointer-events-none"
                style={{
                  background: "#fff",
                  boxShadow: `0 0 8px 2px ${LIME}, 0 0 14px 4px ${LIME}66`,
                  translateY: "-50%",
                }}
                initial={{ left: "0%", opacity: 0, scale: 0.4 }}
                animate={{
                  left: `${progress}%`,
                  opacity: [0, 1, 1, 0],
                  scale: [0.4, 1, 1.3, 0.6],
                }}
                transition={{
                  left: {
                    delay: 0.4,
                    duration: 1,
                    ease: [0.34, 1.56, 0.64, 1],
                  },
                  opacity: {
                    delay: 0.4,
                    duration: 1.4,
                    times: [0, 0.1, 0.85, 1],
                  },
                  scale: {
                    delay: 0.4,
                    duration: 1.4,
                    times: [0, 0.3, 0.85, 1],
                  },
                }}
              />
            </div>
            <motion.div
              className="w-11 shrink-0 text-right text-lg font-bold"
              style={{ color: LIME }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: [0.8, 1, 1.16, 1],
                textShadow: [
                  `0 0 0px ${LIME}00`,
                  `0 0 0px ${LIME}00`,
                  `0 0 14px ${LIME}cc`,
                  `0 0 0px ${LIME}00`,
                ],
              }}
              transition={{
                delay: 0.35,
                duration: 1.4,
                times: [0, 0.3, 0.85, 1],
                ease: "easeOut",
              }}
            >
              <AnimatedPercent value={progress} delay={0.4} duration={1} />%
            </motion.div>
          </motion.div>
        )}
        </div>
      )}
      <motion.div
        className={`${hideHeader ? "px-0 py-0" : "px-5 pt-5 pb-8 sm:px-10 sm:pt-6 sm:pb-10"} ${bodyClassName}`}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.07, delayChildren: 0.2 },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function ActionBar({ left, children }: any) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 py-3 sm:py-4 md:py-5 flex items-center justify-center z-40"
      style={{
        background: "rgba(255,255,255,0.98)",
        boxShadow: "0px -1px 3px rgba(10,13,18,0.05)",
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
              className="min-w-0 text-[11px]"
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

// ============== SCREEN 1 ==============
export function ScreenWelcome({ go }: { go: Nav }) {
  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-12 px-4 sm:px-8">
      <Card className="p-6 sm:p-10 text-center">
        <div
          className="inline-flex items-center justify-center size-12 sm:size-14 rounded-full mb-4 sm:mb-6"
          style={{ background: BG_SOFT }}
        >
          <Sparkles className="size-6 sm:size-7" style={{ color: PRIMARY }} />
        </div>
        <h1
          className="text-xl sm:text-[32px] leading-7 sm:leading-10"
          style={{ color: TEXT, fontWeight: 600 }}
        >
          Get started with corporate gift cards
        </h1>
        <p
          className="mt-2 sm:mt-3 text-sm sm:text-base max-w-xl mx-auto"
          style={{ color: MUTED }}
        >
          Verify your company once and start procuring gift cards for employees,
          partners, and customers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-10 text-left">
          {[
            {
              icon: Zap,
              title: "Autofill company details",
              desc: "Enter GSTIN, CIN, or PAN and we'll fetch available details.",
            },
            {
              icon: CheckCircle2,
              title: "Faster verification",
              desc: "Review pre-filled details instead of filling long forms manually.",
            },
            {
              icon: ShieldCheck,
              title: "Secure onboarding",
              desc: "Your information is used only for business verification and compliance.",
            },
          ].map((b) => (
            <div
              key={b.title}
              className="p-4 sm:p-5 rounded-xl border"
              style={{ borderColor: BORDER, background: "#fff" }}
            >
              <div
                className="size-8 sm:size-9 rounded-lg flex items-center justify-center mb-2 sm:mb-3"
                style={{ background: BG_SOFT }}
              >
                <b.icon
                  className="size-4 sm:size-5"
                  style={{ color: PRIMARY }}
                />
              </div>
              <div
                className="text-xs sm:text-sm mb-1"
                style={{ color: TEXT, fontWeight: 600 }}
              >
                {b.title}
              </div>
              <div className="text-xs leading-relaxed" style={{ color: MUTED }}>
                {b.desc}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-xl text-left"
          style={{ background: BG_SOFT }}
        >
          <div
            className="text-xs sm:text-sm mb-2 sm:mb-3"
            style={{ color: TEXT, fontWeight: 600 }}
          >
            Documents you may need (only if verification asks for them)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
            {[
              "GST certificate",
              "Company PAN",
              "Address proof",
              "Authorisation letter",
            ].map((d) => (
              <div
                key={d}
                className="flex items-center gap-2 text-xs sm:text-sm"
                style={{ color: TEXT }}
              >
                <FileText
                  className="size-3.5 sm:size-4"
                  style={{ color: PRIMARY }}
                />
                {d}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
          <PrimaryButton onClick={() => go(2)}>
            Start onboarding <ArrowRight className="size-4 inline ml-1" />
          </PrimaryButton>
          <SecondaryButton>Continue saved application</SecondaryButton>
        </div>
      </Card>
    </div>
  );
}

// ============== SCREEN 2 ==============
export function ScreenAccountOwner({ go, state, setState, progress }: any) {
  const parts = (state.fullName || "").split(" ");
  const firstName = parts[0] || "";
  const lastName = parts.slice(1).join(" ");
  const setNames = (f: string, l: string) =>
    setState({
      ...state,
      fullName: [f, l].filter(Boolean).join(" "),
      sigName: state.sameAsOwner
        ? [f, l].filter(Boolean).join(" ")
        : state.sigName,
    });

  const emailValid = state.email.includes("@") && state.email.includes(".");
  const businessCategoryValid =
    Boolean(state.businessCategory) &&
    (state.businessCategory !== "Others" ||
      Boolean(state.businessCategoryOther?.trim()));
  const tanNumber = state.tanNumber || "";
  const tanValid = !tanNumber || /^[A-Z]{4}[0-9]{5}[A-Z]$/.test(tanNumber);
  const valid =
    firstName && lastName && emailValid && businessCategoryValid && tanValid;

  return (
    <div className="pb-2 px-2 sm:px-0">
      <FormCard
        title="Required Details"
        subtitle="Please provide the Required Details to get started"
        progress={progress}
      >
        <div className="space-y-6 sm:space-y-7">
          <section>
            <SectionHeading>Personal Details</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * 0, duration: 0.4, ease: "easeOut" }}
              >
                <FieldLabel required>First Name</FieldLabel>
                <motion.div
                  className="px-4 py-2.5 rounded-[8px] flex items-center justify-between relative overflow-hidden"
                  style={{
                    border: `1px solid ${BORDER_INPUT}`,
                    background: "#fff",
                    color: TEXT,
                    fontSize: 14,
                  }}
                  initial={{
                    background: SUCCESS_BG,
                    borderColor: SUCCESS_BORDER,
                  }}
                  animate={{ background: "#fff", borderColor: BORDER_INPUT }}
                  transition={{ delay: 0.08 * 0 + 0.6, duration: 0.9 }}
                >
                  <motion.input
                    value={firstName}
                    placeholder="John"
                    onChange={(e: any) => setNames(e.target.value, lastName)}
                    className="flex-1 bg-transparent border-none outline-none"
                    style={{ color: TEXT, fontSize: 14, lineHeight: "21px" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.08 * 0 + 0.15 }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.15, rotate: -8 }}
                    whileTap={{ scale: 0.9 }}
                    className="shrink-0"
                    type="button"
                  >
                    <EditIcon />
                  </motion.button>
                  <motion.span
                    aria-hidden
                    className="absolute inset-y-0 w-1/3 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(208,242,85,0.35) 50%, transparent 100%)",
                    }}
                    initial={{ x: "-120%" }}
                    animate={{ x: "260%" }}
                    transition={{
                      delay: 0.08 * 0 + 0.1,
                      duration: 0.9,
                      ease: "easeOut",
                    }}
                  />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.08 * 0 + 0.4 }}
                  className="text-xs mt-1.5 flex items-center gap-1"
                  style={{ color: SUCCESS }}
                >
                  <CheckCircle2 className="size-3" /> Fetched from GST Certificate
                </motion.p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * 1, duration: 0.4, ease: "easeOut" }}
              >
                <FieldLabel required>Last Name</FieldLabel>
                <motion.div
                  className="px-4 py-2.5 rounded-[8px] flex items-center justify-between relative overflow-hidden"
                  style={{
                    border: `1px solid ${BORDER_INPUT}`,
                    background: "#fff",
                    color: TEXT,
                    fontSize: 14,
                  }}
                  initial={{
                    background: SUCCESS_BG,
                    borderColor: SUCCESS_BORDER,
                  }}
                  animate={{ background: "#fff", borderColor: BORDER_INPUT }}
                  transition={{ delay: 0.08 * 1 + 0.6, duration: 0.9 }}
                >
                  <motion.input
                    value={lastName}
                    placeholder="Mandal"
                    onChange={(e: any) => setNames(firstName, e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none"
                    style={{ color: TEXT, fontSize: 14, lineHeight: "21px" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.08 * 1 + 0.15 }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.15, rotate: -8 }}
                    whileTap={{ scale: 0.9 }}
                    className="shrink-0"
                    type="button"
                  >
                    <EditIcon />
                  </motion.button>
                  <motion.span
                    aria-hidden
                    className="absolute inset-y-0 w-1/3 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(208,242,85,0.35) 50%, transparent 100%)",
                    }}
                    initial={{ x: "-120%" }}
                    animate={{ x: "260%" }}
                    transition={{
                      delay: 0.08 * 1 + 0.1,
                      duration: 0.9,
                      ease: "easeOut",
                    }}
                  />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.08 * 1 + 0.4 }}
                  className="text-xs mt-1.5 flex items-center gap-1"
                  style={{ color: SUCCESS }}
                >
                  <CheckCircle2 className="size-3" /> Fetched from GST Certificate
                </motion.p>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <Prefilled
                index={2}
                label="Work Email"
                value={state.email}
                source="Prefilled from login"
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * 3, duration: 0.4, ease: "easeOut" }}
              >
                <FieldLabel optional>Mobile Number</FieldLabel>
                <TextInput
                  value={state.mobile}
                  placeholder="+91 9876543210"
                  onChange={(e: any) =>
                    setState({
                      ...state,
                      mobile: e.target.value,
                      sigMobile: state.sameAsOwner
                        ? e.target.value
                        : state.sigMobile,
                    })
                  }
                />
              </motion.div>
            </div>
          </section>

          <section>
            <SectionHeading>Organisation Details</SectionHeading>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel required>Business Category</FieldLabel>
                <Select
                  value={state.businessCategory || ""}
                  onChange={(value: string) =>
                    setState({
                      ...state,
                      businessCategory: value,
                      businessCategoryOther:
                        value === "Others" ? state.businessCategoryOther : "",
                    })
                  }
                  options={BUSINESS_CATEGORY_OPTIONS}
                  placeholder="Select business category"
                />
              </div>
              <div>
                <FieldLabel optional>TAN Number</FieldLabel>
                <TextInput
                  value={tanNumber}
                  placeholder="Enter TAN number"
                  onChange={(e: any) =>
                    setState({
                      ...state,
                      tanNumber: e.target.value.toUpperCase(),
                    })
                  }
                />
                <p
                  className="text-xs mt-1.5"
                  style={{ color: tanValid ? MUTED : REQUIRED }}
                >
                  {tanValid
                    ? "Optional. Add this if your organisation has a TAN."
                    : "Please enter a valid TAN number."}
                </p>
              </div>
              <AnimatePresence initial={false}>
                {state.businessCategory === "Others" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FieldLabel required>
                      Please specify business category
                    </FieldLabel>
                    <TextInput
                      value={state.businessCategoryOther || ""}
                      placeholder="Enter business category"
                      onChange={(e: any) =>
                        setState({
                          ...state,
                          businessCategoryOther: e.target.value,
                        })
                      }
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-4">
              <FieldLabel>Expected Annual Gift Card Spend</FieldLabel>
              <SpendChipGroup
                value={state.spend}
                onChange={(v: string) => setState({ ...state, spend: v })}
              />
              <p className="text-xs mt-1.5" style={{ color: MUTED }}>
                Optional. This helps us recommend the right setup later.
              </p>
            </div>
          </section>
        </div>
      </FormCard>

      <ActionBar>
        <PrimaryButton disabled={!valid} onClick={() => go(4)}>
          Save & next
        </PrimaryButton>
      </ActionBar>
    </div>
  );
}

// ============== BEFORE YOU BEGIN — Document upload + autofill ==============
type DocKey = "gst" | "cin" | "pan" | "address";
type UploadedDoc = { name: string; ext: string; size: string } | null;
type UploadScenario =
  | "success"
  | "error"
  | "ocr_unreadable"
  | "gst_inactive"
  | "cin_existing"
  | "pan_personal";
type ContinueScenario =
  | "success"
  | "gst_inactive"
  | "legal_name_mismatch"
  | "api_unavailable";

type SignatoryScenario = "same_person" | "send_to_authorised";
type FetchedDocKey = Extract<DocKey, "gst" | "cin" | "pan">;
type FetchedDetail = { label: string; value: string };
type DocAlertTone = "error" | "warning";
type DocAlert = { message: string; tone: DocAlertTone } | null;
type ExpandedDocs = Partial<Record<FetchedDocKey, boolean>>;
type SavedDocs = Partial<Record<FetchedDocKey, boolean>>;

const DOC_DEFS: {
  key: DocKey;
  title: string;
  hint: string;
  sample: UploadedDoc;
}[] = [
  {
    key: "cin",
    title: "CIN certificate",
    hint: "PDF or image, up to 5 MB",
    sample: { name: "CIN Certificate.pdf", ext: "PDF", size: "1.2 MB" },
  },
  {
    key: "gst",
    title: "GST certificate",
    hint: "PDF or image, up to 5 MB",
    sample: { name: "GST Certificate.pdf", ext: "PDF", size: "248 KB" },
  },
  {
    key: "pan",
    title: "Company PAN",
    hint: "PDF or image, up to 5 MB",
    sample: { name: "PAN Card.pdf", ext: "PDF", size: "186 KB" },
  },
  {
    key: "address",
    title: "Address proof (optional)",
    hint: "PDF or image, up to 5 MB",
    sample: { name: "Electricity Bill.pdf", ext: "PNG", size: "502 KB" },
  },
];

const DOC_ICONS: Record<DocKey, string> = {
  gst: diplomaVerifiedIcon,
  cin: plateIcon,
  pan: plateIcon,
  address: mapPointWaveIcon,
};

function EditIcon({ className = "size-4" }: { className?: string }) {
  return (
    <img
      src={penNewSquareIcon}
      alt=""
      className={className}
      draggable={false}
    />
  );
}

function DocumentUploadRow({
  docKey,
  title,
  hint,
  sample,
  file,
  docs,
  setDocs,
}: {
  docKey: DocKey;
  title: string;
  hint: string;
  sample: UploadedDoc;
  file: UploadedDoc;
  docs: Record<DocKey, UploadedDoc>;
  setDocs: (docs: Record<DocKey, UploadedDoc>) => void;
}) {
  const iconSrc = DOC_ICONS[docKey];

  return (
    <motion.div
      onClick={() => !file && setDocs({ ...docs, [docKey]: sample })}
      className="min-h-[72px] rounded-2xl px-4 py-4 flex items-center gap-4 transition"
      style={{
        border: `1px solid ${file ? SUCCESS_BORDER : BORDER_INPUT}`,
        background: file ? SUCCESS_BG : "#fff",
        boxShadow: file ? "0 0 0 3px rgba(0,130,54,0.05)" : "none",
        cursor: file ? "default" : "pointer",
      }}
      whileHover={
        !file ? { scale: 1.01, borderColor: PRIMARY } : { borderColor: SUCCESS }
      }
      whileTap={!file ? { scale: 0.99 } : {}}
    >
      <div
        className="size-9 rounded-[10px] flex items-center justify-center shrink-0"
        style={{ background: file ? "#fff" : BG_SOFT }}
      >
        {file ? (
          <CheckCircle2 className="size-5" style={{ color: SUCCESS }} />
        ) : (
          <img src={iconSrc} alt="" className="size-6" draggable={false} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="text-sm truncate"
          style={{ color: TEXT, fontWeight: 600, lineHeight: "20px" }}
        >
          {file ? file.name : title}
        </div>
        <div
          className="text-xs mt-0.5"
          style={{ color: MUTED, lineHeight: "16px" }}
        >
          {file ? `${file.ext} · ${file.size} · Uploaded` : hint}
        </div>
      </div>
      <button
        type="button"
        aria-label={file ? "Replace document" : "Upload document"}
        onClick={(e) => {
          e.stopPropagation();
          setDocs({ ...docs, [docKey]: file ? null : sample });
        }}
        className="shrink-0 inline-flex items-center gap-2"
        style={{
          color: PRIMARY,
          fontWeight: 600,
          fontSize: 14,
          lineHeight: "20px",
        }}
      >
        {file ? (
          <RefreshCw className="size-5" />
        ) : (
          <img
            src={uploadMinimalisticIcon}
            alt=""
            className="size-6"
            draggable={false}
          />
        )}
        <span className="hidden sm:inline">{file ? "Replace" : "Upload"}</span>
      </button>
    </motion.div>
  );
}

const AUTOFETCHED_DETAILS: Record<FetchedDocKey, FetchedDetail[]> = {
  gst: [
    { label: "GSTIN", value: "29AABCP1234F1Z5" },
    { label: "Legal business name as per GST", value: "Pine Labs Private Limited" },
    { label: "Trade name", value: "Pine Labs" },
    { label: "Principal place of business", value: "12 Business Park, Fort, Mumbai" },
    { label: "State / UT", value: "Maharashtra" },
    { label: "PIN code", value: "400001" },
  ],
  cin: [
    { label: "CIN/LLPIN", value: "U72900DL1998PTC096693" },
    { label: "Entity Type", value: "Private Limited Company" },
    { label: "Legal company name", value: "Pine Labs Private Limited" },
    { label: "Registered office", value: "Delhi" },
  ],
  pan: [
    { label: "Company PAN", value: "AABCP1234F" },
    { label: "Legal name as per PAN", value: "Pine Labs Private Limited" },
    { label: "Entity type", value: "Private Limited Company" },
  ],
};

function UploadScenarioModal({
  docKey,
  docTitle,
  onChoose,
  onClose,
}: {
  docKey: DocKey;
  docTitle: string;
  onChoose: (scenario: UploadScenario) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-scenario-title"
    >
      <button
        type="button"
        aria-label="Close scenario selector"
        className="absolute inset-0 bg-[#101828]/45 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <motion.div
        className="relative w-full max-w-md rounded-[20px] bg-white p-5 shadow-2xl sm:p-6"
        initial={{ y: 18, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 18, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full border border-[#e5e7eb] text-[#667085] transition hover:bg-[#f9fafb]"
        >
          <X className="size-4" />
        </button>
        <div className="pr-10">
          <p
            className="text-xs uppercase tracking-[0.08em]"
            style={{ color: MUTED, fontWeight: 700 }}
          >
            {docTitle}
          </p>
          <h3
            id="upload-scenario-title"
            className="mt-2 text-lg"
            style={{ color: TEXT, fontWeight: 700, lineHeight: "28px" }}
          >
            Choose a Scenario (specifically for engg team)
          </h3>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onChoose("success")}
            className="rounded-[14px] border px-4 py-4 text-left transition hover:-translate-y-0.5"
            style={{ borderColor: SUCCESS_BORDER, background: SUCCESS_BG }}
          >
            <CheckCircle2 className="mb-3 size-5" style={{ color: SUCCESS }} />
            <span
              className="block text-sm"
              style={{ color: TEXT, fontWeight: 700 }}
            >
              Success
            </span>
            <span
              className="mt-1 block text-xs"
              style={{ color: MUTED, lineHeight: "18px" }}
            >
	              Upload succeeds and document details expand below.
            </span>
          </button>
          <button
            type="button"
            onClick={() => onChoose("error")}
            className="rounded-[14px] border px-4 py-4 text-left transition hover:-translate-y-0.5"
            style={{ borderColor: "#fecaca", background: "#fff7f7" }}
          >
            <CircleAlert className="mb-3 size-5 text-[#dc2626]" />
            <span
              className="block text-sm"
              style={{ color: TEXT, fontWeight: 700 }}
            >
              Error
            </span>
            <span
              className="mt-1 block text-xs"
              style={{ color: MUTED, lineHeight: "18px" }}
            >
              Upload fails and asks the user to Re-Upload.
            </span>
          </button>
          {docKey === "gst" && (
            <button
              type="button"
              onClick={() => onChoose("gst_inactive")}
              className="rounded-[14px] border px-4 py-4 text-left transition hover:-translate-y-0.5 sm:col-span-2"
              style={{ borderColor: "#fde68a", background: "#fffbeb" }}
            >
              <CircleAlert className="mb-3 size-5 text-[#d97706]" />
              <span
                className="block text-sm"
                style={{ color: TEXT, fontWeight: 700 }}
              >
                GST is cancelled or suspended
              </span>
              <span
                className="mt-1 block text-xs"
                style={{ color: MUTED, lineHeight: "18px" }}
              >
                GST format is valid, but the GST API returns inactive status.
              </span>
            </button>
          )}
          {docKey === "cin" && (
            <button
              type="button"
              onClick={() => onChoose("cin_existing")}
              className="rounded-[14px] border px-4 py-4 text-left transition hover:-translate-y-0.5 sm:col-span-2"
              style={{ borderColor: "#fde68a", background: "#fffbeb" }}
            >
              <CircleAlert className="mb-3 size-5 text-[#d97706]" />
              <span
                className="block text-sm"
                style={{ color: TEXT, fontWeight: 700 }}
              >
                Company already exists in Pine Labs records
              </span>
              <span
                className="mt-1 block text-xs"
                style={{ color: MUTED, lineHeight: "18px" }}
              >
                Same PAN or GSTIN already exists in our records.
              </span>
            </button>
          )}
          {docKey === "pan" && (
            <button
              type="button"
              onClick={() => onChoose("pan_personal")}
              className="rounded-[14px] border px-4 py-4 text-left transition hover:-translate-y-0.5 sm:col-span-2"
              style={{ borderColor: "#fde68a", background: "#fffbeb" }}
            >
              <CircleAlert className="mb-3 size-5 text-[#d97706]" />
              <span
                className="block text-sm"
                style={{ color: TEXT, fontWeight: 700 }}
              >
                Personal PAN uploaded in place of company PAN
              </span>
              <span
                className="mt-1 block text-xs"
                style={{ color: MUTED, lineHeight: "18px" }}
              >
                4th character is P instead of a company identifier.
              </span>
            </button>
          )}
          {docKey !== "address" && (
            <button
              type="button"
              onClick={() => onChoose("ocr_unreadable")}
              className="rounded-[14px] border px-4 py-4 text-left transition hover:-translate-y-0.5 sm:col-span-2"
              style={{ borderColor: "#fed7aa", background: "#fffaf5" }}
            >
              <CircleAlert className="mb-3 size-5 text-[#ea580c]" />
              <span
                className="block text-sm"
                style={{ color: TEXT, fontWeight: 700 }}
              >
                Document image is blurry, glared, or rotated
              </span>
              <span
                className="mt-1 block text-xs"
                style={{ color: MUTED, lineHeight: "18px" }}
              >
                OCR cannot extract reliably.
              </span>
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function EditFetchedDetailsModal({
  rows,
  onSave,
  onClose,
}: {
  rows: FetchedDetail[];
  onSave: (rows: FetchedDetail[]) => void;
  onClose: () => void;
}) {
  const [draftRows, setDraftRows] = useState(rows);
  const isEditableRow = (label: string) => {
    const normalized = label.trim().toLowerCase();
    return normalized === "first name" || normalized === "last name";
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-fetched-details-title"
    >
      <button
        type="button"
        aria-label="Close edit details"
        className="absolute inset-0 bg-[#101828]/45 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <motion.div
        className="relative max-h-[86vh] w-full max-w-2xl overflow-hidden rounded-[20px] bg-white shadow-2xl"
        initial={{ y: 18, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 18, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#eef0f2] px-5 py-4 sm:px-6">
          <div>
            <h3
              id="edit-fetched-details-title"
              className="text-lg"
              style={{ color: TEXT, fontWeight: 700, lineHeight: "28px" }}
            >
              Edit auto fetched details
            </h3>
            <p className="mt-1 text-xs" style={{ color: MUTED }}>
              Update the details before continuing.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[#e5e7eb] text-[#667085] transition hover:bg-[#f9fafb]"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="max-h-[58vh] overflow-y-auto px-5 py-5 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {draftRows.map((row, index) => (
              <label key={row.label} className="block">
                <span
                  className="mb-1.5 block text-xs"
                  style={{ color: MUTED, fontWeight: 700 }}
                >
                  {row.label}
                </span>
                <input
                  value={row.value}
                  readOnly={!isEditableRow(row.label)}
                  onChange={(e) => {
                    if (!isEditableRow(row.label)) return;
                    const value = e.target.value;
                    setDraftRows((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, value } : item,
                      ),
                    );
                  }}
                  className="h-11 w-full rounded-[10px] border border-[#d0d5dd] px-3 text-sm outline-none transition focus:border-[#005656] focus:ring-2 focus:ring-[#005656]/10"
                  style={{
                    color: TEXT,
                    background: isEditableRow(row.label) ? "#fff" : BG_SOFT,
                    cursor: isEditableRow(row.label) ? "text" : "not-allowed",
                  }}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-[#eef0f2] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 items-center justify-center rounded-[10px] border border-[#d0d5dd] px-5 text-sm"
            style={{ color: TEXT, fontWeight: 600 }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(draftRows)}
            className="inline-flex h-11 items-center justify-center rounded-[10px] px-5 text-sm"
            style={{ background: PRIMARY, color: "#fff", fontWeight: 600 }}
          >
            Save changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ScreenBeforeYouBegin({ go, state, setState, progress }: any) {
  const flowMode =
    typeof window !== "undefined"
      ? window.sessionStorage.getItem("onboardingFlowMode") ?? "all"
      : "all";
  const isHappyFlow = flowMode === "happy";
  const [docs, setDocs] = useState<Record<DocKey, UploadedDoc>>({
    gst: null,
    cin: null,
    pan: null,
    address: null,
  });
  const [docAlerts, setDocAlerts] = useState<Record<DocKey, DocAlert>>({
    gst: null,
    cin: null,
    pan: null,
    address: null,
  });
  const [scanningDocs, setScanningDocs] = useState<Record<DocKey, boolean>>({
    gst: false,
    cin: false,
    pan: false,
    address: false,
  });
  const [scenarioDoc, setScenarioDoc] = useState<DocKey | null>(null);
  const [fetchedDocs, setFetchedDocs] = useState<FetchedDocKey[]>([]);
  const [fetchedDetails, setFetchedDetails] = useState<
    Partial<Record<FetchedDocKey, FetchedDetail[]>>
  >({});
  const [expandedDocs, setExpandedDocs] = useState<ExpandedDocs>({});
  const [savedDocs, setSavedDocs] = useState<SavedDocs>({});
  const [gstPresent, setGstPresent] = useState(true);
  const [parsing, setParsing] = useState(false);
  const [showContinueScenario, setShowContinueScenario] = useState(false);
  const [beginErrorMessage, setBeginErrorMessage] = useState<string | null>(null);

  const allUploaded =
    !!docs.cin && !!docs.pan && (gstPresent ? !!docs.gst : !!docs.address);

  const proceedToNextStep = (options?: { manualVerification?: boolean }) => {
    setBeginErrorMessage(null);
    setParsing(true);
    setTimeout(() => {
      setParsing(false);
      setState((current: any) => ({
        ...current,
        idType: "GSTIN",
        idValue: "29AABCP1234F1Z5",
        manualVerification: Boolean(options?.manualVerification),
      }));
      go(2);
    }, 1400);
  };

  const handleContinue = () => {
    setBeginErrorMessage(null);
    if (isHappyFlow) {
      proceedToNextStep();
      return;
    }
    setShowContinueScenario(true);
  };

  const handleContinueScenario = (scenario: ContinueScenario) => {
    setShowContinueScenario(false);

    if (scenario === "success") {
      proceedToNextStep();
      return;
    }

    if (scenario === "gst_inactive") {
      setDocAlerts((current) => ({
        ...current,
        gst: {
          tone: "warning",
          message:
            "Your GST registration appears to be inactive. Please reactivate with the GST department, or continue via the non-GST path.",
        },
      }));
      return;
    }

    if (scenario === "api_unavailable") {
      setBeginErrorMessage(
        "Auto-verification is unavailable due to a network or server issue. You can continue now, and our team will review your details manually.",
      );
      window.setTimeout(() => {
        proceedToNextStep({ manualVerification: true });
      }, 900);
      return;
    }

    setDocAlerts((current) => ({
      ...current,
      gst: {
        tone: "warning",
        message:
          "We found different versions of your company name across your inputs and verification records. Please review the legal name below and confirm the exact registered company name before continuing.",
      },
    }));
    setExpandedDocs((current) => ({
      ...current,
      gst: true,
      ...(fetchedDocs.includes("cin") ? { cin: true } : {}),
      ...(fetchedDocs.includes("pan") ? { pan: true } : {}),
    }));
  };

  const openScenario = (key: DocKey) => {
    const doc = DOC_DEFS.find((item) => item.key === key);
    if (!doc) return;
    if (isHappyFlow) {
      startSuccessfulUpload(key, doc.sample);
      return;
    }
    setScenarioDoc(key);
  };

  const startSuccessfulUpload = (key: DocKey, sample: UploadedDoc) => {
    setScenarioDoc(null);
    setDocAlerts((current) => ({ ...current, [key]: null }));
    setScanningDocs((current) => ({ ...current, [key]: true }));
    if (key === "pan") {
      setState((current: any) => ({
        ...current,
        panDocumentScenario: "",
      }));
    }

    if (key === "gst" || key === "cin" || key === "pan") {
      const details = AUTOFETCHED_DETAILS[key];
      setFetchedDocs((current) => (current.includes(key) ? current : [...current, key]));
      setFetchedDetails((current) => ({ ...current, [key]: [] }));
      setExpandedDocs((current) => ({ ...current, [key]: true }));
      setSavedDocs((current) => ({ ...current, [key]: false }));

      details.forEach((_, index) => {
        window.setTimeout(
          () => {
            setFetchedDetails((current) => ({
              ...current,
              [key]: details.slice(0, index + 1),
            }));
          },
          650 + index * 320,
        );
      });

      window.setTimeout(
        () => {
          setDocs((current) => ({ ...current, [key]: sample }));
          setScanningDocs((current) => ({ ...current, [key]: false }));
        },
        650 + details.length * 320 + 260,
      );
      return;
    }

    window.setTimeout(() => {
      setDocs((current) => ({ ...current, [key]: sample }));
      setScanningDocs((current) => ({ ...current, [key]: false }));
    }, 1300);
  };

  const handleScenario = (scenario: UploadScenario) => {
    if (!scenarioDoc) return;

    const doc = DOC_DEFS.find(({ key }) => key === scenarioDoc);
    if (!doc) return;

    if (scenario === "success") {
      startSuccessfulUpload(scenarioDoc, doc.sample);
    } else {
      if (scenario === "pan_personal") {
        setState((current: any) => ({
          ...current,
          panDocumentScenario: "personal",
        }));
      }

      const isReviewScenario = scenario === "ocr_unreadable";
      const canShowDetails =
        scenarioDoc === "gst" || scenarioDoc === "cin" || scenarioDoc === "pan";

      const keepsUploadedFile =
        isReviewScenario || scenario === "pan_personal";

      setDocs({
        ...docs,
        [scenarioDoc]: keepsUploadedFile ? doc.sample : null,
      });
      setScanningDocs({ ...scanningDocs, [scenarioDoc]: false });
      setDocAlerts({
        ...docAlerts,
        [scenarioDoc]:
          scenario === "cin_existing"
            ? {
                tone: "warning",
                message:
                  "An account for this company already exists. Please log in, or contact your sales POC if you need help accessing it.",
              }
            : scenario === "pan_personal"
              ? {
                  tone: "warning",
                  message:
                    `This looks like a personal PAN, not a company PAN. If you're a sole proprietor, please choose "Sole Proprietorship" as your entity type.`,
                }
            : {
                tone:
                  scenario === "gst_inactive" || scenario === "ocr_unreadable"
                    ? "warning"
                    : "error",
                message:
                  scenario === "ocr_unreadable"
                    ? "We couldn't read your document clearly. Please re-upload a flat, well-lit photo or scan."
                    : scenario === "gst_inactive"
                      ? "Your GST registration appears to be inactive. Please reactivate with the GST department, or continue via the non-GST path."
                      : "We could not read this document. Please Re-Upload a clear PDF or image under 5 MB.",
              },
      });
      if (isReviewScenario && canShowDetails) {
        setFetchedDocs((current) =>
          current.includes(scenarioDoc as FetchedDocKey)
            ? current
            : [...current, scenarioDoc as FetchedDocKey],
        );
        setFetchedDetails((current) => ({
          ...current,
          [scenarioDoc as FetchedDocKey]:
            current[scenarioDoc as FetchedDocKey] ??
            AUTOFETCHED_DETAILS[scenarioDoc as FetchedDocKey],
        }));
        setExpandedDocs((current) => ({
          ...current,
          [scenarioDoc as FetchedDocKey]: true,
        }));
        setSavedDocs((current) => ({
          ...current,
          [scenarioDoc as FetchedDocKey]: false,
        }));
      }
    }

    setScenarioDoc(null);
  };

  const scenarioDocDef = scenarioDoc
    ? DOC_DEFS.find(({ key }) => key === scenarioDoc)
    : null;

  return (
    <div className="pb-2 px-2 sm:px-0">
      <AnimatePresence>
        {!isHappyFlow && scenarioDocDef && (
          <UploadScenarioModal
            docKey={scenarioDocDef.key}
            docTitle={scenarioDocDef.title}
            onChoose={handleScenario}
            onClose={() => setScenarioDoc(null)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isHappyFlow && showContinueScenario && (
          <ContinueScenarioModal
            onChoose={handleContinueScenario}
            onClose={() => setShowContinueScenario(false)}
          />
        )}
      </AnimatePresence>
      <div className="w-full">
        <FormCard
          title="Document upload"
	          subtitle="Upload company documents and review each document's details inline."
          progress={progress}
        >
          <div className="space-y-6">
            {beginErrorMessage && (
              <Card
                className="p-4 sm:p-5"
                style={{ background: "#fffbeb", borderColor: "#fcd34d" } as any}
              >
                <div className="flex items-start gap-3">
                  <CircleAlert
                    className="mt-0.5 size-5 shrink-0"
                    style={{ color: "#d97706" }}
                  />
                  <div>
                    <div
                      className="text-sm"
                      style={{ color: TEXT, fontWeight: 700 }}
                    >
                      Auto-verification needs manual review
                    </div>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: MUTED, lineHeight: "20px" }}
                    >
                      {beginErrorMessage}
                    </p>
                  </div>
                </div>
              </Card>
            )}
            <section>
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="[&>div]:mb-0">
                  <SectionHeading>Required documents</SectionHeading>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="text-sm"
                    style={{ color: TEXT_2, fontWeight: 600 }}
                  >
                    GST present
                  </div>
                  <motion.button
                    type="button"
                    aria-pressed={gstPresent}
                    onClick={() => setGstPresent((value) => !value)}
                    className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                    style={{ background: gstPresent ? PRIMARY : "#e9eaeb" }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <motion.span
                      className="inline-block size-5 rounded-full bg-white shadow-sm"
                      animate={{ x: gstPresent ? 22 : 2 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  </motion.button>
                </div>
              </div>
              <div className="space-y-3">
                {DOC_DEFS.filter((doc) => doc.key !== "address").map(
                  ({ key, title, hint }) => {
                    const file = docs[key];
                    const alert = docAlerts[key];
                    const scanning = scanningDocs[key];
                    const iconSrc = DOC_ICONS[key];
	                    const disabled = key === "gst" && !gstPresent;
	                    const isWarning = alert?.tone === "warning";
	                    const isError = alert?.tone === "error";
	                    const hasDetails =
	                      (key === "gst" || key === "cin" || key === "pan") &&
	                      fetchedDocs.includes(key);
	                    const isSaved =
	                      key === "gst" || key === "cin" || key === "pan"
	                        ? (savedDocs[key] ?? false)
	                        : false;
	
	                    return (
	                      <motion.div
	                        key={key}
	                        onClick={() => {
	                          if (disabled || scanning) return;
	                          if (hasDetails) {
	                            setExpandedDocs((current) => ({
	                              ...current,
	                              [key as FetchedDocKey]: !(
	                                current[key as FetchedDocKey] ?? false
	                              ),
	                            }));
	                            return;
	                          }
	                          if (!file) openScenario(key);
	                        }}
                        className="relative min-h-[72px] overflow-hidden rounded-2xl px-4 py-4 flex flex-wrap items-center gap-4 transition"
                        style={{
                          border: `1px solid ${
                            disabled
                              ? "#e5e7eb"
                            : scanning
                                ? SUCCESS_BORDER
                              : isWarning
                                ? "#fde68a"
                              : isError
                                ? "#fecaca"
                                : file
                                  ? SUCCESS_BORDER
                                  : BORDER_INPUT
                          }`,
                          background: disabled
                            ? "#f3f4f6"
                            : scanning
                              ? "#fff"
                            : isWarning
                              ? "#fffbeb"
                            : isError
                              ? "#fff7f7"
                              : file
                                ? SUCCESS_BG
                                : "#fff",
                          boxShadow: file || scanning
                            ? "0 0 0 3px rgba(0,130,54,0.05)"
                            : "none",
                          cursor: disabled
                            ? "not-allowed"
                            : scanning
                              ? "wait"
                            : file
                              ? "default"
                              : "pointer",
                          opacity: disabled ? 0.62 : 1,
                        }}
                        whileHover={
                          !disabled && !file && !scanning
                            ? { scale: 1.01, borderColor: PRIMARY }
                            : disabled
                              ? {}
                              : { borderColor: SUCCESS }
                        }
                        whileTap={!disabled && !file && !scanning ? { scale: 0.99 } : {}}
                      >
                        {scanning && (
                          <motion.div
                            aria-hidden="true"
                            className="absolute inset-y-0 left-0"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(240,253,244,0.98) 0%, rgba(220,252,231,0.78) 62%, rgba(255,255,255,0) 100%)",
                            }}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.8, ease: "easeInOut" }}
                          />
                        )}
                        <div
                          className="relative z-10 size-9 rounded-[10px] flex items-center justify-center shrink-0"
                          style={{ background: file ? "#fff" : BG_SOFT }}
                        >
                          {file ? (
                            <CheckCircle2
                              className="size-5"
                              style={{ color: SUCCESS }}
                            />
                          ) : (
                            <img
                              src={iconSrc}
                              alt=""
                              className="size-6"
                              draggable={false}
                            />
                          )}
                        </div>
                        <div className="relative z-10 flex-1 min-w-0">
	                          <div
	                            className="flex flex-wrap items-center gap-2 text-sm"
	                            style={{
	                              color: TEXT,
	                              fontWeight: 600,
	                              lineHeight: "20px",
	                            }}
	                          >
	                            <span className="truncate">{file ? title : title}</span>
	                            {alert && (
	                              <span
	                                className="rounded-[6px] px-2 py-0.5 text-[11px]"
	                                style={{
	                                  background: isWarning ? "#fef3c7" : "#fee2e2",
	                                  color: isWarning ? "#b45309" : "#b91c1c",
	                                  fontWeight: 700,
	                                }}
	                              >
	                                {isWarning ? "Needs review" : "Upload failed"}
	                              </span>
	                            )}
	                          </div>
                          <div
                            className="text-xs mt-0.5"
                            style={{
                              color: isWarning
                                ? "#b54708"
                                : isError
                                  ? "#dc2626"
                                  : MUTED,
                              lineHeight: "16px",
                            }}
	                          >
                            {scanning
                              ? "Reading document details..."
                              : alert && !hasDetails
                                ? alert.message
                              : file && hasDetails && isSaved
                                ? "Details saved"
                              : file && hasDetails
                                ? "Review extracted details"
                              : file
                                ? `${file.ext} - ${file.size} - Uploaded`
                              : hint}
                          </div>
                        </div>
                        <button
                          type="button"
                          disabled={disabled || scanning}
                          aria-label={
                            scanning
                              ? "Uploading document"
                              : file
                              ? "Replace document"
                              : alert
                                ? "Re-upload document"
                                : "Upload document"
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            if (disabled || scanning) return;
                            if (file) {
                              setDocs({ ...docs, [key]: null });
                              setDocAlerts({ ...docAlerts, [key]: null });
                              setFetchedDocs((current) =>
                                current.filter((docKey) => docKey !== key),
                              );
                              setFetchedDetails((current) => {
                                const next = { ...current };
                                delete next[key as FetchedDocKey];
                                return next;
                              });
                              setSavedDocs((current) => {
                                const next = { ...current };
                                delete next[key as FetchedDocKey];
                                return next;
                              });
                              setExpandedDocs((current) => ({
                                ...current,
                                [key as FetchedDocKey]: false,
                              }));
	                              return;
                            }
                            openScenario(key);
                          }}
                          className="relative z-10 shrink-0 inline-flex items-center gap-2"
                          style={{
                            color: disabled ? MUTED_2 : alert ? TEXT_2 : PRIMARY,
                            fontWeight: 600,
                            fontSize: 14,
                            lineHeight: "20px",
                            cursor: disabled ? "not-allowed" : "pointer",
                          }}
                        >
                          {file ? (
                            <RefreshCw className="size-5" />
                          ) : (
                            <img
                              src={uploadMinimalisticIcon}
	                              alt=""
	                              className="size-6"
                              style={{
                                filter: alert
                                  ? "grayscale(1) brightness(0.45)"
                                  : undefined,
                              }}
	                              draggable={false}
	                            />
                          )}
                          <span className="hidden sm:inline">
                            {scanning
                              ? "Uploading"
                              : file
                                ? "Replace"
                                : alert
                                  ? "Re-Upload"
                                  : "Upload"}
	                          </span>
	                        </button>
	                        {(key === "gst" || key === "cin" || key === "pan") &&
	                          fetchedDocs.includes(key) && (
	                            <DocumentDetailsAccordion
	                              docKey={key}
	                              alert={alert}
	                              rows={fetchedDetails[key] ?? AUTOFETCHED_DETAILS[key]}
	                              expanded={expandedDocs[key] ?? false}
	                              saved={savedDocs[key] ?? false}
	                              onToggle={() =>
	                                setExpandedDocs((current) => ({
	                                  ...current,
	                                  [key]: !(current[key] ?? false),
	                                }))
	                              }
	                              onRowsChange={(rows) =>
	                                {
	                                  setFetchedDetails((current) => ({
	                                    ...current,
	                                    [key]: rows,
	                                  }));
	                                  setSavedDocs((current) => ({
	                                    ...current,
	                                    [key]: false,
	                                  }));
	                                }
	                              }
	                              onSave={() => {
	                                setSavedDocs((current) => ({
	                                  ...current,
	                                  [key]: true,
	                                }));
	                                setExpandedDocs((current) => ({
	                                  ...current,
	                                  [key]: false,
	                                }));
	                              }}
	                            />
	                          )}
	                      </motion.div>
	                    );
                  },
                )}
              </div>
              {/* <p
                className="text-xs mt-4"
                style={{ color: MUTED, lineHeight: "16px" }}
              >
                We'll use these only for verification. Nothing is shared.
              </p> */}
            </section>
            {!gstPresent && (
              <section>
                <h2
                  className="mb-4 text-base sm:text-lg"
                  style={{ color: TEXT, fontWeight: 700, lineHeight: "24px" }}
                >
                  If GST not present
                </h2>
                {DOC_DEFS.filter((doc) => doc.key === "address").map(
                  ({ key, title, hint }) => {
                    const file = docs[key];
                    const alert = docAlerts[key];
                    const scanning = scanningDocs[key];
                    const iconSrc = DOC_ICONS[key];
                    const isWarning = alert?.tone === "warning";
                    const isError = alert?.tone === "error";

                    return (
                      <motion.div
                        key={key}
                        onClick={() => !file && !scanning && openScenario(key)}
                        className="relative min-h-[72px] overflow-hidden rounded-2xl px-4 py-4 flex flex-wrap items-center gap-4 transition"
                        style={{
                          border: `1px solid ${
                            scanning
                              ? SUCCESS_BORDER
                              : isWarning
                              ? "#fde68a"
                              : isError
                              ? "#fecaca"
                              : file
                                ? SUCCESS_BORDER
                                : BORDER_INPUT
                          }`,
                          background: scanning
                            ? "#fff"
                            : isWarning
                            ? "#fffbeb"
                            : isError
                            ? "#fff7f7"
                            : file
                              ? SUCCESS_BG
                              : "#fff",
                          boxShadow: file || scanning
                            ? "0 0 0 3px rgba(0,130,54,0.05)"
                            : "none",
                          cursor: scanning ? "wait" : file ? "default" : "pointer",
                        }}
                        whileHover={
                          !file && !scanning
                            ? { scale: 1.01, borderColor: PRIMARY }
                            : { borderColor: SUCCESS }
                        }
                        whileTap={!file && !scanning ? { scale: 0.99 } : {}}
                      >
                        {scanning && (
                          <motion.div
                            aria-hidden="true"
                            className="absolute inset-y-0 left-0"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(240,253,244,0.98) 0%, rgba(220,252,231,0.78) 62%, rgba(255,255,255,0) 100%)",
                            }}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.4, ease: "easeInOut" }}
                          />
                        )}
                        <div
                          className="relative z-10 size-9 rounded-[10px] flex items-center justify-center shrink-0"
                          style={{ background: file ? "#fff" : BG_SOFT }}
                        >
                          {file ? (
                            <CheckCircle2
                              className="size-5"
                              style={{ color: SUCCESS }}
                            />
                          ) : (
                            <img
                              src={iconSrc}
                              alt=""
                              className="size-6"
                              draggable={false}
                            />
                          )}
                        </div>
                        <div className="relative z-10 flex-1 min-w-0">
                          <div
                            className="text-sm truncate"
                            style={{
                              color: TEXT,
                              fontWeight: 600,
                              lineHeight: "20px",
                            }}
                          >
                            {file ? file.name : title}
                          </div>
                          <div
                            className="text-xs mt-0.5"
                            style={{
                              color: isWarning
                                ? "#b54708"
                                : isError
                                  ? "#dc2626"
                                  : MUTED,
                              lineHeight: "16px",
                            }}
                          >
                            {scanning
	                              ? "Reading document details..."
                              : alert
                              ? alert.message
                              : file
                                ? `${file.ext} - ${file.size} - Uploaded`
                                : hint}
                          </div>
                        </div>
                        <button
                          type="button"
                          aria-label={
                            scanning
                              ? "Uploading document"
                              : file
                              ? "Replace document"
                              : alert
                                ? "Re-upload document"
                                : "Upload document"
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            if (scanning) return;
                            if (file) {
                              setDocs({ ...docs, [key]: null });
                              setDocAlerts({ ...docAlerts, [key]: null });
                              return;
                            }
                            openScenario(key);
                          }}
                          className="relative z-10 shrink-0 inline-flex items-center gap-2"
                          style={{
                            color: alert ? TEXT_2 : PRIMARY,
                            fontWeight: 600,
                            fontSize: 14,
                            lineHeight: "20px",
                          }}
                        >
                          {file ? (
                            <RefreshCw className="size-5" />
                          ) : (
                            <img
                              src={uploadMinimalisticIcon}
	                              alt=""
	                              className="size-6"
                              style={{
                                filter: alert
                                  ? "grayscale(1) brightness(0.45)"
                                  : undefined,
                              }}
	                              draggable={false}
	                            />
                          )}
                          <span className="hidden sm:inline">
                            {scanning
                              ? "Uploading"
                              : file
                                ? "Replace"
                                : alert
                                  ? "Re-Upload"
                                  : "Upload"}
                          </span>
                        </button>
                      </motion.div>
                    );
                  },
                )}
              </section>
            )}
          </div>
        </FormCard>
	        <ActionBar>
          {parsing ? (
            <motion.div
              className="min-w-[120px] px-6 py-3 rounded-[12px] text-sm inline-flex items-center justify-center gap-2"
              style={{ background: PRIMARY, color: "#fff", fontWeight: 600 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Loader2 className="size-4 animate-spin" />
              Reading documents...
            </motion.div>
          ) : (
            <PrimaryButton disabled={!allUploaded} onClick={handleContinue}>
              Continue
            </PrimaryButton>
          )}
        </ActionBar>
      </div>
    </div>
  );
}
// ============== SCREEN 3 ==============
export function ScreenCompanyIdentifier({ go, state, setState }: any) {
  const [loading, setLoading] = useState(false);
  const [showAlt, setShowAlt] = useState(false);
  const tabs = showAlt
    ? ["GSTIN", "CIN / LLPIN", "PAN"]
    : ["GSTIN", "CIN / LLPIN", "PAN"];
  const helper = showAlt
    ? "Use CIN, LLPIN, or PAN to continue. Additional documents may be requested later."
    : "GSTIN helps us fetch your legal name, PAN, registered address, and state.";

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      go(4);
    }, 1400);
  };

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-12 px-4 sm:px-8">
      <PageHeader
        title="Verify your company"
        subtitle="Enter one company identifier. We'll autofill everything we can."
      />
      <Card className="p-5 sm:p-8">
        <div className="flex items-center justify-between mb-2">
          <h3 style={{ fontWeight: 600, color: TEXT }}>Choose how to verify</h3>
          <span
            className="text-xs flex items-center gap-1"
            style={{ color: MUTED }}
          >
            <Info className="size-3.5" /> Pick one — you only need a single
            identifier
          </span>
        </div>
        <p className="text-xs mb-5" style={{ color: MUTED }}>
          We'll fetch your legal name, PAN, registered address, and state
          automatically.
        </p>

        {(() => {
          const options = [
            {
              id: "GSTIN",
              icon: Building2,
              title: "GSTIN",
              tag: "Recommended · Fastest",
              autofills: "Legal name, PAN, registered address, state",
              placeholder: "29AABCP1234F1Z5",
              format: "15 characters · letters + digits",
              regex:
                /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}Z[0-9A-Z]{1}$/i,
              len: 15,
            },
            {
              id: "CIN / LLPIN",
              icon: FileText,
              title: "CIN or LLPIN",
              tag: "Best for companies without GSTIN",
              autofills: "Legal name, entity type, registered address",
              placeholder: "U31900DL1991PLC043974",
              format: "21 characters · MCA registry",
              regex: /^[A-Z][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/i,
              len: 21,
            },
            {
              id: "PAN",
              icon: Sparkles,
              title: "Company PAN",
              tag: "Use if neither GSTIN nor CIN is available",
              autofills: "Legal name only · address may be requested later",
              placeholder: "AABCP1234F",
              format: "10 characters · alphanumeric",
              regex: /^[A-Z]{5}[0-9]{4}[A-Z]$/i,
              len: 10,
            },
          ];

          const selected =
            options.find((o) => o.id === state.idType) || options[0];
          const trimmed = (state.idValue || "")
            .replace(/\s/g, "")
            .toUpperCase();
          const formatValid = selected.regex.test(trimmed);
          const tooShort = trimmed.length > 0 && trimmed.length < selected.len;

          return (
            <>
              <div className="space-y-2.5">
                {options.map((opt) => {
                  const isSelected = state.idType === opt.id;
                  const Icon = opt.icon;
                  return (
                    <div
                      key={opt.id}
                      onClick={() =>
                        setState({ ...state, idType: opt.id, idValue: "" })
                      }
                      className="rounded-xl border transition cursor-pointer"
                      style={{
                        borderColor: isSelected ? PRIMARY : BORDER,
                        background: isSelected ? BG_SOFT : "#fff",
                        boxShadow: isSelected
                          ? "0 0 0 3px rgba(0,107,94,0.08)"
                          : "none",
                      }}
                    >
                      <div className="flex items-center gap-4 p-4">
                        <div
                          className="size-5 rounded-full flex items-center justify-center shrink-0"
                          style={{
                            border: `2px solid ${isSelected ? PRIMARY : "#D0D5DD"}`,
                            background: isSelected ? PRIMARY : "#fff",
                          }}
                        >
                          {isSelected && (
                            <div className="size-2 rounded-full bg-white" />
                          )}
                        </div>
                        <div
                          className="size-10 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            background: isSelected ? "#fff" : "#F9FAFB",
                          }}
                        >
                          <Icon className="size-5" style={{ color: PRIMARY }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className="text-sm"
                              style={{ color: TEXT, fontWeight: 600 }}
                            >
                              {opt.title}
                            </span>
                            {opt.id === "GSTIN" && (
                              <span
                                className="text-[11px] px-2 py-0.5 rounded-full"
                                style={{
                                  background: PRIMARY,
                                  color: "#fff",
                                  fontWeight: 600,
                                }}
                              >
                                Recommended
                              </span>
                            )}
                          </div>
                          <div
                            className="text-xs mt-0.5"
                            style={{ color: MUTED }}
                          >
                            Autofills: {opt.autofills}
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="px-4 pb-4 pl-[4.25rem]">
                          <div className="relative">
                            <input
                              autoFocus
                              value={state.idValue}
                              placeholder={opt.placeholder}
                              maxLength={opt.len + 4}
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  idValue: e.target.value.toUpperCase(),
                                })
                              }
                              className="w-full h-11 px-3.5 pr-24 rounded-lg outline-none text-sm tracking-wider"
                              style={{
                                border: `1px solid ${formatValid ? SUCCESS : tooShort ? "#FDA29B" : BORDER}`,
                                background: "#fff",
                                color: TEXT,
                                fontSize: 14,
                                fontFeatureSettings: "'tnum'",
                              }}
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                              {formatValid ? (
                                <span
                                  className="text-xs flex items-center gap-1"
                                  style={{ color: SUCCESS, fontWeight: 600 }}
                                >
                                  <CheckCircle2 className="size-4" /> Valid
                                </span>
                              ) : (
                                <span
                                  className="text-xs"
                                  style={{ color: MUTED }}
                                >
                                  {trimmed.length}/{opt.len}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <p
                              className="text-xs"
                              style={{ color: tooShort ? "#B42318" : MUTED }}
                            >
                              {tooShort
                                ? `Looks incomplete — ${opt.title} is ${opt.len} characters.`
                                : `Format: ${opt.format}`}
                            </p>
                            <button
                              className="text-xs hover:underline"
                              style={{ color: PRIMARY, fontWeight: 600 }}
                            >
                              Where do I find this?
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div
                className="mt-6 p-4 rounded-lg flex items-start gap-3"
                style={{ background: BG_SOFT }}
              >
                <Info
                  className="size-4 shrink-0 mt-0.5"
                  style={{ color: PRIMARY }}
                />
                <p className="text-xs" style={{ color: TEXT }}>
                  Only one identifier is needed to start. If anything else is
                  required, we'll ask after a quick check — no documents
                  upfront.
                </p>
              </div>

              <div
                className="mt-8 pt-6 border-t flex items-center justify-between"
                style={{ borderColor: BORDER }}
              >
                <span className="text-xs" style={{ color: MUTED }}>
                  Takes about 10 seconds · No documents needed
                </span>
                <PrimaryButton
                  disabled={!formatValid || loading}
                  onClick={handleVerify}
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin" />
                      Fetching company details...
                    </span>
                  ) : (
                    <>
                      Verify & autofill{" "}
                      <ChevronRight className="size-4 inline" />
                    </>
                  )}
                </PrimaryButton>
              </div>
            </>
          );
        })()}
      </Card>
    </div>
  );
}

// ============== Business identity ==============
export function ScreenBusinessIdentity({ go, state, setState, progress }: any) {
  const [gstPresent, setGstPresent] = useState(true);
  const [showGstConfirm, setShowGstConfirm] = useState(false);
  const organisationEntityType =
    state.panDocumentScenario === "personal"
      ? "Sole Proprietor"
      : "Limited Liability Partnership";

  const handleGstToggle = () => {
    if (gstPresent) {
      setShowGstConfirm(true);
      return;
    }

    setGstPresent(true);
  };

  const confirmGstUnavailable = () => {
    setGstPresent(false);
    setShowGstConfirm(false);
  };

  return (
    <div className="pb-2 px-2 sm:px-0">
      <FormCard
        title="Organisation details"
        subtitle="Verify your company's legal information"
        progress={progress}
      >
        <div className="space-y-6 sm:space-y-7">
          <section>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="[&>div]:mb-0">
                <SectionHeading>Business identity</SectionHeading>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="text-sm"
                  style={{ color: TEXT_2, fontWeight: 600 }}
                >
                  GST present
                </div>
                <motion.button
                  type="button"
                  aria-pressed={gstPresent}
                  onClick={handleGstToggle}
                  className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                  style={{ background: gstPresent ? PRIMARY : "#e9eaeb" }}
                  whileTap={{ scale: 0.96 }}
                >
                  <motion.span
                    className="inline-block size-5 rounded-full bg-white shadow-sm"
                    animate={{ x: gstPresent ? 22 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4 sm:mb-7 sm:gap-6">
              <PrefilledWithCheck
                index={0}
                label="Organisation/Entity Type"
                value={organisationEntityType}
                source={
                  state.panDocumentScenario === "personal"
                    ? "Fetched from Company PAN"
                    : "Fetched from CIN certificate"
                }
              />
              <div>
                <FieldLabel>Business Category</FieldLabel>
                <Select
                  value={state.businessCategory || ""}
                  onChange={(value: string) =>
                    setState((current: any) => ({
                      ...current,
                      businessCategory: value,
                    }))
                  }
                  options={BUSINESS_CATEGORY_OPTIONS}
                  placeholder="Select business category"
                />
              </div>
            </div>

            {/* GST Details Section */}
            <AnimatePresence initial={false}>
              {gstPresent && (
                <motion.div
                  className="mb-6 sm:mb-7"
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <h3
                    className="text-base sm:text-lg mb-4"
                    style={{ color: TEXT, fontWeight: 700 }}
                  >
                    GST details
                  </h3>
                  <div className="space-y-4">
                    <PrefilledWithCheck
                      index={0}
                      label="GSTIN Number"
                      value="27AAAAA0000A1Z5"
                      source="Fetched from GST certificate"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <Prefilled
                        index={1}
                        label="GSTIN Name"
                        value="PINE LABS LIMITED"
                        source="Fetched from GST certificate"
                      />
                      <Prefilled
                        index={2}
                        label="GSTIN State"
                        value="KARNATAKA"
                        source="Fetched from GST certificate"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* PAN Details Section */}
            <div className="mb-6 sm:mb-7">
              <h3
                className="text-base sm:text-lg mb-4"
                style={{ color: TEXT, fontWeight: 700 }}
              >
                PAN details
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <PrefilledWithCheck
                  index={3}
                  label="PAN Number"
                  value={state.panNumber}
                  source="Fetched from Company PAN"
                />
                <Prefilled
                  index={4}
                  label="Legal name"
                  value={state.panName}
                  source="Fetched from Company PAN"
                />
              </div>
              <p className="text-xs sm:text-sm mt-2" style={{ color: MUTED }}>
                PAN details will be matched against the type of
                entity/organisation.
              </p>
            </div>

            {/* CIN/LLP Details Section */}
            <div className="mb-6 sm:mb-7">
              <h3
                className="text-base sm:text-lg mb-4"
                style={{ color: TEXT, fontWeight: 700 }}
              >
                CIN details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <PrefilledWithCheck
                  index={4}
                  label="CIN/LLP No"
                  value="U31900DL1991PLC043974"
                  source="Fetched from CIN certificate"
                />
                <Prefilled
                  index={5}
                  label="CIN/LLP Name"
                  value="PINE LABS LIMITED"
                  source="Fetched from CIN certificate"
                />
              </div>
            </div>

            {/* TAN and Annual Spend Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <FieldLabel optional>TAN No.</FieldLabel>
                <TextInput placeholder="Enter TAN Number" />
                <p className="text-xs sm:text-sm mt-2" style={{ color: MUTED }}>
                  Provide only if available
                </p>
              </div>
              {/* <div>
                <FieldLabel>Expected Annual Gift Card Spend</FieldLabel>
                <SpendChipGroup
                  value={state?.spend}
                  onChange={(v: string) => setState({ ...state, spend: v })}
                />
              </div> */}
            </div>
          </section>
        </div>
      </FormCard>

      <ActionBar>
        <PrimaryButton disabled={!state.panVerified} onClick={() => go(4)}>
          Save & continue
        </PrimaryButton>
      </ActionBar>

      <GstUnavailableConfirm
        open={showGstConfirm}
        onCancel={() => setShowGstConfirm(false)}
        onConfirm={confirmGstUnavailable}
      />
    </div>
  );
}

function GstUnavailableConfirm({ open, onCancel, onConfirm }: any) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close GST confirmation"
            className="absolute inset-0 cursor-default"
            style={{ background: "rgba(16,24,40,0.45)" }}
            onClick={onCancel}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="gst-confirm-title"
            className="relative w-full max-w-[440px] rounded-[16px] bg-white p-5 sm:p-6 shadow-2xl"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={onCancel}
              className="absolute right-4 top-4 rounded-md p-1 transition hover:bg-gray-100"
              style={{ color: MUTED }}
            >
              <X className="size-4" />
            </button>

            <div
              className="mb-4 flex size-10 items-center justify-center rounded-full"
              style={{ background: SUCCESS_BG, color: PRIMARY }}
            >
              <Info className="size-5" />
            </div>
            <h3
              id="gst-confirm-title"
              className="pr-8 text-lg leading-7"
              style={{ color: TEXT, fontWeight: 700 }}
            >
              Continue without GST details?
            </h3>
            <p className="mt-2 text-sm leading-6" style={{ color: MUTED }}>
              If selected yes, the GSTIN state must match your
              billing/registered address.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-[10px] px-4 py-2.5 text-sm transition hover:bg-gray-50"
                style={{
                  border: `1px solid ${BORDER_INPUT}`,
                  color: TEXT_2,
                  fontWeight: 600,
                }}
              >
                Keep GST on
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="rounded-[10px] px-4 py-2.5 text-sm transition"
                style={{ background: PRIMARY, color: "#fff", fontWeight: 600 }}
              >
                Yes, GST not present
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============== Registered address ==============
export function ScreenCompanyAddress({ go, state, setState, progress }: any) {
  const billingAddressComplete =
    state.billingSame ||
    (state.billingAddressLine1?.trim() &&
      state.billingCity?.trim() &&
      state.billingState?.trim() &&
      state.billingPinCode?.trim() &&
      state.billingCountry?.trim() &&
      state.billingGstCertificate);

  const setBillingSame = (checked: boolean) => {
    setState({
      ...state,
      billingSame: checked,
      billingAddressLine1: checked
        ? state.registeredAddressLine1
        : state.billingAddressLine1,
      billingAddressLine2: checked
        ? state.registeredAddressLine2
        : state.billingAddressLine2,
      billingCity: checked ? state.registeredCity : state.billingCity,
      billingState: checked ? state.registeredState : state.billingState,
      billingPinCode: checked ? state.registeredPinCode : state.billingPinCode,
      billingCountry: checked ? state.registeredCountry : state.billingCountry,
      billingGstCertificate: checked ? null : state.billingGstCertificate,
    });
  };

  return (
    <div className="pb-2 px-2 sm:px-0">
      <FormCard
        title="Organisation Address"
        subtitle="Confirm your registered and billing addresses"
        progress={progress}
      >
        <div className="space-y-6 sm:space-y-7">
          <section>
            <SectionHeading>Registered address</SectionHeading>
            <div className="space-y-4">
              <Prefilled
                index={0}
                label="Registered Address Line 1"
                value={state.registeredAddressLine1}
                source="Fetched from GST certificate"
              />
              {/* <div>
                <FieldLabel optional>Registered Address Line 2</FieldLabel>
                <TextInput
                  readOnly
                  value={state.registeredAddressLine2 || ""}
                  placeholder="Not available"
                />
              </div> */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Prefilled
                  index={1}
                  label="PIN Code"
                  value={state.registeredPinCode}
                />
                <Prefilled index={2} label="City" value={state.registeredCity} />
                <Prefilled index={3} label="State" value={state.registeredState} />
              </div>
              <Prefilled
                index={4}
                label="Country"
                value={state.registeredCountry}
              />
              <p className="text-xs sm:text-sm" style={{ color: MUTED }}>
                Registered address details are mapped from the documents already
                captured during onboarding.
              </p>
            </div>
          </section>

          <section>
            <SectionHeading>Billing address</SectionHeading>
            <label
              className="flex items-center gap-2.5 cursor-pointer p-3 rounded-lg"
              style={{ background: BG_SOFT }}
            >
              <input
                type="checkbox"
                checked={state.billingSame}
                onChange={(e) => setBillingSame(e.target.checked)}
                className="size-4 accent-[#005656]"
              />
              <span
                className="text-sm"
                style={{ color: TEXT, fontWeight: 600 }}
              >
                Billing address is same as Registered Address
              </span>
            </label>

            {state.billingSame && (
              <div
                className="mt-4 rounded-[12px] border p-4 text-sm leading-6"
                style={{
                  borderColor: SUCCESS_BORDER,
                  background: SUCCESS_BG,
                  color: TEXT_2,
                }}
              >
                Billing address will use the registered address above. No GST
                Certificate upload is required.
              </div>
            )}

            <AnimatePresence>
              {!state.billingSame && (
                <motion.div
                  className="mt-5 space-y-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <FieldLabel required>Billing Address Line 1</FieldLabel>
                    <TextInput
                      value={state.billingAddressLine1 || ""}
                      placeholder="Street address"
                      onChange={(e: any) =>
                        setState({
                          ...state,
                          billingAddressLine1: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <FieldLabel optional>Billing Address Line 2</FieldLabel>
                    <TextInput
                      value={state.billingAddressLine2 || ""}
                      placeholder="Apartment, suite, etc."
                      onChange={(e: any) =>
                        setState({
                          ...state,
                          billingAddressLine2: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <FieldLabel required>PIN Code</FieldLabel>
                      <TextInput
                        value={state.billingPinCode || ""}
                        placeholder="122002"
                        onChange={(e: any) =>
                          setState({
                            ...state,
                            billingPinCode: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <FieldLabel required>City</FieldLabel>
                      <TextInput
                        value={state.billingCity || ""}
                        placeholder="Gurugram"
                        onChange={(e: any) =>
                          setState({ ...state, billingCity: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <FieldLabel required>State</FieldLabel>
                      <TextInput
                        value={state.billingState || ""}
                        placeholder="Haryana"
                        onChange={(e: any) =>
                          setState({ ...state, billingState: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <FieldLabel required>Country</FieldLabel>
                    <TextInput
                      value={state.billingCountry || ""}
                      placeholder="India"
                      onChange={(e: any) =>
                        setState({ ...state, billingCountry: e.target.value })
                      }
                    />
                  </div>

                  <div
                    className="rounded-[14px] border-2 border-dashed p-4"
                    style={{
                      borderColor: state.billingGstCertificate
                        ? SUCCESS_BORDER
                        : BORDER_INPUT,
                      background: state.billingGstCertificate
                        ? SUCCESS_BG
                        : BG_SOFT,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <Upload
                        className="mt-0.5 size-5 shrink-0"
                        style={{ color: PRIMARY }}
                      />
                      <div className="min-w-0 flex-1">
                        <FieldLabel required>GST Certificate</FieldLabel>
                        <p className="mb-3 text-xs leading-5" style={{ color: MUTED }}>
                          Upload the GST Certificate linked to the Billing
                          Address entered above. Accepted formats: PDF, JPG,
                          PNG. Max file size: 5 MB.
                        </p>
                        {state.billingGstCertificate ? (
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                              <div
                                className="truncate text-sm font-semibold"
                                style={{ color: TEXT }}
                              >
                                {state.billingGstCertificate.name}
                              </div>
                              <div className="text-xs" style={{ color: MUTED }}>
                                {state.billingGstCertificate.ext} ·{" "}
                                {state.billingGstCertificate.size}
                              </div>
                            </div>
                            <SecondaryButton
                              onClick={() =>
                                setState({
                                  ...state,
                                  billingGstCertificate: null,
                                })
                              }
                            >
                              Remove
                            </SecondaryButton>
                          </div>
                        ) : (
                          <SecondaryButton
                            onClick={() =>
                              setState({
                                ...state,
                                billingGstCertificate: {
                                  name: "Billing GST Certificate.pdf",
                                  ext: "PDF",
                                  size: "312 KB",
                                },
                              })
                            }
                          >
                            Upload GST Certificate
                          </SecondaryButton>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </FormCard>

      <ActionBar>
        <PrimaryButton disabled={!billingAddressComplete} onClick={() => go(5)}>
          Save & continue
        </PrimaryButton>
      </ActionBar>
    </div>
  );
}

function PANInputWithVerify({
  label,
  value,
  legalName,
  onVerify,
  verified,
  onChange,
  required,
  index = 0,
  source,
}: any) {
  const [isVerifying, setIsVerifying] = useState(false);
  const canVerify = Boolean(value && value.length >= 10);

  const handleVerify = async () => {
    if (!canVerify || isVerifying || verified) return;
    setIsVerifying(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsVerifying(false);
    onVerify();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.4, ease: "easeOut" }}
    >
      {verified ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.08 * index,
              duration: 0.35,
              ease: "easeOut",
            }}
          >
            <FieldLabel required={required}>{label}</FieldLabel>
            <motion.div
              className="relative flex w-full items-center gap-2 overflow-hidden rounded-[8px] px-4 py-2.5"
              style={{ border: `1px solid ${BORDER_INPUT}` }}
              initial={{ background: SUCCESS_BG, borderColor: SUCCESS_BORDER }}
              animate={{ background: "#fff", borderColor: BORDER_INPUT }}
              transition={{ delay: 0.08 * index + 0.55, duration: 0.9 }}
            >
              <div
                className="min-w-0 flex-1"
                style={{
                  color: TEXT,
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                {value}
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: [0.5, 1.18, 1] }}
                transition={{ delay: 0.08 * index + 0.15, duration: 0.45 }}
              >
                <CheckCircle2
                  className="size-5 shrink-0"
                  style={{ color: SUCCESS }}
                />
              </motion.div>
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 w-1/3"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(208,242,85,0.45) 50%, transparent 100%)",
                }}
                initial={{ x: "-120%" }}
                animate={{ x: "260%" }}
                transition={{
                  delay: 0.08 * index + 0.1,
                  duration: 2.4,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            {source && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.08 * index + 0.4 }}
                className="text-xs mt-1.5 flex items-center gap-1"
                style={{ color: SUCCESS }}
              >
                <CheckCircle2 className="size-3" /> {source}
              </motion.p>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.08 * (index + 1),
              duration: 0.35,
              ease: "easeOut",
            }}
          >
            <FieldLabel>Legal name</FieldLabel>
            <motion.div
              className="relative flex w-full items-center gap-2 overflow-hidden rounded-[8px] px-4 py-2.5"
              style={{ border: `1px solid ${BORDER_INPUT}` }}
              initial={{ background: SUCCESS_BG, borderColor: SUCCESS_BORDER }}
              animate={{ background: "#fff", borderColor: BORDER_INPUT }}
              transition={{ delay: 0.08 * (index + 1) + 0.55, duration: 0.9 }}
            >
              <div
                className="min-w-0 flex-1"
                style={{
                  color: TEXT_2,
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: "21px",
                }}
              >
                {legalName || "PINE LABS LIMITED"}
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: [0.5, 1.18, 1] }}
                transition={{
                  delay: 0.08 * (index + 1) + 0.15,
                  duration: 0.45,
                }}
              >
                <CheckCircle2
                  className="size-5 shrink-0"
                  style={{ color: SUCCESS }}
                />
              </motion.div>
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 w-1/3"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(208,242,85,0.45) 50%, transparent 100%)",
                }}
                initial={{ x: "-120%" }}
                animate={{ x: "260%" }}
                transition={{
                  delay: 0.08 * (index + 1) + 0.1,
                  duration: 2.4,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            {source && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.08 * (index + 1) + 0.4 }}
                className="text-xs mt-1.5 flex items-center gap-1"
                style={{ color: SUCCESS }}
              >
                <CheckCircle2 className="size-3" /> {source}
              </motion.p>
            )}
          </motion.div>
        </div>
      ) : (
        <>
          <FieldLabel required={required}>{label}</FieldLabel>
          <div className="relative">
            <input
              value={value}
              onChange={onChange}
              placeholder="Enter PAN number"
              className="w-full px-4 py-2.5 rounded-[8px] outline-none transition pr-24"
              style={{
                border: `1px solid ${BORDER_INPUT}`,
                color: value ? TEXT : MUTED_2,
                background: "#fff",
                fontSize: 14,
                lineHeight: "21px",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = PRIMARY)}
              onBlur={(e) => (e.currentTarget.style.borderColor = BORDER_INPUT)}
            />
            <motion.button
              key="verify-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleVerify}
              disabled={!canVerify || isVerifying}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold flex items-center gap-1.5"
              style={{
                color: canVerify ? PRIMARY : MUTED_2,
                cursor: canVerify && !isVerifying ? "pointer" : "not-allowed",
              }}
              whileHover={canVerify && !isVerifying ? { scale: 1.04 } : {}}
              whileTap={canVerify && !isVerifying ? { scale: 0.96 } : {}}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="size-3 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  );
}

function Prefilled({ label, value, source, index = 0, editable = false }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.4, ease: "easeOut" }}
    >
      <FieldLabel>{label}</FieldLabel>
      <motion.div
        className="px-4 py-2.5 rounded-[8px] flex items-center justify-between relative overflow-hidden"
        style={{
          border: `1px solid ${BORDER_INPUT}`,
          background: "#fff",
          color: TEXT_2,
          fontSize: 14,
          minHeight: 44,
        }}
        initial={{ background: SUCCESS_BG, borderColor: SUCCESS_BORDER }}
        animate={{ background: "#fff", borderColor: BORDER_INPUT }}
        transition={{ delay: 0.08 * index + 0.6, duration: 0.9 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08 * index + 0.15 }}
        >
          {value}
        </motion.span>
        {editable && (
          <motion.button
            whileHover={{ scale: 1.15, rotate: -8 }}
            whileTap={{ scale: 0.9 }}
            className="shrink-0"
          >
            <EditIcon />
          </motion.button>
        )}
        <motion.span
          aria-hidden
          className="absolute inset-y-0 w-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(208,242,85,0.45) 50%, transparent 100%)",
          }}
          initial={{ x: "-120%" }}
          animate={{ x: "260%" }}
          transition={{
            delay: 0.08 * index + 0.1,
            duration: 2.4,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      {source && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08 * index + 0.4 }}
          className="text-xs mt-1.5 flex items-center gap-1"
          style={{ color: SUCCESS }}
        >
          <CheckCircle2 className="size-3" /> {source}
        </motion.p>
      )}
    </motion.div>
  );
}

function PrefilledWithCheck({
  label,
  value,
  index = 0,
  required,
  source,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.4, ease: "easeOut" }}
    >
      <FieldLabel required={required}>{label}</FieldLabel>
      <motion.div
        className="px-4 py-2.5 pr-10 rounded-[8px] flex items-center gap-2 relative overflow-hidden"
        style={{
          border: `1px solid ${BORDER_INPUT}`,
          background: "#fff",
          color: TEXT_2,
          fontSize: 14,
          minHeight: 44,
        }}
        initial={{ background: SUCCESS_BG, borderColor: SUCCESS_BORDER }}
        animate={{ background: "#fff", borderColor: BORDER_INPUT }}
        transition={{ delay: 0.08 * index + 0.6, duration: 0.9 }}
      >
        <motion.span
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08 * index + 0.15 }}
        >
          {value}
        </motion.span>
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.08 * index + 0.5, duration: 0.3 }}
        >
          <CheckCircle2
            className="size-5 shrink-0"
            style={{ color: "#00a86b" }}
          />
        </motion.div>
        <motion.span
          aria-hidden
          className="absolute inset-y-0 w-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(208,242,85,0.45) 50%, transparent 100%)",
          }}
          initial={{ x: "-120%" }}
          animate={{ x: "260%" }}
          transition={{
            delay: 0.08 * index + 0.1,
            duration: 2.4,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      {source && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08 * index + 0.4 }}
          className="text-xs mt-1.5 flex items-center gap-1"
          style={{ color: SUCCESS }}
        >
          <CheckCircle2 className="size-3" /> {source}
        </motion.p>
      )}
    </motion.div>
  );
}

function SignatoryScenarioModal({
  onChoose,
  onClose,
}: {
  onChoose: (scenario: SignatoryScenario) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="signatory-scenario-title"
    >
      <button
        type="button"
        aria-label="Close signatory scenario selector"
        className="absolute inset-0 bg-[#101828]/45 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <motion.div
        className="relative w-full max-w-xl rounded-[20px] bg-white p-5 shadow-2xl sm:p-6"
        initial={{ y: 18, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 18, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full border border-[#e5e7eb] text-[#667085] transition hover:bg-[#f9fafb]"
        >
          <X className="size-4" />
        </button>
        <div className="pr-10">
          <p
            className="text-xs uppercase tracking-[0.08em]"
            style={{ color: MUTED, fontWeight: 700 }}
          >
            Authorised signatory
          </p>
          <h3
            id="signatory-scenario-title"
            className="mt-2 text-lg"
            style={{ color: TEXT, fontWeight: 700, lineHeight: "28px" }}
          >
            Choose a Scenario (specifically for engg team)
          </h3>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onChoose("same_person")}
            className="rounded-[14px] border px-4 py-4 text-left transition hover:-translate-y-0.5"
            style={{ borderColor: SUCCESS_BORDER, background: SUCCESS_BG }}
          >
            <CheckCircle2 className="mb-3 size-5" style={{ color: SUCCESS }} />
            <span
              className="block text-sm"
              style={{ color: TEXT, fontWeight: 700 }}
            >
              Same person signing
            </span>
            <span
              className="mt-1 block text-xs"
              style={{ color: MUTED, lineHeight: "18px" }}
            >
              Authorised signatory is the same person filling the form.
            </span>
          </button>
          <button
            type="button"
            onClick={() => onChoose("send_to_authorised")}
            className="rounded-[14px] border px-4 py-4 text-left transition hover:-translate-y-0.5"
            style={{ borderColor: "#fde68a", background: "#fffbeb" }}
          >
            <Mail className="mb-3 size-5 text-[#d97706]" />
            <span
              className="block text-sm"
              style={{ color: TEXT, fontWeight: 700 }}
            >
              Send to authorised person
            </span>
            <span
              className="mt-1 block text-xs"
              style={{ color: MUTED, lineHeight: "18px" }}
            >
              Sends the terms package to a different authorised signatory.
            </span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============== SCREEN 5 ==============
export function ScreenSignatory({ go, state, setState, progress }: any) {
  const [showScenario, setShowScenario] = useState(false);
  const needsLetter = state.designation === "Procurement Manager";
  const valid =
    state.sigName &&
    state.sigEmail &&
    state.sigMobile &&
    state.designation;

  const handleScenario = (scenario: SignatoryScenario) => {
    setShowScenario(false);

    if (scenario === "same_person") {
      setState((current: any) => ({
        ...current,
        sameAsOwner: true,
        sigName: current.fullName,
        sigEmail: current.email,
        sigMobile: current.mobile || current.sigMobile,
      }));
      go(6);
      return;
    }

    setState((current: any) => {
      const currentSignatoryEmail = (current.sigEmail || "").trim().toLowerCase();
      const ownerEmail = (current.email || "").trim().toLowerCase();
      const hasDelegatedEmail =
        currentSignatoryEmail && currentSignatoryEmail !== ownerEmail;

      return {
        ...current,
        sameAsOwner: false,
        sigName:
          !current.sigName || current.sigName === current.fullName
            ? "Animesh Mandal"
            : current.sigName,
        sigEmail: hasDelegatedEmail
          ? current.sigEmail
          : "authorised.signatory@company.com",
        sigMobile: current.sigMobile || current.mobile,
      };
    });
    go(6);
  };

  return (
    <div className="pb-2 px-2 sm:px-0">
      <AnimatePresence>
        {showScenario && (
          <SignatoryScenarioModal
            onChoose={handleScenario}
            onClose={() => setShowScenario(false)}
          />
        )}
      </AnimatePresence>
      <FormCard
        title="Authorised Signatory"
        subtitle="This person will accept terms and complete business verification"
        progress={progress}
      >
        <div className="space-y-6 sm:space-y-7">
          <section>
            <label
              className="flex items-center gap-2.5 cursor-pointer mb-5 sm:mb-6 p-3 rounded-lg"
              style={{ background: BG_SOFT }}
            >
              <input
                type="checkbox"
                checked={state.sameAsOwner}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setState({
                    ...state,
                    sameAsOwner: checked,
                    sigName: checked ? state.fullName : "",
                    sigEmail: checked ? state.email : "",
                    sigMobile: checked ? state.mobile : "",
                  });
                }}
                className="size-4 accent-[#005656]"
              />
              <span
                className="text-sm"
                style={{ color: TEXT, fontWeight: 600 }}
              >
                Same as Personal Details
              </span>
            </label>

            <div className="space-y-4 sm:space-y-5">
              <div>
                <FieldLabel required>Full name</FieldLabel>
                <TextInput
                  value={state.sigName}
                  placeholder="Enter full name"
                  onChange={(e: any) =>
                    setState({ ...state, sigName: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>Email</FieldLabel>
                  <TextInput
                    value={state.sigEmail}
                    placeholder="you@company.com"
                    onChange={(e: any) =>
                      setState({ ...state, sigEmail: e.target.value })
                    }
                  />
                </div>
                <div>
                  <FieldLabel required>Mobile Number</FieldLabel>
                  <TextInput
                    value={state.sigMobile}
                    placeholder="+91 9876543210"
                    onChange={(e: any) =>
                      setState({ ...state, sigMobile: e.target.value })
                    }
                  />
                  <p className="mt-1.5 text-xs" style={{ color: MUTED }}>
                    Please use the same mobile number linked to Aadhaar.
                  </p>
                </div>
              </div>
              <div>
                <FieldLabel required>Designation</FieldLabel>
                <Select
                  value={state.designation}
                  onChange={(v: string) =>
                    setState({ ...state, designation: v })
                  }
                  placeholder="Select designation"
                  options={[
                    "Founder / Director",
                    "Partner",
                    "Finance Head",
                    "HR Head",
                    "Procurement Manager",
                    "Admin Manager",
                    "Other",
                  ]}
                />
              </div>

              <AnimatePresence>
                {needsLetter && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-lg border-2 border-dashed"
                    style={{ borderColor: "#F79009", background: "#FFFAEB" }}
                  >
                    <div className="flex items-start gap-3">
                      <Upload
                        className="size-5 mt-0.5"
                        style={{ color: "#F79009" }}
                      />
                      <div className="flex-1">
                        <div
                          className="text-sm mb-1"
                          style={{ color: TEXT, fontWeight: 600 }}
                        >
                          Upload authorisation letter
                        </div>
                        <p className="text-xs mb-3" style={{ color: MUTED }}>
                          Required if the signatory is not a director, partner,
                          or business owner.
                        </p>
                        <SecondaryButton>Choose file</SecondaryButton>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </section>
        </div>
      </FormCard>

      <ActionBar>
        <PrimaryButton disabled={!valid} onClick={() => setShowScenario(true)}>
          Save & continue
        </PrimaryButton>
      </ActionBar>
    </div>
  );
}

// ============== SCREEN 6 ==============
export function ScreenDocuments({ go }: { go: Nav }) {
  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-12 px-4 sm:px-8">
      <PageHeader
        title="Documents"
        subtitle="Upload only what's needed to complete verification."
      />

      <Card
        className="p-4 sm:p-6 mb-4 sm:mb-5"
        style={{ background: BG_SOFT, borderColor: "#A6E5DC" } as any}
      >
        <div className="flex items-start gap-2 sm:gap-3">
          <div
            className="size-8 sm:size-10 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "#fff" }}
          >
            <CheckCircle2
              className="size-4 sm:size-5"
              style={{ color: SUCCESS }}
            />
          </div>
          <div>
            <div
              className="text-xs sm:text-sm mb-1"
              style={{ color: TEXT, fontWeight: 600 }}
            >
              No documents required right now
            </div>
            <p className="text-xs sm:text-sm" style={{ color: MUTED }}>
              We have enough information to begin verification. If anything else
              is needed, we'll notify you.
            </p>
          </div>
        </div>
      </Card>

      <div
        className="text-xs sm:text-sm mb-2 sm:mb-3"
        style={{ color: MUTED, fontWeight: 500 }}
      >
        Optional uploads
      </div>

      <div className="space-y-3 mb-6 sm:mb-8">
        {[
          {
            name: "Authorisation letter",
            reason: "Speeds up verification if signatory is a manager.",
            status: "Optional",
          },
          {
            name: "Address proof",
            reason: "Required only if billing address differs from registered.",
            status: "Optional",
          },
          {
            name: "Company PAN",
            reason: "Needed only if PAN could not be auto-verified.",
            status: "Optional",
          },
        ].map((d) => (
          <Card
            key={d.name}
            className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
          >
            <div
              className="size-9 sm:size-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: BG_SOFT }}
            >
              <FileText
                className="size-4 sm:size-5"
                style={{ color: PRIMARY }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="text-xs sm:text-sm"
                style={{ color: TEXT, fontWeight: 600 }}
              >
                {d.name}
              </div>
              <div
                className="text-[10px] sm:text-xs mt-0.5"
                style={{ color: MUTED }}
              >
                {d.reason}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
              <span
                className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap"
                style={{ background: "#F2F4F7", color: MUTED }}
              >
                {d.status}
              </span>
              <SecondaryButton>Upload</SecondaryButton>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 sm:justify-between">
        <PrimaryButton onClick={() => go(7)}>Continue to review</PrimaryButton>
      </div>
    </div>
  );
}

// ============== SCREEN 6 ==============
export function ScreenReviewSubmit({
  go,
  state,
  setState,
  onOpenSingzy,
  progress,
}: any) {
  const sameEmailSignatory = usesSameEmailSignatoryFlow(state);
  const delegatedEmailHandoff = usesDelegatedEmailHandoff(state);
  const registeredAddress = [
    state.registeredAddressLine1,
    state.registeredAddressLine2,
    state.registeredCity,
    state.registeredState,
    state.registeredPinCode,
    state.registeredCountry,
  ]
    .filter(Boolean)
    .join(", ");
  const billingAddress = state.billingSame
    ? "Same as Registered Address"
    : [
        state.billingAddressLine1,
        state.billingAddressLine2,
        state.billingCity,
        state.billingState,
        state.billingPinCode,
        state.billingCountry,
      ]
        .filter(Boolean)
        .join(", ");

  return (
    <div className="pb-2 px-2 sm:px-0">
      <FormCard
        title="Review and submit"
        subtitle={
          delegatedEmailHandoff
            ? "Verify your information before sending the terms to the authorised signatory"
            : "Verify your information before proceeding to terms & conditions"
        }
        progress={progress}
      >
        <div className="space-y-7">
          <section>
            <SummaryCard
              title="Documents"
              onEdit={() => go(1)}
              rows={[
                ["CIN Certificate", ""],
                ["CIN Number", "U31900DL1991PLC043974"],
                ["Company Legal Name", "PINE LABS LIMITED"],
                ["Entity Type", "Private Limited Company"],
                // ["Date of Incorporation", "18 May 1998"],
                ["Registration Status", "Active"],
                ["Document Status", "Fetched / Verified"],
                ["GST Certificate", ""],
                ["GSTIN", "29AABCP1234F1Z5"],
                ["Registered Business Name", "PINE LABS LIMITED"],
                ["Registered Address", registeredAddress],
                ...(!state.billingSame
                  ? ([["Billing Address", billingAddress]] as [string, any][])
                  : []),
                ["Document Status", "Fetched / Verified"],
                ["Company PAN", ""],
                ["PAN Number", state.panNumber || "AABCP1234F"],
                [
                  "Document Status",
                  state.panVerified ? "Verified" : "Pending",
                ],
              ]}
            />

            <SummaryCard
              title="Basic Details"
              onEdit={() => go(2)}
              rows={[
                ["Required Details", ""],
                ["Name", state.fullName],
                ["Email", state.email],
                ["Mobile Number", state.mobile || "--"],
                [
                  "Business Category",
                  state.businessCategory === "Others"
                    ? state.businessCategoryOther
                    : state.businessCategory,
                ],
                ["TAN Number", state.tanNumber || "--"],
                ["Expected Annual Gift Card Spend", state.spend || "--"],
                ["Organisation Address", ""],
                ["Registered Address", registeredAddress],
                ["Billing Address", billingAddress],
              ]}
            />

            <SummaryCard
              title="Authorised Signatory"
              onEdit={() => go(5)}
              rows={[
                ["Name", state.sigName],
                ["Email", state.sigEmail],
                ["Mobile Number", state.sigMobile || "--"],
                ["Designation", state.designation || "--"],
              ]}
            />
          </section>

          <section>
            <label
              className="flex items-start gap-2.5 cursor-pointer p-4 rounded-lg"
              style={{ background: BG_SOFT }}
            >
              <input
                type="checkbox"
                checked={state.declaration}
                onChange={(e) =>
                  setState({ ...state, declaration: e.target.checked })
                }
                className="size-4 mt-0.5 accent-[#005656]"
              />
              <span
                className="text-sm"
                style={{ color: TEXT, fontWeight: 600 }}
              >
                {delegatedEmailHandoff
                  ? "I confirm that the information provided is accurate and is ready to be shared with the authorised signatory for review and signoff."
                  : "I confirm that the information provided is accurate and I'm ready to proceed with terms review and digital signature."}
              </span>
            </label>
          </section>
        </div>
      </FormCard>

      <ActionBar>
        <PrimaryButton
          disabled={!state.declaration}
          onClick={() => {
            if (delegatedEmailHandoff) {
              setState({
                ...state,
                awaitingAuthorisedSignoff: true,
                actingAsAuthorisedSignatory: false,
                delegatedSignoffCompleted: false,
                signatoryReadyToReturn: false,
              });
              go(12, { skipSigningTransition: true });
              return;
            }
            if (sameEmailSignatory) {
              setState({
                ...state,
                awaitingAuthorisedSignoff: false,
                actingAsAuthorisedSignatory: false,
                delegatedSignoffCompleted: false,
                signatoryReadyToReturn: false,
              });
              onOpenSingzy?.();
              return;
            }
            go(7);
          }}
        >
          {delegatedEmailHandoff
            ? "Send to Authorised Person"
            : "Review terms & sign"}
        </PrimaryButton>
      </ActionBar>
    </div>
  );
}

function SummaryCard({ title, rows, onEdit }: any) {
  return (
    <motion.div
      className="p-4 sm:p-6 mb-3 sm:mb-4 rounded-[16px] sm:rounded-[20px]"
      style={{
        background: "rgba(255,255,255,0.6)",
        border: "1px solid rgba(229,231,235,0.6)",
        boxShadow: "0px 4px 6px 0px rgba(16,24,40,0.03)",
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ boxShadow: "0px 8px 12px 0px rgba(16,24,40,0.08)" }}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3
          className="text-sm sm:text-[15px]"
          style={{ fontWeight: 600, color: TEXT }}
        >
          {title}
        </h3>
        <motion.button
          onClick={onEdit}
          className="text-xs sm:text-sm flex items-center gap-1"
          style={{ color: PRIMARY, fontWeight: 600 }}
          whileHover={{ scale: 1.05, textDecoration: "underline" }}
        >
          <EditIcon className="size-3 sm:size-3.5" /> Edit
        </motion.button>
      </div>
      <div className="space-y-2.5 sm:space-y-3">
        {rows.map(([k, v]: any, index: number) => (
          <div
            key={`${k}-${index}`}
            className={
              v
                ? "flex flex-col sm:flex-row text-xs sm:text-sm gap-1 sm:gap-0"
                : "pt-4 first:pt-0"
            }
          >
            {v ? (
              <>
                <div
                  className="sm:w-44 shrink-0"
                  style={{ color: MUTED, fontWeight: 600 }}
                >
                  {k}
                </div>
                <div style={{ color: TEXT, fontWeight: 500 }}>{v}</div>
              </>
            ) : (
              <div
                className="border-t pt-4 text-xs font-bold uppercase tracking-[0.08em]"
                style={{ borderColor: BORDER, color: PRIMARY }}
              >
                {k}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ============== TERMS & CONDITIONS (Screens 7-10) ==============
function TermsParagraph({ title, children }: any) {
  return (
    <div>
      <p
        className="mb-1"
        style={{
          color: TEXT,
          fontSize: 16,
          fontWeight: 700,
          lineHeight: "24px",
        }}
      >
        {title}
      </p>
      <p
        style={{
          color: TEXT,
          fontSize: 16,
          fontWeight: 500,
          lineHeight: "24px",
        }}
      >
        {children}
      </p>
    </div>
  );
}

function SignatureStamp() {
  return (
    <div className="mt-8 flex justify-end">
      <div className="inline-flex flex-col items-center gap-2">
        <img
          src={signatureImg}
          alt="Authorised digital signature"
          className="h-16 sm:h-20 w-auto object-contain"
          draggable={false}
        />
        <span className="text-xs" style={{ color: MUTED, fontWeight: 600 }}>
          Digitally signed
        </span>
      </div>
    </div>
  );
}

function TermsDocument({
  page,
  title = "Terms and Conditions for Gift Card Procurement",
  left,
  right,
  children,
  notice,
  framed = false,
  signed = false,
}: any) {
  return (
    <div
      className={
        framed
          ? "mx-auto w-full max-w-[1040px] rounded-[16px] bg-white px-5 py-6 sm:px-8 sm:py-8 lg:px-10"
          : "mx-auto w-full max-w-[1040px]"
      }
      style={
        framed
          ? {
              border: `1px solid ${BORDER}`,
              boxShadow: "0px 25px 50px -12px rgba(16,24,40,0.10)",
            }
          : undefined
      }
    >
      <div className="flex flex-col items-center gap-8">
        <div className="w-full space-y-8">
          <div className="space-y-3 text-center">
            {page === 1 && (
              <div className="flex justify-center p-4 sm:p-6">
                <img
                  src={pineLabsLogoImg}
                  alt="Pine Labs"
                  className="h-[50px] w-auto object-contain"
                  draggable={false}
                />
              </div>
            )}
            <h1
              className="uppercase"
              style={{
                color: TEXT,
                fontSize: 16,
                fontWeight: 700,
                lineHeight: "23px",
                letterSpacing: 0.23,
              }}
            >
              {title}
            </h1>
          </div>

          {notice}

          {children || (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              <div className="space-y-5">{left}</div>
              <div className="space-y-5">{right}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TermsFormPage({ page, progress, children }: any) {
  return (
    <FormCard
      eyebrow={`Page ${page} of 4`}
      title="Terms & Conditions"
      subtitle={
        page === 4
          ? "Final page - please read and accept to proceed to digital signature"
          : "Please review the terms before proceeding"
      }
      progress={progress}
      maxWidth={1280}
      hideHeader
      bodyClassName="px-0 py-0"
    >
      {children}
    </FormCard>
  );
}

function TermsCheckbox({
  label,
  selected = false,
}: {
  label: string;
  selected?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="relative inline-flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-lg"
        style={{
          background: selected ? "#003323" : "#fff",
          border: selected ? "none" : `1px solid ${BORDER_INPUT}`,
        }}
      >
        {selected && (
          <Check
            className="size-5"
            style={{ color: "#50D387", strokeWidth: 2 }}
          />
        )}
      </span>
      <span
        style={{
          color: TEXT,
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "20px",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function TermsCell({
  children,
  label = false,
  className = "",
  center = false,
}: {
  children: React.ReactNode;
  label?: boolean;
  className?: string;
  center?: boolean;
}) {
  return (
    <div
      className={`min-h-11 border-l border-t border-[#181D27] p-3 ${className}`}
      style={{
        color: label ? TEXT_2 : TEXT,
        fontSize: 14,
        fontWeight: label ? 500 : 700,
        lineHeight: "20px",
        textTransform: label ? "none" : "uppercase",
        display: "flex",
        alignItems: center ? "center" : "flex-start",
        justifyContent: center ? "center" : "flex-start",
      }}
    >
      {children}
    </div>
  );
}

function TermsRow({
  label,
  value,
  tall = false,
}: {
  label: string;
  value: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr]">
      <TermsCell label className={tall ? "sm:min-h-[64px]" : ""}>
        {label}
      </TermsCell>
      <TermsCell className={`border-r ${tall ? "sm:min-h-[64px]" : ""}`}>
        {value}
      </TermsCell>
    </div>
  );
}

function TermsSplitRow({ leftLabel, leftValue, rightLabel, rightValue }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr_1fr_1fr]">
      <TermsCell label>{leftLabel}</TermsCell>
      <TermsCell>{leftValue}</TermsCell>
      <TermsCell label>{rightLabel}</TermsCell>
      <TermsCell className="border-r">{rightValue}</TermsCell>
    </div>
  );
}

function TermsProcurementFormContent({
  signed = false,
  showSignatureSection = true,
}: {
  signed?: boolean;
  showSignatureSection?: boolean;
}) {
  const orgTypes = [
    "Sole Proprietorship",
    "Partnership",
    "Trust",
    "Pvt Ltd",
    "Public Ltd",
    "LLP",
  ];

  return (
    <div className="w-full overflow-hidden rounded-sm border-b border-[#181D27]">
      <TermsRow label="Execution Date:" value="23-12-2025" />
      <TermsRow label="Name of the Entity" value="PINE LABS LIMITED" />
      <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr]">
        <TermsCell label>Type of Organisation</TermsCell>
        <TermsCell className="border-r">
          <div className="flex flex-wrap gap-x-4 gap-y-3">
            {orgTypes.map((type) => (
              <TermsCheckbox
                key={type}
                label={type}
                selected={type === "LLP"}
              />
            ))}
          </div>
        </TermsCell>
      </div>
      <TermsRow
        label="Registered Address"
        value="123, MG ROAD, INDIRANAGAR"
        tall
      />
      <TermsSplitRow
        leftLabel="City"
        leftValue="BENGALURU"
        rightLabel="State"
        rightValue="KARNATAKA"
      />
      <TermsSplitRow
        leftLabel="Pin Code"
        leftValue="560102"
        rightLabel="Telephone"
        rightValue="8807962325"
      />
      <TermsRow label="First Name and Last Name" value="ANIMESH MANDAL" tall />
      <TermsRow
        label="Billing Address"
        value="123, MG ROAD, INDIRANAGAR"
        tall
      />
      <TermsSplitRow
        leftLabel="City"
        leftValue="BENGALURU"
        rightLabel="State"
        rightValue="KARNATAKA"
      />
      <TermsSplitRow
        leftLabel="Pin Code"
        leftValue="560102"
        rightLabel="Telephone"
        rightValue="8807962325"
      />
      <TermsCell center className="border-r">
        Gift Voucher Solutions Offered by Pine Labs & Procured by the Entity
      </TermsCell>
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr]">
        <TermsCell label>Solution:</TermsCell>
        <TermsCell className="border-r">
          <div className="flex flex-wrap gap-x-4 gap-y-3">
            <TermsCheckbox label="Self-Serve" selected />
            <TermsCheckbox label="API" />
            <TermsCheckbox label="Offline Mode" />
          </div>
        </TermsCell>
      </div>
      <TermsCell label className="border-r">
        Based on your selection of the solution above, only such clauses of the
        terms & conditions which are relevant to your arrangement with Pine Labs
        shall be applicable & binding on you.
      </TermsCell>
      <TermsRow label="GST Registration No" value="6CRQJQ8155V7Z9" />
      <TermsRow
        label="Permanent Account Number (PAN)"
        value={
          <span style={{ fontSize: 16, lineHeight: "24px" }}>ASDFG1234I</span>
        }
      />
      <TermsSplitRow
        leftLabel="CIN/LLP Number (If Applicable):"
        leftValue="U31900DL1991PLC043974"
        rightLabel="TAN Number (If applicable):"
        rightValue=""
      />
      {showSignatureSection && (
        <>
          <TermsCell center className="border-r">
            Signature of authorized person of the Company:
          </TermsCell>
          <TermsRow label="Company Name" value="PINE LABS LIMITED" tall />
          <TermsRow label="Designation" value="MANAGER" tall />
          <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr]">
            <TermsCell label className="min-h-[160px] sm:min-h-[200px]">
              Signature & Seal
            </TermsCell>
            <TermsCell className="min-h-[160px] border-r sm:min-h-[200px]">
              {signed && (
                <div className="flex h-full w-full items-end justify-end">
                  <img
                    src={signatureImg}
                    alt="Authorised digital signature"
                    className="h-16 sm:h-20 w-auto object-contain"
                    draggable={false}
                  />
                </div>
              )}
            </TermsCell>
          </div>
        </>
      )}
    </div>
  );
}

function TermsImagePage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex w-full justify-center overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="h-auto w-full max-w-none rounded-[10px] object-contain shadow-sm"
        draggable={false}
      />
    </div>
  );
}

export function ScreenTermsPage1({ go, state, progress }: any) {
  return (
    <div className="pb-2 px-2 sm:px-0">
      <TermsFormPage page={1} progress={progress}>
        <TermsImagePage
          src={state.esignVerified ? signzTermsSignedPage1Img : signzTermsPage1Img}
          alt="Terms and Conditions page 1"
        />
      </TermsFormPage>

      <ActionBar>
        <PrimaryButton onClick={() => go(8)}>Next page (2 of 4)</PrimaryButton>
      </ActionBar>
    </div>
  );
}

export function ScreenTermsPage2({ go, state, progress }: any) {
  return (
    <div className="pb-2 px-2 sm:px-0">
      <TermsFormPage page={2} progress={progress}>
        <TermsImagePage
          src={state.esignVerified ? signzTermsSignedPage2Img : signzTermsPage2Img}
          alt="Terms and Conditions page 2"
        />
      </TermsFormPage>

      <ActionBar>
        <PrimaryButton onClick={() => go(9)}>Next page (3 of 4)</PrimaryButton>
      </ActionBar>
    </div>
  );
}

export function ScreenTermsPage3({ go, state, progress }: any) {
  return (
    <div className="pb-2 px-2 sm:px-0">
      <TermsFormPage page={3} progress={progress}>
        <TermsImagePage
          src={state.esignVerified ? signzTermsSignedPage3Img : signzTermsPage3Img}
          alt="Terms and Conditions page 3"
        />
      </TermsFormPage>

      <ActionBar>
        <PrimaryButton onClick={() => go(10)}>Next page (4 of 4)</PrimaryButton>
      </ActionBar>
    </div>
  );
}

export function ScreenTermsPage4({ go, state, setState, progress }: any) {
  const delegatedEmailHandoff = usesDelegatedEmailHandoff(state);

  return (
    <div className="pb-2 px-2 sm:px-0">
      <TermsFormPage page={4} progress={progress}>
        <div className="space-y-5">
          <TermsImagePage
            src={state.esignVerified ? signzTermsSignedPage4Img : signzTermsPage4Img}
            alt="Terms and Conditions page 4"
          />
          <Card
            className="p-5"
            style={{ background: "#FFFAEB", borderColor: "#FEDF89" } as any}
          >
            <div className="flex items-start gap-3">
              <Info
                className="size-5 shrink-0 mt-0.5"
                style={{ color: "#F79009" }}
              />
              <div>
                <div
                  className="text-sm mb-1"
                  style={{ color: TEXT, fontWeight: 600 }}
                >
                  Final acceptance required
                </div>
                <p className="text-sm" style={{ color: MUTED }}>
                  {delegatedEmailHandoff && !state.actingAsAuthorisedSignatory
                    ? "By sending this package forward, you confirm these details are ready for the authorised signatory to review and sign on behalf of your organization."
                    : "By proceeding to the next step, you confirm that you have read, understood, and accept all 4 pages of these Terms & Conditions on behalf of your organization."}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </TermsFormPage>

      <ActionBar>
        <PrimaryButton
          onClick={() => {
            if (state.actingAsAuthorisedSignatory && state.esignVerified) {
              setState({ ...state, signatoryReadyToReturn: true });
              go(12, { skipSigningTransition: true });
              return;
            }
            if (delegatedEmailHandoff && !state.actingAsAuthorisedSignatory) {
              setState({ ...state, awaitingAuthorisedSignoff: true });
              go(12, { skipSigningTransition: true });
              return;
            }
            state.esignVerified ? go(12) : go(11);
          }}
        >
          {delegatedEmailHandoff && !state.actingAsAuthorisedSignatory
            ? "Send to Authorised Person"
            : state.esignVerified
              ? state.actingAsAuthorisedSignatory
                ? "Sign off & continue"
                : "Sign"
              : "Accept & proceed to eSign"}
        </PrimaryButton>
      </ActionBar>
    </div>
  );
}

// ============== Aadhar OTP (Screen 11) ==============
export function ScreenAadhaarOTP({ go, state, setState, progress }: any) {
  const [otpSent, setOtpSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const aadhaarConsent = Boolean(state.aadhaarConsent);

  const handleSendOTP = () => {
    setOtpSent(true);
  };

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setState({ ...state, esignVerified: true });
      go(7);
    }, 2000);
  };

  const otpComplete = (state.aadhaarOTP || "").length === 6;
  const aadhaarComplete = (state.aadhaarNumber || "").length === 12;

  return (
    <div className="w-screen max-w-none -translate-x-1/2 relative left-1/2">
      <div
        className="w-full border-b px-5 py-5 sm:px-10 lg:px-[120px]"
        style={{ background: PRIMARY, borderColor: BORDER_INPUT }}
      >
        <h1
          className="mx-auto max-w-[1092px] text-[18px] sm:text-[20px]"
          style={{ color: "#fff", fontWeight: 700, lineHeight: "30px" }}
        >
          Step 2 : Complete your signing
        </h1>
      </div>

      <div className="flex justify-center px-5 py-10 sm:px-8 sm:py-16">
        <div className="w-full max-w-[592px]">
          <div className="space-y-10">
            {!otpSent ? (
              <div className="space-y-6">
                <h2
                  className="max-w-[560px] text-[20px]"
                  style={{ color: "#181D27", fontWeight: 700, lineHeight: "30px" }}
                >
                  Enter Aadhaar Card Number/Virtual ID to perform eSign via OTP
                </h2>

                <label className="block w-full max-w-[534px]">
                  <span
                    className="mb-2 block text-[14px]"
                    style={{ color: "#181D27", fontWeight: 600, lineHeight: "20px" }}
                  >
                    Aadhaar Card Number/Virtual ID
                  </span>
                  <input
                    placeholder="Enter Aadhaar Card Number"
                    maxLength={12}
                    inputMode="numeric"
                    value={state.aadhaarNumber || ""}
                    onChange={(e: any) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setState({ ...state, aadhaarNumber: val });
                    }}
                    className="h-11 w-full rounded-[8px] border bg-white px-4 text-[16px] outline-none transition focus:border-[#005656] focus:ring-2 focus:ring-[#005656]/10"
                    style={{ borderColor: BORDER_INPUT, color: TEXT }}
                  />
                </label>

                <label className="flex max-w-[560px] items-start gap-4">
                  <button
                    type="button"
                    aria-pressed={aadhaarConsent}
                    onClick={() =>
                      setState({ ...state, aadhaarConsent: !aadhaarConsent })
                    }
                    className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-[8px] border transition"
                    style={{
                      borderColor: aadhaarConsent ? PRIMARY : BORDER_INPUT,
                      background: aadhaarConsent ? PRIMARY : "#fff",
                    }}
                  >
                    {aadhaarConsent && (
                      <Check className="size-4" style={{ color: "#fff" }} />
                    )}
                  </button>
                  <span
                    className="text-[16px]"
                    style={{ color: "#414651", fontWeight: 400, lineHeight: "28px" }}
                  >
                    I am the holder of the above Aadhaar Number. i hereby
                    authenticate myself as the legal signee for this document.
                  </span>
                </label>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:gap-6">
                  <button
                    type="button"
                    onClick={() => go(10)}
                    className="inline-flex min-h-12 min-w-[120px] flex-1 items-center justify-center rounded-[12px] border bg-white px-4 text-[16px] sm:flex-none sm:w-[254px]"
                    style={{
                      borderColor: BORDER_INPUT,
                      color: "#252B37",
                      fontWeight: 600,
                      lineHeight: "24px",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!aadhaarComplete || !aadhaarConsent}
                    onClick={handleSendOTP}
                    className="inline-flex min-h-12 min-w-[120px] flex-1 items-center justify-center gap-2 rounded-[12px] border px-4 text-[16px] transition sm:flex-none sm:w-[254px]"
                    style={{
                      background:
                        aadhaarComplete && aadhaarConsent ? PRIMARY : "#F5F5F5",
                      borderColor:
                        aadhaarComplete && aadhaarConsent ? PRIMARY : "#E9EAEB",
                      color:
                        aadhaarComplete && aadhaarConsent ? "#fff" : "#A4A7AE",
                      fontWeight: 600,
                      lineHeight: "24px",
                      cursor:
                        aadhaarComplete && aadhaarConsent
                          ? "pointer"
                          : "not-allowed",
                    }}
                  >
                    Get OTP
                    <ArrowRight className="size-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <h2
                    className="text-[20px]"
                    style={{ color: "#181D27", fontWeight: 700, lineHeight: "30px" }}
                  >
                    Enter OTP to complete Aadhaar eSign
                  </h2>
                  <p className="mt-2 text-[14px]" style={{ color: MUTED }}>
                    We sent a 6-digit code to your registered mobile number.
                  </p>
                </div>

                <div>
                  <label className="mb-3 block text-[14px] font-semibold text-[#414651]">
                    Enter verification code
                  </label>
                  <div className="flex gap-2 sm:gap-3">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <input
                        key={i}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        className="h-12 w-full rounded-xl border-2 bg-[#fafafa] text-center text-[22px] font-semibold outline-none transition-all focus:ring-2 focus:ring-[#005656]"
                        style={{
                          borderColor: state.aadhaarOTP?.[i]
                            ? PRIMARY
                            : BORDER_INPUT,
                          color: TEXT,
                        }}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          const current = state.aadhaarOTP || "";
                          const newOTP =
                            current.substring(0, i) +
                            val +
                            current.substring(i + 1);
                          setState({ ...state, aadhaarOTP: newOTP });
                          if (val && i < 5) {
                            const next = e.target
                              .nextElementSibling as HTMLInputElement;
                            next?.focus();
                          }
                        }}
                        value={state.aadhaarOTP?.[i] || ""}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-[12px] border bg-white px-4 text-[16px]"
                    style={{
                      borderColor: BORDER_INPUT,
                      color: "#252B37",
                      fontWeight: 600,
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!otpComplete || verifying}
                    onClick={handleVerify}
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-[12px] border px-4 text-[16px]"
                    style={{
                      background: otpComplete && !verifying ? PRIMARY : "#F5F5F5",
                      borderColor: otpComplete && !verifying ? PRIMARY : "#E9EAEB",
                      color: otpComplete && !verifying ? "#fff" : "#A4A7AE",
                      fontWeight: 600,
                    }}
                  >
                    {verifying && <Loader2 className="size-4 animate-spin" />}
                    {verifying ? "Verifying OTP..." : "Complete eSign"}
                  </button>
                </div>
              </div>
            )}

            <div className="w-full overflow-hidden rounded-[2px] border-t-4 border-[#83e7f5]">
              <div className="flex min-h-[61px] items-center justify-between bg-[#d0f255] px-3 sm:px-5">
                <div>
                  <p className="text-[7px] font-bold text-[#e66b00]">
                    Aadhaar eSignature powered by
                  </p>
                  <p className="text-[18px] font-bold italic leading-none text-[#69a600]">
                    eMudhra
                  </p>
                  <p className="text-[6px] font-bold uppercase tracking-[0.18em] text-[#4a5565]">
                    Trust Services
                  </p>
                </div>
                <div className="text-right">
                  <p className="mb-1 text-[7px] font-bold text-[#e66b00]">
                    Change consent language
                  </p>
                  <button
                    type="button"
                    className="rounded-[3px] border border-[#75a857] bg-white px-2 py-1 text-[9px]"
                    style={{ color: "#414651" }}
                  >
                    English
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentDetailsAccordion({
  docKey,
  alert,
  rows,
  expanded,
  saved,
  onToggle,
  onRowsChange,
  onSave,
}: {
  docKey: FetchedDocKey;
  alert: DocAlert;
  rows: FetchedDetail[];
  expanded: boolean;
  saved: boolean;
  onToggle: () => void;
  onRowsChange: (rows: FetchedDetail[]) => void;
  onSave: () => void;
}) {
  const isWarning = alert?.tone === "warning";
  const borderColor = isWarning ? "#fbbf24" : SUCCESS_BORDER;
  const panelBg = isWarning ? "#fffbeb" : "#f7fff9";
  const accent = isWarning ? "#d97706" : SUCCESS;
  const docTitle = DOC_DEFS.find((doc) => doc.key === docKey)?.title ?? "Document";
  const warningTitle = alert?.message.toLowerCase().includes("read your document")
    ? `We couldn't read the ${docTitle} clearly`
    : `We need a quick review for the ${docTitle}`;

  const updateRow = (index: number, value: string) => {
    onRowsChange(rows.map((row, rowIndex) => (rowIndex === index ? { ...row, value } : row)));
  };

  return (
    <AnimatePresence initial={false}>
      {expanded && (
        <motion.div
          onClick={(event) => event.stopPropagation()}
          className="relative z-10 mt-4 basis-full overflow-hidden rounded-[14px] border"
          style={{ borderColor, background: "#fff" }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          <div
            className="flex flex-col gap-3 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            style={{ borderColor, background: panelBg }}
          >
            <div className="flex items-start gap-3">
              {isWarning ? (
                <CircleAlert className="mt-0.5 size-5 shrink-0" style={{ color: accent }} />
              ) : (
                <CheckCircle2 className="mt-0.5 size-5 shrink-0" style={{ color: accent }} />
              )}
              <div>
                <p className="text-sm" style={{ color: TEXT, fontWeight: 700 }}>
                  {isWarning
                    ? warningTitle
                    : `${docTitle} details fetched successfully`}
                </p>
                <p className="mt-1 text-xs sm:text-sm" style={{ color: isWarning ? "#92400e" : MUTED, lineHeight: "20px" }}>
                  {alert?.message ??
                    "Review the extracted details below. You can edit them if something looks incorrect."}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold sm:justify-end">
              <button
                type="button"
                aria-label="Collapse details"
                onClick={onToggle}
                className="inline-flex items-center"
                style={{ color: TEXT_2 }}
              >
                <ChevronDown className="size-4 rotate-180" />
              </button>
            </div>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-2">
            {rows.map((row, index) => (
              <label key={`${docKey}-${row.label}`} className="block">
                <span className="text-xs" style={{ color: TEXT_2, fontWeight: 700 }}>
                  {row.label}
                  {index === 0 || row.label.toLowerCase().includes("name") ? (
                    <span style={{ color: REQUIRED }}> *</span>
                  ) : null}
                </span>
                <input
                  value={row.value}
                  onChange={(event) => updateRow(index, event.target.value)}
                  className="mt-1 w-full rounded-[10px] border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2"
                  style={{
                    borderColor: isWarning ? "#f8cc7a" : BORDER_INPUT,
                    color: TEXT,
                    boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
                  }}
                />
              </label>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "#eef0f2" }}>
            <label className="inline-flex items-start gap-2 text-xs sm:text-sm" style={{ color: TEXT_2 }}>
              <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-[4px]" style={{ background: PRIMARY, color: "#fff" }}>
                <Check className="size-3" />
              </span>
              I confirm these details match the uploaded {docTitle}.
            </label>
            <button
              type="button"
              onClick={onSave}
              className="inline-flex items-center justify-center rounded-[10px] px-4 py-2.5 text-sm font-bold text-white"
              style={{ background: saved ? SUCCESS : PRIMARY }}
            >
              {saved
                ? `${docTitle.replace(" certificate", "")} details saved`
                : `Save ${docTitle.replace(" certificate", "")} details`}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ContinueScenarioModal({
  onChoose,
  onClose,
}: {
  onChoose: (scenario: ContinueScenario) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="continue-scenario-title"
    >
      <button
        type="button"
        aria-label="Close continue scenario selector"
        className="absolute inset-0 bg-[#101828]/45 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <motion.div
        className="relative w-full max-w-xl rounded-[20px] bg-white p-5 shadow-2xl sm:p-6"
        initial={{ y: 18, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 18, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full border border-[#e5e7eb] text-[#667085] transition hover:bg-[#f9fafb]"
        >
          <X className="size-4" />
        </button>
        <div className="pr-10">
          <p
            className="text-xs uppercase tracking-[0.08em]"
            style={{ color: MUTED, fontWeight: 700 }}
          >
            Document upload
          </p>
          <h3
            id="continue-scenario-title"
            className="mt-2 text-lg"
            style={{ color: TEXT, fontWeight: 700, lineHeight: "28px" }}
          >
            Choose a Continue Scenario
          </h3>
        </div>
        <div className="mt-5 grid gap-3">
          <button
            type="button"
            onClick={() => onChoose("success")}
            className="rounded-[14px] border px-4 py-4 text-left transition hover:-translate-y-0.5"
            style={{ borderColor: SUCCESS_BORDER, background: SUCCESS_BG }}
          >
            <CheckCircle2 className="mb-3 size-5" style={{ color: SUCCESS }} />
            <span
              className="block text-sm"
              style={{ color: TEXT, fontWeight: 700 }}
            >
              Success
            </span>
            <span
              className="mt-1 block text-xs"
              style={{ color: MUTED, lineHeight: "18px" }}
            >
              Continue to the next step after validation completes.
            </span>
          </button>
          <button
            type="button"
            onClick={() => onChoose("gst_inactive")}
            className="rounded-[14px] border px-4 py-4 text-left transition hover:-translate-y-0.5"
            style={{ borderColor: "#fde68a", background: "#fffbeb" }}
          >
            <CircleAlert className="mb-3 size-5 text-[#d97706]" />
            <span
              className="block text-sm"
              style={{ color: TEXT, fontWeight: 700 }}
            >
              GST is cancelled or suspended
            </span>
            <span
              className="mt-1 block text-xs"
              style={{ color: MUTED, lineHeight: "18px" }}
            >
              GST number is valid in format, but the GST API returns inactive
              status.
            </span>
          </button>
          <button
            type="button"
            onClick={() => onChoose("legal_name_mismatch")}
            className="rounded-[14px] border px-4 py-4 text-left transition hover:-translate-y-0.5"
            style={{ borderColor: "#fde68a", background: "#fffbeb" }}
          >
            <CircleAlert className="mb-3 size-5 text-[#d97706]" />
            <span
              className="block text-sm"
              style={{ color: TEXT, fontWeight: 700 }}
            >
              Legal name mismatch across records
            </span>
            <span
              className="mt-1 block text-xs"
              style={{ color: MUTED, lineHeight: "18px" }}
            >
              Form-entered legal name does not match the document or API
              record.
            </span>
          </button>
          <button
            type="button"
            onClick={() => onChoose("api_unavailable")}
            className="rounded-[14px] border px-4 py-4 text-left transition hover:-translate-y-0.5"
            style={{ borderColor: "#fecaca", background: "#fff7f7" }}
          >
            <CircleAlert className="mb-3 size-5 text-[#dc2626]" />
            <span
              className="block text-sm"
              style={{ color: TEXT, fontWeight: 700 }}
            >
              API failed due to network or server issue
            </span>
            <span
              className="mt-1 block text-xs"
              style={{ color: MUTED, lineHeight: "18px" }}
            >
              Return to the begin page and ask the user to try again after 1–2
              minutes.
            </span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
// ============== SUCCESS - Celebration + Email Template (Screen 12) ==============
function Confetti() {
  const colors = [
    "#d0f255",
    "#005656",
    "#008236",
    "#FFB020",
    "#F472B6",
    "#60A5FA",
  ];
  const pieces = Array.from({ length: 60 });
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.6;
        const duration = 2.4 + Math.random() * 1.8;
        const size = 6 + Math.random() * 8;
        const rotate = Math.random() * 360;
        const color = colors[i % colors.length];
        return (
          <motion.div
            key={i}
            initial={{ y: -40, x: 0, opacity: 0, rotate: 0 }}
            animate={{
              y: "110vh",
              opacity: [0, 1, 1, 0.8, 0],
              rotate: rotate + 540,
            }}
            transition={{
              delay,
              duration,
              ease: "easeIn",
              repeat: Infinity,
              repeatDelay: 2,
            }}
            style={{
              position: "absolute",
              top: 0,
              left: `${left}%`,
              width: size,
              height: size * 0.4,
              background: color,
              borderRadius: 2,
            }}
          />
        );
      })}
    </div>
  );
}

export function ScreenSuccess({
  state,
  onOpenDemoPreview,
}: {
  state: any;
  onOpenDemoPreview: () => void;
}) {
  const firstName = state.fullName?.split(" ")[0] || "there";
  const isManualVerification = Boolean(state.manualVerification);
  const applicationRef =
    "EO-" + Math.floor(100000 + Math.random() * 900000);
  const successTickAnimation = useMemo(() => getRethemedSuccessTick(), []);

  return (
    <div className="relative mx-auto w-full max-w-7xl px-2 py-6 sm:px-4 sm:py-8 lg:py-10">
      {!isManualVerification && <Confetti />}

      <div className="relative grid items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <motion.section
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[680px] text-left lg:mx-0"
        >
          <div className="relative">
            <motion.div
              aria-hidden
              className="absolute -left-2 top-0 h-[220px] w-[220px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(208,242,85,0.2) 0%, rgba(208,242,85,0.08) 35%, rgba(208,242,85,0) 72%)",
                filter: "blur(20px)",
              }}
              initial={{ opacity: 0, scale: 0.72 }}
              animate={{ opacity: [0.4, 0.65, 0.42], scale: [0.92, 1.05, 1] }}
              transition={{
                duration: 2.6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.72, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative inline-flex size-[88px] items-center justify-center rounded-full"
              style={{
                background:
                  isManualVerification
                    ? "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,251,235,0.96) 100%)"
                    : "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(240,253,244,0.96) 100%)",
                border: `1px solid ${isManualVerification ? "#fcd34d" : SUCCESS_BORDER}`,
                boxShadow:
                  isManualVerification
                    ? "0 22px 44px -20px rgba(217,119,6,0.26), inset 0 1px 0 rgba(255,255,255,0.9)"
                    : "0 22px 44px -20px rgba(0,130,54,0.28), inset 0 1px 0 rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: `1.5px solid ${
                    isManualVerification
                      ? "rgba(217,119,6,0.28)"
                      : "rgba(0,130,54,0.26)"
                  }`,
                }}
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: [0.95, 1.22, 1.38], opacity: [0, 0.42, 0] }}
                transition={{
                  duration: 1.9,
                  times: [0, 0.45, 1],
                  repeat: Infinity,
                  repeatDelay: 0.4,
                }}
              />
              <motion.div
                className="absolute inset-[10px] rounded-full"
                style={{
                  background:
                    isManualVerification
                      ? "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95) 0%, rgba(255,251,235,0.95) 42%, rgba(254,243,199,0.9) 100%)"
                      : "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95) 0%, rgba(240,253,244,0.92) 42%, rgba(220,252,231,0.82) 100%)",
                  border: `1px solid ${
                    isManualVerification
                      ? "rgba(252,211,77,0.95)"
                      : "rgba(185,248,207,0.95)"
                  }`,
                }}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.08, duration: 0.45 }}
              />
              <motion.div
                className="relative z-10 flex size-[62px] items-center justify-center"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.16,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {isManualVerification ? (
                  <CircleAlert className="size-10" style={{ color: "#d97706" }} />
                ) : (
                  <Lottie
                    animationData={successTickAnimation}
                    loop={false}
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </motion.div>
            </motion.div>
          </div>

          <h1
            className="mt-6 text-[34px] font-bold leading-[1.06] text-[#005656] sm:text-[48px] lg:text-[52px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {isManualVerification
              ? "Submitted for manual review,"
              : "All done!"}
         
          </h1>
          <p
            className="mt-6 text-base leading-7 sm:text-lg"
            style={{ color: TEXT_2 }}
          >
            {isManualVerification
              ? "We couldn't auto-verify your details because the verification service was unavailable. Your form is submitted and our team will review it manually."
              : "Your business details has been submitted successfully."}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.45 }}
              className="rounded-[16px] border p-5"
              style={{ background: "#ffffff", borderColor: BORDER }}
            >
              <div className="text-xs font-bold uppercase tracking-[0.1em]" style={{ color: MUTED }}>
                Application reference
              </div>
              <div
                className="mt-3 text-2xl font-bold"
                style={{ color: TEXT, fontFamily: "monospace" }}
              >
                {applicationRef}
              </div>
              <p className="mt-3 text-sm leading-6" style={{ color: TEXT_2 }}>
                Keep this reference handy if you need help from the onboarding team.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.45 }}
              className="rounded-[16px] border p-5"
              style={{ background: "#ffffff", borderColor: BORDER }}
            >
              <div className="text-xs font-bold uppercase tracking-[0.1em]" style={{ color: MUTED }}>
                {isManualVerification ? "Manual review timeline" : "Credential delivery"}
              </div>
              <div className="mt-3 text-xl font-bold" style={{ color: TEXT }}>
                {isManualVerification ? "Within 24 to 48 hours" : "Within 1 hour"}
              </div>
              <p className="mt-3 text-sm leading-6" style={{ color: TEXT_2 }}>
                {isManualVerification ? (
                  <>
                    We'll set up your Gift Card Procurement account after manual review and email the credentials to{" "}
                    <span style={{ color: TEXT, fontWeight: 700 }}>{state.email}</span>.
                  </>
                ) : (
                  <>
                    Your Gift Card Procurement credentials will be emailed to{" "}
                    <span style={{ color: TEXT, fontWeight: 700 }}>{state.email}</span>{" "}
                    after final provisioning is complete.
                  </>
                )}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-6 rounded-[16px] p-5"
            style={{
              background: "linear-gradient(135deg, #005656 0%, #007f78 100%)",
              color: "#fff",
            }}
          >
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-5 shrink-0" style={{ color: LIME }} />
              <div>
                <div className="text-sm font-bold">What happens next?</div>
                <p className="mt-2 text-sm leading-6 text-white/85">
                  {isManualVerification
                    ? "Our onboarding team will validate your uploaded documents and company details manually. Once approved, we'll provision your Gift Card Procurement workspace and email the sign-in instructions."
                    : "We’re verifying the last setup steps for your Gift Card Procurement workspace. Once that is complete, we’ll email your username, temporary password, and sign-in instructions."}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.36,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-6 rounded-[14px] p-4"
            style={{
              background: "#FFF8EA",
              border: "1px solid #F9D58A",
              color: "#824B00",
            }}
          >
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 size-5 shrink-0" />
              <div>
                <div className="text-sm font-bold">Support note</div>
                <p className="mt-1 text-xs leading-5 sm:text-sm">
                  {isManualVerification
                    ? "If you don’t receive an update within 48 hours, please reach out to Pine Labs onboarding contact : +91 9876543210 or email : support@pinelabs.com."
                    : "If you don’t receive your Gift Card Procurement credentials within 1 hour, please reach out to Pine Labs onboarding contact : +91 9876543210 or email : support@pinelabs.com."}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.aside
          initial={{ opacity: 0, x: 18, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto hidden h-full w-full max-w-[520px] lg:mx-0 lg:ml-auto lg:flex lg:max-w-none"
        >
          <div
            className="flex min-h-[320px] w-full items-center justify-center rounded-[22px] p-4 sm:min-h-[420px] lg:min-h-0"
            style={{
              background: "#F2F8EF",
            }}
          >
            <div className="aspect-square w-full max-w-[500px] overflow-hidden rounded-[18px]">
              <img
                src={successImg}
                alt="Congratulations illustration"
                className="h-full w-full object-cover"
                style={{ objectPosition: "center center" }}
              />
            </div>
          </div>
        </motion.aside>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95, duration: 0.45 }}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-3 sm:bottom-8 sm:right-8"
      >
        <span
          className="hidden rounded-full px-3 py-1 text-[11px] font-semibold sm:inline-flex"
          style={{ background: "#eef2ff", color: "#344054" }}
        >
          Demo CTA
        </span>
        <button
          type="button"
          onClick={onOpenDemoPreview}
          className="inline-flex items-center gap-2 rounded-[12px] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(0,86,86,0.24)]"
          style={{ background: PRIMARY }}
        >
          Open Qwikserve Demo <ArrowRight className="size-4" />
        </button>
      </motion.div>
    </div>
  );
}

export function ScreenSuccessEmailPreview({
  state,
  onBack,
}: {
  state: any;
  onBack: () => void;
}) {
  const userName = state.fullName?.trim() || "{{userName}}";
  const userEmail = state.email?.trim() || "{{userEmail}}";
  const temporaryPassword =
    state.temporaryPassword?.trim() || "Qwik@2026!";

  return (
    <div className="mx-auto w-full max-w-6xl px-2 py-6 sm:px-4 sm:py-8 lg:py-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-5xl"
      >
        <div className="rounded-[28px] border border-[#d9e6df] bg-white/75 p-3 shadow-[0_28px_80px_-32px_rgba(0,86,86,0.26)] backdrop-blur sm:p-5">
          <div className="rounded-[24px] border border-[#dde6e2] bg-[#eef5f1] p-4 sm:p-6">
            <div className="overflow-hidden rounded-[22px] border border-[#dce7e3] bg-white shadow-[0_20px_40px_-24px_rgba(16,24,40,0.18)]">
              <div className="border-b border-[#e5ece8] bg-[#fbfcfb] px-5 py-4 sm:px-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#e6f6ef] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#007a55]">
                    Subject
                  </span>
                  <span className="text-sm font-semibold text-[#103b39] sm:text-base">
                    Your Gift Card Procurement Service Is Activated
                  </span>
                </div>
                <div className="mt-4 grid gap-2 text-sm text-[#4a5565] sm:grid-cols-[90px_1fr]">
                  <span className="font-semibold text-[#344054]">From</span>
                  <span>Qwikserve Activation Team</span>
                  <span className="font-semibold text-[#344054]">To</span>
                  <span>{userEmail}</span>
                </div>
              </div>

              <div className="px-5 py-6 sm:px-8 sm:py-8">
                <div className="rounded-[22px] bg-[linear-gradient(135deg,#005656_0%,#0a7b74_100%)] px-5 py-6 text-white sm:px-7">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold">
                    <CheckCircle2 className="size-4 text-[#d0f255]" />
                    Service activated
                  </div>
                  <h2
                    className="mt-4 text-[28px] font-semibold leading-tight sm:text-[34px]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Your Gift Card Procurement Service is now active
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">
                    Enterprise access has been provisioned and your workspace is
                    ready for first-time sign-in.
                  </p>
                </div>

                <div className="mt-8 space-y-5 text-[15px] leading-7 text-[#364153]">
                  <p>Hi {userName},</p>
                  <p>
                    Your Gift Card Procurement service has been successfully
                    activated.
                  </p>
                  <p>
                    You can now access the platform using the credentials
                    below:
                  </p>
                </div>

                <div className="mt-6 rounded-[20px] border border-[#cfe2db] bg-[#f7fbf9] p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#005656]">
                    <Mail className="size-4" />
                    Access credentials
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[16px] border border-[#dde8e4] bg-white p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">
                        Login Email
                      </div>
                      <div className="mt-2 break-all text-base font-semibold text-[#101828]">
                        {userEmail}
                      </div>
                    </div>
                    <div className="rounded-[16px] border border-[#dde8e4] bg-white p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">
                        Temporary Password
                      </div>
                      <div className="mt-2 text-base font-semibold text-[#101828]">
                        {temporaryPassword}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-start gap-3 rounded-[16px] border border-[#f4e2a7] bg-[#fff8e7] px-4 py-3 text-sm text-[#824b00]">
                    <RefreshCw className="mt-0.5 size-4 shrink-0" />
                    <p>
                      For security, please change your password after your
                      first login.
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-5 text-[15px] leading-7 text-[#364153]">
                  <p>
                    Click the button below to open your Gift Card Procurement
                    dashboard and begin managing your procurement requests.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        GIFT_CARD_PROCUREMENT_DEMO_URL,
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-[14px] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(0,86,86,0.18)]"
                    style={{ background: PRIMARY }}
                  >
                    Open Gift Card Procurement
                    <ArrowRight className="size-4" />
                  </button>
                  {/* <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center justify-center rounded-[14px] border border-[#d5d7da] bg-white px-5 py-3.5 text-sm font-semibold text-[#344054]"
                  >
                    Back to Onboarding Success
                  </button> */}
                </div>

                <div className="mt-10 border-t border-[#eaecf0] pt-5 text-sm leading-6 text-[#667085]">
                  Need help? Contact your account support team or Qwikserve
                  support for assistance.
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ScreenOpeningSingzy({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 1800);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-xl rounded-[28px] border border-[#d5e7e4] bg-white/90 p-8 text-center shadow-[0_30px_80px_-28px_rgba(0,86,86,0.28)] backdrop-blur sm:p-10"
      >
        <div className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-[#eefdf4] text-[#027a48]">
          <Loader2 className="size-8 animate-spin" />
        </div>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: PRIMARY }}>
          Singzy
        </p>
        <h1
          className="mt-3 text-[28px] font-bold leading-tight text-[#005656] sm:text-[36px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Opening Singzy Terms & Condition eSign
        </h1>
        <p className="mt-4 text-sm leading-7 sm:text-base" style={{ color: TEXT_2 }}>
          Preparing the 4-page review and Aadhaar eSign journey for the authorised signatory.
        </p>
      </motion.div>
    </div>
  );
}

export function ScreenAuthorisedSignoffPending({
  state,
  onOpenSingzyFromEmail,
  onEditSignatory,
  onResend,
}: any) {
  const firstName = state.fullName?.split(" ")[0] || "there";

  if (state.signatoryRejected) {
    return (
      <div className="relative mx-auto w-full max-w-4xl px-2 py-8 sm:px-4 sm:py-12">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto rounded-[28px] border border-[#fedf89] bg-white/95 p-7 shadow-[0_25px_60px_-20px_rgba(181,71,8,0.22)] backdrop-blur sm:p-10"
        >
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <div className="inline-flex size-16 items-center justify-center rounded-full bg-[#fffaeb] text-[#b54708]">
              <CircleAlert className="size-8" />
            </div>
            <h1
              className="mt-6 text-[32px] font-bold leading-tight text-[#8a3b12] sm:text-[42px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Rejected by authorised signatory
            </h1>
            <p
              className="mt-4 text-base leading-7 sm:text-lg"
              style={{ color: TEXT_2 }}
            >
              {state.sigName || "The authorised signatory"} closed the signing
              session before completing signoff. You can edit the signatory
              details or resend the request when they’re ready.
            </p>

            <div className="mt-8 grid w-full gap-4 rounded-[20px] border border-[#fedf89] bg-[#fffbeb] p-5 text-left sm:grid-cols-2 sm:p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.08em]" style={{ color: MUTED }}>
                  Signatory
                </p>
                <p className="mt-2 text-base font-semibold" style={{ color: TEXT }}>
                  {state.sigName || "Authorised signatory"}
                </p>
                <p className="mt-1 text-sm" style={{ color: TEXT_2 }}>
                  {state.sigEmail || "Email will be shared with the signatory"}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.08em]" style={{ color: MUTED }}>
                  Status
                </p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#fef3f2] px-3 py-1.5 text-sm font-semibold text-[#b42318]">
                  <CircleAlert className="size-4" />
                  Rejected
                </div>
              </div>
            </div>

            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onEditSignatory}
                className="inline-flex items-center justify-center rounded-[12px] border px-5 py-3 text-sm font-semibold"
                style={{ borderColor: BORDER_INPUT, color: TEXT, background: "#fff" }}
              >
                Edit signatory details
              </button>
              <button
                type="button"
                onClick={onResend}
                className="inline-flex items-center justify-center gap-2 rounded-[12px] px-5 py-3 text-sm font-semibold text-white"
                style={{ background: PRIMARY }}
              >
                Resend to authorised person <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-2 py-6 sm:px-4 sm:py-8 lg:py-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-5xl"
      >
        <div className="rounded-[28px] border border-[#d9e6df] bg-white/80 p-3 shadow-[0_28px_80px_-32px_rgba(0,86,86,0.22)] backdrop-blur sm:p-5">
          <div className="rounded-[24px] border border-[#dde6e2] bg-[#eef5f1] p-4 sm:p-6">
            <div className="overflow-hidden rounded-[22px] border border-[#dce7e3] bg-white shadow-[0_20px_40px_-24px_rgba(16,24,40,0.18)]">
              <div className="border-b border-[#e5ece8] bg-[#fbfcfb] px-5 py-4 sm:px-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#fff7e8] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#b54708]">
                    Awaiting signoff
                  </span>
                  <span className="text-sm font-semibold text-[#103b39] sm:text-base">
                    Authorised Signatory Email Preview
                  </span>
                </div>
                <div className="mt-4 grid gap-2 text-sm text-[#4a5565] sm:grid-cols-[90px_1fr]">
                  <span className="font-semibold text-[#344054]">From</span>
                  <span>Qwikserve Onboarding</span>
                  <span className="font-semibold text-[#344054]">To</span>
                  <span>{state.sigEmail || "authorised.signatory@company.com"}</span>
                </div>
              </div>

              <div className="px-5 py-6 sm:px-8 sm:py-8">
                <div className="rounded-[22px] bg-[linear-gradient(135deg,#005656_0%,#0a7b74_100%)] px-5 py-6 text-white sm:px-7">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold">
                    <Mail className="size-4 text-[#d0f255]" />
                    Action required
                  </div>
                  <h1
                    className="mt-4 text-[28px] font-semibold leading-tight sm:text-[34px]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Review and sign the Gift Card Procurement onboarding request
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">
                    {firstName}, the authorised signatory email has been prepared
                    and sent for final review and Aadhaar eSign.
                  </p>
                </div>

                <div className="mt-8 space-y-5 text-[15px] leading-7 text-[#364153]">
                  <p>Hi {state.sigName || "Authorised Signatory"},</p>
                  <p>
                    {state.fullName || "Your team member"} has submitted the
                    company onboarding details and requested your approval as
                    the authorised signatory.
                  </p>
                  <p>
                    Please review the shared details below and complete the
                    signoff flow to activate the Gift Card Procurement service.
                  </p>
                </div>

                <div className="mt-6 rounded-[20px] border border-[#cfe2db] bg-[#f7fbf9] p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#005656]">
                    <FileText className="size-4" />
                    Review summary
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[16px] border border-[#dde8e4] bg-white p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">
                        Company
                      </div>
                      <div className="mt-2 text-base font-semibold text-[#101828]">
                        Pine Labs Private Limited
                      </div>
                    </div>
                    <div className="rounded-[16px] border border-[#dde8e4] bg-white p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">
                        Submitted By
                      </div>
                      <div className="mt-2 break-all text-base font-semibold text-[#101828]">
                        {state.email || "{{userEmail}}"}
                      </div>
                    </div>
                    <div className="rounded-[16px] border border-[#dde8e4] bg-white p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">
                        Signatory
                      </div>
                      <div className="mt-2 text-base font-semibold text-[#101828]">
                        {state.sigName || "Authorised Signatory"}
                      </div>
                      <div className="mt-1 break-all text-sm text-[#667085]">
                        {state.sigEmail || "Email will be shared with the signatory"}
                      </div>
                    </div>
                    <div className="rounded-[16px] border border-[#dde8e4] bg-white p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">
                        Required Action
                      </div>
                      <div className="mt-2 text-base font-semibold text-[#101828]">
                        Review terms and complete Aadhaar eSign
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-start gap-3 rounded-[16px] border border-[#f4e2a7] bg-[#fff8e7] px-4 py-3 text-sm text-[#824b00]">
                    <Lock className="mt-0.5 size-4 shrink-0" />
                    <p>
                      This is a demo preview of the exact email the authorised
                      signatory would receive.
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-5 text-[15px] leading-7 text-[#364153]">
                  <p>
                    Use the button below to open the signoff flow and complete
                    the final approval steps on behalf of your organization.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => onOpenSingzyFromEmail?.()}
                    className="inline-flex items-center justify-center gap-2 rounded-[14px] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(0,86,86,0.18)]"
                    style={{ background: PRIMARY }}
                  >
                    Review Documents & eSign
                    <ArrowRight className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={onEditSignatory}
                    className="inline-flex items-center justify-center rounded-[14px] border border-[#d5d7da] bg-white px-5 py-3.5 text-sm font-semibold text-[#344054]"
                  >
                    Edit Signatory Details
                  </button>
                  <button
                    type="button"
                    onClick={onResend}
                    className="inline-flex items-center justify-center rounded-[14px] border border-[#d5d7da] bg-white px-5 py-3.5 text-sm font-semibold text-[#344054]"
                  >
                    Resend Email
                  </button>
                </div>

                <div className="mt-10 border-t border-[#eaecf0] pt-5 text-sm leading-6 text-[#667085]">
                  Need help? Contact your account support team or Qwikserve
                  support for assistance.
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ScreenSignatoryHandoffComplete({
  state,
  onOpenEmailPreview,
}: any) {
  return (
    <div className="relative mx-auto w-full max-w-4xl px-2 py-8 sm:px-4 sm:py-12">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto rounded-[28px] border border-[#d5efe8] bg-white/90 p-7 shadow-[0_25px_60px_-20px_rgba(0,86,86,0.22)] backdrop-blur sm:p-10"
      >
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="inline-flex size-16 items-center justify-center rounded-full bg-[#ecfdf3] text-[#027a48]">
            <CheckCircle2 className="size-8" />
          </div>
          <h1
            className="mt-6 text-[32px] font-bold leading-tight text-[#005656] sm:text-[42px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Documents signed successfully
          </h1>
          <p className="mt-4 text-base leading-7 sm:text-lg" style={{ color: TEXT_2 }}>
            Thank you. The required documents have been signed successfully.
            The user can now continue with their onboarding journey.
          </p>

        </div>
      </motion.section>

      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={onOpenEmailPreview}
          className="inline-flex items-center gap-2 rounded-[12px] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_rgba(0,86,86,0.24)]"
          style={{ background: PRIMARY }}
        >
          Back to Onboarding <ArrowRight className="size-4" />
        </button>
        <span className="pr-1 text-xs sm:text-sm" style={{ color: MUTED }}>
          Demo CTA
        </span>
      </div>
    </div>
  );
}

export function ScreenSignedDocumentsEmailPreview({
  state,
  onContinueOnboarding,
}: {
  state: any;
  onContinueOnboarding: () => void;
}) {
  const userName = state.fullName?.trim() || "{{userName}}";
  const authorisedPersonName =
    state.sigName?.trim() || "{{authorisedPersonName}}";

  return (
    <div className="mx-auto w-full max-w-6xl px-2 py-6 sm:px-4 sm:py-8 lg:py-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-5xl"
      >
        <div className="rounded-[28px] border border-[#d9e6df] bg-white/75 p-3 shadow-[0_28px_80px_-32px_rgba(0,86,86,0.26)] backdrop-blur sm:p-5">
          <div className="rounded-[24px] border border-[#dde6e2] bg-[#eef5f1] p-4 sm:p-6">
            <div className="overflow-hidden rounded-[22px] border border-[#dce7e3] bg-white shadow-[0_20px_40px_-24px_rgba(16,24,40,0.18)]">
              <div className="border-b border-[#e5ece8] bg-[#fbfcfb] px-5 py-4 sm:px-8">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <img
                    src={pineLabsLogoImg}
                    alt="Pine Labs"
                    className="h-8 w-fit object-contain"
                  />
                  <div className="text-left sm:text-right">
                    <div className="text-sm font-semibold text-[#005656]">
                      Qwikserve
                    </div>
                    <div className="text-xs text-[#667085]">
                      Gift Card Procurement
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#e6f6ef] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#007a55]">
                    Subject
                  </span>
                  <span className="text-sm font-semibold text-[#103b39] sm:text-base">
                    Documents Signed — Continue Your Onboarding
                  </span>
                </div>
                <div className="mt-4 grid gap-2 text-sm text-[#4a5565] sm:grid-cols-[90px_1fr]">
                  <span className="font-semibold text-[#344054]">From</span>
                  <span>Qwikserve Onboarding</span>
                  <span className="font-semibold text-[#344054]">To</span>
                  <span>{state.email || "{{userEmail}}"}</span>
                </div>
              </div>

              <div className="px-5 py-6 sm:px-8 sm:py-8">
                <div className="rounded-[22px] bg-[linear-gradient(135deg,#005656_0%,#0a7b74_100%)] px-5 py-6 text-white sm:px-7">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold">
                    <CheckCircle2 className="size-4 text-[#d0f255]" />
                    Documents signed
                  </div>
                  <h1
                    className="mt-4 text-[28px] font-semibold leading-tight sm:text-[34px]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Your documents have been signed
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">
                    The authorised person has completed eSign, and onboarding
                    is ready to continue.
                  </p>
                </div>

                <div className="mt-8 space-y-5 text-[15px] leading-7 text-[#364153]">
                  <p>Hi {userName},</p>
                  <p>
                    Good news — {authorisedPersonName} has successfully signed
                    the required documents for your onboarding.
                  </p>
                  <p>
                    You can now continue your onboarding journey and complete
                    the remaining steps.
                  </p>
                  <p>
                    Click the button below to return to onboarding and move
                    forward with your setup.
                  </p>
                </div>

                <div className="mt-6 rounded-[20px] border border-[#cfe2db] bg-[#f7fbf9] p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#005656]">
                    <FileText className="size-4" />
                    Signed document summary
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[16px] border border-[#dde8e4] bg-white p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">
                        Authorised Person
                      </div>
                      <div className="mt-2 text-base font-semibold text-[#101828]">
                        {authorisedPersonName}
                      </div>
                    </div>
                    <div className="rounded-[16px] border border-[#dde8e4] bg-white p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">
                        Status
                      </div>
                      <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#ecfdf3] px-3 py-1.5 text-sm font-semibold text-[#027a48]">
                        <CheckCircle2 className="size-4" />
                        Signed successfully
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={onContinueOnboarding}
                    className="inline-flex items-center justify-center gap-2 rounded-[14px] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(0,86,86,0.18)]"
                    style={{ background: PRIMARY }}
                  >
                    Continue Onboarding
                    <ArrowRight className="size-4" />
                  </button>
                  <a
                    href="#/onboarding/terms/1"
                    target="_self"
                    className="inline-flex items-center justify-center rounded-[14px] border border-[#d5d7da] bg-white px-5 py-3.5 text-sm font-semibold text-[#344054]"
                  >
                    View Signed Documents
                  </a>
                </div>

                <div className="mt-10 border-t border-[#eaecf0] pt-5 text-sm leading-6 text-[#667085]">
                  If you have any questions or need help, please contact your
                  account support team.
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
