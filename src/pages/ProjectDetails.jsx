import { FiArrowLeft, FiExternalLink, FiGithub, FiCheck } from "react-icons/fi";
import { SiReact, SiVite, SiNodedotjs, SiMysql, SiHtml5, SiCss3, SiJavascript, SiDotnet } from "react-icons/si";
import { motion } from "framer-motion";
import "./AllProjects.css";

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
      className="all-projects-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="ap-header pd-header">
        <button className="ap-back-btn" onClick={onBack}>
          <FiArrowLeft size={16} /> Back to Profile
        </button>
      </div>

      <div className="pd-zigzag">
        {/* ROW 1: About (Left) & Image 1 (Right) */}
        <div className="pd-zz-row">
          <div className="pd-zz-text">
            <h1 className="ap-title pd-title">{project.name}</h1>
            <p className="pd-desc" style={{ marginBottom: '24px' }}>{project.longDesc || project.desc}</p>

            <div className="pd-actions">
              {project.link && project.link !== "#" && (
                <a
                  href={project.link}
                  className="pd-btn pd-btn-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Site <FiExternalLink size={14} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  className="pd-btn pd-btn-outline"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <FiGithub size={14} />
                </a>
              )}
            </div>
          </div>
          <div className="pd-zz-media">
            {gallery.length > 0 && (
              <img src={gallery[0]} alt={`${project.name} preview 1`} className={`pd-zz-img ${project.name === "RentGo" ? "portrait" : ""}`} />
            )}
          </div>
        </div>

        {/* ROW 2: Image 2 (Left) & Features (Right) */}
        {(gallery.length > 1 || (project.features && project.features.length > 0)) && (
          <div className="pd-zz-row reverse">
            <div className="pd-zz-text">
              <h2 className="ap-title" style={{ fontSize: '24px', marginBottom: '16px' }}>Key Features</h2>
              {project.features && project.features.length > 0 && (
                <ul className="ap-zz-features" style={{ margin: 0 }}>
                  {project.features.map((f, i) => (
                    <li key={i}>
                      <FiCheck className="ap-zz-check" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="pd-zz-media">
              {gallery.length > 1 && (
                <img src={gallery[1]} alt={`${project.name} preview 2`} className={`pd-zz-img ${project.name === "RentGo" ? "portrait" : ""}`} />
              )}
            </div>
          </div>
        )}

        {/* ROW 3: Tech Stack (Left) & Image 3 (Right) */}
        {(gallery.length > 2 || tags.length > 0) && (
          <div className="pd-zz-row">
            <div className="pd-zz-text">
              <h2 className="ap-title" style={{ fontSize: '24px', marginBottom: '8px' }}>Technologies Used</h2>
              {tags.length > 0 && (
                <div className="pd-tags" style={{ margin: '16px 0 0 0' }}>
                  {tags.map((t, idx) => (
                    <span key={idx} className="pd-tag pd-tag--icon">
                      {techIconMap[t] && (
                        <span className="pd-tag-icon">{techIconMap[t]}</span>
                      )}
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="pd-zz-media">
              {gallery.length > 2 && (
                <img src={gallery[2]} alt={`${project.name} preview 3`} className={`pd-zz-img ${project.name === "RentGo" ? "portrait" : ""}`} />
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}