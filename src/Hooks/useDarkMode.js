import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import useMediaQuery from './useMediaQuery';

const useDarkMode = () => {
    // get perfered mode
    const perferedMode = useMediaQuery(
        ['(prefers-color-scheme: dark)'],
        [true],
        false
    );

    const [enabled, setEnabled] = useLocalStorage('dark-mode', perferedMode);

    useEffect(() => {
        if (enabled) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [enabled]);
    return { enabled, setEnabled };
};

export default useDarkMode;
