import { User } from './src/users/domain/user.entity';

export {}

declare global {
  namespace Express {
    export interface Request {
      currentUser: User;
    }
  }
}