import { useEffect, useState } from "react";
import bgVideo from "./assets/main1.mp4";

export default function AboutMe() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      <div className={`about-shell${mounted ? " mounted" : ""}`}>
        <div className="about-card">
          <div className="about-header">
            <div className="about-title">BRUCE MOSETI</div>
            <div className="about-tag">NJ | (908) 348-1138 | Brucemosetia@gmail.com</div>
          </div>

          <div className="about-section">
            <div className="about-label">SUMMARY</div>
            <p className="about-copy">
              Electrical Engineering student at NJIT with hands-on experience in performance engineering, backend services, and data-driven automation.
              I work at the intersection of system-level analysis and software delivery to improve reliability, latency, and efficiency.
            </p>
          </div>

          <div className="about-grid">
            <div className="about-block">
              <div className="about-block-title">EDUCATION</div>
              <div className="about-block-copy">New Jersey Institute of Technology — Newark, NJ</div>
              <div className="about-block-copy">B.S. Electrical Engineering, Expected May 2028</div>
              <div className="about-block-copy">Relevant Coursework: Data Structures & Algorithms, Computer Architecture, Operating Systems, Signals & Systems</div>
            </div>

            <div className="about-block">
              <div className="about-block-title">SKILLS</div>
              <div className="about-list">Python · Java · C++ · JavaScript · SQL</div>
              <div className="about-list">Node.js · React · REST APIs · Git · Linux</div>
              <div className="about-list">Object-Oriented Design · Client-Server Architecture · Debugging · Performance Optimization</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&family=Montserrat:wght@300;500;600&display=swap');

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
          opacity: 0.46;
        }

        .about-shell {
          position: absolute;
          inset: 0;
          z-index: 12;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          opacity: 0;
          transform: scale(0.98);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .about-shell.mounted {
          opacity: 1;
          transform: scale(1);
        }

        .about-card {
          width: min(1080px, 94vw);
          background: rgba(6, 13, 40, 0.94);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 28px 80px rgba(0,0,0,0.42);
          backdrop-filter: blur(18px);
          padding: 42px 48px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .about-header {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .about-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(52px, 6vw, 72px);
          letter-spacing: 1px;
          color: #ffffff;
          margin: 0;
        }

        .about-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          color: #9de2ff;
          letter-spacing: 2px;
        }

        .about-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .about-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 2px;
          color: #5fe8ff;
          text-transform: uppercase;
        }

        .about-copy {
          font-family: 'Montserrat', sans-serif;
          font-size: 18px;
          line-height: 1.8;
          color: rgba(234, 244, 255, 0.94);
          margin: 0;
          max-width: 840px;
        }

        .about-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
        }

        .about-block {
          background: rgba(16, 30, 70, 0.96);
          border: 1px solid rgba(92, 202, 255, 0.12);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .about-block-title {
          font-family: 'Anton', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #d7f9ff;
        }

        .about-block-copy,
        .about-list {
          font-family: 'Montserrat', sans-serif;
          font-size: 16px;
          line-height: 1.8;
          color: rgba(234, 244, 255, 0.92);
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
          }

          .about-card {
            padding: 28px;
          }
        }
      `}</style>
    </div>
  );
}
