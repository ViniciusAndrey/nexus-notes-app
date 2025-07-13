import React from 'react';
import styled from 'styled-components';
import { Note } from '../api/notes';

interface NoteListProps {
  notes: Note[];
  onSelect: (note: Note) => void;
  selectedId?: string;
}

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const ListItem = styled.li<{ selected: boolean }>`
  padding: 0.7rem 1rem;
  border-radius: 8px;
  background: ${({ selected }) => (selected ? '#eaf1ff' : 'transparent')};
  color: #f5f5f7;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 0.2rem;
  transition: background 0.2s;
  &:hover {
    background: #f0f4fa;
  }
`;

const NoteList: React.FC<NoteListProps> = ({ notes, onSelect, selectedId }) => (
  <List>
    {notes.map(note => (
      <ListItem
        key={note.id}
        selected={note.id === selectedId}
        onClick={() => onSelect(note)}
      >
        {note.title || <em style={{ color: '#bbb' }}>Sem título</em>}
      </ListItem>
    ))}
  </List>
);

export default NoteList;
