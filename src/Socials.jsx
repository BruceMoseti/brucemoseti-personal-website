import { useEffect, useState } from "react";
import bgVideo from "./assets/main3.mp4";

export default function Socials() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      <div className={`contact-shell${mounted ? " mounted" : ""}`}>
        <div className="contact-card">
          <div className="contact-header">
            <div className="contact-title">CONTACT</div>
            <div className="contact-subtitle">Available for internship and research opportunities in performance engineering, systems, and backend development.</div>
          </div>

          <div className="contact-grid">
            <div className="contact-block">
              <div className="contact-label">Email</div>
              <div className="contact-copy">Brucemosetia@gmail.com</div>
            </div>
            <div className="contact-block">
              <div className="contact-label">GitHub</div>
              <a className="contact-link" href="https://github.com/brucemoseti" target="_blank" rel="noreferrer">github.com/brucemoseti</a>
            </div>
            <div className="contact-block">
              <div className="contact-label">LinkedIn</div>
              <a className="contact-link" href="https://www.linkedin.com/in/brucemoseti" target="_blank" rel="noreferrer">linkedin.com/in/brucemoseti</a>
            </div>
            <div className="contact-block">
              <div className="contact-label">Phone</div>
              <div className="contact-copy">(908) 348-1138</div>
            </div>
            <div className="contact-block">
              <div className="contact-label">Location</div>
              <div className="contact-copy">Newark, NJ</div>
            </div>
          </div>

          <div className="contact-details">
            <div className="contact-detail-title">Current Focus</div>
            <p className="contact-detail-copy">
              Incoming NVIDIA Performance Engineering Intern — analyzing compute and memory bottlenecks for Edge AI systems.
              Previous internships at Nokia, PSEG, NJIT research labs, and EN-POWER GROUP.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;500;600&display=swap');

        #menu-screen {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: #040812;
        }

        #menu-screen video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.42;
        }

        .contact-shell {
          position: absolute;
          inset: 0;
          z-index: 12;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .contact-shell.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .contact-card {
          width: min(1080px, 94vw);
          background: rgba(7, 12, 30, 0.94);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 28px 80px rgba(0,0,0,0.44);
          padding: 42px 46px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .contact-header {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .contact-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(48px, 6vw, 72px);
          color: #ffffff;
        }

        .contact-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: 18px;
          color: rgba(228, 241, 255, 0.9);
          line-height: 1.7;
          max-width: 760px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .contact-block {
          padding: 22px;
          background: rgba(15, 28, 61, 0.96);
          border: 1px solid rgba(78, 165, 255, 0.14);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .contact-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 2px;
          color: #7ae5ff;
          text-transform: uppercase;
        }

        .contact-copy {
          font-family: 'Montserrat', sans-serif;
          font-size: 16px;
          color: rgba(235, 245, 255, 0.92);
          line-height: 1.8;
        }

        .contact-details {
          padding: 22px;
          background: rgba(11, 19, 48, 0.96);
          border: 1px solid rgba(173, 235, 255, 0.1);
        }

        .contact-detail-title {
          font-family: 'Anton', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #b8f6ff;
          margin-bottom: 12px;
        }

        .contact-detail-copy {
          font-family: 'Montserrat', sans-serif;
          font-size: 16px;
          color: rgba(235, 245, 255, 0.92);
          line-height: 1.8;
          margin: 0;
        }

        @media (max-width: 860px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }

          .contact-card {
            padding: 28px;
          }
        }
      `}</style>
    </div>
  );
}
