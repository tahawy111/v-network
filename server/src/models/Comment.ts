import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IComment {
    _id: Schema.Types.ObjectId;
    content: string;
    tag: object;
    reply: Schema.Types.ObjectId;
    likes: Schema.Types.ObjectId[];
    user: Schema.Types.ObjectId;
    postId: Schema.Types.ObjectId;
    postUserId: Schema.Types.ObjectId;
}

// 2. Create a Schema corresponding to the document interface.
const commentSchema = new Schema<IComment>({
    content: { type: String, required: true },
    tag: Object,
    reply: Schema.Types.ObjectId,
    likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    postId: Schema.Types.ObjectId,
    postUserId: Schema.Types.ObjectId
}, {
    timestamps: true
});

// 3. Create a Model.
const Comment = model<IComment>('comment', commentSchema);

// 4. Export Model
export default Comment;