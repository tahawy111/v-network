import { Router } from "express";
import postCtrl from "../controllers/postCtrl";
import auth from "../middleware/auth";

const router = Router();

router.route('/').post(auth, postCtrl.createPost).get(auth, postCtrl.getPosts);
router.route(`/:id`).put(auth, postCtrl.updatePost).delete(auth, postCtrl.deletePost);
router.put(`/like/:id`, auth, postCtrl.like);
router.put(`/unLike/:id`, auth, postCtrl.unLike);
router.get(`/userPosts/:id`, auth, postCtrl.getUserPosts);
router.get(`/discover`, postCtrl.getDiscoverPosts);
router.get(`/savePost/:id`, auth, postCtrl.savePost);
router.get(`/unSavePost/:id`, auth, postCtrl.unSavePost);

export default router;