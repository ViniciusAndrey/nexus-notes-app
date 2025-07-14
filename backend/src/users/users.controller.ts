import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { User, IUser } from './users.model';

// Configurar cliente OAuth do Google
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Gerar token JWT
const generateToken = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn: '7d' }
  );
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Validação básica
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já está em uso' });
    }

    // Criar novo usuário
    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    // Gerar token
    const token = generateToken((user._id as any).toString());

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      token,
      user: {
        id: (user._id as any).toString(),
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('❌ Erro no registro:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validação básica
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    // Buscar usuário
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    // Verificar senha
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    // Gerar token
    const token = generateToken((user._id as any).toString());

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: (user._id as any).toString(),
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('❌ Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    res.json({
      user: {
        id: (req.user._id as any).toString(),
        name: req.user.name,
        email: req.user.email
      }
    });
  } catch (error) {
    console.error('❌ Erro ao buscar perfil:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}; 

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: 'Token do Google é obrigatório' });
    }

    // Verificar o token do Google
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).json({ message: 'Token do Google inválido' });
    }

    const { sub: googleId, email, name, picture } = payload;

    // Verificar se o usuário já existe
    let user = await User.findOne({ 
      $or: [
        { googleId },
        { email }
      ]
    });

    if (user) {
      // Se o usuário existe mas não tem googleId, atualizar
      if (!user.googleId) {
        user.googleId = googleId;
        user.avatar = picture || user.avatar;
        await user.save();
      }
    } else {
      // Criar novo usuário
      user = new User({
        name,
        email,
        googleId,
        avatar: picture
      });
      await user.save();
    }

    // Gerar token
    const token = generateToken((user._id as any).toString());

    res.json({
      message: 'Login com Google realizado com sucesso',
      token,
      user: {
        id: (user._id as any).toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('❌ Erro no login com Google:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}; 