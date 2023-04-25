import mongoose, { Document, Schema } from 'mongoose';
import {IUser} from '../interfaces';

interface IUserDb extends Omit<IUser,'id'>{}

export interface IUserModel extends IUserDb, Document {}

const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      min: 8
    },
  },
  {timestamps: true}
  );

export default mongoose.model<IUserModel>('User',UserSchema);
