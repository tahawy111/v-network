import { Router } from "express";
import authCtrl from "../controllers/authCtrl";

const router = Router();

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.post('/active', authCtrl.active);
// router.post('/logout', authCtrl.logout);
router.get('/refresh_token', authCtrl.generateAccessToken);


export default router;