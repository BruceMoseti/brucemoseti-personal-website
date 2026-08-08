import { useEffect, useRef, useState } from 'react'
import { useIsTouchDevice, usePrefersReducedMotion } from '../hooks/useMotionPrefs'

export default function CustomCursor() {
  const reduced = usePrefersReducedMotion()
  const touch = useIsTouchDevice()
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const raf = useRef(0)
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState('default')
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (reduced || touch) return undefined

    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (event) => {
      pos.current.x = event.clientX
      pos.current.y = event.clientY
      setVisible(true)
    }

    const onLeave = () => setVisible(false)

    const onOver = (event) => {
      const target = event.target.closest('[data-cursor]')
      if (!target) {
        setMode('default')
        setLabel('')
        return
      }
      const next = target.getAttribute('data-cursor') || 'hover'
      setMode(next)
      setLabel(target.getAttribute('data-cursor-label') || '')
    }

    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18
      ring.current.y += (pos.current.y - ring.current.y) * 0.18

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`
      }
      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    raf.current = requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [reduced, touch])

  if (reduced || touch) return null

  return (
    <div className={`cursor-root${visible ? ' is-visible' : ''} mode-${mode}`} aria-hidden="true">
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className={`cursor-label${label ? ' show' : ''}`} ref={labelRef}>
        {label}
      </div>
    </div>
  )
}
