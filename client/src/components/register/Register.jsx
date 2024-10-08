import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { getCookie, registerUser, getUserData } from '../httpController';
import Cookies from 'js-cookie';
import './register.css';

const Register = () => {
    const location = useLocation();
    const userType = location.state?.userType || 'profile';
    const [verifyFail, setVerifyFail] = useState(false);
    const [isExtendedDetailsOpen, setIsExtendedDetailsOpen] = useState(true);
    const [userIdentificationInformation, setUserIdentificationInformation] = useState({ userId: "", password: "" });
    const navigate = useNavigate();

    useEffect(() => {
        getCookie("token");
        setVerifyFail(false);
    }, []);

    const { reset, register, handleSubmit, formState: { errors } } = useForm();

    const signUp = async (data) => {
        try {
            const response = await registerUser(
                {
                    userId: userIdentificationInformation.userId,
                    userName: data.username,
                    address: data.address,
                    region: data.region,
                    email: data.email,
                    phoneNumber: data.phoneNumber
                },
                {
                    userId: userIdentificationInformation.userId,
                    password: userIdentificationInformation.password
                }
            );
            Cookies.set('token', response.token, { secure: true, sameSite: 'strict' });
            const userId = userIdentificationInformation.userId;
            Cookies.set('userId', userId, { secure: true, sameSite: 'strict' });

            if (userType === "volunteer") {
                navigate(`/volunteer/volunteers`, { state: { userId: userId } });
            } else if (userType === "helpRequest") {
                navigate(`/helpRequest/requests`, { state: { userId: userId } });
            } else {
                navigate(`/profile`, { state: { userId: userId } });
            }

            reset();
        } catch (err) {
            console.error("Registration failed:", err);
            alert("משהו השתבש, נסה שוב מאוחר יותר.");
        }
    }

    const getIn = async (data) => {
        setVerifyFail(false);
        let userId = data.userId;
        let password = data.password;
        let verifyPassword = data.verifyPassword;
        if (password !== verifyPassword) {
            setVerifyFail(true);
        } else {
            try {
                const userData = await getUserData(userId);
                if (userData.status === 200) {
                    alert("המשתמש כבר קיים, אנא היכנס.");
                } else {
                    setIsExtendedDetailsOpen(!isExtendedDetailsOpen);
                    setUserIdentificationInformation({ userId: userId, password: password });
                    navigate('details');
                }
                reset();
            } catch (err) {
                console.error("Error fetching user data:", err);
                alert("משהו השתבש, נסה שוב מאוחר יותר.");
            }
        }
    }

    const getInForm = () => {
        return (
            <div className="register-container">
                <h3>הרשמה</h3>
                <form onSubmit={handleSubmit(getIn)}>
                    <input type='text' placeholder='ת"ז' {...register("userId", { required: true })} />
                    <input type='password' placeholder='סיסמא'  {...register("password", { required: true })} />
                    <input type='password' placeholder='אימות סיסמא'  {...register("verifyPassword", { required: true })} />
                    {verifyFail && <p className="errorMsg">אימות נכשל, אנא נסה שוב.</p>}
                    {(errors.userId || errors.password || errors.verifyPassword) && <p className="errorMsg">יש למלא שדות חובה.</p>}
                    <input type="submit" value="הרשמה " />
                </form>
                <button onClick={() => navigate('/login', { state: { userType: "volunteer" } })}>כניסה</button>
            </div>
        );
    }

    const detailesForm = () => {
        return (
            <div className="register-container">
                <h3>הרשמה</h3>
                <form onSubmit={handleSubmit(signUp)}>
                    <h3>רק עוד כמה פרטים ואתם בפנים!</h3>
                    <input type='text' placeholder='שם משתמש'  {...register("username", { required: true })} />
                    <br />
                    <input type='text' placeholder='כתובת'  {...register("address", { required: true })} />
                    <br />
                    <select {...register("region", { required: true })}>
                        <option value="">בחר אזור</option>
                        <option value="צפון">צפון</option>
                        <option value="דרום">דרום</option>
                        <option value="מרכז">מרכז</option>
                        <option value="ירושלים">ירושלים</option>
                        <option value="חיפה">חיפה</option>
                        <option value="תל אביב">תל אביב</option>
                    </select>
                    <br />
                    <input type='email' placeholder='אימייל'  {...register("email", { required: true })} />
                    <br />
                    <input type='tel' placeholder='מספר טלפון'  {...register("phoneNumber", { required: true })} />
                    {(errors.username || errors.address || errors.region || errors.email || errors.phoneNumber) && <p className="errorMsg">יש למלא שדות חובה.</p>}
                    <input type="submit" value="הרשמה" />
                </form>
            </div>
        );
    }

    return (
        <>
            {isExtendedDetailsOpen ? getInForm() : detailesForm()}
        </>
    );
}

export default Register;