import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/useMotionPrefs'

const MotionDiv = motion.div

export default function Preloader({ onDone }) {
  const reduced = usePrefersReducedMotion()
  const [progress, setProgress] = useState(reduced ? 100 : 0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (reduced) {
      const timer = window.setTimeout(() => {
        setDone(true)
        onDone?.()
      }, 0)
      return () => window.clearTimeout(timer)
    }

    let value = 0
    const timer = window.setInterval(() => {
      value += Math.random() * 14 + 6
      if (value >= 100) {
        value = 100
        setProgress(100)
        window.clearInterval(timer)
        window.setTimeout(() => {
          setDone(true)
          onDone?.()
        }, 420)
      } else {
        setProgress(Math.floor(value))
      }
    }, 70)

    return () => window.clearInterval(timer)
  }, [onDone, reduced])

  return (
    <AnimatePresence>
      {!done ? (
        <MotionDiv
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="preloader-inner">
            <p className="preloader-brand">Bruce Moseti</p>
            <div className="preloader-track">
              <MotionDiv
                className="preloader-bar"
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>
            <p className="preloader-count">{String(progress).padStart(3, '0')}</p>
          </div>
        </MotionDiv>
      ) : null}
    </AnimatePresence>
  )
}
