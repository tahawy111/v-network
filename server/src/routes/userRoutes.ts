import { Router } from "express";
import userCtrl from "../controllers/userCtrl";
import auth from "../middleware/auth";

const router = Router();

router.get('/search', userCtrl.searchUsers);
router.get('/:id', userCtrl.getUser);
router.put('/', auth, userCtrl.updateUser);
router.put('/follow', auth, userCtrl.follow);
router.put('/unfollow', auth, userCtrl.unfollow);


export default router;