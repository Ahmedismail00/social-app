import {IPost,IPostDoc} from "../../interfaces";
import {GetPostType} from "../../types"

export interface PostDao{
  listPosts(): Promise<IPost[]>
  createPost(post: IPost): Promise<void>
  getPost(id: string): Promise<GetPostType>
  deletePost(id: string): Promise<void>
}