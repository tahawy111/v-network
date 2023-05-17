import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes";

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



// Routing
routes(app);

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is Listening at http://localhost:${PORT}`));