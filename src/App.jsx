import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import SmoothScroll from './components/SmoothScroll'
import Preloader from './components/Preloader'
import Magnetic from './components/Magnetic'
import BruceLLM from './components/BruceLLM'
import previewClip from './assets/circletransition.mp4'
import './App.css'

const MotionDiv = motion.div
const MotionP = motion.p
const MotionH1 = motion.h1
const MotionArticle = motion.article

const portraitUrl = `${import.meta.env.BASE_URL}bruce.png`
const linkedInUrl = 'https://www.linkedin.com/in/bruce-moseti-9553172a9/'
const githubUrl = 'https://github.com/BruceMoseti'
const emailUrl = 'mailto:brucemosetie@gmail.com'

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const projects = [
  {
    title: 'CueAI',
    tagline: 'A physics-informed AI billiards simulation',
    year: '2026',
    summary:
      'CueAI is a simulation platform that combines classical mechanics with machine learning to predict billiard-ball trajectories. I built it to explore how numerical methods and learned models can work together on a problem that’s both visual and technical.',
    theProject:
      'The system models collisions and motion, then uses prediction models to estimate trajectories. I cared about making the pipeline understandable end to end — from physics assumptions to training and visualization — so the results weren’t just accurate, but inspectable.',
    technical: [
      'Python and C++ for simulation and core logic',
      'PyTorch / ONNX for trajectory prediction',
      'NumPy for numerical methods and analysis',
      'PyQt for interactive visualization',
    ],
    thoughts:
      'This project was a good excuse to slow down and connect theory with something playable. I spent a lot of time thinking about what “good enough” prediction looks like when the physics is messy, and how to keep the architecture clean enough that I could keep iterating without breaking everything.',
    links: [{ label: 'Github Repo', href: 'https://github.com/BruceMoseti/cueai' }],
    accent: 'cue',
    media: 'video',
  },
  {
    title: 'Rootline',
    tagline: 'Live incident intelligence, grounded in evidence',
    year: '2026',
    summary:
      'Rootline is a systems project focused on turning scattered operational signals into clearer incident context. The idea was simple: when something breaks, people shouldn’t have to dig through noise to find what actually matters.',
    theProject:
      'The project explores how to collect, organize, and present evidence around incidents so the story is easier to follow. I focused on structure and grounding — making sure claims stay connected to the signals behind them.',
    technical: [
      'Python for core processing and tooling',
      'Evidence-oriented data modeling',
      'Designed for operational readability, not just raw logs',
    ],
    thoughts:
      'I liked working on this because it sits between engineering and communication. Good tooling isn’t only about collecting more data — it’s about helping someone understand what’s going on under pressure.',
    links: [{ label: 'Github Repo', href: 'https://github.com/BruceMoseti/rootline' }],
    accent: 'root',
    media: 'grid',
  },
  {
    title: 'Energy Grid Dashboard',
    tagline: 'A dashboard for grid performance and usage patterns',
    year: '2025',
    summary:
      'A Python and Plotly Dash app that visualizes energy grid performance, outage patterns, and usage anomalies over time. I built it to practice turning time-series data into something operators — or curious engineers — can actually explore.',
    theProject:
      'The dashboard surfaces trends and unusual patterns across performance metrics. The goal was to make the charts interactive enough to ask questions quickly, without needing a separate analysis notebook for every view.',
    technical: [
      'Python for data processing',
      'Plotly Dash for interactive charts and layout',
      'Time-series analytics for outage and usage trends',
    ],
    thoughts:
      'I enjoy projects where the interface is part of the thinking. Building charts forced me to decide what mattered most, what was noise, and how to present uncertainty without overwhelming the page.',
    links: [
      {
        label: 'Github Repo',
        href: 'https://github.com/BruceMoseti/energy-grid-performance-dashboard',
      },
    ],
    accent: 'grid',
    media: 'bars',
  },
  {
    title: 'DeepSun',
    tagline: 'AI imaging analysis and GPU-accelerated systems',
    year: '2025',
    summary:
      'DeepSun grew out of research work around imaging analysis and GPU-accelerated pipelines. I used it to practice measuring performance, spotting bottlenecks, and turning findings into clearer next steps.',
    theProject:
      'The work involved analyzing imaging and performance-style datasets, building reporting tools, and evaluating where AI and GPU approaches could help. Presenting the results clearly — to both technical and non-technical audiences — was part of the project, not an afterthought.',
    technical: [
      'Python for analysis and reporting',
      'GPU-oriented workflows for inference and profiling',
      'Automated metric tracking to support research priorities',
      'Presentation-ready summaries for stakeholders',
    ],
    thoughts:
      'This project taught me that performance work is as much about asking the right questions as it is about speed. Measuring carefully made the interesting parts of the system much easier to talk about.',
    links: [{ label: 'Github Repo', href: 'https://github.com/BruceMoseti' }],
    accent: 'sun',
    media: 'orbit',
  },
  {
    title: 'Personal Website',
    tagline: 'What you’re looking at right now',
    year: '2026',
    summary:
      'This site is a home for my work, interests, and experiments. I wanted something that felt personal without becoming cluttered — a place that looks considered and still stays easy to navigate.',
    theProject:
      'The site brings together selected projects, experience, and contact in one place. I designed it with motion and readability in mind, and kept iterating until the interactions felt smooth instead of noisy.',
    technical: [
      'React and Vite for the front end',
      'Framer Motion and Lenis for motion and smooth scrolling',
      'Custom cursor and lightweight micro-interactions',
      'GitHub Pages for deployment',
    ],
    thoughts:
      'Building my own site made me care a lot about small details — pacing, hover states, and how much information to show at once. I’m still refining it, but I’m happy it feels like something I can grow with.',
    links: [
      { label: 'Github Repo', href: 'https://github.com/BruceMoseti/brucemoseti-personal-website' },
      { label: 'Live Site', href: 'https://brucemoseti.github.io/brucemoseti-personal-website/' },
    ],
    accent: 'cue',
    media: 'orbit',
  },
  {
    title: 'Solar Energy Irrigation System',
    tagline: 'Sensors, control logic, and performance data for irrigation automation',
    year: '2024',
    summary:
      'An undergraduate research project integrating sensors, control logic, and data collection for solar-powered irrigation automation. I worked on design, testing, and documenting what improved across iterations.',
    theProject:
      'The system was tested across multiple scenarios to evaluate stability, efficiency, and reliability under changing conditions. I focused on connecting hardware behavior with usable performance data.',
    technical: [
      'Sensor integration and control logic',
      'Python for data collection and analysis',
      'AutoCAD for design documentation',
      'Iterative testing across multiple scenarios',
    ],
    thoughts:
      'This was one of the first projects where hardware, software, and documentation all had to stay in sync. Seeing how small design tradeoffs showed up in real measurements was a useful lesson.',
    links: [
      { label: 'Github Repo', href: 'https://github.com/BruceMoseti/IRAP---INFUSING-RESEARCH-AS-PEDAGOGY' },
    ],
    accent: 'grid',
    media: 'bars',
  },
  {
    title: 'Makerspace Mechatronics',
    tagline: 'Hands-on manufacturing, electronics, and system troubleshooting',
    year: '2025',
    summary:
      'Documentation and work from NJIT’s Advanced Manufacturing and Mechatronics Training Program. It covers prototyping, electronics assembly, and learning how physical systems come together in practice.',
    theProject:
      'The program emphasized building and debugging real hardware — from fabrication basics to electromechanical integration — with a focus on making things work, then understanding why they work.',
    technical: [
      'Hardware prototyping and fabrication',
      'Electronics assembly and debugging',
      'Mechatronics and sensory integration fundamentals',
      'Documentation of process and troubleshooting notes',
    ],
    thoughts:
      'Working in the makerspace reminded me how much engineering is learned by touching the problem. Software skills help, but physical systems force you to confront constraints you can’t abstract away.',
    links: [
      {
        label: 'Github Repo',
        href: 'https://github.com/BruceMoseti/NJIT-Makerspace-Advanced-Manufacturing-and-Mechatronics-Training-Program',
      },
    ],
    accent: 'root',
    media: 'grid',
  },
]

const experiences = [
  {
    company: 'NVIDIA',
    role: 'Performance Engineering Intern, Edge AI',
    place: 'Internship',
    date: 'May 2026 — Present',
    bullets: [],
  },
  {
    company: 'Nokia',
    role: 'Optoelectronics Test Development Co-op',
    place: 'Allentown, PA',
    date: 'Sep 2025 — Present',
    bullets: [],
  },
  {
    company: 'CIBM3 Labs',
    role: 'Research Assistant',
    place: 'On-site',
    date: 'Jun 2025 — Sep 2025',
    bullets: [
      'Supported lab research by building structured datasets from experiments and extracting usable metrics for analysis.',
      'Automated data cleaning and analysis workflows in Python, improving turnaround time for weekly reporting.',
      'Presented research outcomes to technical and non-technical audiences.',
      'Collaborated with researchers to refine experimental objectives, success criteria, and reporting formats.',
    ],
  },
  {
    company: 'PSEG',
    role: 'Technical Solutions Intern',
    place: 'Internship',
    date: 'Jun 2025 — Aug 2025',
    bullets: [],
  },
  {
    company: 'NJIT Makerspace',
    role: 'Advanced Manufacturing and Mechatronics Training Program',
    place: 'Apprenticeship',
    date: 'Jun 2025 — Aug 2025',
    bullets: [
      'Hands-on prototyping and fabrication focused on hardware development, electronics assembly, and troubleshooting.',
      'Worked across sensory integration, hardware development, and mechatronics fundamentals.',
    ],
  },
  {
    company: 'STEM Success Academy',
    role: 'Student',
    place: 'Apprenticeship',
    date: 'Jun 2025 — Jul 2025',
    bullets: [
      'Studied fundamental engineering topics with emphasis on electrical systems, circuit analysis, and electromechanical integration.',
      'Prototyped and fabricated in the NJIT Makerspace, focusing on hardware, electronics assembly, and system troubleshooting.',
      'Participated in research-focused workshops on advanced manufacturing, embedded systems, automation, and applied energy systems.',
    ],
  },
  {
    company: 'Space Weather',
    role: 'AI Imaging Analysis and GPU-Accelerated Systems',
    place: 'NVIDIA DeepSun Project · Internship',
    date: 'Apr 2025 — Jun 2025',
    bullets: [
      'Analyzed imaging and performance datasets to identify patterns, bottlenecks, and improvement opportunities.',
      'Built automated Python reporting tools to track key metrics and support research priorities.',
      'Evaluated emerging AI and GPU use cases through research, data analysis, and stakeholder feedback.',
      'Presented findings through technical and business-facing presentations.',
    ],
  },
  {
    company: 'EN-POWER GROUP',
    role: 'Mechanical Design Engineer Intern',
    place: 'Internship',
    date: 'Dec 2024 — Jun 2025',
    bullets: [],
  },
  {
    company: 'Infusing Research as Pedagogy',
    role: 'Undergraduate Research Assistant, Solar Energy Irrigation System',
    place: 'Apprenticeship',
    date: 'Dec 2023 — Jun 2024',
    bullets: [
      'Designed and tested a system integrating sensors, control logic, and performance data collection for irrigation automation.',
      'Analyzed operational data across test scenarios to evaluate stability, efficiency, and reliability.',
      'Documented design tradeoffs and iteration results to support improvements to performance and usability.',
    ],
  },
]

const skills = [
  { group: 'Languages', items: ['C++', 'Python', 'Java', 'TypeScript', 'SQL'] },
  { group: 'AI & Systems', items: ['CUDA', 'TensorRT', 'PyTorch', 'DeepStream', 'Embedded'] },
  { group: 'Web & Tools', items: ['React', 'Node.js', 'Git', 'Docker', 'AWS'] },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

function ProjectMedia({ project, active }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined
    if (active) {
      const play = video.play()
      if (play?.catch) play.catch(() => {})
    } else {
      video.pause()
      video.currentTime = 0
    }
    return undefined
  }, [active])

  if (project.media === 'video') {
    return (
      <div className={`project-media type-video tone-${project.accent}${active ? ' active' : ''}`}>
        <video ref={videoRef} muted loop playsInline preload="metadata" src={previewClip} />
        <div className="media-veil" />
      </div>
    )
  }

  return (
    <div
      className={`project-media type-${project.media} tone-${project.accent}${active ? ' active' : ''}`}
      aria-hidden="true"
    >
      <div className="media-orb one" />
      <div className="media-orb two" />
      <div className="media-grid" />
      <div className="media-bars">
        <span /><span /><span /><span /><span />
      </div>
    </div>
  )
}

function ProjectCard({ project, index, hovered, onHover }) {
  const [open, setOpen] = useState(false)
  const panelId = `project-details-${index}`

  return (
    <MotionArticle
      className={`project-row accent-${project.accent}${open ? ' is-open' : ''}`}
      onMouseEnter={() => onHover(project.title)}
      onMouseLeave={() => onHover(null)}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <ProjectMedia project={project} active={hovered || open} />
      <div className="project-content">
        <div className="project-meta">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span>{project.year}</span>
        </div>
        <div className="project-body">
          <div className="project-title-row">
            <h3>{project.title}</h3>
            <span className="project-role">{project.tagline}</span>
          </div>
          <p>{project.summary}</p>

          <MotionDiv
            id={panelId}
            className="project-details"
            initial={false}
            animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="project-details-inner">
              <div className="project-detail-block">
                <h4>The Project</h4>
                <p>{project.theProject}</p>
              </div>
              <div className="project-detail-block">
                <h4>Technical Overview</h4>
                <ul>
                  {project.technical.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="project-detail-block">
                <h4>Thoughts</h4>
                <p>{project.thoughts}</p>
              </div>
              {project.links?.length ? (
                <div className="project-links">
                  {project.links.map((link) => (
                    <a
                      key={`${link.label}-${link.href}`}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      data-cursor-label="Open"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </MotionDiv>

          <button
            type="button"
            className="project-toggle"
            aria-expanded={open}
            aria-controls={panelId}
            data-cursor="hover"
            data-cursor-label={open ? 'Close' : 'More'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
    </MotionArticle>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })
  return <MotionDiv className="scroll-progress" style={{ scaleX }} />
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openExperience, setOpenExperience] = useState(0)
  const [ready, setReady] = useState(false)
  const [hoveredProject, setHoveredProject] = useState(null)
  const [navSolid, setNavSolid] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.15])

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <SmoothScroll>
      <div className={`site${ready ? ' is-ready' : ''}`}>
        <Preloader onDone={() => setReady(true)} />
        <CustomCursor />
        <ScrollProgress />
        <div className="noise" aria-hidden="true" />
        <div className="blob blob-a" aria-hidden="true" />
        <div className="blob blob-b" aria-hidden="true" />
        <div className="blob blob-c" aria-hidden="true" />

        <a className="skip-link" href="#content">Skip to content</a>

        <header className={`topbar${navSolid ? ' solid' : ''}`}>
          <Magnetic>
            <a className="brand" href="#top" data-cursor="hover" aria-label="Bruce Moseti home">
              <span className="brand-mark">B</span>
              <span className="brand-name">Bruce Moseti</span>
            </a>
          </Magnetic>

          <nav className="desktop-nav" aria-label="Primary">
            {navItems.map((item) => (
              <Magnetic key={item.href} strength={0.35}>
                <a href={item.href} data-cursor="hover">{item.label}</a>
              </Magnetic>
            ))}
            <Magnetic>
              <a className="nav-cta" href={emailUrl} data-cursor="hover" data-cursor-label="Email">
                Contact
              </a>
            </Magnetic>
          </nav>

          <button
            className={`menu-toggle${menuOpen ? ' open' : ''}`}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            data-cursor="hover"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </header>

        <div id="mobile-nav" className={`mobile-nav${menuOpen ? ' open' : ''}`}>
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              style={{ transitionDelay: `${index * 40}ms` }}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href={emailUrl} onClick={() => setMenuOpen(false)}>Contact</a>
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>LinkedIn</a>
        </div>

        <main id="content">
          <section className="hero" id="top" ref={heroRef}>
            <MotionDiv className="hero-copy" style={{ y: heroY, opacity: heroOpacity }}>
              <MotionDiv variants={stagger} initial="hidden" animate={ready ? 'show' : 'hidden'}>
                <MotionP className="hero-kicker" variants={fadeUp}>
                  Electrical Engineering · NJIT
                </MotionP>
                <MotionH1 variants={fadeUp} className="hero-title">
                  <span>Bruce</span>
                  <span>Moseti</span>
                </MotionH1>
                <MotionP className="hero-lead" variants={fadeUp}>
                  Electrical engineering student building software for systems that need to be measured,
                  understood, and improved.
                </MotionP>
                <MotionDiv className="hero-actions" variants={fadeUp}>
                  <Magnetic>
                    <a className="btn primary" href="#work" data-cursor="hover" data-cursor-label="Scroll">
                      View work
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a className="btn ghost" href={emailUrl} data-cursor="hover" data-cursor-label="Email">
                      Get in touch
                    </a>
                  </Magnetic>
                </MotionDiv>
              </MotionDiv>
            </MotionDiv>

            <div className="hero-stage" aria-hidden="true">
              <div className="hero-ring" />
              <div className="hero-wave" />
            </div>
          </section>

          <section className="marquee-band" aria-hidden="true">
            <div className="marquee-track">
              <span>Edge AI · Embedded · Software · Research · Automation · Systems · </span>
              <span>Edge AI · Embedded · Software · Research · Automation · Systems · </span>
            </div>
          </section>

          <section className="section work" id="work">
            <MotionDiv
              className="section-head"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              <p className="eyebrow">Selected work</p>
              <h2>A few things I’ve built and explored.</h2>
              <p className="section-note">
                For each project, you can click on Show More for details about the technical process and my thoughts.
              </p>
            </MotionDiv>

            <div className="project-list">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  hovered={hoveredProject === project.title}
                  onHover={setHoveredProject}
                />
              ))}
            </div>
          </section>

          <section className="section experience" id="experience">
            <MotionDiv
              className="section-head"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              <p className="eyebrow">Experience</p>
              <h2>Places I’ve learned by building.</h2>
            </MotionDiv>

            <div className="experience-list">
              {experiences.map((item, index) => {
                const open = openExperience === index
                return (
                  <MotionArticle
                    className={`experience-item${open ? ' open' : ''}`}
                    key={`${item.company}-${item.role}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.65, delay: Math.min(index, 6) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      type="button"
                      className="experience-summary"
                      aria-expanded={open}
                      data-cursor="hover"
                      data-cursor-label={open ? 'Close' : 'Open'}
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
                    <MotionDiv
                      className="experience-panel"
                      initial={false}
                      animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="experience-panel-inner">
                        {item.place ? <p className="experience-place">{item.place}</p> : null}
                        {item.bullets.length > 0 ? (
                          <ul>
                            {item.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </MotionDiv>
                  </MotionArticle>
                )
              })}
            </div>
          </section>

          <section className="section about" id="about">
            <MotionDiv
              className="about-grid"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="about-photo">
                <img src={portraitUrl} alt="Bruce Moseti" />
              </div>
              <div className="about-copy">
                <p className="eyebrow">About</p>
                <h2>Curious about systems — software, hardware, and how they meet.</h2>
                <p>
                  I’m an Electrical Engineering student at NJIT. I like building tools and experiments that make
                  complex systems easier to understand.
                </p>
                <p>
                  Outside class, I’ve worked across internships in performance engineering, test automation, and research.
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
            </MotionDiv>
          </section>

          <section className="section contact" id="contact">
            <MotionDiv
              className="contact-panel"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="eyebrow">Contact</p>
              <h2>Let’s talk.</h2>
              <p>Open to roles, research, and interesting projects.</p>
              <div className="contact-actions">
                <a className="btn primary" href={emailUrl} data-cursor="hover" data-cursor-label="Email">
                  brucemosetie@gmail.com
                </a>
                <a
                  className="btn ghost"
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-cursor-label="Open"
                >
                  LinkedIn
                </a>
                <a
                  className="btn ghost"
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-cursor-label="Open"
                >
                  GitHub
                </a>
              </div>
            </MotionDiv>
          </section>
        </main>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Bruce Moseti</span>
          <a
            className="footer-live"
            href="https://brucemoseti.github.io/brucemoseti-personal-website/"
            data-cursor="hover"
            data-cursor-label="Live"
          >
            Live site
          </a>
          <span>Crafted with motion, measured with care</span>
        </footer>

        <BruceLLM />
      </div>
    </SmoothScroll>
  )
}
