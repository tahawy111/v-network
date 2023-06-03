import { Router } from "express";
import userCtrl from "../controllers/userCtrl";
import auth from "../middleware/auth";

const router = Router();

router.get('/search', userCtrl.searchUsers);
router.get('/:id', userCtrl.getUser);
router.put('/:id', auth, userCtrl.updateUser);


export default router;