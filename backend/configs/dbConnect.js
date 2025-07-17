import {configDotenv} from "dotenv"
configDotenv();

import mongoose from "mongoose"

const connectDb=async()=>{
    const res=await  mongoose.connect(process.env.MONGO_URL);
    if(res){
        console.log("databse connected")
        return true
    }else{
        console.log("error in connecting to databse")
        return false
    }
}

export default connectDb;