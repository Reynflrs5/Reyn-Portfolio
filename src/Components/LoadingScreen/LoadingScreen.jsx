import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./LoadingScreen.css";

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState("typing"); // "typing" | "done" | "exit"
  const fullName = "Jashley Rain Flores";
  const [displayed, setDisplayed] = useState("");

  const progress = Math.min(
    100,
    Math.round((displayed.length / fullName.length) * 100)
  );

  useEffect(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < fullName.length) {
        setDisplayed(fullName.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        setPhase("done");
        setTimeout(() => {
          setPhase("exit");
          setTimeout(() => onComplete(), 700);
        }, 550);
      }
    }, 70);

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          key="loader"
        >
          {/* perspective floor grid receding into the distance */}
          <div className="loading-floor" aria-hidden="true" />
          <div className="loading-vignette" aria-hidden="true" />

          <motion.div
            className="loading-stage"
            exit={{ opacity: 0, scale: 0.9, rotateX: 12, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* floating plate: idle bob + tilt to sell the depth */}
            <motion.div
              className="loading-plate-wrap"
              animate={{
                rotateX: [4, -3, 4],
                rotateY: [-5, 5, -5],
                translateY: [0, -6, 0],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="loading-mark">
                <div className="loading-mark-ring">
                  <svg className="loading-mark-ring-svg" viewBox="0 0 72 72">
                    <circle className="loading-mark-track" cx="36" cy="36" r="33" />
                    <motion.circle
                      className="loading-mark-fill"
                      cx="36"
                      cy="36"
                      r="33"
                      pathLength="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: progress / 100 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    />
                  </svg>
                </div>

                <div className="loading-plate">
                  <span className="loading-logo">JF</span>
                  <div className="loading-plate-face" aria-hidden="true" />
                </div>
              </div>
              <div className="loading-mark-shadow" aria-hidden="true" />
            </motion.div>

            <div className="loading-name-wrap">
              <span className="loading-name">{displayed}</span>
              <span className="loading-cursor" data-visible={phase === "typing"} />
            </div>

            <motion.div
              className="loading-bar-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="loading-bar-track">
                <motion.div
                  className="loading-bar-fill"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <span className="loading-bar-highlight" />
                </motion.div>
              </div>
              <span className="loading-percent">{progress}%</span>
            </motion.div>

            <motion.p
              className="loading-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Portfolio
            </motion.p>
          </motion.div>

          <div className="loading-corner tl" aria-hidden="true" />
          <div className="loading-corner br" aria-hidden="true" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}