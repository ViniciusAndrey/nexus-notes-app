import React, { useMemo, useCallback, useEffect } from 'react';
import { createEditor, Descendant, BaseEditor, Editor, Transforms, Text, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact, ReactEditor, useSlate } from 'slate-react';
import { withHistory } from 'slate-history';
import styled from 'styled-components';

// Tipos customizados para Slate
 type CustomElement = { type: 'paragraph' | 'heading' | 'bulleted-list' | 'list-item'; children: CustomText[] };
 type CustomText = { text: string; bold?: boolean; italic?: boolean; underline?: boolean };
 declare module 'slate' {
   interface CustomTypes {
     Editor: BaseEditor & ReactEditor;
     Element: CustomElement;
     Text: CustomText;
   }
 }

const Toolbar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 0.3rem;
    margin-bottom: 0.3rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.2rem;
    margin-bottom: 0.2rem;
  }
`;

const Button = styled.button<{ active?: boolean }>`
  background: ${({ active }) => 
    active 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      : 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)'
  };
  color: ${({ active }) => active ? '#ffffff' : '#b0b0b0'};
  border: 1px solid ${({ active }) => active ? '#667eea' : '#404040'};
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ active }) => 
    active 
      ? '0 4px 15px rgba(102, 126, 234, 0.3)' 
      : '0 2px 8px rgba(0, 0, 0, 0.2)'
  };
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ active }) => 
      active 
        ? '0 6px 20px rgba(102, 126, 234, 0.4)' 
        : '0 4px 12px rgba(0, 0, 0, 0.3)'
    };
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.85rem;
    border-radius: 6px;
  }
  
  @media (max-width: 480px) {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    border-radius: 5px;
  }
`;

const EditableContainer = styled.div`
  flex: 1;
  background: transparent;
  color: #ffffff;
  border: none;
  border-radius: 0;
  padding: 0;
  font-size: 1.1rem;
  line-height: 1.8;
  outline: none;
  resize: none;
  font-family: 'Roboto', 'Open Sans', Arial, sans-serif;
  
  @media (max-width: 1024px) {
    font-size: 1.05rem;
    line-height: 1.7;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  @media (max-width: 360px) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
  
  /* Estilos para elementos do editor */
  h1 {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 1rem 0 0.5rem 0;
    
    @media (max-width: 1024px) {
      font-size: 1.7rem;
      margin: 0.9rem 0 0.45rem 0;
    }
    
    @media (max-width: 768px) {
      font-size: 1.6rem;
      margin: 0.8rem 0 0.4rem 0;
    }
    
    @media (max-width: 480px) {
      font-size: 1.4rem;
      margin: 0.6rem 0 0.3rem 0;
    }
    
    @media (max-width: 360px) {
      font-size: 1.2rem;
      margin: 0.5rem 0 0.25rem 0;
    }
  }
  
  p {
    margin: 0.5rem 0;
    
    @media (max-width: 768px) {
      margin: 0.4rem 0;
    }
    
    @media (max-width: 480px) {
      margin: 0.3rem 0;
    }
  }
  
  ul {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
    
    @media (max-width: 768px) {
      margin: 0.4rem 0;
      padding-left: 1.2rem;
    }
    
    @media (max-width: 480px) {
      margin: 0.3rem 0;
      padding-left: 1rem;
    }
  }
  
  li {
    margin: 0.2rem 0;
    
    @media (max-width: 768px) {
      margin: 0.15rem 0;
    }
    
    @media (max-width: 480px) {
      margin: 0.1rem 0;
    }
  }
`;

interface RichTextEditorProps {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
}

export const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {  
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  // Forçar atualização do editor quando o valor muda
  useEffect(() => {
    if (editor && value) {
      editor.children = value;
      editor.onChange();
    }
  }, [editor, value]);

  return (
    <Slate editor={editor} initialValue={value} onChange={onChange}>
      <Toolbar>
        <MarkButton format="bold" icon="B" />
        <MarkButton format="italic" icon="I" />
        <MarkButton format="underline" icon="U" />
        <BlockButton format="heading" icon="H1" />
        <BlockButton format="bulleted-list" icon="• List" />
      </Toolbar>
      <EditableContainer>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Escreva sua anotação..."
          spellCheck
          autoFocus
          onFocus={() => (value[0] as any)?.children?.[0]?.text || ''}
          style={{
            background: 'transparent',
            color: '#ffffff',
            border: 'none',
            borderRadius: 0,
            padding: 0,
            outline: 'none',
            resize: 'none',
            fontFamily: 'Roboto, Open Sans, Arial, sans-serif',
            minHeight: '200px',
          }}
        />
      </EditableContainer>
    </Slate>
  );
};

const MarkButton = ({ format, icon }: { format: string; icon: string }) => {
  const editor = useSlate();
  return (
    <Button
      type="button"
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

const BlockButton = ({ format, icon }: { format: string; icon: string }) => {
  const editor = useSlate();
  return (
    <Button
      type="button"
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? (marks as any)[format] === true : false;
};

const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const LIST_TYPES = ['bulleted-list'];

const isBlockActive = (editor: Editor, format: string) => {
  const [match] = Array.from(
    Editor.nodes(editor, {
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.type === format,
    })
  );
  return !!match;
};

const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes((n as any).type as string),
    split: true,
  });

  let newType: CustomElement['type'] = isActive ? 'paragraph' : (format as CustomElement['type']);
  Transforms.setNodes(editor, { type: newType });

  if (!isActive && isList) {
    const block: CustomElement = { type: format as CustomElement['type'], children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const Element = ({ attributes, children, element }: any) => {
  switch (element.type) {
    case 'heading':
      return <h1 {...attributes}>{children}</h1>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  return <span {...attributes}>{children}</span>;
};

export default RichTextEditor;
