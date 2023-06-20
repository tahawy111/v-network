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

            const posts = await Post.find({ user: [...req.user?.following, req.user._id] })
                .populate("user likes", "avatar username fullname")
                .populate({ path: "comments", populate: { path: "user likes", select: "-password" } })
                .sort({ createdAt: -1 });

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
    like: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." });
        try {
            const { likeUserId } = req.body;
            const post = await Post.findByIdAndUpdate(req.params.id, {
                $push: { likes: likeUserId }
            }, { new: true }).populate("user likes", "avatar username fullname");

            res.json({ msg: "Post Updated!", post });
        } catch (error) {

        }
    },
    unLike: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." });
        try {
            const { likeUserId } = req.body;
            const post = await Post.findByIdAndUpdate(req.params.id, {
                $pull: { likes: likeUserId }
            }, { new: true }).populate("user likes", "avatar username fullname");

            res.json({ msg: "Post Updated!", post });
        } catch (error) {

        }
    },
    getUserPosts: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." });
        try {
            console.log("userPosts", req.params.id);
            const posts = await Post.find({ user: req.params.id })
            .populate("user likes", "avatar username fullname")
            .populate({ path: "comments", populate: { path: "user likes", select: "-password" } })
            .sort({ createdAt: -1 });

            console.log("userPosts",posts);
            

            res.json({ posts });
        } catch (error) {

        }
    },
};

export default postCtrl;