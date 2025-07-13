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
  gap: 1rem;
`;

const TitleInput = styled.input`
  font-size: 2rem;
  font-family: 'Roboto', 'Open Sans', Arial, sans-serif;
  border: none;
  background: transparent;
  color: #f5f5f7;
  margin-bottom: 2rem;
  outline: none;
  font-weight: 600;
  &::placeholder {
    color: #bbb;
    font-weight: 400;
  }
`;

const ContentArea = styled.textarea`
  min-height: 200px;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.5rem;
  border-radius: 4px;
  resize: vertical;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const EmojiButton = styled.button`
  font-size: 1.2rem;
  background: ${({ theme }) => theme.accent};
  border-radius: 4px;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
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
  console.log(content)

  useEffect(() => {
    setTitle(note?.title || '');
    if (note && isValidSlateContent(note.content)) {
      setContent(JSON.parse(JSON.stringify(note.content)));
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
      <RichTextEditor key={note?.id} value={content} onChange={setContent} />
      <ButtonRow>
        <EmojiButton type="button" onClick={handleSave}>
          Salvar
        </EmojiButton>
        {onDelete && (
          <EmojiButton type="button" onClick={onDelete}>
            Excluir
          </EmojiButton>
        )}
      </ButtonRow>
    </Container>
  );
};

export default NoteEditor;
