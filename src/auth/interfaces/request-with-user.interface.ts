import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: { sub: string }; // Define el tipo de 'user' que estamos usando en el JWT
}
