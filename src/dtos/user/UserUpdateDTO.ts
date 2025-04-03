import {User} from '../../entities/User';

export interface UserUpdateDTO {
  id: number,
  name?: string,
  username?: string,
}

export interface UserUpdateResponse {
  user: User
}