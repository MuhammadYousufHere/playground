import { useState } from 'react';

const useToggle = (defaultValue) => {
    const [value, setValue] = useState(defaultValue);
    const setToggleValue = (value) => {
        setValue((currentVal) => {
            return typeof value === 'boolean' ? value : !currentVal;
        });
    };
    return [value, setToggleValue];
};

export default useToggle;

// const [value,toggleVal] = useToggle(false)
