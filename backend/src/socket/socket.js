import {Server} from "socket.io"
import {createServer} from "http"
import express from "express"
import logger from "../utils/logger.js";

// 1: create exprerss server
const app=express();

//2: wrap in http server
const httpServer=createServer(app)

//3: make a socket http server
const io=new Server(httpServer,{
    cors:{
        origin:"*"
    }
})


// 4: Socket.IO connection
io.on("connection", (socket) => {
  logger.info("🔗 User connected:", socket.id)




  socket.on("disconnect", () => {
    logger.info("❌ User disconnected:", socket.id)
  });
});



export {app,httpServer, io}