import { useCallback, useEffect, useRef } from 'react';

const useTimeout = (callback, delay) => {
    const callbackRef = useRef(callback);
    const timeoutRef = useRef(delay);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const set = useCallback(() => {
        timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
    }, [delay]);

    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current);
    }, []);

    useEffect(() => {
        set();
        return clear;
    }, [delay, set, clear]);

    const reset = useCallback(() => {
        clear();
        set();
    }, [clear, set]);
    return { clear, reset };
};

export default useTimeout;
// const [count,setCount] = useState(10)
// const {clear, reset} = useTimeout(()=> setCount(0),1000)
