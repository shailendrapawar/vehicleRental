import crypto from "crypto"

const generateOtp = async () => {
    const code = crypto.randomInt(1000, 10000).toString().toString(); // 6-digit OTP
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);   // 5 minutes from now

    return {
    code,
    expiresAt,
  };
}
export default generateOtp;