import { FiGithub, FiArrowRight } from "react-icons/fi";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import "./Github.css";

export default function Github() {
  return (
    <motion.div
      className="gh-section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="gh-header">
        <h2 className="gh-label">05 — github contributions</h2>
        <a
          href="https://github.com/Reynflrs5"
          target="_blank"
          rel="noreferrer"
          className="gh-link-btn"
        >
          VIEW PROFILE <FiArrowRight size={12} />
        </a>
      </div>

      {/* Calendar */}
      <div className="gh-calendar-wrap">
        <GitHubCalendar
          username="Reynflrs5"
          blockSize={13}
          blockMargin={4}
          colorScheme="dark"
          fontSize={12}
          hideTotalCount={false}
          hideColorLegend={false}
        />
      </div>
    </motion.div>
  );
}
