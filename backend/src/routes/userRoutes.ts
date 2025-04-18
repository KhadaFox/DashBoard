import { Router } from "express";
import { createUser, loginUser } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/users", async (req, res) => {
  await createUser(req, res);
});

router.post("/login", async (req, res) => {
  await loginUser(req, res);
});

router.get("/profile", authenticateToken, async (req, res) => {
  res.json({
    message: "Rota protegida acessada com sucesso!",
    userId: req.userId,
  });
});

export default router;
