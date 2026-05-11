import { ReactNode } from "react";
import { motion } from "motion/react";
import pineLabsLogoImg from "../../../../pinelabs logo.png";
import ColorBends from "./ColorBends";

const authBgColors = ["#4A6512", "#64841A", "#84A928", "#A8CA3B", "#D0F255"];

export function AuthShell({
  children,
  layout = "split",
}: {
  children: ReactNode;
  layout?: "split" | "centered";
}) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(140deg, #011919 8%, #022929 48%, #033f3f 100%)",
        }}
      />
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
            <div className="h-6 sm:h-7 shrink-0" style={{ width: "auto" }}>
              <img
                src={pineLabsLogoImg}
                alt="Pine Labs"
                className="h-full w-auto object-contain select-none"
                draggable={false}
              />
            </div>
            <div
              className="h-5 sm:h-6 w-px hidden sm:block shrink-0"
              style={{ background: "#D1D5DC" }}
            />
            <div className="min-w-0 flex-1">
              <div
                className="uppercase truncate"
                style={{
                  color: "#36CC8B",
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
                  color: "#A4A7AE",
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: "18px",
                }}
              >
                Gift Card Procurement
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

      <div
        className={`relative z-10 w-full min-h-screen px-6 pt-20 sm:pt-24 pb-8 flex items-center justify-center ${
          layout === "split" ? "max-w-[1200px] gap-20" : "max-w-[500px]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
