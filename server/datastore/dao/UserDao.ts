import {IUser} from "../../interfaces";
import {GetUserType} from "../../types/user";

export interface UserDao{
  createUser(user: IUser): Promise<string>;
  getUserById(id: string): Promise<GetUserType>;
  getUserByEmail(email: string): Promise<GetUserType>;
  getUserByUsername(username: string): Promise<GetUserType>;
  listUsers(): Promise<IUser[]> | undefined;
}