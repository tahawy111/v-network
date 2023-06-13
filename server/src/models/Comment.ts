import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IComment {
    _id: string;
    content: string;
    images: any;
    likes: any[];
    comments: any[];
    user: Schema.Types.ObjectId
}

// 2. Create a Schema corresponding to the document interface.
const commentSchema = new Schema<IComment>({
    content: String,
    images: { type: Array, default: [] },
    likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
    user: { type: Schema.Types.ObjectId, ref: 'user' }
}, {
    timestamps: true
});

// 3. Create a Model.
const Comment = model<IComment>('comment', commentSchema);

// 4. Export Model
export default Comment;