import { Response } from "express";
import { IReqAuth } from "../types/typescript";
import Post from "../models/Post";

const postCtrl = {
    createPost: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." });
        try {
            const { content, images } = req.body;

            const newPost = new Post({ content, images, user: req.user._id });

            await newPost.save();

            res.json({ msg: "Post Created", newPost });
        } catch (error) {

        }
    },
    getPosts: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." });
        try {

            const posts = await Post.find({ user: [...req.user?.following, req.user._id] }).populate("user likes", "avatar username fullname").sort({ createdAt: -1 });

            console.log(posts);

            res.json({ msg: "Success!", posts });
        } catch (error) {

        }
    },
    updatePost: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." });
        try {
            const { content, images } = req.body;
            const post = await Post.findByIdAndUpdate(req.params.id, { content, images }, { new: true }).populate("user likes", "avatar username fullname");

            console.log(post);

            res.json({ msg: "Post Updated!", post });
        } catch (error) {

        }
    },
};

export default postCtrl;