import mongoose, { Document, Schema } from 'mongoose';

export interface INote extends Document {
  title: string;
  content: any[];
  userId: mongoose.Types.ObjectId;
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
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

// Índice para melhorar performance das consultas por usuário
NoteSchema.index({ userId: 1, updatedAt: -1 });

export const Note = mongoose.model<INote>('Note', NoteSchema);
