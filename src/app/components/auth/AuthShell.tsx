import { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router";
import pineLabsLogoImg from "../../../imports/Pine_Labs_White.png";
import landingImage from "../../../imports/landing image.png";
import ColorBends from "./ColorBends";

const authBgColors = ["#012C2C", "#33470d", "#4f6a16", "#789126", "#a9c93a"];

export function AuthShell({
  children,
  layout = "split",
  intro = false,
}: {
  children: ReactNode;
  layout?: "split" | "centered";
  intro?: boolean;
}) {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(intro);

  useEffect(() => {
    if (!intro) {
      setShowIntro(false);
      return;
    }

    setShowIntro(true);
    const timer = window.setTimeout(() => setShowIntro(false), 1500);
    return () => window.clearTimeout(timer);
  }, [intro]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(140deg, #011919 8%, #022929 48%, #033f3f 100%)",
        }}
      />
      {!showIntro && (
        <div className="absolute inset-0 opacity-80">
          <ColorBends
            colors={authBgColors}
            rotation={111}
            autoRotate={3}
            speed={0.22}
            scale={0.95}
            frequency={1.15}
            warpStrength={1.1}
            mouseInfluence={0.8}
            noise={0.08}
            parallax={0.35}
            iterations={3}
            intensity={1.35}
            bandWidth={7}
            transparent
          />
        </div>
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 18%, rgba(168,202,59,0.12) 0%, rgba(168,202,59,0) 34%), radial-gradient(circle at 80% 26%, rgba(208,242,85,0.14) 0%, rgba(208,242,85,0) 32%), linear-gradient(180deg, rgba(1,25,25,0.46) 0%, rgba(1,25,25,0.62) 55%, rgba(1,25,25,0.82) 100%)",
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute hidden lg:block"
        style={{
          left: "-5%",
          top: "10%",
          width: "65%",
          height: "65%",
          backgroundImage:
            "linear-gradient(110deg, rgba(132,169,40,0.16) 0%, rgba(168,202,59,0.18) 33%, rgba(208,242,85,0.14) 66%, rgba(132,169,40,0.16) 100%)",
          backgroundSize: "300% 100%",
          filter: "blur(110px)",
          opacity: 0.18,
          borderRadius: "50%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          x: [0, 30, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-[80%]"
        style={{
          backgroundImage:
            "linear-gradient(115deg, rgba(255,255,255,0) 0%, rgba(208,242,85,0.025) 35%, rgba(208,242,85,0.07) 50%, rgba(208,242,85,0.025) 65%, rgba(255,255,255,0) 100%)",
          filter: "blur(70px)",
          mixBlendMode: "screen",
        }}
        initial={{ x: "-60%", opacity: 0 }}
        animate={{
          x: ["-60%", "-20%", "30%", "120%", "120%"],
          opacity: [0, 0.08, 0.12, 0, 0],
        }}
        transition={{
          duration: 10,
          times: [0, 0.1, 0.18, 0.3, 1],
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(209,242,86,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(209,242,86,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)",
          filter: "blur(0.5px)",
          opacity: 0.3,
        }}
        animate={{ backgroundPosition: ["0px 0px", "60px 0px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <header className="absolute top-0 left-0 right-0 z-20 h-[60px] sm:h-[70px] flex items-center justify-center">
        <div
          className="w-full flex items-center justify-between px-4 sm:px-8 md:px-12 xl:px-[120px]"
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
                className="h-full w-auto object-contain select-none"
                draggable={false}
              />
            </button>
            <div
              className="h-5 sm:h-6 w-px hidden sm:block shrink-0"
              style={{ background: "#D1D5DC" }}
            />
            <div className="min-w-0 flex-1">
              <div
                className="uppercase truncate"
                style={{
                  color: "#D1F256",
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
                  color: "#ffffff",
                  opacity: 0.6,
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: "18px",
                }}
              >
                Elevate One
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(209, 242, 86, 0.35) 50%, rgba(0, 0, 0, 0) 100%)",
          animation: "pulseGlow 4s ease-in-out infinite",
          opacity: 0.3,
        }}
      >
        <style>{`
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.3; filter: blur(0px); }
            50% { opacity: 0.7; filter: blur(1px); }
          }
        `}</style>
      </div>

      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="auth-intro"
            className="relative z-10 flex min-h-screen w-full items-center justify-center px-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative flex h-36 w-36 items-center justify-center"
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{
                opacity: 1,
                scale: [0.86, 1.04, 1],
              }}
              transition={{
                opacity: { duration: 0.18 },
                scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <motion.div
                aria-hidden="true"
                className="absolute inset-[-28px] rounded-[44px]"
                style={{
                  background:
                    "radial-gradient(circle, rgba(208,242,85,0.22) 0%, rgba(208,242,85,0.08) 42%, rgba(208,242,85,0) 72%)",
                  filter: "blur(8px)",
                }}
                animate={{
                  scale: [0.82, 1.18, 0.96, 1.12, 0.98],
                  opacity: [0.25, 0.72, 0.35, 0.6, 0.3],
                }}
                transition={{ duration: 1.5, ease: [0.45, 0, 0.2, 1] }}
              />
              <motion.img
                src={landingImage}
                alt="Pine Labs onboarding"
                className="relative h-28 w-28 rounded-[24px] object-cover"
                initial={{ scale: 1.14 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                draggable={false}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="auth-content"
            className={`relative z-10 w-full min-h-screen px-3 pt-20 pb-8 flex items-center justify-center sm:px-6 sm:pt-24 ${
              layout === "split" ? "max-w-[1200px] gap-20" : "max-w-[500px]"
            }`}
            initial={intro ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
