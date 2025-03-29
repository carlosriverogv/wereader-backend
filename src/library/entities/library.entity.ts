import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Library extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }) // Usuario propietario
  idUser: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
      },
    ],
  }) // Referencias a libros
  books: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: Date, default: Date.now })
  dateCreation?: Date;
}

export const LibrarySchema = SchemaFactory.createForClass(Library);
