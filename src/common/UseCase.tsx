import React from 'react'
import { useInView } from 'react-intersection-observer'
import { fadeIn } from './variants'
import { motion } from 'framer-motion'

export default function UseCase() {
  const [ref, inView] = useInView({
    threshold: 0.5,
  })
  return (
    <div
      className='section pb-48'
      id='services'
      ref={ref}
    >
      <div className='container mx-auto h-screen'>
        <motion.div
          variants={fadeIn('down', 0.3)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.7 }}
          className='text-center md:mt-8 xl:mt-36'
        >
          <h3 className='h2 lg:text-[16px] text-[12px] mb-0 text-zinc-400'>
            What Skills I have
          </h3>
          <h2 className='h3 lg:text-[36px] text-[24px] mb-2 text-gradient font-tertiary xl:mb-20 lg:mb-4'>
            My Experience
          </h2>
        </motion.div>
      </div>
    </div>
  )
}
