import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Note } from '../api/notes';
import RichTextEditor, { initialValue as richInitialValue } from './RichTextEditor';
import { Descendant } from 'slate';

interface NoteEditorProps {
  note?: Note;
  onSave: (note: { title: string; content: Descendant[] }) => void;
  onDelete?: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const TitleInput = styled.input`
  font-size: 2.5rem;
  font-family: 'Roboto', 'Open Sans', Arial, sans-serif;
  border: none;
  background: transparent;
  color: #ffffff;
  outline: none;
  font-weight: 700;
  padding: 0;
  margin: 0;
  
  &::placeholder {
    color: #666666;
    font-weight: 400;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const EditorWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
  padding-top: 2rem;
  
  @media (max-width: 768px) {
    gap: 0.8rem;
    padding-top: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.6rem;
    padding-top: 1rem;
    flex-direction: column;
  }
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
    justify-content: center;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
    justify-content: center;
  }
`;

const ButtonIcon = styled.span`
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const isValidSlateContent = (content: any): content is Descendant[] => {
  return (
    Array.isArray(content) &&
    content.length > 0 &&
    typeof content[0] === 'object' &&
    'type' in content[0] &&
    'children' in content[0]
  );
};

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave, onDelete }) => {
  
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState<Descendant[]>(
    isValidSlateContent(note?.content)
      ? JSON.parse(JSON.stringify(note?.content))
      : JSON.parse(JSON.stringify(richInitialValue))
  );

  useEffect(() => {
    setTitle(note?.title || '');
    if (note && isValidSlateContent(note.content)) {
      const newContent = JSON.parse(JSON.stringify(note.content));
      setContent(newContent);
    } else {
      setContent(JSON.parse(JSON.stringify(richInitialValue)));
    }
  }, [note]);

  const handleSave = () => {
    // Garantir que o título não seja vazio
    const validTitle = title.trim() !== '' ? title.trim() : 'Nova Nota';
    onSave({ title: validTitle, content });
  };

  return (
    <Container>
      <TitleInput
        placeholder="Título da Anotação..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <EditorWrapper>
        <RichTextEditor value={content} onChange={setContent} />
      </EditorWrapper>
      <ButtonRow>
        <SaveButton type="button" onClick={handleSave}>
          <ButtonIcon>💾</ButtonIcon>
          Salvar
        </SaveButton>
        {onDelete && (
          <DeleteButton type="button" onClick={onDelete}>
            <ButtonIcon>🗑️</ButtonIcon>
            Excluir
          </DeleteButton>
        )}
      </ButtonRow>
    </Container>
  );
};

export default NoteEditor;
