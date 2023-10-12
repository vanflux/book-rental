import { AuthDto } from '../auth/auth.dto';

declare global {
  declare namespace Express {
    declare interface Request {
      user?: AuthDto;
    }
  }
}

export {};
