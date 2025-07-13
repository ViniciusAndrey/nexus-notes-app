import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import notesRoutes from '../backend/src/notes/notes.routes';

dotenv.config();

const app = express();

// Configuração CORS para produção
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Rota raiz para teste
app.get('/', (req, res) => {
  res.json({ 
    message: 'Nexus API está funcionando!', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Rotas
app.use('/notes', notesRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Conectar ao MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nexus';
    await mongoose.connect(mongoURI);
    console.log('✅ Conectado ao MongoDB');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
  }
};

// Conectar ao banco quando a função for chamada
connectDB();

// Exportar para Vercel
export default app; 