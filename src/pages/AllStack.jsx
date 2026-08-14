import { FiArrowLeft } from "react-icons/fi";
import { 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiVite,
  SiNodedotjs, SiExpress, SiPhp, SiMysql, SiPostgresql,
  SiGit, SiFigma,
  SiOpenai, SiAnthropic, SiGoogle
} from "react-icons/si";
import { motion } from "framer-motion";
import "./AllProjects.css"; 
import "../Components/Experience/Experience.css"; 

const categories = [
  {
    title: "frontend",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "React Native", "Next.js", "Vite"]
  },
  {
    title: "backend",
    skills: ["Node.js", "Express.js", "PHP", "MySQL", "PostgreSQL"]
  },
  {
    title: "developer tools",
    skills: ["Git", "Figma", "VSCode"]
  },
  {
    title: "ai tools",
    skills: ["ChatGPT", "Claude", "Gemini"]
  }
];

const techIconMap = {
  "HTML": <SiHtml5 />,
  "CSS": <SiCss3 />,
  "JavaScript": <SiJavascript />,
  "TypeScript": <SiTypescript />,
  "React": <SiReact />,
  "React Native": <SiReact />,
  "Next.js": <SiNextdotjs />,
  "Vite": <SiVite />,
  "Node.js": <SiNodedotjs />,
  "Express.js": <SiExpress />,
  "PHP": <SiPhp />,
  "MySQL": <SiMysql />,
  "PostgreSQL": <SiPostgresql />,
  "Git": <SiGit />,
  "Figma": <SiFigma />,
  "ChatGPT": <SiOpenai />,
  "Claude": <SiAnthropic />,
  "Gemini": <SiGoogle />
};

export default function AllStack({ onBack }) {
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
        <h1 className="ap-title">tech stack</h1>
        <p className="ap-desc" style={{ marginTop: '8px', fontSize: '16px' }}>
          The tools, frameworks, and platforms I reach for — across the front end, back end, infrastructure, and AI.
        </p>
      </div>

      <div className="stack-categories" style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginTop: '16px' }}>
        {categories.map((cat, i) => (
          <div key={i} className="stack-category-group">
            <h3 style={{ 
              fontFamily: "'IBM Plex Mono', monospace", 
              fontSize: '14px', 
              color: 'var(--chrome-3)',
              textTransform: 'uppercase', 
              marginBottom: '20px' 
            }}>
              {cat.title}
            </h3>
            
            <div className="stack-pills">
              {cat.skills.map((tech, j) => (
                <span key={j} className="stack-pill pd-tag--icon">
                  {techIconMap[tech] && (
                    <span className="pd-tag-icon">{techIconMap[tech]}</span>
                  )}
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

