 const signupOtpEmailTemplate = (code) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Signup Verification</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f7f9fc;
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        color: #333;
      }

      .container {
        max-width: 480px;
        margin: 40px auto;
        background-color: #fff;
        padding: 32px;
        border-radius: 12px;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
      }

      .header {
        text-align: center;
        margin-bottom: 24px;
      }

      .header h2 {
        margin: 0;
        font-size: 24px;
        color: #2d5bff;
      }

      .message {
        font-size: 16px;
        margin: 0 0 20px;
        line-height: 1.6;
      }

      .otp-box {
        background-color: #f0f4ff;
        padding: 16px 0;
        text-align: center;
        font-size: 32px;
        font-weight: 600;
        color: #2d5bff;
        letter-spacing: 6px;
        border-radius: 8px;
        margin-bottom: 24px;
      }

      .note {
        font-size: 14px;
        color: #666;
        text-align: center;
        margin-bottom: 32px;
      }

      .footer {
        text-align: center;
        font-size: 12px;
        color: #aaa;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Verify Your Email</h2>
      </div>

      <p class="message">
        Hello 👋<br />
        Thank you for signing up! Use the following code to complete your signup:
      </p>

      <div class="otp-box">${code}</div>

      <p class="note">
        This code is valid for 5 minutes.<br />
        Please do not share this code with anyone.
      </p>

      <div class="footer">
        &copy; ${new Date().getFullYear()} YourAppName. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;
const loginOtpEmailTemplate = (code) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Login Verification</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f7f9fc;
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        color: #333;
      }

      .container {
        max-width: 480px;
        margin: 40px auto;
        background-color: #fff;
        padding: 32px;
        border-radius: 12px;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
      }

      .header {
        text-align: center;
        margin-bottom: 24px;
      }

      .header h2 {
        margin: 0;
        font-size: 24px;
        color: #2d5bff;
      }

      .message {
        font-size: 16px;
        margin: 0 0 20px;
        line-height: 1.6;
      }

      .otp-box {
        background-color: #f0f4ff;
        padding: 16px 0;
        text-align: center;
        font-size: 32px;
        font-weight: 600;
        color: #2d5bff;
        letter-spacing: 6px;
        border-radius: 8px;
        margin-bottom: 24px;
      }

      .note {
        font-size: 14px;
        color: #666;
        text-align: center;
        margin-bottom: 32px;
      }

      .footer {
        text-align: center;
        font-size: 12px;
        color: #aaa;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Login Verification</h2>
      </div>

      <p class="message">
        Hello 👋<br />
        A login attempt was made on your account. Use the OTP below to proceed:
      </p>

      <div class="otp-box">${code}</div>

      <p class="note">
        This code will expire in 5 minutes.<br />
        If this wasn't you, please ignore this message.
      </p>

      <div class="footer">
        &copy; ${new Date().getFullYear()} YourAppName. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;

const verificationOtpTemplate = (code) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f9fbfe;
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        color: #333;
      }

      .container {
        max-width: 480px;
        margin: 40px auto;
        background-color: #fff;
        padding: 32px;
        border-radius: 12px;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
      }

      .header {
        text-align: center;
        margin-bottom: 24px;
      }

      .header h2 {
        margin: 0;
        font-size: 24px;
        color: #2d5bff;
      }

      .message {
        font-size: 16px;
        margin: 0 0 20px;
        line-height: 1.6;
      }

      .otp-box {
        background-color: #f0f4ff;
        padding: 16px 0;
        text-align: center;
        font-size: 32px;
        font-weight: 600;
        color: #2d5bff;
        letter-spacing: 6px;
        border-radius: 8px;
        margin-bottom: 24px;
      }

      .note {
        font-size: 14px;
        color: #666;
        text-align: center;
        margin-bottom: 32px;
      }

      .footer {
        text-align: center;
        font-size: 12px;
        color: #aaa;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Email Verification</h2>
      </div>

      <p class="message">
        Thank you for joining us!<br />
        Please verify your email address using the code below:
      </p>

      <div class="otp-box">${code}</div>

      <p class="note">
        This code is valid for 5 minutes.<br />
        If you didn’t request this, you can safely ignore this email.
      </p>

      <div class="footer">
        &copy; ${new Date().getFullYear()} YourAppName. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;

const resetPasswordOtpTemplate = (code) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Password Reset OTP</title>
  <style>
    body {
      background-color: #f4f6fc;
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #333;
    }

    .container {
      max-width: 480px;
      margin: 40px auto;
      background: #fff;
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
    }

    .header {
      text-align: center;
      margin-bottom: 24px;
    }

    .header h2 {
      margin: 0;
      color: #2d5bff;
      font-size: 22px;
    }

    .content {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 28px;
      text-align: center;
    }

    .otp-box {
      display: inline-block;
      background-color: #f0f4ff;
      padding: 14px 24px;
      font-size: 24px;
      letter-spacing: 4px;
      color: #2d5bff;
      font-weight: bold;
      border-radius: 8px;
      margin-top: 16px;
    }

    .footer {
      text-align: center;
      font-size: 12px;
      color: #999;
      margin-top: 32px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Password Reset OTP</h2>
    </div>

    <div class="content">
      <p>Use the OTP code below to reset your password. This code is valid for 5 minutes:</p>

      <div class="otp-box">${code}</div>

      <p style="margin-top: 24px;">If you didn't request this, you can safely ignore this email.</p>
    </div>

    <div class="footer">
      &copy; ${new Date().getFullYear()} YourAppName. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

const notificationEmailTemplate = (title="Notification", message="simple message") => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f9fbfe;
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #333;
    }

    .container {
      max-width: 480px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
    }

    .header {
      text-align: center;
      margin-bottom: 24px;
    }

    .header h2 {
      margin: 0;
      font-size: 22px;
      color: #2d5bff;
    }

    .message {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .footer {
      text-align: center;
      font-size: 12px;
      color: #aaa;
      margin-top: 32px;
    }

    .highlight {
      color: #2d5bff;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>${title}</h2>
    </div>

    <p class="message">
      ${message}
    </p>

    <div class="footer">
      &copy; ${new Date().getFullYear()} YourAppName. All rights reserved.
    </div>
  </div>
</body>
</html>
`;



export const templateSelector=({purpose,code, message,title=""})=>{
    switch(purpose){
        case "signup":{
            return {
                subject:"Otp for signup purpose",
                html:signupOtpEmailTemplate(code)
            }
        }

        case "login":{
            return {
                subject:"OTP for login purpose",
                html:loginOtpEmailTemplate(code)
            }
        }
        case "verification":{
            return {
                subject:"OTP for verification purpose",
                html:verificationOtpTemplate(code)
            }
        }
        case "reset_password":{
            return {
                subject:"OTP for reset/change password",
                html:resetPasswordOtpTemplate(code)
            }
        }
        default:{
            return {
                subject:"Notification for activity",
                html:notificationEmailTemplate({message,title:"notification"})
            }
        }
    }

}