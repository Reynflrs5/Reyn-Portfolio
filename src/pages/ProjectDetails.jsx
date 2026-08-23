import { FiArrowLeft, FiExternalLink, FiGithub, FiCheck, FiMonitor, FiTool, FiTarget, FiBox } from "react-icons/fi";
import { SiReact, SiVite, SiNodedotjs, SiMysql, SiHtml5, SiCss3, SiJavascript, SiDotnet } from "react-icons/si";
import { motion } from "framer-motion";
import "./ProjectDetails.css";

const techIconMap = {
  "React": <SiReact />,
  "React Native": <SiReact />,
  "Vite": <SiVite />,
  "Node.js": <SiNodedotjs />,
  "MySQL": <SiMysql />,
  "HTML": <SiHtml5 />,
  "CSS": <SiCss3 />,
  "JS": <SiJavascript />,
  "VB.NET": <SiDotnet />,
};

export default function ProjectDetails({ project, onBack }) {
  if (!project) return null;

  const tags = project.tech
    ? project.tech.split(",").map((t) => t.trim())
    : [];

  const gallery =
    project.images && project.images.length > 0
      ? project.images
      : project.image
        ? [project.image]
        : [];

  return (
    <motion.div
      className="case-study-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="cs-header">
        <button className="cs-back-btn" onClick={onBack}>
          <FiArrowLeft size={16} /> Back to Profile
        </button>
      </div>

      <div className="cs-hero">
        <h1 className="cs-title">{project.name}</h1>
        <p className="cs-tagline">{project.desc}</p>
        
        <div className="cs-actions">
          {project.link && project.link !== "#" && (
            <a href={project.link} className="project-btn btn-dark" target="_blank" rel="noreferrer" style={{maxWidth: '160px'}}>
              Live Site <FiExternalLink size={14} />
            </a>
          )}
          {project.github && (
            <a href={project.github} className="project-btn btn-outline" target="_blank" rel="noreferrer" style={{maxWidth: '160px'}}>
              GitHub <FiGithub size={14} />
            </a>
          )}
        </div>
      </div>

      {gallery.length > 0 && (
        <img src={gallery[0]} alt={`${project.name} Hero`} className="cs-hero-image" style={project.name === "RentGo" ? {objectFit: 'contain', backgroundColor: '#111'} : {}} />
      )}

      <div className="cs-bento-grid">
        {/* OVERVIEW CARD */}
        <div className="cs-bento-card full-width">
          <h2 className="cs-card-title"><FiTarget /> The Overview</h2>
          <p className="cs-card-text">
            {project.longDesc || `This project was built to solve specific user needs by providing a highly functional and modern solution. As a developer, the goal was to ensure maximum performance, intuitive user experience, and scalable architecture. By using modern web standards, the final product delivers a seamless experience.`}
          </p>
        </div>

        {/* ARCHITECTURE & TECH STACK */}
        <div className="cs-bento-card">
          <h2 className="cs-card-title"><FiMonitor /> Tech Stack & Architecture</h2>
          <div className="cs-tech-grid">
            {tags.map((t, idx) => (
              <span key={idx} className="cs-tech-item">
                {techIconMap[t]} {t}
              </span>
            ))}
          </div>
          <p className="cs-card-text" style={{ marginTop: '20px', fontSize: '14px', opacity: 0.8 }}>
            These technologies were chosen for their robust performance, extensive ecosystem, and ability to scale as the project grows.
          </p>
        </div>

        {/* KEY FEATURES */}
        <div className="cs-bento-card">
          <h2 className="cs-card-title"><FiBox /> Key Features</h2>
          {project.features && project.features.length > 0 ? (
            <ul className="cs-features-list">
              {project.features.map((f, i) => (
                <li key={i}>
                  <FiCheck />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="cs-card-text">Core functionalities were developed with a focus on usability and fast load times.</p>
          )}
        </div>
      </div>

      {/* GALLERY (REMAINING IMAGES) */}
      {gallery.length > 1 && (
        <>
          <h2 className="cs-card-title" style={{marginBottom: '20px', marginLeft: '10px'}}><FiTool /> Action Shots</h2>
          <div className="cs-gallery">
            {gallery.slice(1).map((img, idx) => (
              <img key={idx} src={img} alt={`Preview ${idx + 2}`} style={project.name === "RentGo" ? {objectFit: 'contain', backgroundColor: '#111'} : {}} />
            ))}
          </div>
        </>
      )}

    </motion.div>
  );
}