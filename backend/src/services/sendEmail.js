import nodemailer from "nodemailer"
import { configDotenv } from "dotenv"
import { templateSelector } from "../utils/templateSelector.js";
configDotenv();

const sendEmail=async({to,code,purpose})=>{

    try {

        //  1: create transporter
         const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
         })
        

         // geenrate template
         const {html,subject}=templateSelector({purpose,code})
          // 2: mail options
         const mailOption={
            from:`${process.env.APP_NAME}`,
            to,
            subject,
            html
         }

         const info=await transporter.sendMail(mailOption);
         console.log(info)
         return true
        
    } catch (error) {
        console.log("Error sending email:-",error)
        return false;
        
    }

}

export default sendEmail;