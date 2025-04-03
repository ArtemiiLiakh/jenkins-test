import {Post} from '../../entities/Post';

export interface PostCreateDTO {
  title: string;
  authorId: number;
}

export interface PostCreateResponse {
  post: Post
}