import {UserDao} from "./dao/UserDao";
import {LikeDao} from "./dao/LikeDao";
import {PostDao} from "./dao/PostDao";
import {CommentDao} from "./dao/CommentDao";
import {InMemoryDataStore} from './memorydb'
import {SqlDataStore} from './sql'

export interface DataStore extends UserDao, PostDao, LikeDao, CommentDao{}

// Decleration
export let db:DataStore;

// Initialization
export async function initDb(){
  // db = new InMemoryDataStore();
  db = await new SqlDataStore().openDb;
}