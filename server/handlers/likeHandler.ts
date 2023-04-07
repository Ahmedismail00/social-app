import {db} from '../datastore';
import {Like, ExpressHandler} from '../types';
import {CreateLikeRequest,CreateLikeResponse} from '../api-types/like';

export const createLikeHanlder : ExpressHandler<CreateLikeRequest,CreateLikeResponse> = async (req,res) =>{
  
  if(!req.body.postId || !req.body.userId){
    return res.sendStatus(400)
  }
  const like: Like = {
    userId : req.body.userId,
    postId : req.body.postId
  }
  await db.createLike(like)
  // TODO: catch the error in await promise
  res.sendStatus(200)
}