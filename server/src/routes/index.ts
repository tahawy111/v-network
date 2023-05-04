import { Express } from "express";
import authRoutes from "../routes/authRoutes"

export default function (app: Express) { 
    app.use("/api/auth", authRoutes);
}