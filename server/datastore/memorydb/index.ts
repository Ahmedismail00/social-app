import {DataStore} from "../"
import {IUser,IPost,ILike,IComment} from '../../interfaces';
import {GetUserType} from "../../types/user";
import {signJwt} from '../../auth';

export class InMemoryDataStore implements DataStore{
  
  
  private users: IUser[] = [];
  private posts: IPost[] = [];
  private comments: IComment[] = [];
  private likes: ILike[] = [];
  
  createUser(user: IUser): Promise<string>{
    user.id = crypto.randomUUID();
    const jwt = signJwt({userId: user.id});
    this.users.push(user);
    return Promise.resolve(jwt);
  };
  getUserByEmail(email: string): Promise<GetUserType>{
    return Promise.resolve(this.users.find(u => u.email === email))
  }
  getUserById(id: string): Promise<GetUserType>{
    return Promise.resolve(this.users.find(u => u.id === id))
  }
  getUserByUsername(username: string): Promise<GetUserType>{
    return Promise.resolve(this.users.find(u => u.username === username))
  }
  listUsers(): Promise<IUser[]>{
    return Promise.resolve(this.users);
  }
  
  listPosts(): Promise<IPost[]>{
    return Promise.resolve(this.posts);
  }
  createPost(post: IPost): Promise<void>{
    this.posts.push(post)
    return Promise.resolve();
  }
  getPost(id: string): Promise<IPost | undefined>{
    return Promise.resolve(this.posts.find(p => p.id === id));
  }
  deletePost(id: string): Promise<void> {
    const index = this.posts.findIndex(p => p.id === id)
    if(index === -1){
      return Promise.resolve(); 
    }
    this.posts.splice(index,1)
    return Promise.resolve();
  }
  
  createLike(like: ILike): Promise<void>{
    this.likes.push(like)
    return Promise.resolve();
  }
  
  listComments(postId: string): Promise<IComment[]>{
    return Promise.resolve(this.comments);
  }
  createComment(comment: IComment): Promise<void>{
    this.comments.push(comment)
    return Promise.resolve();
  }
  deleteComment(id: string): Promise<void>{
    const index = this.comments.findIndex(c => c.id === id)
    if(index === -1){
      return Promise.resolve();
    }
    this.comments.splice(index,11)
    return Promise.resolve();
  }
  
  
}