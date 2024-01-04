import { useCallback, useState } from 'react';

const useCounter = (initialValue = 0) => {
    const [counter, setCounter] = useState(initialValue);
    const incrementBy = useCallback((incBy) => {
        setCounter((prevValue) => prevValue + incBy);
    }, []);
    const decrementBy = useCallback((decBy) => {
        setCounter((prevValue) => prevValue - decBy);
    }, []);
    const increment = useCallback(() => {
        setCounter((prevVal) => prevVal + 1);
    }, []);
    const decrement = useCallback(() => {
        setCounter((prevVal) => prevVal - 1);
    }, []);
    const reset = useCallback(() => {
        setCounter(initialValue);
    }, [initialValue]);
    return {
        decrement,
        decrementBy,
        increment,
        incrementBy,
        reset,
        value: counter,
    };
};

export default useCounter;
