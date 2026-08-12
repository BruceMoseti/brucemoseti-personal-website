import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import SmoothScroll from './components/SmoothScroll'
import Preloader from './components/Preloader'
import Magnetic from './components/Magnetic'
import BruceLLM from './components/BruceLLM'
import './App.css'

const MotionDiv = motion.div
const MotionP = motion.p
const MotionH1 = motion.h1
const MotionArticle = motion.article

const portraitUrl = `${import.meta.env.BASE_URL}bruce.png`
const linkedInUrl = 'https://www.linkedin.com/in/bruce-moseti-9553172a9/'
const githubUrl = 'https://github.com/BruceMoseti'
const emailUrl = 'mailto:brucemosetie@gmail.com'
const siteUrl = 'https://brucemoseti.github.io/brucemoseti-personal-website/'

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const shot = (file) => `${import.meta.env.BASE_URL}projects/${file}`

const projects = [
  {
    title: 'ContextForge',
    tagline: 'RAG over your own documents, with answers that cite their source',
    year: '2026',
    image: shot('contextforge.webp'),
    stack: ['Python', 'FastAPI', 'Next.js', 'Postgres + pgvector', 'Celery', 'TypeScript'],
    summary:
      'ContextForge lets you ask questions about your own documents and get answers that point back to the exact sentence they came from. I built it because most document tools give you an answer with no way to check it.',
    theProject:
      'Upload a PDF and it gets parsed, split along its own structure, embedded, and indexed. When you ask a question, retrieval finds candidate passages, a reranker orders them, and the answer is written only from those passages — with citations that resolve to precise offsets, so clicking one highlights the source instead of making you search for it. The whole stack runs offline by default.',
    technical: [
      'FastAPI service with Celery workers for ingestion and retrieval',
      'Postgres with pgvector for embeddings and hybrid search',
      'Reranking stage to order candidate passages before answering',
      'Next.js reader that highlights cited spans in the original document',
      'Labelled evaluation set behind the published numbers',
    ],
    thoughts:
      'The interesting engineering here wasn’t the model — it was everything around it. Chunking documents along their real structure, keeping character offsets intact through the whole pipeline, and reporting what ingestion actually did instead of showing a spinner. I wanted a system where a skeptical reader could always check the work.',
    links: [{ label: 'Github Repo', href: 'https://github.com/BruceMoseti/contextforge' }],
    accent: 'cue',
    media: 'grid',
  },
  {
    title: 'CutoutML',
    tagline: 'Background removal served as a job queue, with benchmarks behind every claim',
    year: '2026',
    image: shot('cutoutml.webp'),
    stack: ['Python', 'FastAPI', 'Celery', 'PyTorch', 'ONNX Runtime', 'TensorRT'],
    summary:
      'CutoutML is an image and video background removal service built the way a real inference system has to be built: an API in front, model workers behind it, and a benchmark harness that measures every performance claim.',
    theProject:
      'A FastAPI control plane accepts jobs and hands them to Celery workers that keep models resident in memory. A pluggable model registry spans PyTorch, ONNX Runtime, and TensorRT so the same job can run on different backends. The web studio compares a cutout against its original and shows the job’s own record — device, precision, resolution, and wall clock.',
    technical: [
      'FastAPI control plane with a Celery job queue',
      'Model registry spanning PyTorch, ONNX Runtime, and TensorRT',
      'Alpha-matting output rather than hard binary masks',
      'Benchmark harness that generates every number in the docs',
      'Docker Compose setup with a CPU path that needs no GPU',
    ],
    thoughts:
      'I wanted to find out what it actually takes to put a segmentation model behind an HTTP API and have it survive contact with reality. The model turned out to be the easy part. Queueing, memory, precision, and honest measurement were where the real work was, and building the benchmark harness first kept me from fooling myself.',
    links: [{ label: 'Github Repo', href: 'https://github.com/BruceMoseti/cutout-ml' }],
    accent: 'sun',
    media: 'bars',
  },
  {
    title: 'ForgeIDE',
    tagline: 'A collaborative cloud IDE that runs your project in the browser',
    year: '2026',
    image: shot('forgeide.webp'),
    stack: ['TypeScript', 'Next.js', 'Monaco', 'Yjs CRDT', 'WebSockets', 'Fastify'],
    summary:
      'ForgeIDE is a real-time collaborative development environment. Several people open the same project, type in the same file, and see each other’s cursors — then press Run and the project builds and serves itself without any of their code executing on a server.',
    theProject:
      'Editing is synchronised with CRDTs over WebSockets, so concurrent edits converge without a central authority resolving conflicts. The run path uses an in-browser runtime, which keeps arbitrary user code off the backend entirely. I measured end-to-end propagation latency as the number of clients in a room grew, and verified that every session converged to identical document state.',
    technical: [
      'Monaco editor synchronised with Yjs CRDTs over WebSockets',
      'Fastify collaboration server with presence and room state',
      'In-browser runtime so project code never runs on the server',
      'Next.js front end in strict TypeScript',
      'Latency benchmarks across increasing room sizes',
    ],
    thoughts:
      'Collaborative editing looks simple until two people type in the same spot. CRDTs were the fun part to learn, but the harder question was the security model: letting people run code without letting them run code on my machine. Moving execution into the browser answered that, and it changed how I think about where trust boundaries belong.',
    links: [{ label: 'Github Repo', href: 'https://github.com/BruceMoseti/forge-ide' }],
    accent: 'root',
    media: 'grid',
  },
  {
    title: 'Rootline',
    tagline: 'Live incident intelligence, grounded in evidence',
    year: '2026',
    image: shot('rootline.webp'),
    stack: ['Python', 'React', 'TypeScript', 'Cloudflare Workers'],
    summary:
      'Rootline turns scattered operational signals into clear incident context. When something breaks, people shouldn’t have to dig through noise to find what actually matters.',
    theProject:
      'The system correlates telemetry with deployments, ranks suspect commits, and keeps every conclusion attached to the evidence behind it. Actions like rollback are gated rather than automatic, and the public demo runs against a synthetic fixture so nothing real is exposed.',
    technical: [
      'Python incident engine for correlation and ranking',
      'Evidence-oriented data model so claims stay traceable',
      'React and TypeScript operations workspace',
      'Credential-free public demo gateway over Cloudflare Workers',
      'Guarded actions rather than automatic remediation',
    ],
    thoughts:
      'This project sits between engineering and communication. Good tooling isn’t about collecting more data — it’s about helping someone understand what’s happening while they’re under pressure. I kept coming back to one rule: never show a conclusion without showing why.',
    links: [{ label: 'Github Repo', href: 'https://github.com/BruceMoseti/rootline' }],
    accent: 'root',
    media: 'grid',
  },
  {
    title: 'ParcelProof',
    tagline: 'What on-chain provenance actually costs',
    year: '2026',
    image: shot('parcelproof.webp'),
    stack: ['Solidity', 'Foundry', 'Python', 'Merkle proofs', 'EVM'],
    summary:
      'ParcelProof is a tamper-evident parcel custody ledger and, more importantly, a measurement of what it costs to run one. Cost is the real reason logistics operators don’t put custody records on-chain, so I set out to measure the curve.',
    theProject:
      'Custody events stay in an ordinary database; only the Merkle root of each batch goes on-chain. That means an operator with full write access to the database still can’t alter a delivery record without invalidating its inclusion proof. On top of that, a deterministic benchmark compares anchoring strategies on cost per event against settlement latency.',
    technical: [
      'Solidity contracts with Merkle batch anchoring, tested with Foundry',
      'Python benchmark harness measuring gas from real transaction receipts',
      'Cost and latency frontier across anchoring batch sizes',
      'Fully reproducible results, re-measured in CI on every push',
      'Pricing assumptions recorded alongside every dollar figure',
    ],
    thoughts:
      'I liked that this project had a question rather than just a feature list. Gas on the EVM is deterministic, so the measurements reproduce byte for byte — which meant I could wire CI to fail if a single number moved. Building something where the results defend themselves changed how I approach benchmarking generally.',
    links: [{ label: 'Github Repo', href: 'https://github.com/BruceMoseti/parcelproof' }],
    accent: 'grid',
    media: 'bars',
  },
  {
    title: 'Limit Order Book Simulator',
    tagline: 'A market making backtester built on a real matching engine',
    year: '2026',
    image: shot('lobsim.webp'),
    stack: ['Python', 'NumPy', 'Discrete-event simulation', 'Monte Carlo'],
    summary:
      'A discrete-event limit order book simulator with a price-time priority matching engine, stochastic order flow, and a Monte Carlo framework that evaluates market making strategies statistically rather than anecdotally.',
    theProject:
      'The question was simple to ask and hard to answer: under what combinations of quoted spread, volatility, and order flow imbalance does a simple market making strategy stay profitable? The framework runs 32,400 simulations across 27 market regimes with hundreds of independent seeds each, so strategy comparisons are paired on identical conditions.',
    technical: [
      'Price-time priority matching engine with Poisson order arrivals',
      'Three market making strategies, including inventory-aware quoting',
      'Monte Carlo sweeps across spread, volatility, and imbalance regimes',
      'Paired statistical comparison on shared random seeds',
      'Every published figure regenerated from scripts',
    ],
    thoughts:
      'The most useful result was the least flattering one: a naive quoter that earns the spread on every round trip still loses money most of the time. Seeing that fall out of the simulation rather than reading it in a textbook made the underlying market microstructure ideas finally click for me.',
    links: [{ label: 'Github Repo', href: 'https://github.com/BruceMoseti/lob-simulator' }],
    accent: 'grid',
    media: 'bars',
  },
  {
    title: 'firstpass',
    tagline: 'Job search and resume tailoring that runs entirely in your browser',
    year: '2026',
    image: shot('firstpass.webp'),
    stack: ['TypeScript', 'Client-side crypto', 'Static hosting'],
    summary:
      'firstpass finds roles, tailors a resume against a specific posting, and gets it ready to send. It’s built so that your profile never leaves your machine — the whole app runs client-side and the hosted copy stores nothing.',
    theProject:
      'You keep one master profile with every bullet you might ever use, and the tool selects and weighs them per job. It scores the result against the posting’s terms, tells you which requirements genuinely aren’t covered, and refuses to paper over real gaps. The profile is encrypted in the browser and unlocked with a passphrase.',
    technical: [
      'Fully client-side app — no backend behind the hosted page',
      'Passphrase-derived encryption for the stored profile',
      'Posting term extraction and coverage scoring',
      'Single-column, parser-friendly resume output',
      'Deployed as a static build on GitHub Pages',
    ],
    thoughts:
      'Applying for roles taught me the same tedious lesson over and over: the tailoring matters, and doing it by hand is slow. I also didn’t want to hand my whole employment history to someone else’s server to solve that, so the constraint of keeping everything local shaped most of the design.',
    links: [{ label: 'Try it Out', href: 'https://brucemoseti.github.io/firstpass-app/' }],
    accent: 'cue',
    media: 'grid',
  },
  {
    title: 'resume-lock',
    tagline: 'One resume format, tailored words, scored against the posting',
    year: '2026',
    image: shot('resumelock.webp'),
    stack: ['TypeScript', 'Browser-local storage', 'Static hosting'],
    summary:
      'resume-lock keeps the layout fixed and changes only the words inside it. You get an ATS-style score against a specific posting, plus an explanation of every deduction and what to do about it.',
    theProject:
      'The app weighs your resume against the terms in a posting, breaks the score into keywords, parseability, impact, and fit, and lists the requirements your profile genuinely doesn’t mention. Locking the layout is the point: it stays single-column and selectable so parsers can read it, no matter what the content becomes.',
    technical: [
      'Deterministic scoring across keywords, parseability, impact, and fit',
      'Findings view that explains each deduction',
      'Fixed single-column PDF output built for resume parsers',
      'All data kept in the browser',
      'Static deployment with no server component',
    ],
    thoughts:
      'Most resume tools either restyle your document or quietly rewrite your history. I wanted the opposite: leave the structure alone, be honest about gaps, and show the arithmetic behind the score so it’s something you can argue with.',
    links: [{ label: 'Try it Out', href: 'https://brucemoseti.github.io/resume-lock-app/' }],
    accent: 'root',
    media: 'grid',
  },
  {
    title: 'Locked In',
    tagline: 'A day planner that schedules with rules you can argue with',
    year: '2026',
    image: shot('lockedin.webp'),
    stack: ['JavaScript', 'HTML', 'Offline-first', 'Single-file app'],
    summary:
      'Locked In takes a messy list of to-dos and lays out the day using human assumptions about when work actually gets done — then holds you to the plan. No sign-up, no install, no backend.',
    theProject:
      'Parsing your list can be model-assisted, but placement never is: every block is decided in ordinary code and carries a reason you can read, like “post-lunch dip — low-focus work while attention is lowest.” Lock a block and it becomes immovable. Start a timer and finishing records what the task actually took, which is the only honest input a re-plan has.',
    technical: [
      'Deterministic, rule-based scheduler rather than model-generated plans',
      'Explicit constraints: protected lunch, morning deep work, capped focus blocks',
      'Re-plan from now, routing around locked and completed blocks',
      'Runs entirely offline from a single HTML file',
      'Deployed on GitHub Pages',
    ],
    thoughts:
      'A language model is good at reading a messy to-do list and bad at scheduling, because scheduling is constraint satisfaction and the same input should produce the same day every time. Splitting those two jobs apart is the whole idea behind this project, and it made the result something I actually trust.',
    links: [{ label: 'Try it Out', href: 'https://brucemoseti.github.io/locked-in/' }],
    accent: 'sun',
    media: 'orbit',
  },
  {
    title: 'CueAI',
    tagline: 'A physics-informed AI billiards simulation',
    year: '2026',
    image: null,
    stack: ['Python', 'C++', 'PyTorch', 'ONNX', 'PyQt', 'NumPy'],
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
    media: 'orbit',
  },
  {
    title: 'Energy Grid Dashboard',
    tagline: 'A dashboard for grid performance and usage patterns',
    year: '2025',
    image: null,
    stack: ['Python', 'Plotly Dash', 'Pandas', 'Time-series analytics'],
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
    image: null,
    stack: ['Python', 'GPU profiling', 'Imaging analysis', 'Reporting'],
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
    links: [{ label: 'Github Profile', href: 'https://github.com/BruceMoseti' }],
    accent: 'sun',
    media: 'orbit',
  },
  {
    title: 'Personal Website',
    tagline: 'What you’re looking at right now',
    year: '2026',
    image: shot('website.webp'),
    stack: ['React', 'Vite', 'Framer Motion', 'Lenis', 'GitHub Pages'],
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
      { label: 'Live Site', href: siteUrl },
    ],
    accent: 'cue',
    media: 'orbit',
  },
  {
    title: 'Solar Energy Irrigation System',
    tagline: 'Sensors, control logic, and performance data for irrigation automation',
    year: '2024',
    image: shot('solar.webp'),
    stack: ['Raspberry Pi', 'Sensors', 'Python', 'AutoCAD'],
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
    image: shot('makerspace.webp'),
    stack: ['Hardware prototyping', 'Electronics', 'PLC', 'Sensor integration'],
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
    date: 'Sep 2025 — Apr 2026',
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
  if (project.image) {
    return (
      <div className={`project-media type-shot tone-${project.accent}${active ? ' active' : ''}`}>
        <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" decoding="async" />
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
      <span className="media-wordmark">{project.title}</span>
    </div>
  )
}

function ProjectCard({ project, index, hovered, onHover }) {
  const [open, setOpen] = useState(false)
  const panelId = `project-details-${index}`

  return (
    <MotionArticle
      className={`project-card accent-${project.accent}${open ? ' is-open' : ''}`}
      onMouseEnter={() => onHover(project.title)}
      onMouseLeave={() => onHover(null)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <ProjectMedia project={project} active={hovered || open} />
      <div className="project-content">
        <div className="project-body">
          <div className="project-title-row">
            <h3>{project.title}</h3>
            <span className="project-year">{project.year}</span>
          </div>
          <p className="project-role">{project.tagline}</p>
          <p className="project-summary">{project.summary}</p>

          <ul className="stack-list">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

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
            </div>
          </MotionDiv>

          <div className="project-actions">
            <button
              type="button"
              className="btn small primary"
              aria-expanded={open}
              aria-controls={panelId}
              data-cursor="hover"
              data-cursor-label={open ? 'Close' : 'More'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? 'Show Less' : 'Show More'}
            </button>
            {project.links?.map((link) => (
              <a
                key={`${link.label}-${link.href}`}
                className="btn small ghost"
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
            href={siteUrl}
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
