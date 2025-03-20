import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface JwtPayload {
  userId: string;
  email: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const token = this.extraerToken(request);
    if (!token) {
      throw new UnauthorizedException('No se proporcionó un token');
    }
    try {
      const payload: JwtPayload =
        await this.jwtService.verifyAsync<JwtPayload>(token);
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado: ' + error);
    }
    return true;
  }

  private extraerToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
