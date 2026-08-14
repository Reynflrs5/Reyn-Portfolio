import { FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import doc1 from "../assets/doc1.png";
import "./AllProjects.css";
import "../Components/Certifications/Certifications.css"; // Reuse card grid styling

const certs = [
  {
    title: "OS Installation and Troubleshooting",
    issuer: "School PSU MEXICO",
    image: doc1,
    link: null,
  },
];

export default function AllCertifications({ onBack }) {
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
        <h1 className="ap-title">certifications</h1>
      </div>

      <div className="cert-grid" style={{ marginTop: '24px' }}>
        {certs.map((cert, i) => (
          <div key={i} className="cert-card">
            <div className="cert-icon-wrap">
              {cert.image
                ? <img src={cert.image} alt={cert.title} className="cert-icon-img" />
                : cert.icon}
            </div>

            <div className="cert-body">
              <p className="cert-name">{cert.title}</p>
              <p className="cert-issuer">{cert.issuer}</p>
            </div>

            <button
              className="cert-verify-btn"
              onClick={() => cert.link && window.open(cert.link, "_blank")}
              disabled={!cert.link}
            >
              &#8249; VERIFY &#8250;
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
