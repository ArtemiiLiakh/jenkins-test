import {UserService} from '../../services/UserService';
import {UserRepositoryDI} from '../repositories/UserRepositoryDI';
import {PostRepositoryDI} from '../repositories/PostRepositoryDI';

export const UserServiceDI = new UserService(UserRepositoryDI, PostRepositoryDI);