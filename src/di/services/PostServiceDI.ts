import { PostService } from '../../services/PostService';
import { PostRepositoryDI } from '../repositories/PostRepositoryDI';

export const PostServiceDI = new PostService(PostRepositoryDI);