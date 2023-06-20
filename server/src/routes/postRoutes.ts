import { Router } from "express";
import postCtrl from "../controllers/postCtrl";
import auth from "../middleware/auth";

const router = Router();

router.route('/').post(auth, postCtrl.createPost).get(auth, postCtrl.getPosts);
router.put(`/:id`, auth, postCtrl.updatePost);
router.put(`/like/:id`, auth, postCtrl.like);
router.put(`/unLike/:id`, auth, postCtrl.unLike);
router.get(`/userPosts/:id`, auth, postCtrl.getUserPosts);

export default router;