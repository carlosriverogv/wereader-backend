import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    required: true,
    minlength: 3,
    maxlength: 25,
    unique: true,
  })
  tag: string;

  @Prop({
    required: true,
    minlength: 2,
    maxlength: 100,
  })
  name: string;

  @Prop({
    required: true,
    minlength: 2,
    maxlength: 100,
  })
  lastname: string;

  @Prop({
    required: true,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  })
  avatar: number;

  @Prop({
    required: true,
    minlength: 10,
    maxlength: 100,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
    minlength: 8,
    maxlength: 60,
    select: false,
  })
  password: string;

  // @Prop({
  //   required: true,
  //   enum: ['user', 'admin'],
  //   default: 'user',
  // })
  // role: string;

  @Prop({
    required: false,
    minlength: 2,
    maxlength: 100,
  })
  genreFav?: string;

  @Prop({
    required: false,
    minlength: 2,
    maxlength: 100,
  })
  authorFav?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
