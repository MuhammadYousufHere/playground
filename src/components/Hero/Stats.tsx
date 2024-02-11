import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'
import { InfoIcon } from '../../assets/InfoIcon'
import transitions from '../../assets/transitions.json'
import { ConstantRateCounter, SpringCounter } from '../../common/Counters'

function formatNumber(x: number) {
  return x
    .toLocaleString('en-US', {
      maximumFractionDigits: 0,
    })
    .replace(/,/g, '\u2019')
}
function getFigureSpacer(value: string | number) {
  const valueDigitCount = value.toString().length
  const valueDigitCountWithApostrophes =
    valueDigitCount + Math.floor((valueDigitCount - 1) / 3)
  const scheme = `999'999'999'999'999`
  return scheme.slice(scheme.length - valueDigitCountWithApostrophes)
}

export const TotalBlocks = () => {
  return (
    <motion.div
      className='backdrop-blur-lg rounded-xl text-white tw-lead-lg py-3 px-6 hidden md:block'
      variants={transitions.fadeIn}
    >
      <figure className='m-0'>
        {true ? (
          <>
            <ConstantRateCounter
              start={13450}
              ratePerSec={12}
              format={formatNumber}
              className='col-start-1 row-start-1 text-left'
            ></ConstantRateCounter>
          </>
        ) : (
          <>&nbsp;</>
        )}

        <figcaption className='tw-paragraph text-white/50 flex items-center gap-1'>
          Blocks processed
          <Info>
            <h3 className='tw-button-xs mb-1'>Throughput</h3>
            <p className='tw-caption text-white/50 mb-0'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente
              quod rerum nisi ipsam cum rem vero similique earum. Quo unde sint
              ad facilis odit reiciendis ut beatae, doloribus quam tenetur?
            </p>
          </Info>
        </figcaption>
      </figure>
    </motion.div>
  )
}

const Info: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <span className='relative flex cursor-pointer group py-1'>
      <InfoIcon className='w-4 h-4 text-white' />

      <div className='hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 p-2 bg-[#1b1034] rounded-lg text-white w-60'>
        {children}
      </div>
    </span>
  )
}

export const EthEquivalentTxRate = () => {
  return (
    <motion.div
      className='backdrop-blur-lg rounded-xl text-white tw-lead-lg py-3 px-6'
      variants={transitions.fadeIn}
    >
      <figure className='m-0 flex gap-3 justify-center md:block'>
        <div className='inline-grid relative left-1 md:static md:inline'>
          {true ? (
            <>
              <SpringCounter
                target={42343}
                initialTarget={434}
                initialValue={454}
                format={formatNumber}
                springConfig={[3, 1, 1]}
                className='text-left col-start-1 row-start-1'
              ></SpringCounter>
              <span className='md:hidden col-start-1 row-start-1 invisible pointer-events-none pr-[2px]'>
                {getFigureSpacer(Math.floor(34535))}
              </span>
            </>
          ) : (
            <>&nbsp;</>
          )}
        </div>

        <figcaption className='tw-paragraph-sm md:tw-paragraph text-white/50 flex items-center gap-1'>
          ETH eq. TX/s
          <Info>
            <h3 className='tw-button-xs mb-1'>ETH-equivalent Transactions</h3>
            <p className='tw-caption text-white/50 mb-0'>
              Not all Transactions are equal. ICP performs ~80x the amount of
              computational work of Ethereum per transaction.{' '}
              <a
                className='text-white hover:underline hover:text-white'
                href=''
              >
                Learn More
              </a>
            </p>
          </Info>
        </figcaption>
      </figure>
    </motion.div>
  )
}
