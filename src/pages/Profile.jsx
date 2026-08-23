import { useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import About from "../Components/About/About";
import Experience from "../Components/Experience/Experience";
import Projects from "../Components/Projects/Projects";
import Certifications from "../Components/Certifications/Certifications";
import Github from "../Components/Github/Github";
import Guestbook from "../Components/Guestbook/Guestbook";
import AllProjects from "./AllProjects";
import AllExperience from "./AllExperience";
import AllStack from "./AllStack";
import AllCertifications from "./AllCertifications";
import AllRecommendations from "./AllRecommendations";
import ProjectDetails from "./ProjectDetails";

import Chatbot from "../Components/Chatbot/Chatbot";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu } from "react-icons/fi";

import "./Profile.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Profile() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [currentView, setCurrentView] = useState("home"); // "home" | "all-projects" | "project-details"

  return (
    <div className="profile-page">
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Mobile Hamburger Button */}
      <button 
        className="mobile-menu-btn" 
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Open menu"
      >
        <FiMenu size={24} />
      </button>

      <div className="profile-main">
        <AnimatePresence mode="wait">
          {currentView === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
              >
                <div id="section-about">
                  <motion.div variants={fadeUp}><About /></motion.div>
                </div>

                <div id="section-projects">
                  <motion.div variants={fadeUp}>
                    <Projects
                      onViewDetails={(project) => {
                        setSelectedProject(project);
                        setCurrentView("project-details");
                        window.scrollTo(0, 0);
                      }}
                      onViewAll={() => {
                        setCurrentView("all-projects");
                        window.scrollTo(0, 0);
                      }}
                    />
                  </motion.div>
                </div>

                <div id="section-experience">
                  <motion.div variants={fadeUp}>
                    <Experience
                      onViewAllExp={() => { setCurrentView("all-experience"); window.scrollTo(0, 0); }}
                      onViewAllStack={() => { setCurrentView("all-stack"); window.scrollTo(0, 0); }}
                    />
                  </motion.div>
                </div>

                <div id="section-certifications">
                  <motion.div variants={fadeUp}>
                    <Certifications onViewAll={() => { setCurrentView("all-certifications"); window.scrollTo(0, 0); }} />
                  </motion.div>
                </div>

                <div id="section-github">
                  <motion.div variants={fadeUp}><Github /></motion.div>
                </div>

                <div id="section-guestbook">
                  <motion.div variants={fadeUp}>
                    <Guestbook
                      onViewAll={() => {
                        setCurrentView("all-recommendations");
                        window.scrollTo(0, 0);
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ) : currentView === "all-projects" ? (
            <motion.div key="all-projects" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease: "easeInOut" }}>
              <AllProjects
                onBack={() => setCurrentView("home")}
                onViewDetails={(project) => { setSelectedProject(project); setCurrentView("project-details-from-all"); window.scrollTo(0, 0); }}
              />
            </motion.div>
          ) : currentView === "all-experience" ? (
            <motion.div key="all-experience" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease: "easeInOut" }}>
              <AllExperience onBack={() => setCurrentView("home")} />
            </motion.div>
          ) : currentView === "all-stack" ? (
            <motion.div key="all-stack" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease: "easeInOut" }}>
              <AllStack onBack={() => setCurrentView("home")} />
            </motion.div>
          ) : currentView === "all-certifications" ? (
            <motion.div key="all-certifications" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease: "easeInOut" }}>
              <AllCertifications onBack={() => setCurrentView("home")} />
            </motion.div>
          ) : currentView === "all-recommendations" ? (
            <motion.div key="all-recommendations" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease: "easeInOut" }}>
              <AllRecommendations onBack={() => setCurrentView("home")} />
            </motion.div>
          ) : currentView === "project-details" ? (
            <motion.div key="project-details" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease: "easeInOut" }}>
              <ProjectDetails project={selectedProject} onBack={() => setCurrentView("home")} />
            </motion.div>
          ) : currentView === "project-details-from-all" ? (
            <motion.div key="project-details-from-all" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease: "easeInOut" }}>
              <ProjectDetails project={selectedProject} onBack={() => setCurrentView("all-projects")} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* CHATBOT */}
      <Chatbot />
    </div>
  );
}
