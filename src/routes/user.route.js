import { Router } from "express";
import { verifyJWT,checkCurrentUser} from "../middlewares/auth.middleware.js";
import {
    registerUser,
    verifyUser,
} 
from "../controllers/user.controller.js";


const router = Router();
router.route("/register").post(registerUser);

export default router;