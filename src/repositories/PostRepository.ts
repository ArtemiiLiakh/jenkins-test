import { PrismaClient } from '@prisma/client';
import { NewPost, Post } from '../entities/Post';
import { EntityToPost } from '../utils/mappers/EntityToPost';

export class PostRepository {
  constructor (
    private readonly prisma: PrismaClient,
  ) {}
  
  async create (post: NewPost): Promise<Post> {
    const newPost = await this.prisma.post.create({
      data: {
        title: post.title,
        authorId: post.authorId,
      }
    });

    return EntityToPost(newPost);
  }

  async findById (id: number): Promise<Post> {
    const post = await this.prisma.post.findFirst({
      where: { id },
    }); 

    if (!post) {
      throw new Error('Post with this id not found');
    }

    return EntityToPost(post);
  }

  async findByAuthorId (authorId: number): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: { authorId },
    }); 

    return posts.map(EntityToPost);
  }
}