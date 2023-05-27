import { Router } from "express";
import userCtrl from "../controllers/userCtrl";
import auth from "../middleware/auth";

const router = Router();

router.get('/search', userCtrl.searchUsers);


export default router;