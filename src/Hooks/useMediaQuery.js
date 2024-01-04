import { useState, useEffect, useCallback } from 'react';

// test and monitor media query programeticaly depending screens / device

const useMediaQuery = (queries = [], values = [], defaultValue) => {
    const mediaQueryList = queries.map((query) => window.matchMedia(query));

    const getValue = useCallback(() => {
        const index = mediaQueryList.findIndex((mQlist) => mQlist.matches());
        return typeof values[index] !== 'undefined'
            ? values[index]
            : defaultValue;
    }, [mediaQueryList, values, defaultValue]);

    const [value, setValue] = useState(getValue);

    useEffect(() => {
        const handler = () => setValue(getValue);
        mediaQueryList.forEach((mQlist) =>
            mQlist.addEventListener('change', handler)
        );
        return () =>
            mediaQueryList.forEach((mQlist) =>
                mQlist.removeEventListener('change', handler)
            );
    }, [getValue, mediaQueryList]);

    return value;
};

export default useMediaQuery;

// const canHover = useMediaQuery(['(hover: hover)'], [true] , false)

//
