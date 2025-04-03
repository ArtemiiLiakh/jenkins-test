import {UserRepository} from '../repositories/UserRepository';
import {UserCreateDTO, UserCreateResponse} from '../dtos/user/UserCreateDTO';
import {UserUpdateDTO, UserUpdateResponse} from '../dtos/user/UserUpdateDTO';
import {UserGetByIdDTO, UserGetByIdResponse} from '../dtos/user/UserGetByIdDTO';
import {UserDeleteDTO, UserDeleteResponse} from '../dtos/user/UserDeleteDTO';
import {UserGetPostsDTO, UserGetPostsResponse} from '../dtos/user/UserGetPostsDTO';
import {PostRepository} from '../repositories/PostRepository';

export class UserService {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository,
  ) {}
  
  async create (data: UserCreateDTO): Promise<UserCreateResponse> {
    if (await this.userRepository.getByUsername(data.username)) {
      throw new Error('User with this username is exists');
    }

    const user = await this.userRepository.create({
      name: data.name,
      username: data.username,
    });
    
    return  {
      user,
    };
  }
  
  async update (data: UserUpdateDTO): Promise<UserUpdateResponse> {
    const user = await this.userRepository.update(
      data.id,
      {
        name: data.name,
        username: data.username,
      });
    
    return  {
      user,
    };
  }
  
  async getById ({ id }: UserGetByIdDTO): Promise<UserGetByIdResponse> {
    const user = await this.userRepository.findById(id);
    return {
      user,
    };
  }
  
  async delete ({ id }: UserDeleteDTO): Promise<UserDeleteResponse> {
    await this.userRepository.delete(id);
  }
  
  async getPosts ({ id }: UserGetPostsDTO): Promise<UserGetPostsResponse> {
    const posts = await this.postRepository.findByAuthorId(id);
    return  {
      posts,
    };
  }
}