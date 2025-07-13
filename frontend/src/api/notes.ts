import axios from 'axios';
import { Descendant } from 'slate';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
});

export interface Note {
  id: string;
  title: string;
  content: Descendant[];
  updatedAt: number;
}

export const getNotes = async (): Promise<Note[]> => {
  const { data } = await api.get<Note[]>('/notes');
  return data;
};

export const createNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', note);
  return data;
};

export const updateNote = async (id: string, note: Omit<Note, 'id'>): Promise<Note> => {
  const { data } = await api.put<Note>(`/notes/${id}`, note);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
