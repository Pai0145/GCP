import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, UserRound } from "lucide-react";

interface AnalyzingTransitionProps {
  onComplete: () => void;
  stepOneText?: string;
  stepTwoText?: string;
  stepThreeText?: string;
  successTitle?: string;
  successText?: string;
  successOnly?: boolean;
  successIcon?: "check" | "profile" | "warning";
}

export function AnalyzingTransition({
  onComplete,
  stepOneText = "Verifying your GST details...",
  stepTwoText = "Verifying your CIN details...",
  stepThreeText = "Verifying your PAN details...",
  successTitle = "Congratulations",
  successText = "All your details have been verified...",
  successOnly = false,
  successIcon = "check",
}: AnalyzingTransitionProps) {
  const [currentStep, setCurrentStep] = useState(successOnly ? 4 : 0);
  const isWarning = successIcon === "warning";

  useEffect(() => {
    if (successOnly) {
      setCurrentStep(4);
      const timer = setTimeout(() => onComplete(), 2600);
      return () => clearTimeout(timer);
    }

    // Show first subtext immediately
    const timer1 = setTimeout(() => setCurrentStep(1), 100);
    // Switch to second subtext after 2s
    const timer2 = setTimeout(() => setCurrentStep(2), 2000);
    // Switch to third subtext after 4s
    const timer3 = setTimeout(() => setCurrentStep(3), 4000);
    // Show final status after 6s
    const timer4 = setTimeout(() => setCurrentStep(4), 6000);
    // Complete after 8.5s
    const timer5 = setTimeout(() => onComplete(), 8500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete, successOnly]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background - matching first screen dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(140.342deg, rgb(6, 18, 18) 8.4861%, rgb(10, 31, 31) 50%, rgb(13, 32, 32) 91.514%)",
        }}
      />

      {/* Blur layer */}
      <div
        className="absolute inset-0 backdrop-blur-[2px]"
        style={{
          background: "rgba(6, 18, 18, 0.15)",
        }}
      />

      {/* Animated gradient layers */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(13, 32, 32, 0.25) 0%, rgba(10, 31, 31, 0.2) 50%, rgba(6, 18, 18, 0.18) 100%)",
          filter: "blur(100px)",
        }}
        animate={{
          clipPath: [
            "circle(0% at 20% 80%)",
            "circle(150% at 20% 80%)",
            "circle(0% at 20% 80%)",
          ],
        }}
        transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 70%, rgba(0, 86, 86, 0.12) 0%, rgba(0, 120, 110, 0.06) 40%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          clipPath: [
            "circle(0% at 15% 85%)",
            "circle(140% at 15% 85%)",
            "circle(0% at 15% 85%)",
          ],
        }}
        transition={{
          duration: 14,
          delay: 0.3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(209, 242, 86, 0.04) 0%, rgba(180, 255, 160, 0.02) 30%, transparent 60%)",
          filter: "blur(100px)",
        }}
        animate={{
          clipPath: [
            "circle(0% at 25% 75%)",
            "circle(160% at 25% 75%)",
            "circle(0% at 25% 75%)",
          ],
        }}
        transition={{
          duration: 15,
          delay: 0.6,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Final status mark - shows only on the final congratulations step */}
        <AnimatePresence mode="wait">
          {currentStep === 4 && (
            <motion.div
              key={`success-${successIcon}`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1],
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="mb-8"
            >
              <div className="relative w-24 h-24">
                {/* Circle background */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      isWarning
                        ? "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)"
                        : "linear-gradient(135deg, #00a896 0%, #005f73 100%)",
                    boxShadow:
                      isWarning
                        ? "0 0 40px rgba(245, 158, 11, 0.5), 0 0 80px rgba(245, 158, 11, 0.24)"
                        : "0 0 40px rgba(0, 168, 150, 0.6), 0 0 80px rgba(0, 168, 150, 0.3)",
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {successIcon === "warning" ? (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center text-white"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: [0.5, 1.12, 1] }}
                    transition={{
                      duration: 0.65,
                      delay: 0.2,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    <AlertTriangle size={48} strokeWidth={2.4} />
                  </motion.div>
                ) : successIcon === "profile" ? (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center text-[#d0f255]"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: [0.5, 1.12, 1] }}
                    transition={{
                      duration: 0.65,
                      delay: 0.2,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    <UserRound size={48} strokeWidth={2.4} />
                  </motion.div>
                ) : (
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                  >
                    <motion.path
                      d="M 25 50 L 40 65 L 75 30"
                      fill="none"
                      stroke="#d0f255"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.3,
                        ease: "easeOut",
                      }}
                    />
                  </svg>
                )}

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      isWarning
                        ? "radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, transparent 70%)"
                        : "radial-gradient(circle, rgba(208, 242, 85, 0.4) 0%, transparent 70%)",
                    filter: "blur(20px)",
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Celebration particles */}
                {!isWarning && [...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                      background: i % 2 === 0 ? "#d0f255" : "#00a896",
                      left: "50%",
                      top: "50%",
                    }}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: Math.cos((i * Math.PI) / 4) * 60,
                      y: Math.sin((i * Math.PI) / 4) * 60,
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.5,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4 Bouncing Dots Loader - More Dramatic - only show on steps 1-3 */}
        {currentStep < 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.4,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="mb-12 relative h-24 w-64 flex items-center justify-center"
          >
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-5 h-5 rounded-full"
                style={{
                  background:
                    i % 2 === 0
                      ? "linear-gradient(135deg, #d0f255 0%, #a8d93f 100%)"
                      : "linear-gradient(135deg, #00a896 0%, #005f73 100%)",
                  boxShadow: `0 0 30px ${i % 2 === 0 ? "rgba(208, 242, 85, 0.8)" : "rgba(0, 168, 150, 0.8)"}, 0 0 60px ${i % 2 === 0 ? "rgba(208, 242, 85, 0.4)" : "rgba(0, 168, 150, 0.4)"}`,
                }}
                animate={{
                  x: ["-96px", "96px"],
                  y: [
                    0, -40, 0, -35, 0, -30, 0, -25, 0, -20, 0, -15, 0, -10, 0,
                    -5, 0,
                  ],
                  scale: [
                    1, 1.3, 1, 1.25, 1, 1.2, 1, 1.15, 1, 1.1, 1, 1.05, 1, 1.02,
                    1, 1.01, 1,
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: [0.45, 0.05, 0.55, 0.95],
                }}
              >
                {/* Enhanced Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      i % 2 === 0
                        ? "rgba(208, 242, 85, 0.5)"
                        : "rgba(0, 168, 150, 0.5)",
                    filter: "blur(12px)",
                  }}
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />

                {/* Inner shine */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), transparent 60%)",
                  }}
                />
              </motion.div>
            ))}

            {/* Enhanced Trail effect */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={`trail-${i}`}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background:
                    i % 2 === 0
                      ? "rgba(208, 242, 85, 0.4)"
                      : "rgba(0, 168, 150, 0.4)",
                  filter: "blur(4px)",
                }}
                animate={{
                  x: ["-96px", "96px"],
                  opacity: [0, 0.8, 0],
                  scale: [0.3, 1.2, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2 + 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Ground line indicator */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(208, 242, 85, 0.3) 50%, transparent 100%)",
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}

        {/* Subtexts container - wider for single line */}
        <div className="h-auto relative overflow-visible w-full max-w-3xl px-8">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.p
                key="gst"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center text-base sm:text-lg whitespace-nowrap"
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontFamily: "Lato, sans-serif",
                }}
              >
                {stepOneText}
              </motion.p>
            )}
            {currentStep === 2 && (
              <motion.p
                key="cin"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center text-base sm:text-lg whitespace-nowrap"
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontFamily: "Lato, sans-serif",
                }}
              >
                {stepTwoText}
              </motion.p>
            )}
            {currentStep === 3 && (
              <motion.p
                key="pan"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center text-base sm:text-lg whitespace-nowrap"
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontFamily: "Lato, sans-serif",
                }}
              >
                {stepThreeText}
              </motion.p>
            )}
            {currentStep === 4 && (
              <motion.div
                key={isWarning ? "manual-review" : "congratulations"}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                  type: "spring",
                  stiffness: 150,
                  damping: 12,
                }}
                className="text-center"
              >
                <motion.h2
                  className="text-4xl sm:text-5xl font-bold mb-4"
                  style={{
                    color: isWarning ? "#fbbf24" : "#d0f255",
                    fontFamily: "Lato, sans-serif",
                    textShadow: isWarning
                      ? "0 0 30px rgba(245, 158, 11, 0.35)"
                      : "0 0 30px rgba(208, 242, 85, 0.5)",
                  }}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  {successTitle}
                </motion.h2>
                <motion.p
                  className="text-lg sm:text-xl whitespace-nowrap"
                  style={{
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "Lato, sans-serif",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {successText}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom gradient line */}
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
    </div>
  );
}
