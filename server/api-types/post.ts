import {IPost} from '../interfaces'; 

// Post APIs
export interface ListPostsRequest {}
export interface ListPostsResponse {
  posts:IPost[]
}

export type CreatePostRequest = Pick<IPost, 'title'|'url'>
export interface CreatePostResponse{}

export interface GetPostRequest{}
export interface GetPostResponse{post: IPost}

export type DeletePostRequest = Pick<IPost,'id'>
export interface DeletePostResponse{}