import express from 'express';
import { register, login, getProfile, googleLogin } from './users.controller';
import { auth } from '../middleware/auth';

const router = express.Router();

// Rotas públicas
router.post('/register', register);
router.post('/login', login);
router.post('/google-login', googleLogin);

// Rotas protegidas
router.get('/profile', auth, getProfile);

export default router; 