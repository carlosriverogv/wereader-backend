import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface JwtPayload {
  userId: string;
  email: string;
}

// REVISAR: NoAuthGuard

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const token = this.extraerToken(request);

    if (token) {
      try {
        // Si el token es válido, bloqueamos el acceso
        await this.jwtService.verifyAsync<JwtPayload>(token);
        throw new ForbiddenException(
          'Ya estás autenticado. No puedes acceder al login.',
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return true; // Si el token es inválido, permitimos el acceso
      }
    }

    return true; // Si no hay token, permitimos el acceso
  }

  private extraerToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
