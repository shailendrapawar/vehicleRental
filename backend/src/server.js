import express from "express"
const app = express();

import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser"
import connectDb from "../configs/dbConnect.js";

// importing routes========================

import adminRouter from "./routes/adminRoutes.js";
import authRouter from "./routes/authRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import cors from "cors"
configDotenv()

// root middlewares======================
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use(express.json())
app.use(cookieParser())
// importing routes
app.use("/admin",adminRouter);
app.use("/auth",authRouter);
app.use("/owner",ownerRouter)





const PORT = process.env.PORT || 5000
//listen only when db connected
connectDb().then((v) => {

    app.listen(PORT, () => {
        console.log("server listening at: " + PORT)
    })

}).catch((err) => {
    console.error("Error while connecting to Database", err);
})
