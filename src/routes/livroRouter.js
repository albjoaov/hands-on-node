import express from "express";
import LivroController from "../controllers/livroController.js";
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();
router.use(authMiddleware)

router.post("/", LivroController.create)
router.put("/:id", LivroController.update)
router.get("/:id", LivroController.read)
router.delete("/:id", LivroController.delete)

export default router;