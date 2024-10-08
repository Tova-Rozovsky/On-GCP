import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './helpRequest.css'
const HelpRequest = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const checkAuth = () => {
        const token = getCookie('token');
        const userId = getCookie('userId');

        if (token && userId) {
            navigate('/helpRequest/requests', { state: { userId: userId } });
        }
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <>
            <h1>הי אחותי</h1>
            <h2>חיכנו לך :)</h2>
            <button onClick={() => { navigate('/register', { state: { userType: "helpRequest" } }) }}>הרשמה</button>
            <button onClick={() => { navigate('/login', { state: { userType: "helpRequest" } }) }}>כניסה</button>
        </>
    );
};

export default HelpRequest;
