import { RequestHandler } from "express";
import prisma from "../prisma/client";
import bcrypt from "bcryptjs";

export const createUser: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res.status(400).json({ error: "Erro ao criar usuário." });
  }
};
import jwt from "jsonwebtoken";

// ...

export const loginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      { userId: user.id, name: user.name },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Erro no login" });
  }
};

