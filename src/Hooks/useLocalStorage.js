import { useState } from 'react';
// presist comp state accross sessions
const useLocalStorage = (key = '', initailValue = '') => {
    const [state, setState] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initailValue;
        } catch (err) {
            return initailValue;
        }
    });

    const setLocalStorage = (newState) => {
        try {
            const newStateValue =
                typeof newState === 'function' ? newState(state) : newState;
            setState(newStateValue);

            window.localStorage.setItem(key, JSON.stringify(newStateValue));
        } catch (err) {
            throw new Error(
                `Unable to store new value for key ${key} in localStorage.`
            );
        }
    };
    return [state, setLocalStorage];
};

export default useLocalStorage;
