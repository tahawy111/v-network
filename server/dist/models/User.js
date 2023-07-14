"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const userSchema = new mongoose_1.Schema({
    fullname: { type: String, default: "" },
    username: { type: String, required: true, trim: true, maxlength: 25, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "https://i.imgur.com/YY4LxJt.png" },
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
    followers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'user' }],
    following: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'user' }],
    saved: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'user' }]
}, {
    timestamps: true
});
// 3. Create a Model.
const User = (0, mongoose_1.model)('user', userSchema);
// 4. Export Model
exports.default = User;
