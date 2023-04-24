import {UserDao} from "./dao/UserDao";
import {LikeDao} from "./dao/LikeDao";
import {PostDao} from "./dao/PostDao";
import {CommentDao} from "./dao/CommentDao";
import {InMemoryDataStore} from './memorydb'
import {SqlDataStore} from './sql';
import {MysqlDataStore} from './mysql';
import {MongoDataStore} from './mongodb';

export interface DataStore extends UserDao, PostDao, LikeDao, CommentDao{}

// Decleration
export let db:DataStore;

// Initialization
export async function initDb(dbPath?:string) {
  // db = await new SqlDataStore().openDb(dbPath);
  //db = await new InMemoryDataStore();
  db = await new MongoDataStore();
}