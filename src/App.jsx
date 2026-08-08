import { useEffect, useState } from 'react'
import heroArt from './assets/mainm2.jpeg'
import './App.css'

const resumeUrl = `${import.meta.env.BASE_URL}Bruce_Moseti_Resume.pdf`
const portraitUrl = `${import.meta.env.BASE_URL}bruce.png`

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const projects = [
  {
    title: 'CueAI',
    role: 'Physics-informed AI simulation',
    year: '2026',
    copy: 'A predictive billiards platform that combines numerical methods, Monte Carlo simulation, and reusable object-oriented software.',
    tags: ['Python', 'C++', 'PyTorch', 'NumPy'],
    href: 'https://github.com/BruceMoseti/cueai',
    accent: 'cue',
  },
  {
    title: 'Rootline',
    role: 'Live incident intelligence',
    year: '2026',
    copy: 'Turns scattered operational signals into grounded context so engineers can move from noise to a usable incident picture faster.',
    tags: ['Python', 'Systems', 'Evidence'],
    href: 'https://github.com/BruceMoseti/rootline',
    accent: 'root',
  },
  {
    title: 'Energy Grid Dashboard',
    role: 'Time-series analytics',
    year: '2025',
    copy: 'Visualizes grid performance, outage patterns, and usage anomalies with practical dashboard workflows for operators.',
    tags: ['Python', 'Plotly Dash', 'Analytics'],
    href: 'https://github.com/BruceMoseti/energy-grid-performance-dashboard',
    accent: 'grid',
  },
  {
    title: 'DeepSun',
    role: 'GPU-accelerated edge inference',
    year: '2025',
    copy: 'Profiled and optimized CUDA / PyTorch / DeepStream pipelines, cutting real-time inference latency by about 40%.',
    tags: ['CUDA', 'PyTorch', 'DeepStream'],
    href: 'https://github.com/BruceMoseti',
    accent: 'sun',
  },
]

const experiences = [
  {
    company: 'NVIDIA',
    role: 'Performance Engineering Intern, Edge AI',
    place: 'Santa Clara, CA',
    date: 'May 2026 — Present',
    bullets: [
      'Built Python benchmarking and automation for Jetson platforms across 200,000+ GPU workload runs.',
      'Automated latency, throughput, memory, and GPU utilization analysis to catch regressions faster.',
      'Profiled CUDA, cuDNN, and TensorRT inference pipelines to find bottlenecks in real-time AI workloads.',
    ],
  },
  {
    company: 'NOKIA',
    role: 'Software Engineering: Test Development Co-op',
    place: 'Allentown, PA',
    date: 'Jun 2021 — Aug 2021',
    bullets: [
      'Improved engineering workflow efficiency by 45% with Python, C#, and PowerShell automation for TROSA validation.',
      'Designed reusable testing frameworks and GitLab CI/CD pipelines for optical networking system validation.',
      'Analyzed manufacturing and test datasets to support hardware-software root-cause analysis.',
    ],
  },
  {
    company: 'NJIT Space Weather Research',
    role: 'AI Research Intern',
    place: 'Newark, NJ',
    date: 'May 2020 — Aug 2020',
    bullets: [
      'Engineered GPU-accelerated computer vision pipelines with Python, CUDA, PyTorch, and NVIDIA DeepStream.',
      'Reduced real-time inference latency by approximately 40% through benchmarking and deployment optimization.',
      'Compared deep learning approaches using research literature, LLMs, and experimental measurement.',
    ],
  },
  {
    company: 'CIBM3 Lab',
    role: 'Research Software Engineer Intern',
    place: 'Newark, NJ',
    date: 'May 2020 — Aug 2020',
    bullets: [
      'Built Python and SQL pipelines that automated infrastructure reporting and dashboard updates.',
      'Ran hardware-in-the-loop tests to reproduce power disturbances and measure system response.',
      'Implemented ADC moving-average filtering and debounce logic to reduce false embedded triggers.',
    ],
  },
]

const skills = [
  { group: 'Languages', items: ['C++', 'Python', 'Java', 'TypeScript', 'SQL'] },
  { group: 'AI & Systems', items: ['CUDA', 'TensorRT', 'PyTorch', 'DeepStream', 'Embedded'] },
  { group: 'Web & Tools', items: ['React', 'Node.js', 'Git', 'Docker', 'AWS'] },
]

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]')
    if (!nodes.length || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openExperience, setOpenExperience] = useState(0)

  useReveal()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className="site">
      <div className="atmosphere" aria-hidden="true" />
      <a className="skip-link" href="#content">Skip to content</a>

      <header className="topbar">
        <a className="brand" href="#top" aria-label="Bruce Moseti home">
          <span className="brand-mark">B</span>
          <span className="brand-name">Bruce Moseti</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
          <a className="nav-cta" href={resumeUrl} target="_blank" rel="noreferrer">Resume</a>
        </nav>

        <button
          className={`menu-toggle${menuOpen ? ' open' : ''}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </header>

      <div id="mobile-nav" className={`mobile-nav${menuOpen ? ' open' : ''}`}>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
        ))}
        <a href={resumeUrl} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Resume</a>
      </div>

      <main id="content">
        <section className="hero" id="top">
          <div className="hero-copy" data-reveal>
            <p className="hero-kicker">Electrical Engineering · NJIT · Edge AI</p>
            <h1>Bruce Moseti</h1>
            <p className="hero-lead">
              I turn hardware and AI performance problems into systems you can measure—
              benchmarks, profiling, automation, and cleaner engineering decisions.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#work">View work</a>
              <a className="btn ghost" href="mailto:brucemosetie@gmail.com">Get in touch</a>
            </div>
          </div>

          <div className="hero-visual" data-reveal>
            <div className="hero-frame">
              <img src={heroArt} alt="Stylized portrait of Bruce Moseti" />
            </div>
            <div className="hero-orbit" aria-hidden="true" />
          </div>
        </section>

        <section className="section work" id="work">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Selected work</p>
            <h2>Projects built to be measured, debugged, and used.</h2>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <a
                className={`project-row accent-${project.accent}`}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                key={project.title}
                data-reveal
                style={{ '--delay': `${index * 60}ms` }}
              >
                <div className="project-meta">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>{project.year}</span>
                </div>
                <div className="project-body">
                  <div className="project-title-row">
                    <h3>{project.title}</h3>
                    <span className="project-role">{project.role}</span>
                  </div>
                  <p>{project.copy}</p>
                  <ul className="tag-list">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <span className="project-arrow" aria-hidden="true">↗</span>
                <div className="project-wash" aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <section className="section experience" id="experience">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Experience</p>
            <h2>Where the work got real.</h2>
          </div>

          <div className="experience-list" data-reveal>
            {experiences.map((item, index) => {
              const open = openExperience === index
              return (
                <article className={`experience-item${open ? ' open' : ''}`} key={item.company}>
                  <button
                    type="button"
                    className="experience-summary"
                    aria-expanded={open}
                    onClick={() => setOpenExperience(open ? -1 : index)}
                  >
                    <div>
                      <h3>{item.company}</h3>
                      <p>{item.role}</p>
                    </div>
                    <div className="experience-aside">
                      <span>{item.date}</span>
                      <span className="chevron" aria-hidden="true" />
                    </div>
                  </button>
                  <div className="experience-panel" hidden={!open}>
                    <p className="experience-place">{item.place}</p>
                    <ul>
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="section about" id="about">
          <div className="about-grid" data-reveal>
            <div className="about-photo">
              <img src={portraitUrl} alt="Bruce Moseti" />
            </div>
            <div className="about-copy">
              <p className="eyebrow">About</p>
              <h2>Engineer enough to automate. Hardware enough to measure.</h2>
              <p>
                I’m an Electrical Engineering student at New Jersey Institute of Technology (expected June 2028),
                currently a Performance Engineering Intern on NVIDIA Edge AI. My work sits between embedded platforms,
                GPU acceleration, and the tooling that makes performance visible.
              </p>
              <p>
                Dean’s List across Fall 2025, Spring 2025, and Spring 2026. Coursework spans algorithms, computer
                architecture, embedded systems, and microprocessors.
              </p>
              <div className="skill-bands">
                {skills.map((band) => (
                  <div key={band.group}>
                    <h3>{band.group}</h3>
                    <p>{band.items.join(' · ')}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-panel" data-reveal>
            <p className="eyebrow">Contact</p>
            <h2>Let’s build something measurable.</h2>
            <p>
              Open to engineering roles, research, and projects across Edge AI, embedded systems, and performance tooling.
            </p>
            <div className="contact-actions">
              <a className="btn primary" href="mailto:brucemosetie@gmail.com">brucemosetie@gmail.com</a>
              <a className="btn ghost" href="https://www.linkedin.com/in/brucemoseti" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="btn ghost" href="https://github.com/BruceMoseti" target="_blank" rel="noreferrer">GitHub</a>
              <a className="btn ghost" href={resumeUrl} target="_blank" rel="noreferrer">Resume</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Bruce Moseti</span>
        <span>Built with care in React</span>
      </footer>
    </div>
  )
}
