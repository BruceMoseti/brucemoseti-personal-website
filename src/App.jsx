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
const MotionA = motion.a
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
    role: 'AI simulation',
    year: '2026',
    copy: 'A simulation project exploring physics-informed models and numerical methods.',
    tags: ['Python', 'C++', 'PyTorch'],
    href: 'https://github.com/BruceMoseti/cueai',
    accent: 'cue',
    media: 'video',
  },
  {
    title: 'Rootline',
    role: 'Systems tooling',
    year: '2026',
    copy: 'A project focused on turning scattered signals into clearer operational context.',
    tags: ['Python', 'Systems'],
    href: 'https://github.com/BruceMoseti/rootline',
    accent: 'root',
    media: 'grid',
  },
  {
    title: 'Energy Grid Dashboard',
    role: 'Data visualization',
    year: '2025',
    copy: 'A dashboard for exploring performance trends and usage patterns over time.',
    tags: ['Python', 'Dash'],
    href: 'https://github.com/BruceMoseti/energy-grid-performance-dashboard',
    accent: 'grid',
    media: 'bars',
  },
  {
    title: 'DeepSun',
    role: 'Edge inference',
    year: '2025',
    copy: 'Work on accelerating and profiling GPU inference pipelines for edge systems.',
    tags: ['CUDA', 'PyTorch'],
    href: 'https://github.com/BruceMoseti',
    accent: 'sun',
    media: 'orbit',
  },
]

const experiences = [
  {
    company: 'NVIDIA',
    role: 'Performance Engineering Intern, Edge AI',
    place: 'Santa Clara, CA',
    date: 'May 2026 — Present',
    bullets: [
      'Build tooling for benchmarking and analyzing embedded AI workloads.',
      'Help teams understand latency, throughput, and utilization trends.',
      'Work with engineers to improve real-time inference pipelines.',
    ],
  },
  {
    company: 'NOKIA',
    role: 'Software Engineering Co-op',
    place: 'Allentown, PA',
    date: 'Jun 2021 — Aug 2021',
    bullets: [
      'Automated testing and validation workflows for networking hardware.',
      'Helped improve release validation with reusable frameworks and CI.',
      'Supported root-cause analysis across software and hardware issues.',
    ],
  },
  {
    company: 'NJIT Space Weather Research',
    role: 'AI Research Intern',
    place: 'Newark, NJ',
    date: 'May 2020 — Aug 2020',
    bullets: [
      'Worked on GPU-accelerated computer vision pipelines.',
      'Benchmarked models and measured end-to-end performance.',
      'Compared approaches through experiments and literature.',
    ],
  },
  {
    company: 'CIBM3 Lab',
    role: 'Research Software Engineer Intern',
    place: 'Newark, NJ',
    date: 'May 2020 — Aug 2020',
    bullets: [
      'Built data pipelines and reporting tools for lab systems.',
      'Supported hardware-in-the-loop testing and measurement.',
      'Helped improve embedded firmware reliability.',
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
            </MotionDiv>

            <div className="project-list">
              {projects.map((project, index) => (
                <MotionA
                  className={`project-row accent-${project.accent}`}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  key={project.title}
                  data-cursor="hover"
                  data-cursor-label="View"
                  onMouseEnter={() => setHoveredProject(project.title)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onFocus={() => setHoveredProject(project.title)}
                  onBlur={() => setHoveredProject(null)}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.75, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectMedia project={project} active={hoveredProject === project.title} />
                  <div className="project-content">
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
                  </div>
                </MotionA>
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
                    key={item.company}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.65, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
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
                        <p className="experience-place">{item.place}</p>
                        <ul>
                          {item.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
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
