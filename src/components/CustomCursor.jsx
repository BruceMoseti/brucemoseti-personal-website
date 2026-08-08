import { useEffect, useRef } from 'react'
import { useIsTouchDevice, usePrefersReducedMotion } from '../hooks/useMotionPrefs'

export default function CustomCursor() {
  const reduced = usePrefersReducedMotion()
  const touch = useIsTouchDevice()
  const rootRef = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const raf = useRef(0)
  const running = useRef(false)
  const visible = useRef(false)
  const mode = useRef('default')
  const label = useRef('')

  useEffect(() => {
    if (reduced || touch) return undefined

    const root = rootRef.current
    const dot = dotRef.current
    const ringEl = ringRef.current
    const labelEl = labelRef.current
    if (!root || !dot || !ringEl || !labelEl) return undefined

    document.documentElement.classList.add('has-custom-cursor')

    const setVisible = (next) => {
      if (visible.current === next) return
      visible.current = next
      root.classList.toggle('is-visible', next)
    }

    const setMode = (nextMode, nextLabel) => {
      if (mode.current !== nextMode) {
        root.classList.remove(`mode-${mode.current}`)
        mode.current = nextMode
        root.classList.add(`mode-${nextMode}`)
      }

      if (label.current !== nextLabel) {
        label.current = nextLabel
        labelEl.textContent = nextLabel
        labelEl.classList.toggle('show', Boolean(nextLabel))
      }
    }

    const stop = () => {
      running.current = false
      if (raf.current) cancelAnimationFrame(raf.current)
      raf.current = 0
    }

    const tick = () => {
      const dx = pos.current.x - ring.current.x
      const dy = pos.current.y - ring.current.y

      // Exponential ease — snappy, not floaty
      ring.current.x += dx * 0.42
      ring.current.y += dy * 0.42

      const x = pos.current.x
      const y = pos.current.y
      const rx = ring.current.x
      const ry = ring.current.y

      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`
      ringEl.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      labelEl.style.transform = `translate3d(${rx}px, ${ry}px, 0)`

      if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) {
        ring.current.x = x
        ring.current.y = y
        stop()
        return
      }

      raf.current = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running.current) return
      running.current = true
      raf.current = requestAnimationFrame(tick)
    }

    const onMove = (event) => {
      pos.current.x = event.clientX
      pos.current.y = event.clientY
      setVisible(true)
      start()
    }

    const onLeave = () => {
      setVisible(false)
      setMode('default', '')
      stop()
    }

    const onOver = (event) => {
      const target = event.target.closest('[data-cursor]')
      if (!target) {
        setMode('default', '')
        return
      }
      setMode(target.getAttribute('data-cursor') || 'hover', target.getAttribute('data-cursor-label') || '')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      stop()
    }
  }, [reduced, touch])

  if (reduced || touch) return null

  return (
    <div className="cursor-root mode-default" ref={rootRef} aria-hidden="true">
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-label" ref={labelRef} />
    </div>
  )
}
