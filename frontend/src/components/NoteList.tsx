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
  
  @media (max-width: 1024px) {
    gap: 0.15rem;
  }
  
  @media (max-width: 768px) {
    gap: 0.1rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.08rem;
  }
`;

const ListItem = styled.li<{ selected: boolean }>`
  padding: 0.7rem 1rem;
  border-radius: 8px;
  background: ${({ selected }) => (selected ? '#404040' : 'transparent')};
  color: #ffffff;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 0.2rem;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  line-height: 1.3;
  
  &:hover {
    background: #333333;
    transform: translateX(2px);
  }
  
  @media (max-width: 1024px) {
    padding: 0.65rem 0.9rem;
    font-size: 0.88rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.85rem;
    margin-bottom: 0.1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 0.7rem;
    font-size: 0.8rem;
  }
  
  @media (max-width: 360px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.75rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: #b0b0b0;
  padding: 2rem 1rem;
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem 0.5rem;
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem 0.3rem;
    font-size: 0.8rem;
  }
`;

const NoteList: React.FC<NoteListProps> = ({ notes, onSelect, selectedId }) => {
  if (notes.length === 0) {
    return (
      <EmptyState>
        Nenhuma nota encontrada.<br />
        Crie sua primeira nota!
      </EmptyState>
    );
  }

  return (
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
};

export default NoteList;
