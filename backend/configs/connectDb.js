import mongoose from "mongoose"
import { configDotenv } from "dotenv";
import logger from "../src/utils/logger.js";
configDotenv();

const connectDb = async () => {
    const DB_NAME=process.env.DB_NAME
  try {
    const start=Date.now();
    const res = await mongoose.connect(process.env.MONGO_URL,{
        dbName:DB_NAME
    });

    const end=Date.now();
    const timeTaken = ((end - start) / 1000).toFixed(2); // 2 decimal places

    logger.success(`✅  DB-(${DB_NAME}) connected in: ${timeTaken}s`)

  } catch (error) {
    console.error(`❌ DB-(${DB_NAME}) connection error:`, error.message);
    // process.exit(1); // stop app if DB fails
  }
};

export default connectDb;