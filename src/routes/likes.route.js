import { Router } from "express";
import {
    toggleLikeComment,
    toggleLikeReply,
    toggleLikePost,
} from "../controllers/likes.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/post/:postId").post(toggleLikePost);
router.route("/comment/:commentId").post(toggleLikeComment);
router.route("/reply/:replyId").post(toggleLikeReply);

export default router;