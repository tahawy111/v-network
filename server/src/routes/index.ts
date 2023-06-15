import { Express } from "express";
import authRoutes from "../routes/authRoutes"
import userRoutes from "../routes/userRoutes"
import postRoutes from "../routes/postRoutes"
import commentRoutes from "../routes/commentRoutes"

export default function (app: Express) { 
    app.use("/api/auth", authRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/post", postRoutes);
    app.use("/api/comment", commentRoutes);
}