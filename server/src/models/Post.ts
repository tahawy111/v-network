import { Schema, model } from 'mongoose';
import { IUser } from './User';

// 1. Create an interface representing a document in MongoDB.
export interface IPost {
    _id: string;
    content: string;
    images: any;
    likes: any[];
    comments: any[];
    user: Schema.Types.ObjectId
}

// 2. Create a Schema corresponding to the document interface.
const postSchema = new Schema<IPost>({
    content: String,
    images: { type: Array, default: [] },
    likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
    user: { type: Schema.Types.ObjectId, ref: 'user' }
}, {
    timestamps: true
});

// 3. Create a Model.
const Post = model<IPost>('post', postSchema);

// 4. Export Model
export default Post;