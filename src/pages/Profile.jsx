import { useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import About from "../Components/About/About";
import Experience from "../Components/Experience/Experience";
import Projects from "../Components/Projects/Projects";
import Certifications from "../Components/Certifications/Certifications";
import Github from "../Components/Github/Github";
import AllProjects from "./AllProjects";
import AllExperience from "./AllExperience";
import AllStack from "./AllStack";
import AllCertifications from "./AllCertifications";
import ProjectDetails from "./ProjectDetails";

import Chatbot from "../Components/Chatbot/Chatbot";
import { motion } from "framer-motion";
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
        {currentView === "home" ? (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
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
                  onViewAllExp={() => {
                    setCurrentView("all-experience");
                    window.scrollTo(0, 0);
                  }}
                  onViewAllStack={() => {
                    setCurrentView("all-stack");
                    window.scrollTo(0, 0);
                  }}
                />
              </motion.div>
            </div>

            <div id="section-certifications">
              <motion.div variants={fadeUp}>
                <Certifications 
                  onViewAll={() => {
                    setCurrentView("all-certifications");
                    window.scrollTo(0, 0);
                  }}
                />
              </motion.div>
            </div>

            <div id="section-github">
              <motion.div variants={fadeUp}>
                <Github />
              </motion.div>
            </div>
          </motion.div>
        ) : currentView === "all-projects" ? (
          <AllProjects 
            onBack={() => setCurrentView("home")} 
            onViewDetails={(project) => {
              setSelectedProject(project);
              setCurrentView("project-details-from-all");
              window.scrollTo(0, 0);
            }}
          />
        ) : currentView === "all-experience" ? (
          <AllExperience 
            onBack={() => setCurrentView("home")} 
          />
        ) : currentView === "all-stack" ? (
          <AllStack 
            onBack={() => setCurrentView("home")} 
          />
        ) : currentView === "all-certifications" ? (
          <AllCertifications 
            onBack={() => setCurrentView("home")} 
          />
        ) : currentView === "project-details" ? (
          <ProjectDetails 
            project={selectedProject} 
            onBack={() => setCurrentView("home")} 
          />
        ) : currentView === "project-details-from-all" ? (
          <ProjectDetails 
            project={selectedProject} 
            onBack={() => setCurrentView("all-projects")} 
          />
        ) : null}
      </div>

      {/* CHATBOT */}
      <Chatbot />
    </div>
  );
}
