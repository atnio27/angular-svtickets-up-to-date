import { User } from './user';

export interface SingleUserResponse {
  user: User;
}

export interface AvatarResponse {
  avatar: string;
}

export interface UsersResponse {
  users: User[];
}

export interface UserRegisterResponse {
  email: string;
}
