import { AnimatePresence, motion } from 'framer-motion'

const StaggeredText = ({ text = '' }) => {
  // Define the initial and animate properties for each letter
  const letterVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05, // Adjust the delay for the desired stagger effect
        ease: 'easeOut',
      },
    }),
  }

  const lines = text.split('\n')

  return (
    <AnimatePresence>
      <div className='text-lg text-gray-300 text-center px-5 mt-2'>
        {lines.map((line, lineIndex) => (
          <p key={lineIndex}>
            {line.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={letterVariants}
                initial='initial'
                animate='animate'
                custom={charIndex + lineIndex * line.length} // Adjust the delay based on line and char index
                className='
                font-[1000] uppercase tracking-[-0.03em] leading-none 
                text-[60px]
                sm:text-[60px]
                md:text-[100px] 
                lg:text-[110px] 
                text-gradient-white 
              '
                style={{
                  display: 'inline-block',
                  whiteSpace: 'pre',
                }}
              >
                {char}
              </motion.span>
            ))}
            {lineIndex !== lines.length - 1 && <br />}{' '}
            {/* Only insert <br /> if it's not the last line */}
          </p>
        ))}
      </div>
    </AnimatePresence>
  )
}

export default StaggeredText
