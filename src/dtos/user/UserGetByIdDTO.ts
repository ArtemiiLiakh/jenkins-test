import {User} from '../../entities/User';

export interface UserGetByIdDTO {
  id: number,
}

export interface UserGetByIdResponse {
  user: User
}