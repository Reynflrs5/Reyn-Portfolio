import { useState } from "react";
import { FiArrowRight, FiExternalLink, FiGithub, FiLayers } from "react-icons/fi";
import "./Projects.css";

import { projectsData } from "../../data/projectsData";

const projects = projectsData.slice(0, 3);

export default function Projects({ onViewAll, onViewDetails }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextProject();
    }
    if (isRightSwipe) {
      prevProject();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="projects-section">
      <div className="projects-header">
        <h2 className="projects-title">02 — projects</h2>
        <button className="projects-all-btn" onClick={onViewAll}>
          ALL PROJECTS <FiArrowRight />
        </button>
      </div>

      <div 
        className="projects-carousel-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {projects.map((project, index) => {
          // Determine relative position
          let diff = index - activeIndex;
          if (diff < -1) diff += projects.length;
          if (diff > 1) diff -= projects.length;

          if (Math.abs(diff) > 1) return null; // Only show 3 cards (center, left, right)

          const isCenter = diff === 0;
          const isLeft = diff === -1;
          const isRight = diff === 1;

          let positionClass = "";

          if (isCenter) {
            positionClass = "pos-center";
          } else if (isLeft) {
            positionClass = "pos-left";
          } else if (isRight) {
            positionClass = "pos-right";
          }

          return (
            <div
              key={project.name}
              className={`project-card ${isCenter ? "active" : ""} ${positionClass}`}
              onClick={() => {
                if (isLeft) prevProject();
                if (isRight) nextProject();
              }}
            >
              <div className="card-glow"></div>
              <div className="card-content">
                <div className="project-image-wrapper">
                  <img src={project.image} alt={project.name} className="project-image" />
                  <div className="project-overlay">
                    <div className="project-tags">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="modern-tag">
                          {i === 0 ? <FiLayers size={10} style={{ marginRight: 4 }} /> : null}
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="project-details">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-desc">{project.desc}</p>
                </div>

                <div className="project-actions">
                  {project.link !== "#" ? (
                    <a href={project.link} className="modern-btn primary" target="_blank" rel="noreferrer">
                      Live Site <FiExternalLink size={14} />
                    </a>
                  ) : (
                    <button 
                      className="modern-btn primary" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails(project);
                      }}
                    >
                      View Details <FiArrowRight size={14} />
                    </button>
                  )}
                  <a href={project.github} className="modern-btn secondary" target="_blank" rel="noreferrer">
                    GitHub <FiGithub size={14} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}