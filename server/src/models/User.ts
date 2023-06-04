import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
    _id: string;
    fullname: string;
    username: string;
    email: string;
    password: string;
    avatar: { url: string; public_id: string; };
    role: string;
    gender: string;
    mobile: string;
    address: string;
    story: string;
    website: string;
    followers: string[];
    following: string[];
    saved: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    fullname: { type: String, default: "" },
    username: { type: String, required: true, trim: true, maxlength: 25, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: Object, default: { url: "https://i.imgur.com/YY4LxJt.png", public_id: "" } },
    role: { type: String, default: 'user' },
    gender: { type: String, default: 'male' },
    mobile: { type: String, default: '' },
    address: { type: String, default: '' },
    story: {
        type: String,
        default: '',
        maxlength: 200
    },
    website: { type: String, default: '' },
    followers: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    saved: [{ type: Schema.Types.ObjectId, ref: 'user' }]
}, {
    timestamps: true
});

// 3. Create a Model.
const User = model<IUser>('user', userSchema);

// 4. Export Model
export default User;