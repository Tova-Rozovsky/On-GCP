const BASE_URL = 'http://localhost:8082';

const getHeaders = () => {
    const token = getCookie('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};
export const getRequests = async (filter, setRequests, setLoading) => {
    const url = `${BASE_URL}/requests/${filter}`;

    try {
        const data = await fetchData(url, 'GET');
        setRequests(data);
    } catch (error) {
        console.error('שגיאה במהלך הבקשה:', error.message);
        alert('שגיאה בקבלת הבקשות. נסה שוב מאוחר יותר.');
    } finally {
        setLoading(false);
    }
};

export const getAllMembers = async (setMembers) => {
    const url = `${BASE_URL}/manager`; 
    try {
        const data= await fetchData(url, 'GET');
        console.log(data[0])
        setMembers(data[0])
    } catch (error) {
        console.error('שגיאה במהלך בקשת החברים:', error.message);
        throw error;
    }
};

export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const fetchData = async (url, method, body = null) => {
    const headers = getHeaders();
    const options = { method, headers };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response) {
            throw new Error(data.message || 'Failed to fetch');
        }

        return data;
    } catch (error) {
        console.error('שגיאה במהלך הבקשה:', error.message);
        throw error;
    }
};

export const loginUser = async (userId, password) => {
    const url = `${BASE_URL}/login`;
    const body = { userId, password };
    return await fetchData(url, 'POST', body);
};

export const addRequest = async (requestData) => {
    const url = `${BASE_URL}/requests`;
    return await fetchData(url, 'POST', requestData);
};
export const removeCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const requestOtp = async (userId) => {
    const url = `${BASE_URL}/resetPassword/request-otp`;
    const body = { userId };
    return await fetchData(url, 'POST', body);
};

export const registerUser = async (userDetails, passwordDetails) => {
    const url = `${BASE_URL}/register`;
    const body = [userDetails, passwordDetails];
    return await fetchData(url, 'POST', body);
};

export const resetPassword = async (userId, otp, newPassword) => {
    const url = `${BASE_URL}/resetPassword/reset-password`;
    const body = { userId, otp, newPassword };
    return await fetchData(url, 'POST', body);
};
export const updateRequest = async (id, volunteerId, email) => {
    const url = `${BASE_URL}/requests/${id}`;
    const body = [{
        "requestStatus": "בוצע",
        "volunteerId": volunteerId,
    }, {
        "email": email
    }];

    return await fetchData(url, 'PUT', body);
};

export const getUserData = async (userId) => {
    const url = `${BASE_URL}/user?userId=${userId}`;

    try {
        return await fetchData(url, 'GET');
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const updateUser = async (userId, userData) => {
    const url = `${BASE_URL}/user/${userId}`;
    try {
        console.log("i am hereeeeeeeeeeeeeeeeeee") ;
               return await fetchData(url, 'PUT', userData);
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
};

