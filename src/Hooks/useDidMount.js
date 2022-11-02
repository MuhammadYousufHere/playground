import { useEffect } from 'react';

const useDidMount = (callback) => {
    useEffect(() => {
        if (typeof callback === 'function') {
            callback();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <div>useDidMount</div>;
};

export default useDidMount;
