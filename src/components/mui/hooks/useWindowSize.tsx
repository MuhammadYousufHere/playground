import { useState } from 'react'
import { useIsomorphicEffect } from './useIsomorphicEffect'
import { DeepNullable } from '@/@types'

type WindowDimensions = DeepNullable<Pick<Window, 'innerHeight' | 'innerWidth' | 'outerHeight' | 'outerWidth'>>

function getDimensions(): WindowDimensions {
  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    outerHeight: window.outerHeight,
    outerWidth: window.outerWidth
  }
}

const nullDimensions: WindowDimensions = {
  innerHeight: null,
  innerWidth: null,
  outerHeight: null,
  outerWidth: null
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowDimensions>(() => {
    if (typeof window === 'undefined') {
      return nullDimensions
    } else {
      return getDimensions()
    }
  })
  function onResize() {
    setWindowSize(getDimensions())
  }
  // set resize handler once on mount and clean before unmount
  useIsomorphicEffect(() => {
    if (typeof window === 'undefined') {
      return () => undefined
    } else {
      window.addEventListener('resize', onResize)

      return () => {
        window.removeEventListener('resize', onResize)
      }
    }
  }, [])
  return windowSize
}
