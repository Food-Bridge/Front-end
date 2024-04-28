import { createContext, useContext } from 'react';
import cacheManager from './cacheManager';

const CacheContext = createContext({});

const CacheContextProvider = ({ children }) => {
    const { cacheData, isDataValid } = cacheManager();

    return (
        <CacheContext.Provider value={{ cacheData, isDataValid }}>
            {children}
        </CacheContext.Provider>
    );
};

const useCacheContext = () => useContext(CacheContext);

export { CacheContext, CacheContextProvider, useCacheContext };
