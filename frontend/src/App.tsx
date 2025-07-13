import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './theme/GlobalStyle';
import { darkTheme } from './theme/dark';
import NoteEditor from './components/NoteEditor';
import NoteList from './components/NoteList';
import { Descendant } from 'slate';
import { initialValue as richInitialValue } from './components/RichTextEditor';
import { getNotes, createNote, updateNote, deleteNote as apiDeleteNote } from './api/notes';

interface Note {
  id: string;
  title: string;
  content: Descendant[]; // era string
  updatedAt: number;
}

const Background = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: ${({ theme }) => theme.background};
  display: flex;
  align-items: stretch;
  justify-content: center;
`;

const Sidebar = styled.aside`
  width: 320px;
  background: ${({ theme }) => theme.surface};
  border-right: 1px solid ${({ theme }) => theme.border};
  padding: 2rem 0.5rem 2rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
`;

const NoteBlock = styled.div`
  background: ${({ theme }) => theme.surface};
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  padding: 3rem 2.5rem;
  min-width: 350px;
  max-width: 700px;
  width: 90vw;
  min-height: 60vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const NewNoteButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.text};
  border-radius: 4px;
  padding: 0.7rem 0;
  font-size: 1rem;
  cursor: pointer;
`;

const initialNotes: Note[] = [
  {
    id: crypto.randomUUID(),
    title: 'Minha primeira nota',
    content: JSON.parse(JSON.stringify(richInitialValue)),
    updatedAt: Date.now(),
  },
];

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotes().then(data => {
      setNotes(data.map(n => ({ ...n, updatedAt: n.updatedAt ?? Date.now() })));
      setSelectedId(data.length > 0 ? data[0].id : null);
      setLoading(false);
    });
  }, []);

  const selectedNote = notes.find(n => n.id === selectedId);

  const handleSelect = (note: Note) => {
    setSelectedId(note.id);
  };

  const handleSave = async (data: { title: string; content: Descendant[] }) => {
    if (selectedNote) {
      const updated = await updateNote(selectedNote.id, { title: data.title, content: data.content, updatedAt: Date.now() });
      setNotes(prev => prev.map(n =>
        n.id === selectedNote.id
          ? { ...n, ...updated, content: JSON.parse(JSON.stringify(updated.content)), updatedAt: Date.now() }
          : n
      ));
    } else {
      const created = await createNote({ title: data.title, content: data.content, updatedAt: Date.now() });
      setNotes(prev => [
        { ...created, content: JSON.parse(JSON.stringify(created.content)), updatedAt: Date.now() },
        ...prev
      ]);
      setSelectedId(created.id);
    }
  };

  const handleDelete = async () => {
    if (!selectedNote) return;
    
    try {
      await apiDeleteNote(selectedNote.id);
      setNotes(prev => {
        const idx = prev.findIndex(n => n.id === selectedNote.id);
        const newNotes = prev.filter(n => n.id !== selectedNote.id);
        if (newNotes.length > 0) {
          setSelectedId(newNotes[Math.max(0, idx - 1)].id);
        } else {
          setSelectedId(null);
        }
        return newNotes;
      });
    } catch (error) {
      console.error('Erro ao deletar nota:', error);
      // Aqui você pode adicionar uma notificação de erro para o usuário
    }
  };

  const handleNew = async () => {
    const created = await createNote({
      title: '',
      content: JSON.parse(JSON.stringify(richInitialValue)),
      updatedAt: Date.now(),
    });
    setNotes(prev => [{ ...created, updatedAt: Date.now() }, ...prev]);
    setSelectedId(created.id);
  };

  // Ordenar notas por data de atualização (recentes primeiro)
  const orderedNotes = [...notes].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle theme={darkTheme} />
      <Background>
        <Sidebar>
          <NewNoteButton onClick={handleNew}>+ Nova Nota</NewNoteButton>
          <NoteList notes={orderedNotes} onSelect={handleSelect} selectedId={selectedId ?? undefined} />
        </Sidebar>
        <NoteBlock>
          <NoteEditor
            note={selectedNote}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        </NoteBlock>
      </Background>
    </ThemeProvider>
  );
};

export default App;
