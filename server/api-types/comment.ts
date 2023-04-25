import {IComment} from '../interfaces'; 

// Comments APIs
export type ListCommentsRequest = Pick<IComment,'postId'>
export interface ListCommentsResponse{
  comments: IComment[]
}

export type CreateCommentRequest = Pick<IComment,'postId' | 'comment' | 'userId'>
export interface CreateCommentResponse{}

export type DeleteCommentRequest = Pick<IComment,'id'>
export interface DeleteCommentResponse{}