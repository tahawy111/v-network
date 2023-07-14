"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const userCtrl = {
    searchUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield User_1.default.find({ username: { $regex: req.query.username } }).limit(10).select("fullname username avatar");
            res.json({ users });
        }
        catch (error) {
            return res.status(400).json({ msg: error.message });
        }
    }),
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User_1.default.findById(req.params.id).select(`-password`);
            if (!user)
                return res.status(400).json({ msg: "User does not exist." });
            res.json({ user });
        }
        catch (error) {
            return res.status(400).json({ msg: error.message });
        }
    }),
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { fullname, avatar, mobile, address, story, website, gender } = req.body;
            if (!fullname)
                return res.status(404).json({ msg: 'Please add your full name.' });
            const updatedUser = yield User_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a._id, { fullname, avatar, mobile, address, story, website, gender });
            res.json({ msg: "Update Success!", updatedUser });
        }
        catch (error) {
            return res.status(400).json({ msg: error.message });
        }
    }),
};
exports.default = userCtrl;
