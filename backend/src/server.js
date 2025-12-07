import express from 'express'
import connectDb from "../configs/connectDb.js";
import loggerMiddleware from "./middlewares/loggerMiddleware.js";
import { httpServer, app } from "./socket/socket.js";
import logger from "./utils/logger.js";
import cors from "cors"
import cookieParser from "cookie-parser"

import { configDotenv } from "dotenv"

// ===========importing routes==============
import authRouter from './routes/authRoutes.js';
import shopRouter from './routes/shopRoutes.js';
import vehicleRouter from './routes/vehicleRoutes.js';
import vehicleApplicationRouter from './routes/vehicleApplicationRoutes.js';

configDotenv();



//====root level middlewares==============
app.use(cors({
    origin: process.env.FRONTEND_URL
}))

app.set('trust proxy', true);
app.use(express.json());
app.use(loggerMiddleware)
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// ===== routes middleware=========
app.use("/auth", authRouter);
app.use("/shop", shopRouter);
app.use("/vehicle", vehicleRouter);
app.use("/application", vehicleApplicationRouter)



app.get("/", (req, res) => {
    res.send("Server working")
})







const PORT = process.env.PORT || 5000;

connectDb().then(() => {
    httpServer.listen(PORT, () => {
        logger.info(`Server listening at port: ${PORT}`)
    })
}).catch((err) => {
    logger.error("Some error at initial server startup,", err)
})

