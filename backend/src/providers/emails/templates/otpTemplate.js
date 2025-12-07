
export const OTPTEMPLATE = {
  signupOtpTemplate: (otp, expiresInMinutes = 5) => `
  <div style="font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; background-color: #F5F7FB; padding: 40px 20px; ">
    <div style="max-width:560px; width: 100%; background-color: #FFFFFF; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.08); overflow: hidden; display: block; margin:auto;">

      <!-- Header -->
      <div style="background: linear-gradient(135deg, #2D5BFF, #00E676); padding: 28px; text-align: center;">
        <h1 style="color: #ffffff; font-size: 26px; font-weight: 700; margin: 0;">
          Welcome to Vehicle Rental 🚗
        </h1>
        <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin-top: 8px;">
          Drive Easy. Rent Smarter.
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 32px 28px;">
        <p style="font-size: 16px; color: #333; margin: 0 0 14px;">Hi there 👋,</p>

        <p style="font-size: 15px; color: #555; line-height: 1.7; margin: 0;">
          Thanks for signing up with <strong style="color: #2D5BFF;">Vehicle Rental</strong>!  
          To complete your registration, please use the One-Time Password (OTP) below to verify your email address.
        </p>

        <!-- OTP Box -->
        <div style="text-align: center; margin: 36px 0;">
          <div style="
            display: inline-block;
            background-color: #F4F7FF;
            color: #2D5BFF;
            border: 2px dashed #2D5BFF;
            border-radius: 14px;
            padding: 18px 38px;
            font-size: 36px;
            font-weight: 700;
            letter-spacing: 8px;
          ">
            ${otp}
          </div>
        </div>

        <!-- Expiry Info -->
        <p style="text-align: center; font-size: 14px; color: #777;">
          Your OTP will expire in
          <strong style="color: #FF6B35;">${expiresInMinutes} minutes</strong>.
        </p>
        
        <p style="text-align: center; font-size: 12px; color: #777;">Thank you... 🤗</p>


        <!-- Divider -->
        <div style="margin: 40px 0; border-top: 1px solid #E9EDF5;"></div>

        <!-- Security Note -->
        <p style="font-size: 13px; color: #9CA3AF; text-align: center; line-height: 1.6;">
          If you didn’t create an account with us, please ignore this message.  
          Your security is important to us.
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #F4F7FF; text-align: center; padding: 18px; border-top: 1px solid #E6EAF0;">
        <p style="font-size: 13px; color: #6B7280; margin: 0;">
          © ${new Date().getFullYear()} <strong style="color: #2D5BFF;">Vehicle Rental</strong> — All Rights Reserved.
        </p>
      </div>

    </div>
  </div>
`,

  resetPasswordOtpTemplate: (otp, expiresInMinutes = 5) => `
  <div style="font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; background-color: #F5F7FB; padding: 40px 20px;">
    <div style="max-width: 560px; width: 100%; background-color: #FFFFFF; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.08); overflow: hidden; display: block; margin:auto;">

      <!-- Header -->
      <div style="background: linear-gradient(135deg, #2D5BFF, #FF6B35); padding: 28px; text-align: center;">
        <h1 style="color: #ffffff; font-size: 26px; font-weight: 700; margin: 0;">
          Password Reset Request
        </h1>
        <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin-top: 8px;">
          Secure your Vehicle Rental account
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 32px 28px;">
        <p style="font-size: 16px; color: #333; margin: 0 0 14px;">Hello there 😉,</p>

        <p style="font-size: 15px; color: #555; line-height: 1.7; margin: 0;">
          We received a request to reset your password for your
          <strong style="color: #2D5BFF;">Vehicle Rental</strong> account.
          Please use the One-Time Password (OTP) below to confirm your identity
          and proceed with resetting your password.
        </p>

        <!-- OTP Box -->
        <div style="text-align: center; margin: 36px 0;">
          <div style="
            display: inline-block;
            background-color: #F4F7FF;
            color: #2D5BFF;
            border: 2px dashed #2D5BFF;
            border-radius: 14px;
            padding: 18px 38px;
            font-size: 36px;
            font-weight: 700;
            letter-spacing: 8px;
          ">
            ${otp}
          </div>
        </div>

        <!-- Expiry Info -->
        <p style="text-align: center; font-size: 14px; color: #777;">
          This OTP will expire in
          <strong style="color: #FF6B35;">${expiresInMinutes} minutes</strong>.
        </p>
        
        <p style="text-align:center;color: #777; font-size: 12px"> Thank you...🤗</p>

        <!-- Divider -->
        <div style="margin: 40px 0; border-top: 1px solid #E9EDF5;"></div>

        <!-- Security Note -->
        <p style="font-size: 13px; color: #9CA3AF; text-align: center; line-height: 1.6;">
          If you didn’t request a password reset, you can safely ignore this email.
          Your account will remain secure.
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #F4F7FF; text-align: center; padding: 18px; border-top: 1px solid #E6EAF0;">
        <p style="font-size: 13px; color: #6B7280; margin: 0;">
          © ${new Date().getFullYear()} <strong style="color: #2D5BFF;">Vehicle Rental</strong> — All Rights Reserved.
        </p>
      </div>

    </div>
  </div>
`
}

