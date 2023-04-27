import mongoose, { Document } from 'mongoose';

export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}
 
 
export interface IUserModel extends IUser, Document {
  id?: string;
}