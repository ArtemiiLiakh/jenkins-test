import {PostRepository} from '../repositories/PostRepository';
import {PostCreateDTO, PostCreateResponse} from '../dtos/Post/PostCreateDTO';
import {PostGetByIdDTO, PostGetByIdResponse} from '../dtos/Post/PostGetByIdDTO';

export class PostService {
  constructor (
    private readonly postRepository: PostRepository,
  ) {}
  
  async create (data: PostCreateDTO): Promise<PostCreateResponse> {
    const post = await this.postRepository.create({
      title: data.title,
      authorId: data.authorId,
    });
    
    return {
      post,
    };
  }
  
  async getById ({ id }: PostGetByIdDTO): Promise<PostGetByIdResponse> {
    const post = await this.postRepository.findById(id);
    
    return {
      post,
    };
  }
}