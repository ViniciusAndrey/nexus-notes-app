import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GlobalStyle from './theme/GlobalStyle';
import { darkTheme } from './theme/dark';
import NoteEditor from './components/NoteEditor';
import NoteList from './components/NoteList';
import Login from './components/Login';
import Register from './components/Register';
import ApiDebugger from './components/ApiDebugger';
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
  overflow-x: hidden;
  
  @media (max-width: 1024px) {
    /* Tablet landscape */
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
  
  @media (max-width: 480px) {
    /* Mobile portrait */
  }
  
  @media (max-width: 360px) {
    /* Small mobile */
  }
`;

const Sidebar = styled.aside<{ isOpen: boolean }>`
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
  transition: transform 0.3s ease;
  
  @media (max-width: 1024px) {
    width: 25vw;
    min-width: 200px;
    padding: 1.5rem 0.5rem 1.5rem 0.5rem;
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px;
    z-index: 1000;
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    box-shadow: ${props => props.isOpen ? '2px 0 10px rgba(0,0,0,0.3)' : 'none'};
    padding: 1rem 0.5rem 1rem 0.5rem;
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    width: 85vw;
    max-width: 300px;
  }
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
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const UserEmail = styled.div`
  color: #b0b0b0;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const LogoutButton = styled.button`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }
`;

const MobileHeader = styled.div`
  display: none;
  background: #2d2d2d;
  padding: 1rem;
  border-bottom: 1px solid #404040;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 60px;
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem;
    height: 55px;
  }
  
  @media (max-width: 360px) {
    padding: 0.6rem;
    height: 50px;
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover {
    color: #007acc;
  }
`;

const MobileTitle = styled.h1`
  color: #ffffff;
  font-size: 1.2rem;
  margin: 0;
  font-weight: 600;
`;

const MobileNewNoteButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
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
  
  @media (max-width: 1024px) {
    padding: 2rem 3rem;
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    height: calc(100vh - 60px);
    margin-top: 60px;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem;
  }
  
  @media (max-width: 360px) {
    padding: 0.5rem;
  }
`;

const NewNoteButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  margin-bottom: 1rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.7rem 1.2rem;
    border-radius: 10px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #b0b0b0;
  text-align: center;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const EmptyStateTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const EmptyStateText = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

type AuthView = 'login' | 'register';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authView, setAuthView] = useState<AuthView>('login');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDebugger, setShowDebugger] = useState(false);

  useEffect(() => {
    checkAuth();
    
    // Adicionar listener para mostrar/ocultar debugger
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setShowDebugger(prev => !prev);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
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
    // Fechar sidebar no mobile após selecionar uma nota
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
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
    
    // Fechar sidebar no mobile após criar uma nota
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  // Ordenar notas por data de atualização (recentes primeiro)
  const orderedNotes = [...notes].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));

  // Se não está autenticado, mostrar tela de login/registro
  if (!authenticated) {
    return (
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
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
      </GoogleOAuthProvider>
    );
  }

  // Se está carregando, mostrar loading
  if (loading) {
    return (
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
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
      </GoogleOAuthProvider>
    );
  }

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle theme={darkTheme} />
        <Layout>
          {/* Debugger - pressione Ctrl+Shift+D para mostrar/ocultar */}
          <ApiDebugger isVisible={showDebugger} />
          {/* Header Mobile */}
          <MobileHeader>
            <MobileMenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </MobileMenuButton>
            <MobileTitle>Nexus</MobileTitle>
            <MobileNewNoteButton onClick={handleNew}>
              + Nova
            </MobileNewNoteButton>
          </MobileHeader>

          {/* Overlay para fechar sidebar no mobile */}
          <Overlay isOpen={sidebarOpen} onClick={() => setSidebarOpen(false)} />

          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen}>
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

          {/* Editor */}
          <EditorContainer>
            {selectedNote ? (
              <NoteEditor
                note={selectedNote}
                onSave={handleSave}
                onDelete={handleDelete}
              />
            ) : (
              <EmptyState>
                <EmptyStateTitle>Bem-vindo ao Nexus!</EmptyStateTitle>
                <EmptyStateText>
                  Crie sua primeira nota para começar a organizar suas ideias.
                </EmptyStateText>
                <NewNoteButton onClick={handleNew}>
                  + Criar Primeira Nota
                </NewNoteButton>
              </EmptyState>
            )}
          </EditorContainer>
        </Layout>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
