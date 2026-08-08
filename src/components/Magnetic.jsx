import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsTouchDevice, usePrefersReducedMotion } from '../hooks/useMotionPrefs'

const MotionDiv = motion.div

export default function Magnetic({ children, strength = 0.28, className = '' }) {
  const reduced = usePrefersReducedMotion()
  const touch = useIsTouchDevice()
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 })

  if (reduced || touch) {
    return <div className={className}>{children}</div>
  }

  const onMove = (event) => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const offsetX = event.clientX - rect.left - rect.width / 2
    const offsetY = event.clientY - rect.top - rect.height / 2
    x.set(offsetX * strength)
    y.set(offsetY * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <MotionDiv
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </MotionDiv>
  )
}
