import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { uploadMiddleware } from "../middlewares/multer.middleware.js";

const router = Router();

// wherever we have file upload, we will use upload middleware files
router
  .route("/register")
  .post(
    uploadMiddleware.fields([
      { name: "avatar", maxCount: 1, name: "coverImage", maxCount: 1 },
    ]),
    registerUser
  );
router.route("/login").post(loginUser);

export default router;
