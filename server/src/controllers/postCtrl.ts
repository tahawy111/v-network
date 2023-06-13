import { Response } from "express";
import { IReqAuth } from "../types/typescript";
import Post from "../models/Post";

const postCtrl = {
    createPost: async (req: IReqAuth, res: Response) => {
        try {
            const { content, images } = req.body;

            const newPost = await Post.create({ content, images });

            res.json({ msg: "Post Created", newPost });
        } catch (error) {

        }
    }
};

export default postCtrl;