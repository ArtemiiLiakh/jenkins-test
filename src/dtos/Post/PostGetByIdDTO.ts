import {Post} from '../../entities/Post';

export interface PostGetByIdDTO {
  id: number;
}

export interface PostGetByIdResponse {
  post: Post
}