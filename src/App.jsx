import { createElement, useMemo, useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  Contact,
  Cpu,
  Database,
  Factory,
  FileText,
  Gauge,
  GitBranch,
  GraduationCap,
  Link,
  Mail,
  MapPin,
  Moon,
  Sun,
  Terminal,
  Workflow,
  Wrench,
} from 'lucide-react'
import avatarArt from './assets/mainm2.jpeg'
import cardArt from './assets/card.png'
import heroArt from './assets/hero.png'
import './App.css'

const resumeUrl = `${import.meta.env.BASE_URL}Bruce_Moseti_Resume.pdf`

const links = [
  { label: 'Email', href: 'mailto:brucemosetie@gmail.com', icon: Mail },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/brucemoseti', icon: Contact },
  { label: 'GitHub', href: 'https://github.com/BruceMoseti', icon: GitBranch },
]

const profileChips = ['NVIDIA Edge AI', 'NJIT EE', 'CUDA / TensorRT', 'Mechatronics']

const profileStats = [
  { value: '200K+', label: 'GPU workload runs analyzed' },
  { value: '45%', label: 'workflow efficiency lift' },
  { value: '40%', label: 'inference latency reduction' },
  { value: '2028', label: 'B.S. Electrical Engineering' },
]

const navItems = [
  ['About', '#about'],
  ['Experience', '#experience'],
  ['Projects', '#projects'],
  ['Skills', '#skills'],
  ['Contact', '#contact'],
]

const aboutBullets = [
  'Electrical Engineering student at New Jersey Institute of Technology, expected June 2028.',
  'Performance Engineering Intern on NVIDIA Edge AI, focused on Jetson benchmarking, automation, and inference profiling.',
  'Experience across GPU acceleration, embedded systems, optical manufacturing test automation, energy dashboards, and mechatronics training.',
  'I care about engineering telemetry: making latency, throughput, memory, and hardware behavior visible enough to improve.',
]

const experiences = [
  {
    company: 'NVIDIA',
    role: 'Performance Engineering Intern, Edge AI',
    location: 'Santa Clara, CA',
    date: 'May 2026 - Present',
    icon: Cpu,
    summary: 'Benchmarking and profiling embedded AI workloads on Jetson platforms.',
    stack: ['Python', 'CUDA', 'cuDNN', 'TensorRT', 'Jetson'],
    bullets: [
      'Developed Python benchmarking and automation tools for NVIDIA Jetson embedded AI platforms across 200,000+ GPU workload runs.',
      'Automated latency, throughput, memory, and GPU utilization analysis to accelerate performance regression detection.',
      'Profiled CUDA, cuDNN, and TensorRT inference pipelines to identify bottlenecks in real-time AI workloads.',
    ],
  },
  {
    company: 'NOKIA',
    role: 'Software Engineering: Test Development Co-op',
    location: 'Allentown, PA',
    date: 'Jun 2021 - Aug 2021',
    icon: Wrench,
    summary: 'Built automation and validation workflows for optical networking manufacturing tests.',
    stack: ['Python', 'C#', 'PowerShell', 'GitLab CI/CD', 'TROSA'],
    bullets: [
      'Improved engineering workflow efficiency by 45% with Python, C#, and PowerShell automation for TROSA validation.',
      'Designed reusable testing frameworks and GitLab CI/CD pipelines for optical networking system validation.',
      'Analyzed manufacturing and test datasets to support root-cause analysis across hardware-software issues.',
    ],
  },
  {
    company: 'NJIT Space Weather Research',
    role: 'AI Research Intern',
    location: 'Newark, NJ',
    date: 'May 2020 - Aug 2020',
    icon: Code2,
    summary: 'Applied GPU acceleration to computer vision and space-weather research workloads.',
    stack: ['Python', 'CUDA', 'PyTorch', 'DeepStream', 'Computer Vision'],
    bullets: [
      'Engineered GPU-accelerated computer vision pipelines with Python, CUDA, PyTorch, and NVIDIA DeepStream.',
      'Reduced real-time inference latency by approximately 40% through benchmarking and deployment optimization.',
      'Used research literature, LLMs, and experimental benchmarking to compare deep learning approaches.',
    ],
  },
  {
    company: 'CIBM3 Lab',
    role: 'Research Software Engineer Intern',
    location: 'Newark, NJ',
    date: 'May 2020 - Aug 2020',
    icon: BriefcaseBusiness,
    summary: 'Developed data and embedded-firmware tooling for research instrumentation.',
    stack: ['Python', 'SQL', 'Dashboards', 'Firmware', 'HIL Testing'],
    bullets: [
      'Built Python and SQL pipelines that automated infrastructure reporting and dashboard updates.',
      'Ran hardware-in-the-loop tests to reproduce power disturbances and measure system response under fault conditions.',
      'Implemented ADC moving-average filtering and debounce logic to reduce false embedded-system triggers.',
    ],
  },
]

const projects = [
  {
    title: 'CueAI',
    meta: 'Physics-informed AI billiards simulation',
    date: '2026',
    type: 'AI simulation',
    href: 'https://github.com/BruceMoseti/cueai',
    tags: ['Python', 'C++', 'PyTorch', 'NumPy'],
    copy: 'Built a predictive simulation platform using numerical methods, statistical analysis, and reusable object-oriented software.',
  },
  {
    title: 'Rootline',
    meta: 'Live incident intelligence',
    date: '2026',
    type: 'Systems tool',
    href: 'https://github.com/BruceMoseti/rootline',
    tags: ['Python', 'Evidence', 'Systems'],
    copy: 'A grounded incident-intelligence project focused on turning scattered signals into usable operational context.',
  },
  {
    title: 'Energy Grid Performance Dashboard',
    meta: 'Time-series analytics dashboard',
    date: '2025',
    type: 'Data product',
    href: 'https://github.com/BruceMoseti/energy-grid-performance-dashboard',
    tags: ['Python', 'Plotly Dash', 'Analytics'],
    copy: 'Visualizes grid performance, outage patterns, and usage anomalies with practical dashboard workflows.',
  },
  {
    title: 'Advanced Manufacturing and Mechatronics',
    meta: 'NJIT Makerspace training program',
    date: '2025',
    type: 'Training archive',
    href: 'https://github.com/BruceMoseti/NJIT-Makerspace-Advanced-Manufacturing-and-Mechatronics-Training-Program',
    tags: ['Mechatronics', 'Manufacturing', 'Documentation'],
    copy: 'Documents manufacturing and mechatronics training work across shop, automation, and engineering fundamentals.',
  },
  {
    title: 'DeepSun',
    meta: 'GPU-accelerated edge AI inference',
    date: '2025',
    type: 'Research system',
    href: 'https://github.com/BruceMoseti',
    tags: ['CUDA', 'PyTorch', 'DeepStream'],
    copy: 'Optimized GPU-accelerated inference and reduced real-time latency by approximately 40% through profiling.',
  },
  {
    title: 'AI Imaging Analysis',
    meta: 'Biomedical machine learning tools',
    date: '2025',
    type: 'Research tooling',
    href: 'https://github.com/BruceMoseti',
    tags: ['OpenCV', 'ML', 'Python'],
    copy: 'Processed traumatic brain injury imaging datasets and evaluated predictive model performance.',
  },
]

const skillGroups = [
  ['Languages', ['C++', 'Java', 'Python', 'R', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'SQL', 'Erlang'], Terminal],
  ['AI and Systems', ['CUDA', 'cuDNN', 'PyTorch', 'TensorFlow', 'NVIDIA DeepStream', 'Embedded Systems'], Gauge],
  ['Web and Backend', ['React.js', 'Node.js', 'Next.js', 'Express.js', 'Django', 'Flask', 'GraphQL', 'REST APIs'], Workflow],
  ['Tools and Data', ['Git', 'Docker', 'Jenkins', 'MongoDB', 'MySQL', 'Tableau', 'Power BI', 'AWS'], Database],
]

function NameMark() {
  return (
    <svg className="name-mark" viewBox="0 0 330 158" role="img" aria-label="Bruce Moseti">
      <defs>
        <pattern id="dot-grid" patternUnits="userSpaceOnUse" width="18" height="18">
          <circle cx="9" cy="9" r="1.2" />
        </pattern>
      </defs>
      <ellipse className="name-dots" cx="166" cy="78" rx="158" ry="62" transform="rotate(7 166 78)" />
      <ellipse className="name-ring" cx="166" cy="78" rx="142" ry="42" transform="rotate(-10 166 78)" />
      <path className="sparkle sparkle-one" d="M275 28l5 14 14 5-14 5-5 14-5-14-14-5 14-5z" />
      <path className="sparkle sparkle-two" d="M64 116l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" />
      <g transform="rotate(-4 165 82)">
        <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" className="name-shadow">
          Bruce
        </text>
        <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" className="name-stroke">
          Bruce
        </text>
        <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" className="name-fill">
          Bruce
        </text>
        <text x="50%" y="81%" textAnchor="middle" dominantBaseline="middle" className="name-small">
          Moseti
        </text>
      </g>
    </svg>
  )
}

function IconLink({ href, label, icon }) {
  return (
    <a className="icon-link" href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer" aria-label={label}>
      {createElement(icon, { size: 20, strokeWidth: 1.9 })}
      <span>{label}</span>
    </a>
  )
}

function Section({ id, title, kicker, note, children }) {
  return (
    <section id={id} className="section-block">
      <div className="section-heading">
        <span>{kicker}</span>
        <h2>{title}</h2>
      </div>
      {note ? <p className="section-note">{note}</p> : null}
      <div className="rule" />
      {children}
    </section>
  )
}

function ExperienceItem({ item, open }) {
  return (
    <details className="experience-item" defaultOpen={open}>
      <summary>
        <span className="experience-icon">
          {createElement(item.icon, { size: 20 })}
        </span>
        <span className="experience-copy">
          <span className="experience-title">
            <strong>{item.company}</strong>
            <ChevronRight size={16} />
          </span>
          <span>{item.role}</span>
          <span className="experience-summary">{item.summary}</span>
          <span className="experience-place">
            <MapPin size={13} />
            {item.location}
          </span>
        </span>
        <time>{item.date}</time>
      </summary>
      <ul>
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <div className="experience-stack">
        {item.stack.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
    </details>
  )
}

function ProjectCard({ project, index }) {
  return (
    <a className={`project-card${index < 2 ? ' featured' : ''}`} href={project.href} target="_blank" rel="noreferrer">
      <span className="project-topline">
        <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
        <span>{project.date}</span>
      </span>
      <span className="project-meta">{project.type}</span>
      <h3>{project.title}</h3>
      <span className="project-subtitle">{project.meta}</span>
      <p>{project.copy}</p>
      <span className="tag-row">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </span>
      <span className="project-action">
        View project
        <ArrowUpRight size={14} />
      </span>
    </a>
  )
}

export default function App() {
  const [isDark, setIsDark] = useState(true)
  const themeLabel = isDark ? 'light' : 'dark'

  const themeClass = useMemo(() => (isDark ? 'theme-dark' : 'theme-light'), [isDark])

  return (
    <div className={`portfolio ${themeClass}`}>
      <a className="skip-link" href="#content">Skip to content</a>
      <aside className="intro-panel">
        <button className="theme-toggle" type="button" onClick={() => setIsDark((value) => !value)} aria-label={`Switch to ${themeLabel} mode`}>
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="intro-top">
          <NameMark />
          <p className="intro-kicker">Electrical Engineering @ NJIT</p>
          <div className="profile-chip-row" aria-label="Portfolio focus areas">
            {profileChips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
          <p className="intro-copy">
            Performance engineering, embedded AI, and automation work for teams that need cleaner measurements and faster iteration.
          </p>

          <div className="link-row">
            {links.map((link) => (
              <IconLink key={link.label} {...link} />
            ))}
          </div>

          <nav className="nav-list" aria-label="Main sections">
            {navItems.map(([label, href]) => (
              <a key={label} href={href}>{label}</a>
            ))}
          </nav>
        </div>

        <div className="avatar-stage">
          <div className="speech-bubble">Edge AI, mechatronics, automation, and systems work.</div>
          <div className="avatar-frame">
            <img src={avatarArt} alt="Stylized avatar artwork" />
          </div>
          <img className="floating-card" src={cardArt} alt="" aria-hidden="true" />
        </div>

        <p className="built-note">
          Built by <strong>Bruce Moseti</strong>
        </p>
      </aside>

      <main className="content-panel" id="content">
        <section className="hero-section" id="home">
          <div className="hero-photo">
            <img src={avatarArt} alt="Stylized avatar artwork" />
          </div>
          <div>
            <div className="status-row">
              <span>
                <Activity size={14} />
                Available for engineering roles
              </span>
              <span>
                <Factory size={14} />
                Mechatronics + manufacturing
              </span>
            </div>
            <p className="eyebrow">Portfolio / Edge AI / Embedded systems</p>
            <h1>Hi, I&apos;m Bruce.</h1>
            <p className="lead">
              I turn hardware and AI performance problems into measurable systems: benchmarks, dashboards, test automation, and
              pipelines that make engineering decisions clearer.
            </p>
            <div className="metric-grid" aria-label="Selected outcomes">
              {profileStats.map((stat) => (
                <div className="metric-card" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="hero-actions">
              <a className="button-link" href={resumeUrl} target="_blank" rel="noreferrer">
                <FileText size={17} />
                Resume
              </a>
              <a className="button-link" href="https://github.com/BruceMoseti" target="_blank" rel="noreferrer">
                <GitBranch size={17} />
                GitHub
              </a>
              <a className="button-link primary" href="mailto:brucemosetie@gmail.com">
                <Mail size={17} />
                Contact
              </a>
            </div>
          </div>
        </section>

        <Section
          id="about"
          title="About Me"
          kicker="01"
          note="A practical engineering profile: software enough to automate, hardware enough to measure, and research enough to test assumptions."
        >
          <ul className="about-list">
            {aboutBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section
          id="experience"
          title="Experience"
          kicker="02"
          note="Concise resume-style entries with expandable details so the page stays scannable."
        >
          <div className="experience-list">
            {experiences.map((item, index) => (
              <ExperienceItem key={item.company} item={item} open={index < 2} />
            ))}
          </div>
        </Section>

        <Section id="education" title="Education" kicker="03" note="Academic foundation in electrical engineering, embedded systems, software, and applied math.">
          <div className="education-card">
            <span className="education-icon">
              <GraduationCap size={22} />
            </span>
            <div>
              <h3>New Jersey Institute of Technology</h3>
              <p>Bachelor of Science in Electrical Engineering, expected June 2028.</p>
              <p>Dean&apos;s List: Fall 2025, Spring 2025, Spring 2026.</p>
              <p>Coursework includes Data Structures and Algorithms, Object-Oriented Programming, Probability and Statistics, Linear Algebra, Computer Architecture, Digital Logic Design, Embedded Systems, and Microprocessors.</p>
              <div className="cert-row">
                {['OSHA 30', 'STEM Academy Success', 'Mechatronics Training Program', 'AWS Certified Developer'].map((cert) => (
                  <span key={cert}>{cert}</span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="projects" title="Projects" kicker="04" note="Selected work with a bias toward systems that can be measured, debugged, or used by engineers.">
          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills" kicker="05" note="A compact stack view for recruiters and engineers scanning for fit.">
          <div className="skills-layout">
            <div className="skills-art">
              <img src={heroArt} alt="" aria-hidden="true" />
            </div>
            <div className="skill-groups">
              {skillGroups.map(([group, skills, icon]) => (
                <div className="skill-group" key={group}>
                  <h3>
                    {createElement(icon, { size: 16 })}
                    {group}
                  </h3>
                  <div className="tag-row">
                    {skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="contact" title="Contact" kicker="06" note="The cleanest next step is a short note with the role, team, or project context.">
          <div className="contact-card">
            <div className="contact-heading">
              <span>
                <BadgeCheck size={17} />
                Open to internships, research, and engineering projects
              </span>
            </div>
            <p>
              Based in California and connected to NJIT. Open to engineering, AI performance, embedded systems, and research opportunities.
            </p>
            <div className="contact-actions">
              <a className="contact-button" href="mailto:brucemosetie@gmail.com">
                <Mail size={17} />
                brucemosetie@gmail.com
              </a>
              <a className="contact-button" href="tel:+19083481138">
                <MapPin size={17} />
                (908) 348-1138
              </a>
              <a className="contact-button" href="https://github.com/BruceMoseti" target="_blank" rel="noreferrer">
                <Link size={17} />
                github.com/BruceMoseti
              </a>
            </div>
          </div>
        </Section>
      </main>
    </div>
  )
}
