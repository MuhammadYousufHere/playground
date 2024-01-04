import { useRef, useEffect } from "react";

// from https://stackoverflow.com/a/63203862
export function useHorizontalScroll() {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      const onWheel = (e: globalThis.WheelEvent) => {
        // if not scrolling return
        if (!e.deltaY) return;

        // if at the edges, prevent scroll event
        if (
          !(element.scrollLeft === 0 && e.deltaY < 0) &&
          !(
            element.scrollWidth - element.clientWidth - Math.round(element.scrollLeft) === 0 &&
            e.deltaY > 0
          )
        ) {
          e.preventDefault();
        }
        // then scroll based on wheel's scroll amount
        element.scrollTo({
          left: element.scrollLeft + e.deltaY,
          behavior: "smooth",
        });
      };
      // attach onWheel event to element
      element.addEventListener("wheel", onWheel);
      return () => element.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elementRef;
}
