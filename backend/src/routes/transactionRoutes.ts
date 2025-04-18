import { Router } from "express";
import { createTransaction, getTransactions } from "../controllers/transactionController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authenticateToken, createTransaction);
router.get("/", authenticateToken, getTransactions);

export default router;
