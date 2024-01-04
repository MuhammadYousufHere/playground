import { useRef } from 'react'

/**
 * @description Get the render count of a component
 */
function useRenderCount(): number {
  return ++useRef<number>(0).current
}

export { useRenderCount }
