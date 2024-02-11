import { useRef } from 'react'
import './styles.css'
import { motion, useInView } from 'framer-motion'

const variants = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 2.5,
      staggerChildren: 0.4,
    },
  },
}

function Services() {
  const ref = useRef(null)

  const isInView = useInView(ref, { margin: '-100px' })

  return (
    <motion.div
      className='services'
      variants={variants}
      initial='initial'
      // whileInView="animate"
      ref={ref}
      animate={isInView && 'animate'}
    >
      <motion.div
        className='textContainer'
        variants={variants}
      >
        <p>
          I focus on growing your business <br />
          and move forward
        </p>
        <hr />
      </motion.div>
      <motion.div
        className='titleContainer'
        variants={variants}
      >
        <div className='title'>
          <img
            src='/people.avif'
            alt='business'
          />
          <h1>
            <motion.b whileHover={{ color: 'orange' }}>Unique</motion.b> Ideas
          </h1>
        </div>
        <div className='title'>
          <h1>
            <motion.b whileHover={{ color: 'orange' }}>For Your</motion.b>{' '}
            Business.
          </h1>
          <button>WHAT WE DO?</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Services
