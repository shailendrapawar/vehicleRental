import express from "express"
const app = express();

import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser"
import connectDb from "../configs/dbConnect.js";
import adminRouter from "./routes/adminRoutes.js";
import authRouter from "./routes/authRoutes.js";
configDotenv()

// root middlewares======================
app.use(express.json())
app.use(cookieParser())
// importing routes
app.use("/admin",adminRouter);
app.use("/auth",authRouter);





const PORT = process.env.PORT || 5000
//listen only when db connected
connectDb().then((v) => {

    app.listen(PORT, () => {
        console.log("server listening at: " + PORT)
    })

}).catch((err) => {
    console.error("Error while connecting to Database", err);
})
