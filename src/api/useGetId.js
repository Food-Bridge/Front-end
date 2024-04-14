const getCookie = () => {
    const value = document.cookie.split(`; `).map((el) => el.split('='));
    return value[0][1];
}

export function useGetId() {
    const accessToken = getCookie('access_token');

    if (!accessToken) {
        console.error('Access token not found');
        return null; // or appropriate error handling
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