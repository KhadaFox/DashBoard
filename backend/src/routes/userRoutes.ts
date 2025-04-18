import { Router } from "express";
import { createUser } from "../controllers/userController";

const router = Router();

router.post("/users", createUser);

export default router;
import { loginUser } from "../controllers/userController";

router.post("/login", loginUser);
import { authenticateToken } from "../middlewares/authMiddleware";

router.get("/profile", authenticateToken, (req, res) => {
  return res.json({
    message: "Rota protegida acessada com sucesso!",
    user: req.user,
  });
});
