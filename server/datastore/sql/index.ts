import { Database, open as sqliteOpen } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from "path";
import {DataStore} from "..";
import {User, Post, Like, Comment} from "../../types";

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
  
  private users: User[] = [];
  private posts: Post[] = [];
  private comments: Comment[] = [];
  private likes: Like[] = [];
  
  async createUser(user: User): Promise<void>{
    await this.db.run(`INSERT INTO users (id,email,password,username) VALUES (?,?,?,?)`,
      user.id,
      user.email,
      user.password,
      user.userName
    );
  }
    
  getUserByEmail(email: string): Promise<User | undefined>{
    return this.db.get<User>(`SELECT * FROM users WHERE users.email = ?` , email)
  }
  getUserById(id: string): Promise<User | undefined>{
    return Promise.resolve(this.users.find(u => u.id === id))
  }
  getUserByUsername(userName: string): Promise<User | undefined>{
    return this.db.get<User>(`SELECT * FROM users WHERE users.username = ?` , userName)
  }
  listUsers(): Promise<User[]>{
    return Promise.resolve(this.users);
  }
  
  listPosts(): Promise<Post[]>{
    return this.db.all<Post[]>('SELECT * FROM posts')
  }
  async createPost(post: Post): Promise<void>{
    await this.db.run('INSERT INTO posts () VALUES (id,title,url,postedAt,userId)',post.id,post.title,post.url,post.postedAt,post.userId)
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