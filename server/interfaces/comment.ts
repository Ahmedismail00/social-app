import mongoose, { Document } from 'mongoose';

export interface IComment {
  id?: string;
  userId: string;
  postId: string;
  comment: string;
}

export interface ICommentDoc extends IComment, Document{
  id?: string;
}