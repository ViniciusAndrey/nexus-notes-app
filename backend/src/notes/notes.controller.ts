import { Request, Response } from 'express';
import { Note } from './notes.model';
import { v4 as uuidv4 } from 'uuid';

let notes: Note[] = [];

export const getNotes = (req: Request, res: Response) => {
  const simpleNotes = notes.map(({ id, title, content }) => ({ id, title, content }));
  res.json(simpleNotes);
};

export const createNote = (req: Request, res: Response) => {
  const { title, content } = req.body;
  const now = new Date();
  const newNote: Note = {
    id: uuidv4(),
    title,
    content,
    createdAt: now,
    updatedAt: now,
  };
  notes.push(newNote);
  // Retornar apenas os campos desejados
  res.status(201).json({ id: newNote.id, title: newNote.title, content: newNote.content });
};

export const updateNote = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const note = notes.find((n) => n.id === id);
  if (!note) {
    return res.status(404).json({ message: 'Nota não encontrada' });
  }
  note.title = title;
  note.content = content;
  note.updatedAt = new Date();
  // Retornar apenas os campos desejados
  res.json({ id: note.id, title: note.title, content: note.content });
};

export const deleteNote = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = notes.findIndex((n) => n.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Nota não encontrada' });
  }
  notes.splice(index, 1);
  res.status(204).send();
};
