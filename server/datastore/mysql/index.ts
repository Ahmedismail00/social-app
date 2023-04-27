import {OkPacket, RowDataPacket} from "mysql2";
import mysql from "mysql2";
import {DataStore} from "..";
import {IUser,IPost,ILike,IComment} from '../../interfaces';
import {GetUserType} from "../../types/user";
import {signJwt} from '../../auth';

export class MysqlDataStore implements DataStore{
  private db!:any;

  public async openDb() {
    // const mysql = require('mysql');
    this.db = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });
   
    this.db.connect((err:any) => {
      if (err) throw err;
      console.log('Connected to MySQL Server!');
    });
  }
  
  
  
  private users: IUser[] = [];
  private posts: IPost[] = [];
  private comments: IComment[] = [];
  private likes: ILike[] = [];
  
  async createUser(user: IUser): Promise<string>{
    user.id = crypto.randomUUID();
    const jwt = await signJwt({userId: user.id});
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
    // return this.db.query<IPost[]>('SELECT * FROM posts')
    return this.db.query("SELECT * FROM posts")

    
    // return this.db.query<IPost[]>("SELECT * FROM posts", (err, res) => {
    //     if (err) reject(err)
    //     else resolve(res)
    //   })
  }
  async createPost(post: IPost): Promise<void>{
    // await this.db.query('INSERT INTO posts () VALUES (id,title,url,postedAt,userId)',post.id,post.title,post.url,post.postedAt,post.userId)
    return console.log('dddd')
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