import "./Modal.css";
import { FaTimes } from "react-icons/fa";

export default function Modal({ open, onClose, project }) {
  if (!open || !project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modal-header">
          <h3>{project.name}</h3>
          <p>{project.desc}</p>
        </div>

        {project.images && project.images.length > 0 ? (
          <div className="modal-gallery" style={{ 
            marginTop: '16px', 
            display: 'grid', 
            gridTemplateColumns: project.images.length > 1 ? '1fr 1fr' : '1fr', 
            gap: '12px',
            maxHeight: '400px',
            overflowY: 'auto',
            paddingRight: '8px'
          }}>
            {project.images.map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                alt={`${project.name} screenshot ${idx + 1}`} 
                style={{ width: '100%', height: 'auto', borderRadius: '8px', border: '1px solid var(--chrome-line)' }} 
              />
            ))}
          </div>
        ) : project.image && (
          <div className="modal-image-wrap" style={{ marginTop: '16px', borderRadius: '12px', overflow: 'hidden' }}>
            <img src={project.image} alt={project.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        )}

        <div className="modal-tech">
          {project.tech && project.tech.split(',').map((t, idx) => (
            <span key={idx} className="modal-tech-icon">
              {t.trim()}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}
