const getCookie = () => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');
        prev[name] = value;
        return prev;
    }, {});

    return cookies.accessToken;
};

export function useGetId() {
    const accessToken = getCookie('access_token');

    if (!accessToken) {
        console.error('Access token not found');
        return null;
    }

    const tokenParts = accessToken.split('.');
    if (tokenParts.length !== 3) {
        console.error('Invalid access token format');
        return null;
    }

    try {
        const payload = atob(tokenParts[1]);
        const payloadObj = JSON.parse(payload);

        if (!payloadObj.hasOwnProperty('user_id')) {
            console.error('User ID not found in payload');
            return null;
        }

        const userId = payloadObj.user_id;

        return userId;

    } catch (error) {
        console.error('Error parsing payload:', error);
        return 'Error parsing payload';
    }
}