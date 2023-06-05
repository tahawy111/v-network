import { Request, Response } from "express";
import User, { IUser } from "../models/User";
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

            const user = await User.findById(req.params.id).select(`-password`).populate("followers following");
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

            const updatedUser = await User.findByIdAndUpdate(req.user?._id, { fullname, avatar, mobile, address, story, website, gender }, { new: true }).select(`-password`).populate("followers following");

            res.json({ msg: "Update Success!", updatedUser });

        } catch (error: any) {
            return res.status(400).json({ msg: error.message });
        }
    },
    follow: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication" });
        try {
            const { followedId } = req.body;
            const followerId = req.user?._id as any;
            const userFollowed = await User.findById(followedId).select(`-password`).populate("followers following");
            if (!userFollowed) return res.status(404).json({ msg: 'This user is not exist.' });
            if (userFollowed.followers.map((user) => user._id === followedId).length > 0) return res.status(403).json({ msg: 'This user is already in the followers list.' });

            userFollowed.followers.push(followerId);
            await userFollowed.save();

            const follower = await User.findById(followerId);
            if (!follower) return res.status(404).json({ msg: 'This user is not exist.' });
            follower.following.push(followedId);
            await follower.save();
            res.json({ msg: "Added 1 follower", user: userFollowed });

        } catch (error: any) {
            return res.status(400).json({ msg: error.message });
        }
    },
    unfollow: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication" });
        try {
            const { followedId } = req.body;
            const followerId = req.user?._id;
            const userFollowed = await User.findById(followedId).select(`-password`).populate("followers following");
            if (!userFollowed) return res.status(404).json({ msg: 'This user is not exist.' });
            if (!userFollowed.followers.map((user) => user === followedId)) return res.status(403).json({ msg: 'This user is not exsit in the followers list.' });
            // removing user id from followers array
            userFollowed.followers = userFollowed.followers.filter((user: IUser) => user._id.toString() !== followerId.toString());
            await userFollowed.save();

            const follower = await User.findById(followerId);
            if (!follower) return res.status(404).json({ msg: 'This user is not exist.' });
            follower.following = follower.following.filter((user: IUser) => user._id.toString() !== followedId.toString());
            await follower.save();

            res.json({ msg: "Removed 1 follower", user: userFollowed });

        } catch (error: any) {
            return res.status(400).json({ msg: error.message });
        }
    },
    getUsers: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication" });
        try {

            const users = await User.find({ _id: req.body.ids });

            return res.json({ users });
        } catch (error: any) {
            return res.status(400).json({ msg: error.message });
        }
    },
};

export default userCtrl;