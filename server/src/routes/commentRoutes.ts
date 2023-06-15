import { Router } from "express";
import commentCtrl from "../controllers/commentCtrl";
import auth from "../middleware/auth";

const router = Router();

router.post("/", auth, commentCtrl.createComment);

export default router;