import express from "express";
import AuthController from "../controllers/authController.js"

const router = express.Router();

router.post("/register", AuthController.userRegister)
router.post("/login", AuthController.auth)

export default router;