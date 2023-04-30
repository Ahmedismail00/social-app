import mongoose from 'mongoose';
import {DataStore} from "..";
import {User,Post,Comment,Like} from "./models";
import {IUser,IPost,IPostDoc,ILike,IComment} from '../../interfaces';
import {GetUserType,GetPostType} from "../../types";
import config from '../../config/config';
import crypto from 'crypto';
import {signJwt} from '../../auth';

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

  async createUser(user: IUser): Promise<string>{
    const createdUser = await User.create(user);
    const jwt = await signJwt({userId: createdUser._id});
    return Promise.resolve(jwt);
  }
  async getUserByEmail(email: string): Promise<GetUserType>{
    return await User.findOne({email});
  }
  async getUserById(id: string): Promise<GetUserType>{
    return await User.findById(id);
  }
  async getUserByUsername(username: string): Promise<GetUserType>{
    return await User.findOne({username});
  }
  async listUsers(): Promise<IUser[]>{
    return await User.find().populate('posts');
  }
  
  async listPosts(): Promise<IPost[]>{
    return await Post.find().populate("comments");
  }
  
  async createPost(post: IPost): Promise<void>{
    await Post.create(post);
    return Promise.resolve();
  }
  async getPost(id: string): Promise<GetPostType>{
    return Promise.resolve(await Post.findById(id));
  }
  async deletePost(id: string): Promise<void> {
    await Post.deleteOne({_id:id});
    return Promise.resolve();
  }
  
  async createLike(like: ILike): Promise<void>{
    await Like.create(like);
    return Promise.resolve();
  }
  
  async listComments(postId: string): Promise<IComment[]>{
    return await Comment.find();
  }
  async createComment(comment: IComment): Promise<void>{
    await Comment.create(comment);
    return Promise.resolve();
  }
  async deleteComment(id: string): Promise<void>{
    await Comment.deleteOne({_id:id})
    return Promise.resolve();
  }
}