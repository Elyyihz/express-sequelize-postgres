import express from 'express';
import dotenv from 'dotenv';
import sequelize from './db.js';
import userRoutes from './routes/user.js';
import messageRoutes from './routes/message.js';
import cors from "cors";
import path from 'path';

const app = express();

app.use(cors({
  origin: ["*","http://localhost:3000", "https://express-sequelize-postgres.vercel.app/"]
}));

dotenv.config();
app.use(express.json());

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(express.static(path.join(path.resolve(), 'public')));

app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

sequelize.authenticate()
  .then(() => console.log('Conexão com DB realizada com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao DB:', err));

sequelize.sync({ alter: true });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
