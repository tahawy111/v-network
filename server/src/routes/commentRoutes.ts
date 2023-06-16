import { Router } from "express";
import commentCtrl from "../controllers/commentCtrl";
import auth from "../middleware/auth";

const router = Router();

router.post("/", auth, commentCtrl.createComment);
router.put("/:id", auth, commentCtrl.updateComment);
router.put("/like/:id", auth, commentCtrl.likeComment);
router.put("/unLike/:id", auth, commentCtrl.unLikeComment);

export default router;