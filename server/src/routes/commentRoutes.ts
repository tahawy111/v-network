import { Router } from "express";
import postCtrl from "../controllers/postCtrl";
import auth from "../middleware/auth";

const router = Router();

// router.route('/').post(auth, postCtrl.createPost).get(auth, postCtrl.getPosts);

export default router;