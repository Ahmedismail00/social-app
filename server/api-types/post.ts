import {IPost} from '../interfaces'; 
import {GetPostType} from '../types'
// Post APIs
export interface ListPostsRequest {}
export interface ListPostsResponse {
  posts:IPost[]
}

export type CreatePostRequest = Pick<IPost, 'title'|'url'>
export interface CreatePostResponse{}

export interface GetPostRequest{}
export interface GetPostResponse{post: GetPostType}

export type DeletePostRequest = Pick<IPost,'id'>
export interface DeletePostResponse{}