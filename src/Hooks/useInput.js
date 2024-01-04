import { useCallback, useState, useEffect } from 'react';

const useInput = (initialValue = '', options = {}) => {
    const [value, setValue] = useState(initialValue);

    const onChange = useCallback(
        (event) => {
            const newValue = event.target.value;
            let shouldUpdate = true;
            if (typeof options.validate === 'function') {
                shouldUpdate = options.validate(newValue, value);
            }

            if (shouldUpdate) {
                setValue(newValue);
            }
        },
        [options, value]
    );
    // sync with default value
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handler = {
        onChange,
        value,
    };

    return handler;
};

export default useInput;
