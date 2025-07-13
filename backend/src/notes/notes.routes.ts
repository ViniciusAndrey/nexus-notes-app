import express from 'express';
import { getNotes, createNote, updateNote, deleteNote } from './notes.controller';
import { auth } from '../middleware/auth';

const router = express.Router();

// Todas as rotas de notas agora requerem autenticação
router.use(auth);

router.get('/', getNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
