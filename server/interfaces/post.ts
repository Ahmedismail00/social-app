import mongoose, { Document } from 'mongoose';

export interface IPost {
  id?: string;
  title: string;
  url: string;
  userId: string;
}


export interface IPostDoc extends IPost, Document {
  id?: string;
}