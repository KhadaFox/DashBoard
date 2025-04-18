import { Request, Response, RequestHandler } from "express";
import prisma from "../lib/prisma";

interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const createTransaction: RequestHandler = async (req, res) => {
  const { title, amount, type } = req.body;
  const userId = req.userId;

  if (typeof userId !== "number") {
    res.status(400).json({ error: "ID do usuário inválido." });
    return;
  }

  try {
    const transaction = await prisma.transaction.create({
      data: { title, amount, type, userId },
    });

    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar transação" });
  }
};

export const getTransactions: RequestHandler = async (req, res) => {
  const userId = req.userId;

  if (typeof userId !== "number") {
    res.status(400).json({ error: "ID do usuário inválido." });
    return;
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar transações" });
  }
};


