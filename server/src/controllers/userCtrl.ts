import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import bcrypt from 'bcrypt';
import { generateAccessToken, generateActiveToken, generateRefreshToken } from "../utils/generateToken";
import sendMail from "../utils/sendMail";
import { validEmail } from "../utils/valid";
import { verify } from "jsonwebtoken";
import { IToken } from "../utils/interface";
import { IReqAuth } from "../types/typescript";


const userCtrl = {
    searchUsers: async (req: IReqAuth, res: Response) => {
        try {
            const users = await User.find({ username: { regex: req.query.username } }).limit(10).select("fullname username avatar");
            res.json({ users });
        } catch (error: any) {
            return res.status(400).json({ msg: error.message });
        }
    },

};

export default userCtrl;