import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Library extends Document {
  // Dueño de la biblioteca
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  })
  idUser: mongoose.Schema.Types.ObjectId;

  // Libros de la biblioteca
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
      },
    ],
  }) // Referencias a libros
  books: mongoose.Schema.Types.ObjectId[];

  // Fecha de creación de la biblioteca
  @Prop({ type: Date, default: Date.now })
  dateCreation?: Date;
}

export const LibrarySchema = SchemaFactory.createForClass(Library);
