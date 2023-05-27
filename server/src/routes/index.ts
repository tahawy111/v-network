import { Express } from "express";
import authRoutes from "../routes/authRoutes"
import userRoutes from "../routes/userRoutes"

export default function (app: Express) { 
    app.use("/api/auth", authRoutes);
    app.use("/api/user", userRoutes);
}