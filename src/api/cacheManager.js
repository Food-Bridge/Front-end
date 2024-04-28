const ONE_MINUTE_MS = 60 * 1000;

const cacheManager = (cacheExpirationDuration = ONE_MINUTE_MS * 10) => {
    const cache = {};

    return {
        cacheData: (key, data) => {
            if (cache[key]) {
                const { data: cachedData, expireTime } = cache[key];
                if (expireTime > Date.now()) {
                    return cachedData;
                }
            }
            cache[key] = { data, expireTime: Date.now() + cacheExpirationDuration };
            return data;
        },
        isDataValid: (key) => {
            if (!cache[key]) return false;
            const { expireTime } = cache[key];
            return expireTime > Date.now();
        },
    };
};

export default cacheManager;