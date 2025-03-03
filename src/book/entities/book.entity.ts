import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  isbn: string; // Campo único, pero no '_id' generado por MongoDB.

  @Prop({
    required: true,
  })
  title: string; // Título del libro.

  @Prop({
    required: true,
  })
  author: string; // Autor del libro.

  @Prop({
    required: true,
  })
  price: number; // Precio del libro.

  @Prop({ required: true }) // URL del archivo EPUB
  epubUrl: string;

  @Prop({ required: false }) // URL de la portada (opcional si extraisgo del EPUB)
  coverUrl?: string;

  @Prop({ required: true }) // Genero del libro (opcional)
  gender: string;

  @Prop({ required: false, type: Date }) // Fecha de publicación del libro (opcional)
  datePublished?: Date;

  @Prop({ required: false }) // Sinopsis del libro (opcional)
  synopsis?: string;

  @Prop({ required: true }) // Se puede compartir el libro
  shareable: boolean;

  @Prop({ type: Date, default: Date.now })
  dateCreation: Date; // Fecha de alta del libro.
}

export const BookSchema = SchemaFactory.createForClass(Book);
