import {IUser} from "../../interfaces";
import {IUserModel} from "../../models";

export interface UserDao{
  
  createUser(user: IUser): Promise<void>;
  getUserById(id: string): Promise<IUser | undefined>;
  getUserByEmail(email: string): Promise<IUser | undefined>;
  getUserByUsername(username: string): Promise<IUser | undefined>;
  listUsers(): Promise<IUser[]> | undefined;
}