import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import notesRoutes from './notes/notes.routes';
import usersRoutes from './users/users.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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
app.use('/users', usersRoutes);
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
    process.exit(1);
  }
};

// Iniciar servidor
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  });
};

startServer();
