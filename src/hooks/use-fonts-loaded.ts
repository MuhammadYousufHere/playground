import { useEffect, useRef, useState } from 'react'

export function useFontsLoaded(): boolean {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const unmounted = useRef(false)

  useEffect(() => {
    document.fonts.ready.then((v) => {
      console.log(v)
      if (unmounted.current) {
        setFontsLoaded(true)
      }
    })

    return () => {
      unmounted.current = true
    }
  }, [])

  return fontsLoaded
}
