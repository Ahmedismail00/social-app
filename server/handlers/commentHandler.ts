import {db} from '../datastore';
import {Comment,ExpressHandler} from '../types';
import crypto from 'crypto'
import {CreateCommentRequest,CreateCommentResponse,ListCommentsRequest,ListCommentsResponse,DeleteCommentRequest,DeleteCommentResponse} from '../api-types/comment';


export const listCommentsHandler: ExpressHandler<ListCommentsRequest,ListCommentsResponse> = (req,res) => {
  
  if(!req.body.postId){
    return res.sendStatus(400);
  }
  const postId = req.body.postId
  res.send({comments: db.listComments(postId)})
}

export const createCommentHandler: ExpressHandler<CreateCommentRequest,CreateCommentResponse> = (req,res) => {
  
  if(!req.body.postId || !req.body.comment || !req.body.userId){
    return res.sendStatus(400);
  }
  
  const comment: Comment = {
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




