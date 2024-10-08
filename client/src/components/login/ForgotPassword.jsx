import React, { useState } from 'react';
import { requestOtp, resetPassword } from '../httpController'; 

const ForgotPassword = () => {
    const [otp, setOtp] = useState('');
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [newPas, setNewPas] = useState('');
    const [changePasw, setChangePasw] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await requestOtp(id);
            setMessage('קוד חד פעמי נשלח לאימייל שלך.');
            setChangePasw(true);
        } catch (error) {
            setMessage('שליחת קוד חד פעמי נכשלה. נסה שוב.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await resetPassword(id, otp, newPas);
            setMessage('הסיסמא שונתה בהצלחה.');
            setPasswordChanged(true); 
            setChangePasw(false);
        } catch (error) {
            setMessage('שינוי סיסמא נכשל. נסה שוב.');
        } finally {
            setLoading(false);
        }
    };

    if (passwordChanged) {
        return null;
    }

    return (
        <div>
            <h2>שכחתי סיסמא</h2>
            <form onSubmit={handleSendOtp}>
                <div>
                    <label htmlFor="id">תעודת זהות:</label>
                    <input
                        type="text"
                        id="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'שולח קוד...' : 'שלח קוד'}
                </button>
            </form>
            {changePasw && (
                <form onSubmit={handleResetPassword}>
                    <div>
                        <label htmlFor="otp">קוד חד פעמי:</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="newPas">סיסמא חדשה:</label>
                        <input
                            type="password"
                            id="newPas"
                            value={newPas}
                            onChange={(e) => setNewPas(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'משנה סיסמא...' : 'שנה סיסמא'}
                    </button>
                </form>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
