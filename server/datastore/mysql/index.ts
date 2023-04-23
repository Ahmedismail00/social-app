import {OkPacket, RowDataPacket} from "mysql2";
import mysql from "mysql2";
import {DataStore} from "..";
import {User, Post, Like, Comment} from "../../types";

export class MysqlDataStore implements DataStore{
  private db!:any;

  public async openDb() {
    // const mysql = require('mysql');
    this.db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'codersquare'
    });
   
    this.db.connect((err:any) => {
      if (err) throw err;
      console.log('Connected to MySQL Server!');
    });
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
  getUserById(id: string): Promise<User | undefined>{
    return Promise.resolve(this.users.find(u => u.id === id))
  }
  getUserByUsername(userName: string): Promise<User | undefined>{
    return Promise.resolve(this.users.find(u => u.userName === userName))
  }
  listUsers(): Promise<User[]>{
    return Promise.resolve(this.users);
  }
  
  listPosts(): Promise<Post[]>{
    // return this.db.query<Post[]>('SELECT * FROM posts')
    return this.db.query("SELECT * FROM posts")

    
    // return this.db.query<Post[]>("SELECT * FROM posts", (err, res) => {
    //     if (err) reject(err)
    //     else resolve(res)
    //   })
  }
  async createPost(post: Post): Promise<void>{
    // await this.db.query('INSERT INTO posts () VALUES (id,title,url,postedAt,userId)',post.id,post.title,post.url,post.postedAt,post.userId)
    return console.log('dddd')
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