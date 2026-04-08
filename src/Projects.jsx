import { useEffect, useState } from "react";
import bgVideo from "./assets/main2.mp4";

export default function Projects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      <div className={`projects-shell${mounted ? " mounted" : ""}`}>
        <div className="projects-card">
          <div className="projects-header">
            <div className="projects-title">PROJECTS</div>
            <div className="projects-subtitle">Selected work showcasing performance, full-stack systems, and AI research.</div>
          </div>

          <div className="projects-list">
            <div className="projects-item">
              <div className="projects-item-title">AI Imaging Analysis & GPU-Accelerated Systems</div>
              <div className="projects-item-copy">NVIDIA DeepSun project profiling GPU throughput and memory utilization to improve training efficiency by ~18%.</div>
            </div>
            <div className="projects-item">
              <div className="projects-item-title">Full-Stack Productivity Platform</div>
              <div className="projects-item-copy">Built a Notion-style app with Node.js and React, including REST APIs, real-time updates, and scalable content management.</div>
            </div>
            <div className="projects-item">
              <div className="projects-item-title">AI-Powered Knowledge Assistant</div>
              <div className="projects-item-copy">Developed backend services for LLM-based retrieval and optimized API performance through caching and prompt refinement.</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;500;600&display=swap');

        #menu-screen {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: #050814;
        }

        #menu-screen video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.4;
        }

        .projects-shell {
          position: absolute;
          inset: 0;
          z-index: 12;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .projects-shell.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .projects-card {
          width: min(1080px, 94vw);
          background: rgba(8, 14, 40, 0.94);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 26px 76px rgba(0,0,0,0.42);
          backdrop-filter: blur(16px);
          padding: 42px 48px;
          display: flex;
          flex-direction: column;
          gap: 26px;
        }

        .projects-header {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .projects-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(48px, 6vw, 70px);
          color: #fff;
        }

        .projects-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: 18px;
          color: rgba(234, 244, 255, 0.9);
          max-width: 780px;
          line-height: 1.7;
        }

        .projects-list {
          display: grid;
          gap: 18px;
        }

        .projects-item {
          padding: 24px;
          background: rgba(17, 30, 64, 0.96);
          border: 1px solid rgba(81, 166, 255, 0.15);
        }

        .projects-item-title {
          font-family: 'Anton', sans-serif;
          font-size: 24px;
          color: #c8f6ff;
          margin-bottom: 10px;
        }

        .projects-item-copy {
          font-family: 'Montserrat', sans-serif;
          font-size: 16px;
          color: rgba(234, 244, 255, 0.92);
          line-height: 1.8;
        }

        @media (max-width: 860px) {
          .projects-card {
            padding: 28px;
          }
        }
      `}</style>
    </div>
  );
}
EOF