import { Spring } from '../utils'
import React, { useRef, useEffect } from 'react'

export const SpringCounter: React.FC<{
  target: number
  initialValue: number
  initialTarget: number
  format: (x: number) => string
  className?: string
  springConfig?: [friction: number, mass: number, tenstion: number]
  enabled?: boolean
  delay?: number
}> = ({
  target,
  initialTarget,
  initialValue,
  format,
  className,
  springConfig = [4, 3, 1],
  enabled = true,
  delay = 0,
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const spring = useRef<Spring | null>(null)
  const startAt = useRef(Date.now())

  useEffect(() => {
    if (enabled) {
      startAt.current = Date.now()
    }
  }, [enabled])

  useEffect(() => {
    let lastHandle = -1
    let lastValue = ''
    function paint() {
      if (spring.current && enabled) {
        if (Date.now() - startAt.current > delay) {
          spring.current.update(60)
        }
        const nextValue = format(spring.current.x)
        if (lastValue !== nextValue && ref.current) {
          ref.current.innerText = format(spring.current.x)
          lastValue = nextValue
        }
      }
      lastHandle = requestAnimationFrame(paint)
    }

    paint()

    return () => {
      lastHandle >= 0 && cancelAnimationFrame(lastHandle)
    }
  }, [format, target, initialValue, initialTarget, enabled])

  useEffect(() => {
    if (!spring.current) {
      spring.current = new Spring(
        initialValue,
        springConfig[0],
        springConfig[1],
        springConfig[2]
      )
      spring.current.setTarget(initialTarget)
    } else {
      spring.current.setTarget(target)
    }
  }, [target])

  return (
    <span
      ref={ref}
      className={
        'inline-block will-change-contents ' + className ? className : ''
      }
    >
      {' '}
    </span>
  )
}

export const ConstantRateCounter: React.FC<{
  start: number
  ratePerSec: number
  format: (x: number) => string
  className?: string
}> = ({ start, ratePerSec, format, className }) => {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let lastHandle = -1
    let lastValue = ''
    const startAt = Date.now()
    function paint() {
      const t = (Date.now() - startAt) / 1000

      const nextValue = format(Math.round(start + ratePerSec * t))
      if (lastValue !== nextValue && ref.current) {
        ref.current.innerText = nextValue
        lastValue = nextValue
      }
      lastHandle = requestAnimationFrame(paint)
    }

    paint()

    return () => {
      lastHandle >= 0 && cancelAnimationFrame(lastHandle)
    }
  }, [])

  return (
    <span
      ref={ref}
      className={
        'inline-block will-change-contents ' + className ? className : ''
      }
    />
  )
}
