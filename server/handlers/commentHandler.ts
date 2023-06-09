import {db} from '../datastore';
import {ExpressHandler} from '../types';
import {IComment} from '../interfaces';
import crypto from 'crypto'
import {CreateCommentRequest,CreateCommentResponse,ListCommentsRequest,ListCommentsResponse,DeleteCommentRequest,DeleteCommentResponse} from '../api-types/comment';


export const listCommentsHandler: ExpressHandler<ListCommentsRequest,ListCommentsResponse> = async (req,res) => {
  
  if(!req.body.postId){
    return res.sendStatus(400);
  }
  const postId = req.body.postId
  res.send({comments: await db.listComments(postId)})
}

export const createCommentHandler: ExpressHandler<CreateCommentRequest,CreateCommentResponse> = async (req,res) => {
  
  if(!req.body.postId || !req.body.comment){
    return res.sendStatus(400);
  }
  
  const comment: IComment = {
    comment: req.body.comment,
    postId : req.body.postId,
    userId : res.locals.userId,
  }
  
  await db.createComment(comment)
  res.sendStatus(200);
}

export const deleteCommentHandler: ExpressHandler<DeleteCommentRequest,DeleteCommentResponse> = async (req,res) => {
    if(!req.body.id){
      return res.sendStatus(400);
    }
    
    const id: string = req.body.id
    const deleteResponese = await db.deleteComment(id)
    res.sendStatus(200)
}




