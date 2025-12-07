import nodemailer from 'nodemailer';
import { configDotenv } from 'dotenv';
import { OTPTEMPLATE } from './templates/otpTemplate.js';
configDotenv();

const templateHandler = (purpose, otp, message) => {
    // const {purpose,otp="",message=""}=data

    switch (purpose) {
        case "signup": {
            return {
                subject: "Your Signup OTP",
                text: `Your OTP for signup is ${otp}. It will expire in 5 minutes.`,
                html: OTPTEMPLATE.signupOtpTemplate(otp, 5)
            }
        }

        case "reset_password": {
            return {
                subject: `Your Password Reset OTP`,
                text: `Your OTP for password reset is ${otp}. It will expire in 5 minutes.`,
                html: OTPTEMPLATE.resetPasswordOtpTemplate(otp, 5)
            }
        }

        default: {
            //notiification email
            return {
                subject: "Notification from Vehicle Rental",
                text: message,
                html: `<p>${message}</p>`
            }
        }

    }
}

export const EmailService = async (data) => {

    // check for required fields
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        //recipient handling
        const { to, purpose, otp, message = "" } = data
        // template handling
        const { html, subject, text } = templateHandler(purpose, otp, message)

        const mailOptions = {
            from: `${process.env.APP_NAME}`,
            to,
            subject,
            //   text,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent: ", info);
        return {
            success: true,
            data: info
        }
    } catch (error) {
        console.error("❌ Email sending failed: ", error);
        return {
            success: false,
            data: null
        }
    }
};
