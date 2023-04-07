import {db} from '../datastore';
import {User,ExpressHandler} from '../types';
import crypto from 'crypto'
import {CreateUserRequest,CreateUserResponse,GetUserByIdRequest,GetUserByIdResponse,GetUserByUsernameRequest,GetUserByUsernameResponse} from '../api-types/User';

export const createUserHandler: ExpressHandler<CreateUserRequest,CreateUserResponse> = (req,res) => {
  
  if(!req.body.userName || !req.body.email || !req.body.password){
    return res.sendStatus(400);
  }
  
  const user: User = {
    id : crypto.randomUUID(),
    comment: req.body.comment,
    postId : crypto.randomUUID(),
    userId : req.body.userId,
    postedAt : Date.now(),
  }
  
  db.createComment(comment)
  res.sendStatus(200);
}

export const deleteCommentHandler: ExpressHandler<DeleteCommentRequest,DeleteCommentResponse> = (req,res) => {
    if(!req.body.id){
      return res.sendStatus(400);
    }
    
    const id: string = req.body.id
    const deleteResponese = db.deleteComment(id)
    res.send(' done')
}




