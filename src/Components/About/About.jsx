import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";
import reynimg from "../../assets/profile.png";
import "./About.css";

export default function About() {
  const links = {
    facebook: "https://www.facebook.com/Reyn12345",
    instagram: "https://instagram.com/reynflrs",
    email: "mailto:fjashleyrain@gmail.com",
  };

  return (
    <motion.div
      className="about-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="about-hero">
        <div className="about-image">
          <img src={reynimg} alt="Jashley Rain Flores" />
        </div>
        <div className="about-content">
          <h1 className="about-name">Jashley Rain Flores</h1>
          <p className="about-bio">
            Aspiring Web Developer and 4th-year college student at Pampanga State University, passionate about building clean and user-friendly web applications. I continuously develop my skills through projects and hands-on practice, aiming to gain industry experience and contribute to meaningful solutions.
          </p>
          <div className="about-links">
            <a href={links.facebook} target="_blank" rel="noreferrer">facebook <FiArrowUpRight /></a>
            <a href={links.instagram} target="_blank" rel="noreferrer">instagram <FiArrowUpRight /></a>
            <a href={links.email}>email <FiArrowUpRight /></a>
          </div>
        </div>
      </div>

      <div className="about-stats-container">
        <div className="about-stat-item">
          <h4>4th<FiArrowUpRight size={14} color="#a3a3a3" /></h4>
          <p>YEAR IT STUDENT</p>
        </div>
        <div className="about-stat-item">
          <h4>4+<FiArrowUpRight size={14} color="#a3a3a3" /></h4>
          <p>PROJECTS</p>
        </div>
        <div className="about-stat-item">
          <h4>13<FiArrowUpRight size={14} color="#a3a3a3" /></h4>
          <p>TECHS LEARNED</p>
        </div>
        <div className="about-stat-item">
          <h4>100%<FiArrowUpRight size={14} color="#a3a3a3" /></h4>
          <p>DEDICATION</p>
        </div>
      </div>
    </motion.div>
  );
}
