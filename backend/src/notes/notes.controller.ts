import { Request, Response } from 'express';
import { Note } from './notes.model';

export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });
    const simpleNotes = notes.map(({ _id, title, content }) => ({ 
      id: (_id as any).toString(), 
      title, 
      content 
    }));
    res.json(simpleNotes);
  } catch (error) {
    console.error('Erro ao buscar notas:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    
    // Garantir que o título não seja vazio
    const validTitle = title && title.trim() !== '' ? title.trim() : 'Nova Nota';
    
    const newNote = new Note({
      title: validTitle,
      content
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
    const { id } = req.params;
    const { title, content } = req.body;
    
    const note = await Note.findByIdAndUpdate(
      id,
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
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);
    
    if (!note) {
      return res.status(404).json({ message: 'Nota não encontrada' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar nota:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
