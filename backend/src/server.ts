import express from "express";
import userRoutes from "../src/routes/userRoutes";
import transactionRoutes from "../src/routes/transactionRoutes";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Caminhos base corrigidos
app.use("/api", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use(express.json());
app.use("/auth", authRoutes);

app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});
