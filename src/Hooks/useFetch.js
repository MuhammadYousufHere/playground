import { useState, useEffect } from 'react';

const useFetch = (url = '', options = null) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        fetch(url, options)
            .then((res) => res.json())
            .then((data) => {
                if (isMounted) {
                    setData(data);
                    setError(error);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setData(null);
                    setError(err);
                }
            })
            .finally(() => isMounted && setLoading(false));
        return () => (isMounted = false);
        // eslint-disable-next-line
    }, [url, options]);
    return { loading, data, error };
};

export default useFetch;
