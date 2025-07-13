import express from 'express';
import cors from 'cors';
// Importação das rotas de notas (ainda será criada)
import notesRoutes from './notes/notes.routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rotas de notas
app.use('/notes', notesRoutes);

app.get('/', (req, res) => {
  res.send('API de Anotações rodando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
