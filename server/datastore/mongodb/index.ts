import mongoose from 'mongoose';
import {DataStore} from "..";
import {IUser,IPost,ILike,IComment} from '../../interfaces';
import {User, IUserModel} from "../../models"
import config from '../../config/config';

export class MongoDataStore implements DataStore{
  // private db!:any;

  // public async openDb() {
    
  //   mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  //   .then(() => {
  //       console.log(`Running on ENV = ${process.env.NODE_ENV}`);
  //       console.log('Connected to mongoDB.');
  //   })
  //   .catch((error) => {
  //       console.log('Unable to connect.');
  //       console.log(error);
  //   });
  // }
  
  private users: IUser[] = [];
  private posts: IPost[] = [];
  private comments: IComment[] = [];
  private likes: ILike[] = [];
  
  createUser(user: IUser): Promise<void>{
    this.users.push(user);
    return Promise.resolve();
  }
  
  getUserByEmail(email: string): Promise<IUser | undefined>{
    return Promise.resolve(this.users.find(u => u.email === email))
  }
  getUserById(id: string): Promise<IUser | IUserModel | undefined>{
    return Promise.resolve(this.users.find(u => u.id === id))
  }
  getUserByUsername(username: string): Promise<IUser | undefined>{
    return Promise.resolve(this.users.find(u => u.username === username))
  }
  
  async listUsers(): Promise<IUser[]>{
    return await User.find();
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