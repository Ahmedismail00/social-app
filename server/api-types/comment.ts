import {Comment} from '../types'; 

// Comments APIs
export type ListCommentsRequest = Pick<Comment,'postId'>
export interface ListCommentsResponse{
  comments:Comment[]
}

export type CreateCommentRequest = Pick<Comment,'postId' | 'comment' | 'userId'>
export interface CreateCommentResponse{}

export type DeleteCommentRequest = Pick<Comment,'id'>
export interface DeleteCommentResponse{}