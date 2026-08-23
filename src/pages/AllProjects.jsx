import { FiArrowLeft, FiArrowUpRight, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import "./AllProjects.css";

import gwa1 from "../assets/gwa1.png";

import lifeline1 from "../assets/lifeline-web1.png";
import lifeline2 from "../assets/lifeline-web2.png";
import lifeline3 from "../assets/lifeline-web3.png";
import rentgo1 from "../assets/rentgo1.jpg";
import rentgo2 from "../assets/rentgo2.jpg";
import rentgo3 from "../assets/rentgo3.jpg";

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
    link: "https://gwa-calculator-reyn.vercel.app/",
    github: "https://github.com/Reynflrs5",
    images: [gwa1],
  },
  {
    name: "RentGo",
    desc: "Car Rental Management System is a digital platform designed to make vehicle renting faster, easier, and more organized. Instead of relying on manual reservations, phone calls, or messaging, users can register, browse available cars, select their preferred vehicle, make a reservation, choose a payment method, and receive booking confirmation online. For administrators or car owners, the system provides centralized management of vehicles, users, bookings, payments, and reports.",
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
    longDesc: "Developed as a group project during my 3rd year for our Application Development subject, the Car Rental Management System is a digital platform designed to make vehicle renting faster, easier, and more organized. Instead of relying on manual reservations, phone calls, or messaging, users can register, browse available cars, select their preferred vehicle, make a reservation, choose a payment method, and receive booking confirmation online. For administrators or car owners, the system provides centralized management of vehicles, users, bookings, payments, and reports.",
    link: "#",
    github: "https://github.com/Reynflrs5",
    images: [rentgo1, rentgo2, rentgo3],
  },
  {
    name: "Lifeline Promotion",
    desc: "A responsive web promotion and marketing platform designed to convert visitors with fast-loading, mobile-first landing pages.",
    longDesc: "Built during my 2nd year for our Web Development subject, Lifeline Promotion is a responsive web promotion and marketing platform designed to convert visitors with fast-loading, mobile-first landing pages.",
    features: [
      "Custom responsive landing pages",
      "Optimized for speed and mobile-first browsing",
      "Marketing-focused layout and CTAs",
    ],
    tags: ["LANDING PAGE", "MARKETING"],
    tech: "HTML, CSS, JS",
    link: "#",
    github: "https://github.com/Reynflrs5",
    images: [lifeline1, lifeline2, lifeline3],
  },

];

export default function AllProjects({ onBack, onViewDetails }) {
  return (
    <motion.div
      className="all-projects-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="ap-header">
        <button className="ap-back-btn" onClick={onBack}>
          <FiArrowLeft size={16} /> Back to Profile
        </button>
        <h1 className="ap-title">projects</h1>
      </div>

      <div className="ap-list">
        {projects.map((p, idx) => (
          <div key={idx} className="ap-item">
            <div className="ap-left">
              <span className="ap-name">{p.name}</span>
            </div>
            <div className="ap-right">
              <span className="ap-category">{p.tags[1] || p.tags[0]}</span>
              <p className="ap-desc">{p.desc}</p>
            </div>
            {p.link !== "#" ? (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="ap-action-btn"
                title="View Live"
              >
                View Live <FiExternalLink size={13} />
              </a>
            ) : (
              <button
                className="ap-action-btn"
                onClick={() => onViewDetails && onViewDetails(p)}
              >
                View Details <FiArrowUpRight size={13} />
              </button>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}