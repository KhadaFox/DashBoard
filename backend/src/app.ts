import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import transactionRoutes from './routes/transactionRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes); // rota certa para o Dashboard.tsx
app.use('/api', userRoutes);

export default app;
