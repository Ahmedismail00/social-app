import {open as sqliteOpen} from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";
import {DataStore} from "..";
import {User, Post, Like, Comment} from "../../types";

export class SqlDataStore implements DataStore{
  public async openDb() {
    // open the db
    const db = await sqliteOpen({
      filename: path.join(__dirname,'codersquare.sqlite'),
      driver: sqlite3.Database
      })
      
      await db.migrate({
        migrationsPath: path.join(__dirname,'migrations')
      })
      return this;
  }
  
  private users: User[] = [];
  private posts: Post[] = [];
  private comments: Comment[] = [];
  private likes: Like[] = [];
  
  createUser(user: User): Promise<void>{
    this.users.push(user);
    return Promise.resolve();
  };
  getUserByEmail(email: string): Promise<User | undefined>{
    return Promise.resolve(this.users.find(u => u.email === email))
  }
  getUserByUsername(userName: string): Promise<User | undefined>{
    return Promise.resolve(this.users.find(u => u.userName === userName))
  }
  
  listPosts(): Promise<Post[]>{
    return Promise.resolve(this.posts);
  }
  createPost(post: Post): Promise<void>{
    this.posts.push(post)
    return Promise.resolve();
  }
  getPost(id: string): Promise<Post | undefined>{
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
  
  createLike(like: Like): Promise<void>{
    this.likes.push(like)
    return Promise.resolve();
  }
  
  listComments(postId: string): Promise<Comment[]>{
    return Promise.resolve(this.comments);
  }
  createComment(comment: Comment): Promise<void>{
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