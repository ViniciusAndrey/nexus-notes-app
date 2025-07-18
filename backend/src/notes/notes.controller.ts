import { Request, Response } from 'express';
import { Note, INote } from './notes.model';

export const getNotes = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    // Filtrar notas apenas do usuário autenticado
    const notes = await Note.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    const simpleNotes = notes.map((note) => ({ 
      id: (note._id as any).toString(), 
      title: note.title, 
      content: note.content 
    }));
    res.json(simpleNotes);
  } catch (error) {
    console.error('Erro ao buscar notas:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const { title, content } = req.body;
    
    // Garantir que o título não seja vazio
    const validTitle = title && title.trim() !== '' ? title.trim() : 'Nova Nota';
    
    const newNote = new Note({
      title: validTitle,
      content,
      userId: req.user._id // Associar nota ao usuário autenticado
    });
    const savedNote = await newNote.save();
    
    res.status(201).json({ 
      id: (savedNote._id as any).toString(), 
      title: savedNote.title, 
      content: savedNote.content 
    });
  } catch (error) {
    console.error('Erro ao criar nota:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const { id } = req.params;
    const { title, content } = req.body;
    
    // Verificar se a nota pertence ao usuário autenticado
    const note = await Note.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { title, content },
      { new: true, runValidators: true }
    );
    
    if (!note) {
      return res.status(404).json({ message: 'Nota não encontrada' });
    }
    
    res.json({ 
      id: (note._id as any).toString(), 
      title: note.title, 
      content: note.content 
    });
  } catch (error) {
    console.error('Erro ao atualizar nota:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const { id } = req.params;
    
    // Verificar se a nota pertence ao usuário autenticado
    const note = await Note.findOneAndDelete({ _id: id, userId: req.user._id });
    
    if (!note) {
      return res.status(404).json({ message: 'Nota não encontrada' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar nota:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
