import { useState, useEffect } from 'react';
import { useCacheContext } from './cacheContext';

const useFetch = ({
    fetchFunction,
    args,
    cacheKey,
}) => {
    const [state, setState] = useState({
        status: 'initial',
        data: undefined,
        error: undefined,
        cacheKey,
    });

    const { cacheData, isDataValid } = useCacheContext();
    useEffect(() => {
        let ignore = false;

        const fetchData = async () => {
            if (ignore) return;

            setState((state) => ({ ...state, status: 'pending' }));

            try {
                const response = await fetchFunction(...args);

                cacheData(cacheKey, response);
                setState((state) => ({
                    ...state,
                    status: 'fulfilled',
                    data: response,
                    cacheKey,
                }));
            } catch (error) {
                setState((state) => ({
                    ...state,
                    status: 'rejected',
                    error: error,
                    cacheKey,
                }));
            }
        };

        if (state.status === 'initial') {
            if (isDataValid(cacheKey)) {
                setState((state) => ({
                    ...state,
                    status: 'fulfilled',
                    data: cacheData(cacheKey),
                    cacheKey,
                }));
            } else {
                fetchData();
            }
        }

        return () => {
            ignore = true;
        };
    }, [fetchFunction, cacheKey, cacheData, isDataValid, state.status]);

    return state;
};

export { useFetch };
