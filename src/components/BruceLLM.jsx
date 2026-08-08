import { useEffect, useMemo, useRef, useState } from 'react'

const knowledge = [
  {
    keys: ['who', 'about', 'yourself', 'bio'],
    answer: 'I’m Bruce Moseti — an Electrical Engineering student at NJIT and a Performance Engineering Intern on NVIDIA Edge AI. I focus on measuring and improving embedded AI systems.',
  },
  {
    keys: ['nvidia', 'jetson', 'internship', 'edge'],
    answer: 'At NVIDIA I build benchmarking and automation for Jetson platforms, analyzing 200K+ GPU workload runs and profiling CUDA / cuDNN / TensorRT pipelines.',
  },
  {
    keys: ['nokia', 'optical', 'trosa'],
    answer: 'At Nokia I improved test and manufacturing workflows by about 45% with Python, C#, PowerShell automation, and GitLab CI/CD for optical networking validation.',
  },
  {
    keys: ['project', 'cueai', 'rootline', 'deepsun', 'work'],
    answer: 'Selected projects include CueAI (physics-informed simulation), Rootline (incident intelligence), an energy-grid dashboard, and DeepSun (GPU edge inference with ~40% latency reduction).',
  },
  {
    keys: ['skill', 'stack', 'cuda', 'python', 'tech'],
    answer: 'Core stack: Python, C++, CUDA, TensorRT, PyTorch, embedded systems, React/TypeScript, and data tooling for dashboards and automation.',
  },
  {
    keys: ['contact', 'email', 'reach', 'hire'],
    answer: 'Email brucemosetie@gmail.com — or use LinkedIn / GitHub from the Contact section. Happy to talk Edge AI, embedded systems, and performance tooling.',
  },
  {
    keys: ['school', 'njit', 'education'],
    answer: 'I’m pursuing a B.S. in Electrical Engineering at NJIT (expected June 2028) and have been on the Dean’s List for Fall 2025, Spring 2025, and Spring 2026.',
  },
]

function replyFor(input) {
  const text = input.toLowerCase()
  const hit = knowledge.find((item) => item.keys.some((key) => text.includes(key)))
  if (hit) return hit.answer
  return 'Ask me about NVIDIA work, projects like CueAI, skills, school, or how to get in touch.'
}

export default function BruceLLM() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi — I’m BruceLLM. Ask about my experience, projects, or stack.' },
  ])
  const endRef = useRef(null)
  const suggestions = useMemo(() => ['Who are you?', 'NVIDIA work?', 'Best projects?', 'How to contact?'], [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = (value) => {
    const trimmed = value.trim()
    if (!trimmed) return
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: trimmed },
      { role: 'assistant', text: replyFor(trimmed) },
    ])
    setInput('')
  }

  return (
    <div className={`bruce-llm${open ? ' open' : ''}`}>
      <button
        type="button"
        className="llm-toggle"
        data-cursor="hover"
        aria-expanded={open}
        aria-controls="bruce-llm-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="llm-pulse" aria-hidden="true" />
        {open ? 'Close' : 'BruceLLM'}
      </button>

      <aside id="bruce-llm-panel" className="llm-panel" aria-label="BruceLLM assistant">
        <header>
          <div>
            <p className="llm-kicker">Easter egg</p>
            <h2>BruceLLM</h2>
          </div>
          <p>A tiny on-site assistant grounded in my resume.</p>
        </header>

        <div className="llm-thread" role="log" aria-live="polite">
          {messages.map((message, index) => (
            <div className={`llm-bubble ${message.role}`} key={`${message.role}-${index}`}>
              {message.text}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="llm-suggestions">
          {suggestions.map((item) => (
            <button type="button" key={item} data-cursor="hover" onClick={() => send(item)}>
              {item}
            </button>
          ))}
        </div>

        <form
          className="llm-form"
          onSubmit={(event) => {
            event.preventDefault()
            send(input)
          }}
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask something…"
            aria-label="Ask BruceLLM"
          />
          <button type="submit" data-cursor="hover">Send</button>
        </form>
      </aside>
    </div>
  )
}
