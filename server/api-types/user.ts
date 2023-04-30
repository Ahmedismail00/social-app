import {IUser} from '../interfaces'; 

export interface ListUsersRequest{}
export interface ListUsersResponse{
  users: IUser[]
}

