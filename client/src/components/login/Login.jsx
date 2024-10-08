import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import ForgotPassword from './ForgotPassword';
import { loginUser } from '../httpController'; 
import './Login.css';

const Login = () => {
    const location = useLocation();
    const userType = location.state?.userType || 'profile';
    const [userId, setId] = useState('');
    const [loginStatus, setLoginStatus] = useState("none");
    const [displayChangePasw, setDisplayChangePasw] = useState(false);
    const navigate = useNavigate();
    const { reset, register, handleSubmit, formState: { errors } } = useForm();

    const login = async (data) => {
        try {
            const response = await loginUser(data.userId, data.password);

            if (response) {
                const token = response.data.token;
                setLoginStatus("inline");

                Cookies.set('token', token, { secure: true, sameSite: 'strict' });
                Cookies.set('userId', data.userId, { secure: true, sameSite: 'strict' });

                if (userType === "volunteer") {
                    navigate(`/volunteer/volunteers`, { state: { userId: data.userId } });
                } else if (userType === "helpRequest") {
                    navigate(`/helpRequest/requests`, { state: { userId: data.userId } });
                } else {
                    navigate(`/profile`, { state: { userId: data.userId } });
                }
            } else {
                alert("משתמש אינו קיים אנא הרשמי");
            }
            reset();
        } catch (error) {
            console.error('Error logging in:', error.message);
            alert("Error logging in. Please try again later.");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit(login)}>
                <h2>כניסה</h2>
                <input type='text' placeholder='ת"ז' {...register("userId", { required: true })} />
                <input type='password' placeholder='סיסמא' {...register("password", { required: true })} />

                {errors.userId && errors.userId.type === "required" && (
                    <p className="errorMsg">ת"ז שדה חובה.</p>
                )}
                {errors.password && errors.password.type === "required" && (
                    <p className="errorMsg">סיסמא שדה חובה.</p>
                )}
                <input type="submit" value="כניסה" />
            </form>

            <button className="register-button" onClick={() => {
                navigate("/register", { state: { userType: userType } });
            }}>הרשמה</button>
            <button className="forgot-password-button" onClick={() => {
                setDisplayChangePasw(!displayChangePasw);
            }}>שחכתי סיסמא</button>
            {displayChangePasw && <ForgotPassword userId={userId} />}
        </div>
    );
}

export default Login;
