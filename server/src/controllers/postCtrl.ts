import { Response } from "express";
import { IReqAuth } from "../types/typescript";
import Post from "../models/Post";


export const Pagination = (
    req: IReqAuth
): { page: number; limit: number; skip: number; } => {
    let page = Number(req.query.page) * 1 || 1;
    let limit = Number(req.query.limit) * 1 || 3;
    let skip = (page - 1) * limit;

    return { page, limit, skip };
};



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

        const { limit } = Pagination(req);

        try {

            const posts = await Post.find({ user: [...req.user?.following, req.user._id] })
                .populate("user likes", "avatar username fullname")
                .populate({ path: "comments", populate: { path: "user likes", select: "-password" } })
                .sort({ createdAt: -1 }).limit(limit);

            res.json({ msg: "Success!", posts, postsLength: (await Post.find()).length });
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
        const { limit } = Pagination(req);
        try {
            console.log("userPosts", req.params.id);
            const posts = await Post.find({ user: req.params.id })
                .populate("user likes", "avatar username fullname")
                .populate({ path: "comments", populate: { path: "user likes", select: "-password" } })
                .sort({ createdAt: -1 }).limit(limit);


            res.json({ posts, postsLength: (await Post.find()).length });
        } catch (error) {

        }
    },
};

export default postCtrl;