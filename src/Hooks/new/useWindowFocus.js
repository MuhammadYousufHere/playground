import { useEffect, useState } from 'react';

const hasFocus = () => typeof document !== 'undefined' && document.hasFocus();

export function useWindowFocus({ onFocus = null, onBlur = null }) {
  const [focused, setFocused] = useState(hasFocus); // Focus for first render

  useEffect(() => {
    setFocused(hasFocus()); // Focus for additional renders

    function handleFocus() {
      onFocus && onFocus();
      setFocused(true);
    }

    function handleBlur() {
      onBlur && onBlur();
      setFocused(false);
    }

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return focused;
}
