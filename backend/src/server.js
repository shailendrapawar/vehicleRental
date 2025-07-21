import express from "express"
const app = express();

import { configDotenv } from "dotenv";
import connectDb from "../configs/dbConnect.js";
import adminRouter from "./routes/adminRoutes.js";
configDotenv()

// root middlewares======================
app.use(express.json())
// importing routes
app.use("/admin",adminRouter);





const PORT = process.env.PORT || 5000
//listen only when db connected
connectDb().then((v) => {

    app.listen(PORT, () => {
        console.log("server listening at: " + PORT)
    })

}).catch((err) => {
    console.error("Error while connecting to Database", err);
})
