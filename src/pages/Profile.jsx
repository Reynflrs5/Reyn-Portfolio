import { useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import About from "../Components/About/About";
import Experience from "../Components/Experience/Experience";
import Projects from "../Components/Projects/Projects";
import TechStack from "../Components/TechStack/TechStack";
import Certifications from "../Components/Certifications/Certifications";

import Modal from "../Components/Modal"; // <-- add this

import "./Profile.css";

export default function Profile() {
  const [darkMode, setDarkMode] = useState(false);

  // Modal State
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className={`profile-page ${darkMode ? "dark" : ""}`}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="profile-main">
        <About darkMode={darkMode} />

        <div className="grid-2">
          <Experience darkMode={darkMode} />
          <Projects
            darkMode={darkMode}
            setOpenModal={setOpenModal}
            setSelectedProject={setSelectedProject}
          />
        </div>

        <div className="grid-2">
          <TechStack darkMode={darkMode} />
          <Certifications darkMode={darkMode} />
        </div>
      </div>

      {/* MODAL */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        project={selectedProject}
        darkMode={darkMode}
      />
    </div>
  );
}
