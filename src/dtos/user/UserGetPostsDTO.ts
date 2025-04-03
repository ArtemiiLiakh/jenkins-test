import {Post} from '../../entities/Post';

export interface UserGetPostsDTO {
  id: number,
}

export interface UserGetPostsResponse {
  posts: Post[]
}