
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService
  ) {}

  use(req: Request, _: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    if (!authorization) return next();
    const accessToken = authorization.substring(7); // Skip "Bearer "
    req.user = this.authService.decodeToken(accessToken);
    next();
  }
}
