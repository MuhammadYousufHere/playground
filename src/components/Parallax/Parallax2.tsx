import { useRef } from 'react'
import './styles.css'
import { motion, useScroll, useTransform } from 'framer-motion'

function ParallaxSuper({ type = 'services' }) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '500%'])
  const ybg = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div
      className='parallax'
      ref={ref}
      style={{
        background:
          type === 'services'
            ? 'linear-gradient(180deg, #111132, #0c0c1d)'
            : 'linear-gradient(180deg, #111132, #505064)',
      }}
    >
      <motion.h1 style={{ y: yText }}>
        {type === 'services' ? 'What We Do?' : 'What We Did?'}
      </motion.h1>

      <motion.div className='mountains'></motion.div>
      <motion.div
        className='planets'
        style={{
          y: ybg,
          backgroundImage:
            type === 'services' ? "url('/planets.png')" : "url('/sun.png')",
        }}
      ></motion.div>
      <motion.div
        style={{ x: ybg }}
        className='stars'
      ></motion.div>
    </div>
  )
}

export default ParallaxSuper
