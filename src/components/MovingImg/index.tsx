import { motion, useMotionValue } from 'framer-motion'
import { MouseEvent, useRef } from 'react'

export const MovingImg = ({
  img,
  link,
  title,
}: {
  title: string
  img: string
  link: string
}) => {
  //we can check position
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  // access to the img
  const imgRef = useRef<HTMLImageElement>(null)
  // the function is called when onMouseMove and shows the horizontal coordinates
  function handleMouse(event: MouseEvent<HTMLAnchorElement>) {
    // add properties "inline-block" make the element visible
    if (imgRef.current) {
      imgRef.current.style.display = 'inline-block'

      x.set(event.pageX)
      y.set(-10)
    }
  }

  function handleMouseLeave() {
    if (imgRef.current) {
      imgRef.current.style.display = 'none'
      x.set(0)
      y.set(0)
    }
  }

  return (
    <a
      href={link}
      target='_blank'
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className='capitalize text-xl font-semibold hover:underline xs:text-lg '>
        {title}
      </h2>
      <motion.img
        style={{ x: x, y: y }}
        // whileInView - add animation
        whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
        ref={imgRef}
        src={img}
        alt={title}
        className='z-10 w-96 h-auto hidden absolute rounded-lg'
        sizes='(max-width: 768px) 100vw, (max-width:1200px) 50vw, 50vw'
      />
    </a>
  )
}
