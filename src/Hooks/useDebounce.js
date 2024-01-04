import { useEffect } from 'react';
import useTimeout from './useTimeout';
// Def: run something but only after certain delay, i.e typing in search field after you stop , let results appear
// if you show result on every keystroke it may cause performance issues, so deBounce comes to rescue
const useDebounce = (callback, delay, depedencies) => {
    const { clear, reset } = useTimeout(callback, delay);
    useEffect(reset, [...depedencies, reset]);
    // eslint-disable-next-line
    useEffect(clear, []);
    return <div>useDebounce</div>;
};

export default useDebounce;

// const [count,setCount] = useState(0)
// useDebounce(()=>alert(count),1000,[count])
