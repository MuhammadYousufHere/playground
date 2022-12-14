import { useCallback } from 'react';

const useFocus = (props) => {
    const {
        onBlur: propsOnBlur,
        onFocus: propsOnFocus,
        onFocusChange: propsOnFocusChange,
    } = props;
    const onBlur = useCallback(
        (e) => {
            if (e.target === e.currentTarget) {
                if (propsOnBlur) propsOnBlur(e);
                if (propsOnFocusChange) propsOnFocusChange(false);
            }
        },
        [propsOnBlur, propsOnFocusChange]
    );
    const onFocus = useCallback(
        (e) => {
            if (e.target === e.currentTarget) {
                if (propsOnFocus) propsOnFocus(e);
                if (propsOnFocusChange) propsOnFocusChange(true);
            }
        },
        [propsOnFocusChange, propsOnFocus]
    );
    return {
        focusProps: {
            onBlur,
            onFocus,
        },
    };
};

export default useFocus;
