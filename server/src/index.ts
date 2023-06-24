import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes";
import { Server } from "socket.io";
import { createServer } from "http";
import { SocketServer } from "./utils/socket";

// Enable Dotenv
dotenv.config();


// Mongodb Connecting
mongoose.connect(`${process.env.DATABASE_URL}`).then(() => console.log("DB Connected"));


// App Configuration
const app = express();
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(cookieParser());



// Socket.io
const http = createServer(app);
export const io = new Server(http, {
    cors: { origin: "*" },
});

io.on("connection", SocketServer);

// Routing
routes(app);

// Server Listening
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => console.log(`App is Listening at http://localhost:${PORT}`));