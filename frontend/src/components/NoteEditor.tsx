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
`;

const ButtonIcon = styled.span`
  font-size: 1.1rem;
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
    onSave({ title, content });
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
