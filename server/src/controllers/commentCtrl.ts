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

            await (await newComment.save()).populate("user likes");

            res.json({ newComment });

        } catch (error) {

        }
    },
    updateComment: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." });
        try {
            const { content } = req.body;

            const comment = await Comment.findByIdAndUpdate(req.params.id, { content }, { new: true }).populate("user likes");

            res.json({ comment });

        } catch (error) {

        }
    },
    likeComment: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." });
        try {
            const comment = await Comment.findByIdAndUpdate(req.params.id, { $push: { likes: req.user._id } }, { new: true }).populate("user likes");

            res.json({ comment });

        } catch (error) {

        }
    },
    unLikeComment: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." });
        try {
            
            const comment = await Comment.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true }).populate("user likes");

            res.json({ comment });

        } catch (error) {

        }
    },
};

export default commentCtrl;