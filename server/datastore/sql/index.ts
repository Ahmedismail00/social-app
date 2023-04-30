import { Database, open as sqliteOpen } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from "path";
import {DataStore} from "..";
import {IUser,IPost,IPostDoc,ILike,IComment} from '../../interfaces';
import {GetUserType,GetPostType} from "../../types";
import {signJwt} from '../../auth';

export class SqlDataStore implements DataStore{
  private db!: Database<sqlite3.Database, sqlite3.Statement>;

  public async openDb(dbPath: string) {
    // open the database
      this.db = await sqliteOpen({
        filename: dbPath,
        driver: sqlite3.Database,
        mode: sqlite3.OPEN_READWRITE,
      });
    
      this.db.run('PRAGMA foreign_keys = ON;');
        
      await this.db.migrate({
      migrationsPath: path.join(__dirname, 'migrations'),
    });
    
    return this;
  }
  
  private users: IUser[] = [];
  private posts: IPost[] = [];
  private comments: IComment[] = [];
  private likes: ILike[] = [];
  
  async createUser(user: IUser): Promise<string>{
    // await this.db.run(`INSERT INTO users (id,email,password,username) VALUES (?,?,?,?)`,
    //   user.id,
    //   user.email,
    //   user.password,
    //   user.username
    // );
    user.id = crypto.randomUUID();
    const jwt = await signJwt({userId: user.id});
    this.users.push(user);
    return Promise.resolve(jwt);
  }
    
  getUserByEmail(email: string): Promise<GetUserType>{
    return this.db.get<IUser>(`SELECT * FROM users WHERE users.email = ?` , email)
  }
  getUserById(id: string): Promise<GetUserType>{
    return Promise.resolve(this.users.find(u => u.id === id))
  }
  getUserByUsername(username: string): Promise<GetUserType>{
    return this.db.get<IUser>(`SELECT * FROM users WHERE users.username = ?` , username)
  }
  listUsers(): Promise<IUser[]>{
    return Promise.resolve(this.users);
  }
  
  listPosts(): Promise<IPost[]>{
    return this.db.all<IPost[]>('SELECT * FROM posts')
  }
  async createPost(post: IPost): Promise<void>{
    await this.db.run('INSERT INTO posts () VALUES (title,url,userId)',post.title,post.url,post.userId)
  }
  getPost(id: string): Promise<GetPostType>{
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