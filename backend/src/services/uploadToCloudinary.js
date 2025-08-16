import  {v2 as Cloudinary} from "cloudinary"
import {configDotenv} from "dotenv"
import fs from "fs"
import sharp from "sharp"
configDotenv();

Cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
})
const uploadToCloudinary=async(filePath)=>{


    try {


        const result=await Cloudinary.uploader.upload(filePath,{
            folder:"vehicleRental"
        })

        await fs.unlinkSync(filePath);

        return {
            url:result.secure_url,
            publicId:result.public_id
        }
        
    } catch (error) {
       throw new Error('Cloudinary upload failed');
    }
}

export default uploadToCloudinary;