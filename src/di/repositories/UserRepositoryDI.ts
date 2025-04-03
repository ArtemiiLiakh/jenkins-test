import {UserRepository} from '../../repositories/UserRepository';
import {prisma} from '../../db/Prisma';

export const UserRepositoryDI = new UserRepository(prisma);