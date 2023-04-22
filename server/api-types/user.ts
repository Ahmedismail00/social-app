import {User} from '../types'; 

// User APIs  

export type SignUpRequest = Pick<User, 'userName'| 'email'| 'password'>
export interface SignUpResponse{}

// export type SignInRequest = Pick<User, 'userName'>
export interface SignInRequest{
  login: string; // username or password
  password: string
}

export type SignInResponse = Pick<User, 'email'|'userName'|'id'>
