"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authCtrl_1 = __importDefault(require("../controllers/authCtrl"));
const router = (0, express_1.Router)();
router.post('/register', authCtrl_1.default.register);
router.post('/login', authCtrl_1.default.login);
router.post('/active', authCtrl_1.default.active);
// router.post('/logout', authCtrl.logout);
router.get('/refresh_token', authCtrl_1.default.generateAccessToken);
exports.default = router;
