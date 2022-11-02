import { useEffect, useRef } from 'react';

const useUpdateEffect = (callback = () => null, depedencies) => {
    const firstRenderRef = useRef(true);
    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        return callback;
        // eslint-disable-next-line
    }, depedencies);
    return;
};

export default useUpdateEffect;

// // const [count,setCount] = useState(0)
// useUpdateEffect(()=>alert(count),[count])
