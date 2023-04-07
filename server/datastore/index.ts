import {UserDao} from "./dao/UserDao";
import {LikeDao} from "./dao/LikeDao";
import {PostDao} from "./dao/PostDao";
import {CommentDao} from "./dao/CommentDao";
import {InMemoryDatastore} from './memorydb'

export interface Datastore extends UserDao, PostDao, LikeDao, CommentDao{}

export const db = new InMemoryDatastore();