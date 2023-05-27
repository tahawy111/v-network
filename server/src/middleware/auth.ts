import { NextFunction, Request, Response } from "express";
import { IReqAuth } from "../types/typescript";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const auth = async (req: IReqAuth, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization");

        if (!token) return res.status(400).json({ msg: "Invalid Authentication." });

        const decoded: any = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
        if (!decoded) return res.status(400).json({ msg: "Invalid Authentication." });

        const user = await User.findOne({ _id: decoded.id });

        req.user = user as IUser;
        next();
    } catch (err: any) {
        return res.status(500).json({ msg: err.message });
    }
};


export default auth;