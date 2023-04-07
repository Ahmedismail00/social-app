import {User} from '../types'; 

// User APIs

export interface CreateUserRequest extends User{}  

// export type CreateUserRequest = Pick<User, 'userName'| 'email'| 'password'>
export interface CreateUserResponse{}

export type GetUserByUsernameRequest = Pick<User, 'userName'>
export interface GetUserByUsernameResponse{user: User}

export type GetUserByEmailRequest = Pick<User, 'email'>
export interface GetUserByEmailResponse{
  user: User
}