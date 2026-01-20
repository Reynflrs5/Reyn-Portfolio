import { useState } from "react";
import { FaMedal, FaTimes } from "react-icons/fa"; // changed to FaMedal
import "./Certifications.css";

// Import your certificate image(s)
import doc1 from "../../assets/doc1.png"; // adjust path if needed

const certificationsData = [
  {
    title: "OS Installation and Troubleshooting",
    subtitle: "Best Group in Computer System Servicing",
    image: doc1
  }
];

export default function Certifications({ darkMode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCert, setCurrentCert] = useState(null);

  const openModal = (cert) => {
    setCurrentCert(cert);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentCert(null);
  };

  return (
    <div className={`card ${darkMode ? "dark" : ""}`}>
      <h3>
        <FaMedal className="header-icon" /> {/* updated icon */}
        Certifications
      </h3>

      {certificationsData.map((cert, idx) => (
        <div
          key={idx}
          className="cert clickable"
          onClick={() => openModal(cert)}
        >
          <div className="cert-text">
            <strong>{cert.title}</strong>
            <p>{cert.subtitle}</p>
          </div>
        </div>
      ))}

      {modalOpen && currentCert && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            <img src={currentCert.image} alt={currentCert.title} />
            <h4>{currentCert.title}</h4>
            <p>{currentCert.subtitle}</p>
          </div>
        </div>
      )}
    </div>
  );
}
