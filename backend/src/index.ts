import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import notesRoutes from './notes/notes.routes';
import connectDB from '../config/database';

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar ao MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/notes', notesRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'Nexus API está funcionando!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📝 API disponível em http://localhost:${PORT}`);
});
