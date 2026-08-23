import { useState } from "react";
import { FiArrowRight, FiExternalLink, FiGithub, FiLayers } from "react-icons/fi";
import "./Projects.css";

import gwa1 from "../../assets/gwa1.png";
import rentgo1 from "../../assets/rentgo1.jpg";
import rentgo2 from "../../assets/rentgo2.jpg";
import rentgo3 from "../../assets/rentgo3.jpg";
import lifeline1 from "../../assets/lifeline-web1.png";
import lifeline2 from "../../assets/lifeline-web2.png";
import lifeline3 from "../../assets/lifeline-web3.png";


const projects = [
  {
    name: "GWA Calculator",
    desc: "A clean, fast tool for students to compute their General Weighted Average in seconds — no spreadsheets, no manual math.",
    features: [
      "Instant GWA computation with unit-weighted grades",
      "Save and revisit past semester records",
      "Mobile-friendly, works on any device",
    ],
    tags: ["#1 STUDENT TOOL", "WEB APP"],
    tech: "React, Vite",
    status: "live",
    link: "https://gwa-calculator-reyn.vercel.app/",
    github: "https://github.com/Reynflrs5",
    image: gwa1,
    images: [gwa1],
  },
  {
    name: "RentGo",
    desc: "A full-stack car rental booking system for mobile and web.",
    longDesc: "Car Rental Management System is a digital platform designed to make vehicle renting faster, easier, and more organized. Instead of relying on manual reservations, phone calls, or messaging, users can register, browse available cars, select their preferred vehicle, make a reservation, choose a payment method, and receive booking confirmation online. For administrators or car owners, the system provides centralized management of vehicles, users, bookings, payments, and reports.",
    features: [
      "User Registration & Login – Secure account access for renters",
      "Car Browsing – View available vehicles and their details",
      "Online Booking – Reserve a car through the system",
      "Payment Management – Process and track rental payments",
      "Booking Confirmation – Receive confirmation after a successful reservation",
      "Cancel/Reschedule – Manage and modify existing bookings",
      "Car Management – Admin can add, edit, and manage rental vehicles",
      "Booking Management – Admin can monitor and manage reservations",
      "User Management – Admin can manage registered users",
      "Reports & Analytics – View bookings, revenue, and rental statistics"
    ],
    tags: ["FULL STACK", "MANAGEMENT"],
    tech: "React Native, Node.js, MySQL",
    status: "live",
    link: "#",
    github: "https://github.com/Reynflrs5",
    image: rentgo1,
    images: [rentgo1, rentgo2, rentgo3],
  },
  {
    name: "Lifeline Promotion",
    desc: "A responsive web promotion and marketing platform designed to convert visitors with fast-loading, mobile-first landing pages.",
    features: [
      "Custom responsive landing pages",
      "Optimized for speed and mobile-first browsing",
      "Marketing-focused layout and CTAs",
    ],
    tags: ["LANDING PAGE", "MARKETING"],
    tech: "HTML, CSS, JS",
    status: "live",
    link: "#",
    github: "https://github.com/Reynflrs5",
    image: lifeline1,
    images: [lifeline1, lifeline2, lifeline3],
  },

];

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