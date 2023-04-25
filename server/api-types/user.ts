import {IUser} from '../interfaces'; 


export type SignUpRequest = Pick<IUser, 'firstName'|'lastName'|'username'| 'email'| 'password'>
export interface SignUpResponse{
  jwt:string
}

export interface SignInRequest{
  login: string; // username or password
  password: string
}

export type SignInResponse = 
{
  user: Pick<IUser, 'email'|'username'|'id'>,
  jwt: string
}

export interface ListUsersRequest{}
export interface ListUsersResponse{
  users: IUser[]
}