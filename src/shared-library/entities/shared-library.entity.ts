import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class SharedLibrary extends Document {
  // Referencia al usuario que comparte la biblioteca
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  })
  idUserOwner: mongoose.Schema.Types.ObjectId;

  // Referencia al usuario que recibe la biblioteca compartida
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  })
  idUserFriend: mongoose.Schema.Types.ObjectId;

  // Referencia a la biblioteca compartida
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'library',
    required: true,
  })
  idLibrary: mongoose.Schema.Types.ObjectId;

  // Fecha de creación de la biblioteca compartida
  @Prop({ type: Date, default: Date.now })
  dateAuthorization?: Date;
}

export const SharedLibrarySchema = SchemaFactory.createForClass(SharedLibrary);
