import { Router } from "express";
import postCtrl from "../controllers/postCtrl";
import auth from "../middleware/auth";

const router = Router();

router.route('/').post(auth, postCtrl.createPost).get(auth, postCtrl.getPosts);
router.route(`/:id`).put(auth, postCtrl.updatePost);
router.put(`/like/:id`, auth, postCtrl.like);
router.put(`/unLike/:id`, auth, postCtrl.unLike);

export default router;