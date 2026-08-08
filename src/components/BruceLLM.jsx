import { useEffect, useMemo, useRef, useState } from 'react'

const knowledge = [
  {
    keys: ['who', 'about', 'yourself', 'bio'],
    answer: 'I’m Bruce Moseti — an Electrical Engineering student at NJIT who builds software around systems, automation, and applied AI.',
  },
  {
    keys: ['nvidia', 'internship', 'edge', 'work', 'experience'],
    answer: 'I’ve worked across NVIDIA, Nokia, research labs, utilities, and makerspace programs — mostly building, testing, and learning in applied engineering settings.',
  },
  {
    keys: ['nokia'],
    answer: 'At Nokia I’m an Optoelectronics Test Development Co-op in Allentown, PA.',
  },
  {
    keys: ['pseg'],
    answer: 'At PSEG I was a Technical Solutions Intern.',
  },
  {
    keys: ['cibm', 'research assistant'],
    answer: 'At CIBM3 Labs I supported research with datasets, Python analysis workflows, and clear presentations of outcomes.',
  },
  {
    keys: ['project', 'cueai', 'rootline', 'deepsun'],
    answer: 'My projects span simulation, systems tooling, dashboards, and edge inference experiments. Check the Work section for links.',
  },
  {
    keys: ['skill', 'stack', 'tech'],
    answer: 'I work across Python, C++, and web tools, with interest in embedded systems, AI tooling, and automation.',
  },
  {
    keys: ['contact', 'email', 'reach', 'hire', 'linkedin'],
    answer: 'Email brucemosetie@gmail.com, or use LinkedIn and GitHub in the Contact section.',
  },
  {
    keys: ['school', 'njit', 'education'],
    answer: 'I’m studying Electrical Engineering at NJIT.',
  },
]

function replyFor(input) {
  const text = input.toLowerCase()
  const hit = knowledge.find((item) => item.keys.some((key) => text.includes(key)))
  if (hit) return hit.answer
  return 'Ask me about my background, projects, skills, or how to get in touch.'
}

export default function BruceLLM() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi — I’m BruceLLM. Ask about my background, projects, or how to reach me.' },
  ])
  const endRef = useRef(null)
  const suggestions = useMemo(() => ['Who are you?', 'Experience?', 'Projects?', 'How to contact?'], [])

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
          <p>A tiny on-site assistant grounded in my profile.</p>
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
