import { executeQuery } from './query.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { sendPasswordChangeEmail } from './email.js';

const saltRounds = 10;

export class ResetPasswordService {
   generateOtp(length = 6) {
        return crypto.randomBytes(length).toString('hex').slice(0, length).toUpperCase();
    }

    async sendOtp(userId) {
        const otp = new ResetPasswordService(); 
        const otp1 = otp.generateOtp();
        const updateOtpQuery = 'UPDATE db_fp.passwords SET OTP = ? WHERE userId = ?';
        await executeQuery(updateOtpQuery, [otp1, userId]);
        const emailQuery = 'SELECT email FROM db_fp.users WHERE userId = ?';
        const user = await executeQuery(emailQuery, [userId]);
        const email = user[0].email;
        await sendPasswordChangeEmail(email, otp1);
    }

    async verifyOtp(userId, otp, newPassword) {
        const selectOtpQuery = 'SELECT OTP FROM db_fp.passwords WHERE userId = ?';
        const result = await executeQuery(selectOtpQuery, [userId]);

        if (result[0].OTP !== otp) {
            return false; 
        }

        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        const updatePasswordQuery = 'UPDATE db_fp.passwords SET password = ?, OTP = NULL WHERE userId = ?';
        await executeQuery(updatePasswordQuery, [hashedPassword, userId]);
        return true; 
    }
}

export default ResetPasswordService;
