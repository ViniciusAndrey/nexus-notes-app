import mongoose, { Document, Schema } from 'mongoose';

export interface INote extends Document {
  title: string;
  content: any[];
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>({
  title: {
    type: String,
    required: true,
    default: 'Nova Nota'
  },
  content: {
    type: Schema.Types.Mixed,
    required: true,
    default: [
      {
        type: 'paragraph',
        children: [{ text: '' }]
      }
    ]
  }
}, {
  timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

export const Note = mongoose.model<INote>('Note', NoteSchema);
