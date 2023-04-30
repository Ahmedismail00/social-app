import mongoose, { Document } from 'mongoose';

export interface ILike {
  id?: string;
  userId: string;
  postId: string;
}

export interface ILikeDoc extends ILike, Document{
  id?: string;
}