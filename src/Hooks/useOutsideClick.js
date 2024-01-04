import React, { useCallback, useRef, useEffect } from 'react';

const useOutsideClick = (ref, handler, when = true) => {
    const savedHandler = useRef();

    const memeoizedCallback = useCallback(
        (e) => {
            if (ref.target && !ref.current.contains(e.target)) {
                return savedHandler.current(e);
            }
        },
        [ref]
    );
    useEffect(() => {
        savedHandler.current = handler;
    });
    useEffect(() => {
        if (when) {
            document.addEventListener('click', memeoizedCallback, true);
            document.addEventListener('ontouchstart', memeoizedCallback, true);
            return () => {
                document.removeEventListener('click', memeoizedCallback, true);
                document.removeEventListener(
                    'ontouchstart',
                    memeoizedCallback,
                    true
                );
            };
        }
        return null;
    });

    return [ref, handler, when, memeoizedCallback];
};
export default useOutsideClick;
