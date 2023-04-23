import {User} from '../types'; 

// User APIs  

export type SignUpRequest = Pick<User, 'userName'| 'email'| 'password'>
export interface SignUpResponse{
  jwt:string
}

export interface SignInRequest{
  login: string; // username or password
  password: string
}

export type SignInResponse = 
{
  user: Pick<User, 'email'|'userName'|'id'>,
  jwt: string
}

export interface ListUsersRequest{}
export interface ListUsersResponse{
  users: User[]
}