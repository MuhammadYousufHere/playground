import { useEffect, useRef, useState } from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'

const ParallaxComponent = () => {
  const [scrollEl, setScrollElement] = useState(null)
  const ref = useRef(null)
  useEffect(() => {
    setScrollElement(ref.current)
  })

  return (
    <section
      className=' mt-10 -mx-4'
      ref={ref}
    >
      <div className='px-4'>
        <p className='text-lg -mb-2 text-gray-500'>
          Join us and become part of the family
        </p>
        <h2 className='text-3xl font-black'>Our Story</h2>
      </div>
      <ParallaxBanner
        layers={[
          { image: '/bartable.webp', speed: -20 },
          {
            speed: 5,
            children: (
              <div className='absolute inset-0 flex items-center max-w-sm md:max-w-3xl mx-auto justify-center '>
                {/* <h1 className="text-3xl text-white font-thin">Hello World!</h1> */}
                <p className='text-lg font-medium text-center md:text-xl text-gray-900 backdrop-blur-sm bg-white/30  rounded-lg p-5 md:p-16'>
                  At 3035, we&apos;re more than just a lounge bar. We&apos;re a
                  community. Join us and become part of the 3035 family. We look
                  forward to serving you and creating exceptional experiences
                  that you&apos;ll cherish.
                </p>
              </div>
            ),
          },
        ]}
        className='aspect-square w-full h-full md:h-[300px] z-10  mt-4 '
      />
    </section>
  )
}

export default ParallaxComponent
