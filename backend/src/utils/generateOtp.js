import crypto from 'crypto';

const generateSecureOTP = () => {

    const length = 6; // Length of the OTP

    // Generate cryptographically strong random bytes
    const buffer = crypto.randomBytes(length);

    // Convert to numeric OTP
    let otp = '';
    for (let i = 0; i < length; i++) {
        // Use modulo 10 to get single digit numbers
        otp += buffer[i] % 10;
    }

    // generate expiry time 5 minutes from now
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 5);

    return {
        otp,
        expiresIn: expiryTime,
        createdAt: new Date()
    };
}
export default generateSecureOTP;