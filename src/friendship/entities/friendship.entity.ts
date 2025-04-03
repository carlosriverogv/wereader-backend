import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Friendship extends Document {
  // Referencia al primer usuario (el que envía la solicitud)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  })
  idUser1: mongoose.Schema.Types.ObjectId;

  // Referencia al segundo usuario (el que recibe la solicitud)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  })
  idUser2: mongoose.Schema.Types.ObjectId;

  // Estado de la amistad (pendiente, aceptada, rechazada) enum
  @Prop({
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  })
  status?: 'pending' | 'accepted' | 'rejected';

  // Fecha de creación de la amistad
  @Prop({ type: Date, default: Date.now })
  dateCreation?: Date;
}

export const FriendshipSchema = SchemaFactory.createForClass(Friendship);
