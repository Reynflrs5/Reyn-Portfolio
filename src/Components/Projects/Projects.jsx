import { useState } from "react";
import { FiArrowRight, FiExternalLink, FiGithub, FiLayers } from "react-icons/fi";
import "./Projects.css";

import { projectsData } from "../../data/projectsData";

const projects = projectsData.slice(0, 3);

export default function Projects({ onViewAll, onViewDetails }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="projects-section">
      <div className="projects-header">
        <h2 className="projects-title">02 — projects</h2>
        <button className="projects-all-btn" onClick={onViewAll}>
          ALL PROJECTS <FiArrowRight />
        </button>
      </div>

      <div className="projects-carousel-container">
        {projects.map((project, index) => {
          // Determine relative position
          let diff = index - activeIndex;
          if (diff < -1) diff += projects.length;
          if (diff > 1) diff -= projects.length;

          if (Math.abs(diff) > 1) return null; // Only show 3 cards (center, left, right)

          const isCenter = diff === 0;
          const isLeft = diff === -1;
          const isRight = diff === 1;

          let transform = "translateX(-50%) translateY(-50%)";
          let zIndex = 1;
          let opacity = 1;

          if (isCenter) {
            transform = "translateX(-50%) translateY(-50%) scale(1) rotate(0deg)";
            zIndex = 3;
          } else if (isLeft) {
            transform = "translateX(-110%) translateY(-40%) scale(0.85) rotate(-8deg)";
            zIndex = 2;
            opacity = 0.7;
          } else if (isRight) {
            transform = "translateX(10%) translateY(-40%) scale(0.85) rotate(8deg)";
            zIndex = 2;
            opacity = 0.7;
          }

          return (
            <div
              key={project.name}
              className={`project-card ${isCenter ? "active" : ""}`}
              style={{
                transform,
                zIndex,
                opacity,
              }}
              onClick={() => {
                if (isLeft) prevProject();
                if (isRight) nextProject();
              }}
            >
              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="project-tag">
                    {i === 0 ? <FiLayers size={10} style={{ marginRight: 4 }} /> : null}
                    {tag}
                  </span>
                ))}
              </div>

              <div className="project-main">
                <div className="project-image">
                  <img src={project.image} alt={project.name} />
                </div>
                <div className="project-info">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-desc">{project.desc}</p>
                </div>
              </div>

              <div className="project-actions">
                {project.link !== "#" ? (
                  <a href={project.link} className="project-btn btn-dark" target="_blank" rel="noreferrer">
                    Live Site <FiExternalLink size={14} />
                  </a>
                ) : (
                  <button 
                    className="project-btn btn-dark" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails(project);
                    }}
                  >
                    View Details <FiArrowRight size={14} />
                  </button>
                )}
                <a href={project.github} className="project-btn btn-outline" target="_blank" rel="noreferrer">
                  GitHub <FiGithub size={14} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}