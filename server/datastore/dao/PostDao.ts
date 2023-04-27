import {IPost} from "../../interfaces";

export interface PostDao{
  listPosts(): Promise<IPost[]>
  createPost(post: IPost): Promise<void>
  getPost(id: string): Promise<IPost | undefined>
  deletePost(id: string): Promise<void>
}