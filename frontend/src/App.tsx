import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './theme/GlobalStyle';
import { darkTheme } from './theme/dark';
import NoteEditor from './components/NoteEditor';
import NoteList from './components/NoteList';
import Login from './components/Login';
import Register from './components/Register';
import { Descendant } from 'slate';
import { initialValue as richInitialValue } from './components/RichTextEditor';
import { getNotes, createNote, updateNote, deleteNote as apiDeleteNote, Note } from './api/notes';
import { isAuthenticated, logout, getProfile, User } from './api/auth';

const Layout = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #1a1a1a;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  font-family: 'Roboto', 'Open Sans', Arial, sans-serif;
`;

const Sidebar = styled.aside`
  width: 22vw;
  min-width: 220px;
  max-width: 320px;
  background: #2d2d2d;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-right: 1px solid #404040;
  padding: 2rem 0.5rem 2rem 0.5rem;
  gap: 2rem;
`;

const SidebarTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SidebarBottom = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UserInfo = styled.div`
  padding: 1rem;
  background: #1a1a1a;
  border-radius: 4px;
  border: 1px solid #404040;
`;

const UserName = styled.div`
  color: #ffffff;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const UserEmail = styled.div`
  color: #b0b0b0;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const LogoutButton = styled.button`
  background: #dc3545;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #c82333;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #b0b0b0;
  font-size: 1.6rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  align-self: flex-start;
  transition: color 0.2s;
  &:hover {
    color: #ffffff;
  }
`;

const EditorContainer = styled.div`
  flex: 1;
  background: #1a1a1a;
  padding: 3rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 0;
  height: 100vh;
  overflow-y: auto;
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

type AuthView = 'login' | 'register';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authView, setAuthView] = useState<AuthView>('login');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (isAuthenticated()) {
      try {
        const profile = await getProfile();
        setUser(profile.user);
        setAuthenticated(true);
        loadNotes();
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        handleLogout();
      }
    } else {
      setLoading(false);
    }
  };

  const loadNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data.map(n => ({ ...n, updatedAt: n.updatedAt ?? Date.now() })));
      setSelectedId(data.length > 0 ? data[0].id : null);
    } catch (error) {
      console.error('Erro ao carregar notas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setAuthenticated(true);
    checkAuth();
  };

  const handleRegister = () => {
    setAuthenticated(true);
    checkAuth();
  };

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    setUser(null);
    setNotes([]);
    setSelectedId(null);
    setLoading(false);
  };

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
    }
  };

  const handleNew = async () => {
    const created = await createNote({
      title: 'Nova Nota',
      content: JSON.parse(JSON.stringify(richInitialValue)),
      updatedAt: Date.now(),
    });
    setNotes(prev => [{ ...created, updatedAt: Date.now() }, ...prev]);
    setSelectedId(created.id);
  };

  // Ordenar notas por data de atualização (recentes primeiro)
  const orderedNotes = [...notes].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));

  // Se não está autenticado, mostrar tela de login/registro
  if (!authenticated) {
    return (
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle theme={darkTheme} />
        {authView === 'login' ? (
          <Login 
            onLogin={handleLogin} 
            onSwitchToRegister={() => setAuthView('register')} 
          />
        ) : (
          <Register 
            onRegister={handleRegister} 
            onSwitchToLogin={() => setAuthView('login')} 
          />
        )}
      </ThemeProvider>
    );
  }

  // Se está carregando, mostrar loading
  if (loading) {
    return (
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle theme={darkTheme} />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          background: '#1a1a1a',
          color: '#ffffff'
        }}>
          Carregando...
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle theme={darkTheme} />
      <Layout>
        <Sidebar>
          <SidebarTop>
            <NewNoteButton onClick={handleNew}>+ Nova Nota</NewNoteButton>
            <NoteList notes={orderedNotes} onSelect={handleSelect} selectedId={selectedId ?? undefined} />
          </SidebarTop>
          <SidebarBottom>
            {user && (
              <UserInfo>
                <UserName>{user.name}</UserName>
                <UserEmail>{user.email}</UserEmail>
                <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
              </UserInfo>
            )}
          </SidebarBottom>
        </Sidebar>
        <EditorContainer>
          <NoteEditor
            note={selectedNote}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        </EditorContainer>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
