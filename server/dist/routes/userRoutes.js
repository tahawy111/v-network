"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userCtrl_1 = __importDefault(require("../controllers/userCtrl"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.get('/search', userCtrl_1.default.searchUsers);
router.get('/:id', userCtrl_1.default.getUser);
router.put('/', auth_1.default, userCtrl_1.default.updateUser);
exports.default = router;
