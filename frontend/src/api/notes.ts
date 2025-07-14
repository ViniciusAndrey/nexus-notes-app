import { getAuthHeaders } from './auth';
import { buildApiUrl, fetchWithTimeout } from '../config/api';

export interface Note {
  id: string;
  title: string;
  content: any[];
  updatedAt?: number;
}

export const getNotes = async (): Promise<Note[]> => {
  const response = await fetchWithTimeout(buildApiUrl('/notes'), {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar notas');
  }

  return response.json();
};

export const createNote = async (data: { title: string; content: any[]; updatedAt?: number }): Promise<Note> => {
  const response = await fetchWithTimeout(buildApiUrl('/notes'), {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar nota');
  }

  return response.json();
};

export const updateNote = async (id: string, data: { title: string; content: any[]; updatedAt?: number }): Promise<Note> => {
  const response = await fetchWithTimeout(buildApiUrl(`/notes/${id}`), {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar nota');
  }

  return response.json();
};

export const deleteNote = async (id: string): Promise<void> => {
  const response = await fetchWithTimeout(buildApiUrl(`/notes/${id}`), {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar nota');
  }
};
