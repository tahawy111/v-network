import { Request, Response } from "express";
import User from "../models/User";
import { IReqAuth } from "../types/typescript";

const userCtrl = {
    searchUsers: async (req: Request, res: Response) => {
        try {

            const users = await User.find({ username: { $regex: req.query.username } }).limit(10).select("fullname username avatar");
            res.json({ users });
        } catch (error: any) {
            return res.status(400).json({ msg: error.message });
        }
    },
    getUser: async (req: Request, res: Response) => {
        try {

            const user = await User.findById(req.params.id).select(`-password`);
            if (!user) return res.status(400).json({ msg: "User does not exist." });
            res.json({ user });
        } catch (error: any) {
            return res.status(400).json({ msg: error.message });
        }
    },
    updateUser: async (req: IReqAuth, res: Response) => {
        try {
            const { fullname, avatar, mobile, address, story, website, gender } = req.body;
            if (!fullname) return res.status(404).json({ msg: 'Please add your full name.' });

            const updatedUser = await User.findByIdAndUpdate(req.user?._id, { fullname, avatar, mobile, address, story, website, gender }, { new: true });

            res.json({ msg: "Update Success!", updatedUser });

        } catch (error: any) {
            return res.status(400).json({ msg: error.message });
        }
    },
    follow: async (req: IReqAuth, res: Response) => {
        try {
            const { followedId, followerId } = req.body;

            const userFollowed = await User.findById(followedId);
            if (!userFollowed) return res.status(404).json({ msg: 'This user is not exist.' });
            if (userFollowed.followers.includes(followerId)) return res.status(403).json({ msg: 'This user is already in the followers list.' });
            userFollowed.followers.push(followerId);
            await userFollowed.save();

            res.json({ msg: "Added 1 follower", user: userFollowed });

        } catch (error: any) {
            return res.status(400).json({ msg: error.message });
        }
    },

};

export default userCtrl;