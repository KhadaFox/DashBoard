import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes"; // caminho relativo correto

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRoutes); // /api/users

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
