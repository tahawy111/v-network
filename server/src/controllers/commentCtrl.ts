import { Response } from "express";
import { IReqAuth } from "../types/typescript";
import Comment from "../models/Comment";
import Post from "../models/Post";

const commentCtrl = {
    createComment: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." });
        try {
            const { postId, content, tag, reply } = req.body;

            const newComment = new Comment({ user: req.user._id, content, tag, reply, postId });

            await Post.findByIdAndUpdate(postId, {
                $push: { comments: newComment._id }
            }, { new: true });

            await newComment.save();

            res.json({ newComment });

        } catch (error) {

        }
    },
};

export default commentCtrl;