import { ResetPasswordService } from '../service/resetPasswordService.js';

class ResetPasswordController {
    async requestOtp(req, res) {
        const { userId } = req.body;
        try {
            const service=new ResetPasswordService()
            await service.sendOtp(userId);
            res.json({ message: 'OTP sent to email.' });
        } catch (error) {
            console.error('Error sending OTP:', error);
            res.json({ message: 'Error sending OTP' });
        }
    }

    async resetPassword(req, res) {
        const { userId, otp, newPassword } = req.body;
        try {
            const service=new ResetPasswordService()
            const success = await service.verifyOtp(userId, otp, newPassword);
            if (!success) {
                return res.json({ message: 'Invalid OTP' });
            }
            res.json({ message: 'Password reset successfully' });
        } catch (error) {
            console.error('Error resetting password:', error);
            res.json({ message: 'Error resetting password' });
        }
    }
}

export default ResetPasswordController;
