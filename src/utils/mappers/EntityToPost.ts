import { Post } from '../../entities/Post';
import { Post as PrismaPost } from '@prisma/client';

export function EntityToPost (post: PrismaPost): Post {
  return {
    id: post.id,
    title: post.title,
    authorId: post.authorId,
  };
}