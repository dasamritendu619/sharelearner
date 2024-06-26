import { Router } from "express";
import { verifyJWT,checkCurrentUser} from "../middlewares/auth.middleware.js";
import {
    registerUser,
    verifyUser,
    loginUser,
    logoutUser,
    getCurrentUser,
} 
from "../controllers/user.controller.js";


const router = Router();
router.route("/register").post(registerUser);
router.route("/verify").post(verifyUser);
router.route("/login").post(loginUser); 
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/me").get(verifyJWT,getCurrentUser);

export default router;