import {User} from '../../entities/User';

export interface UserCreateDTO {
  name: string,
  username: string,
}

export interface UserCreateResponse {
  user: User
}