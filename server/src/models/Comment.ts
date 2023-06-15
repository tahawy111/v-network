import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IComment {
    _id: string;
    content: string;
    tag: object;
    
}

// 2. Create a Schema corresponding to the document interface.
const commentSchema = new Schema<IComment>({
    content: { type: String, required: true },
    tag: Object
}, {
    timestamps: true
});

// 3. Create a Model.
const Comment = model<IComment>('comment', commentSchema);

// 4. Export Model
export default Comment;