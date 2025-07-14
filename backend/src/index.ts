import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import notesRoutes from './notes/notes.routes';
import usersRoutes from './users/users.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração CORS melhorada
const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    // Permitir requisições sem origin (como mobile apps ou Postman)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      // Desenvolvimento local
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3001',
      
      // Render - Frontend
      'https://nexus-notes-app-frontend.onrender.com',
      'https://nexus-notes-app-frontend.render.com',
      
      // Render - Backend (para testes)
      'https://nexus-notes-app-backend.onrender.com',
      'https://nexus-notes-app-backend.render.com',
      
      // Vercel (caso use no futuro)
      'https://nexus-notes-app.vercel.app',
      'https://nexus-notes-app-frontend.vercel.app',
      
      // Netlify (caso use no futuro)
      'https://nexus-notes-app.netlify.app',
      
      // Variável de ambiente para URLs customizadas
      process.env.FRONTEND_URL
    ].filter(Boolean); // Remove valores undefined/null
    
    console.log('🌐 Origin recebida:', origin);
    console.log('✅ Origins permitidas:', allowedOrigins);
    
    if (allowedOrigins.includes(origin)) {
      console.log('✅ Origin permitida:', origin);
      callback(null, true);
    } else {
      console.log('❌ Origin bloqueada:', origin);
      callback(new Error('Não permitido pelo CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200 // Para compatibilidade com alguns navegadores
};

app.use(cors(corsOptions));

// Middleware adicional para garantir headers CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Responder imediatamente para requisições OPTIONS
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

// Middleware para log de requisições (removido para limpar terminal)
app.use((req, res, next) => {
  next();
});

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
    console.log('✅ Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    console.log('⚠️  Servidor iniciando sem conexão com MongoDB');
  }
};

// Iniciar servidor
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
};

startServer();
