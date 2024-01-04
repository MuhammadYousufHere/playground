import { useRef } from "react";

/**
 * useRenderCount
 * @description Get the render count of a component
 *
 */
function useRenderCount(): number {
  return ++useRef(0).current;
}

export { useRenderCount };
