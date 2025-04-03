import { User } from '../../entities/User';
import { User as PrismaUser } from '@prisma/client';

export function EntityToUser (user: PrismaUser): User {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
  }
}