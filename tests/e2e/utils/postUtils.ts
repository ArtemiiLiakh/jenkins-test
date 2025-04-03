import { PrismaClient } from '@prisma/client';
import { Post } from '../../../src/entities/Post';
import { EntityToPost } from '../../../src/utils/mappers/EntityToPost';

export class PostUtils {
  constructor (
    private readonly prisma: PrismaClient,
  ) {}

  async create (authorId: number, title?: string): Promise<Post> {
    const post = await this.prisma.post.create({
      data: {
        title: title ?? 'title',
        authorId,
      }
    });

    return EntityToPost(post);
  }

  async getById (id: number): Promise<Post | null> {
    const post = await this.prisma.post.findFirst({
      where: { id }
    });

    if (!post) return null;

    return EntityToPost(post);
  }
} 