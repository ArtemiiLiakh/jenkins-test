import {PostRepository} from '../../repositories/PostRepository';
import {prisma} from '../../db/Prisma';

export const PostRepositoryDI = new PostRepository(prisma);