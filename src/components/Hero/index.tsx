import React from 'react'
import { useFontsLoaded } from '../../hooks'
import ParticleAnimation from '../Background'
import { AnimateSpawn } from '../../common'
import transitions from '../../assets/transitions.json'
import { EthEquivalentTxRate, TotalBlocks } from './Stats'

export const Hero: React.FC<{
  headline: React.ReactNode
  children?: React.ReactNode
}> = ({ headline, children }) => {
  const fontLoaded = useFontsLoaded()

  return (
    <section
      className=' bg-[#1B025A]'
      id='home'
    >
      <ParticleAnimation />
      <div className='pt-[152px] pb-8 md:pt-52 md:pb-30 md:grid relative mt-[-72px] md:mt-[-111px]'>
        <div className='container-10 col-start-1 row-start-1 w-full'>
          <div className='md:w-7/10 lg:w-8/10'>
            <h1
              className='
                animate-fade-up 
                font-[1000] uppercase tracking-[-0.03em] leading-none 
                text-[60px]
                sm:text-[60px]
                md:text-[100px] 
                lg:text-[110px] 
                text-gradient-white 
                grid mb-0'
              style={{
                animationPlayState: fontLoaded ? 'running' : 'paused',
              }}
            >
              {headline}
            </h1>
            <div className='w-full md:w-[550px] mt-4 md:mt-8'>{/* smh */}</div>
          </div>
        </div>
        <div className='container-12 w-full col-start-1 row-start-1 md:flex justify-end mt-8 md:mt-0'>
          <AnimateSpawn
            className='md:w-80 flex flex-col gap-1 text-left'
            variants={transitions.container}
          >
            <EthEquivalentTxRate />
            <TotalBlocks />
          </AnimateSpawn>
        </div>
      </div>
      <div className='relative'>{children}</div>
    </section>
  )
}
