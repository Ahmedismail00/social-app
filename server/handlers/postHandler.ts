import {db} from '../datastore';
import {Post,ExpressHandler} from '../types';
import crypto from 'crypto'
import {CreatePostRequest,CreatePostResponse,ListPostsRequest,ListPostsResponse,DeletePostRequest,DeletePostResponse,GetPostRequest,GetPostResponse} from '../api-types/post';


export const listPostsHandler: ExpressHandler<ListPostsRequest,ListPostsResponse> = async (req,res) => {
  res.send({posts: await db.listPosts()})
}

export const createPostHandler: ExpressHandler<CreatePostRequest,CreatePostResponse> = async (req,res) => {
  
  if(!req.body.title || !req.body.url || !req.body.userId){
    return res.sendStatus(400);
  }
  
  const post: Post = {
    id : crypto.randomUUID(),
    postedAt : Date.now(),
    title : req.body.title,
    url : req.body.url,
    userId : req.body.userId,
  }
  
  await db.createPost(post)
  res.sendStatus(200);
} 


export const getPostHandler: ExpressHandler<GetPostRequest,GetPostResponse> = async (req,res) => {
    if(!req.query.userId){
      return res.sendStatus(400);
    }
    
    const post: Post | undefined = await db.getPost(req.query.userId)
    res.send({post: post})
}


export const deletePostHandler: ExpressHandler<DeletePostRequest,DeletePostResponse> = async (req,res) => {
    if(!req.body.id){
      return res.sendStatus(400);
    }
    
    const postId: string = req.body.id
    const deleteResponese = await db.deletePost(postId)
    
    res.sendStatus(200)
}




