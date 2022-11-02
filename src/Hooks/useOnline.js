import { useState, useEffect } from 'react';

function getIsOnline() {
    if (typeof window === 'undefined') {
        return null;
    }

    return navigator.onLine;
}
const useOnline = () => {
    const [isOnline, setIsOnline] = useState(() => getIsOnline);

    function setOffline() {
        setIsOnline(false);
    }

    function setOnline() {
        setIsOnline(true);
    }
    // we only needs this to be set on mount
    // hence []
    useEffect(() => {
        // eslint-disable-next-line no-negated-condition
        if (typeof window !== 'undefined') {
            window.addEventListener('online', setOnline);
            window.addEventListener('offline', setOffline);

            return () => {
                window.removeEventListener('online', setOnline);
                window.removeEventListener('offline', setOffline);
            };
        } else {
            console.warn('useOnline: window is undefined.');
            return null;
        }
    }, []);

    return isOnline;
};

//use
// const isOnline = useOnline(); //returns true or false

export default useOnline;
