"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoutes_1 = __importDefault(require("../routes/authRoutes"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
function default_1(app) {
    app.use("/api/auth", authRoutes_1.default);
    app.use("/api/user", userRoutes_1.default);
}
exports.default = default_1;
