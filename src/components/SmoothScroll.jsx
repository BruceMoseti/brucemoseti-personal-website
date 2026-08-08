import { useEffect } from 'react'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from '../hooks/useMotionPrefs'

export default function SmoothScroll({ children }) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })

    let frame = 0
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    const onAnchor = (event) => {
      const link = event.target.closest('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      event.preventDefault()
      lenis.scrollTo(target, { offset: -72 })
    }

    document.addEventListener('click', onAnchor)

    return () => {
      document.removeEventListener('click', onAnchor)
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [reduced])

  return children
}
