import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {authMiddleware} from "../middlewares"
import {
  listPostsHandler,
  createPostHandler,
  getPostHandler,
  deletePostHandler,
  signUpHandler,
  signInHandler,
  listUsersHandler,
  createCommentHandler
} from '../handlers';
  
  
  
const router = Router();

router.get('/healthz',(req,res)=>{
  res.send({status:"ok"})
})
router.post('/v1/signup',asyncHandler(signUpHandler))
router.post('/v1/signin',asyncHandler(signInHandler))

router.use(authMiddleware);

// private routes
router.get('/v1/users',asyncHandler(listUsersHandler))

router.get('/v1/posts',asyncHandler(listPostsHandler))
router.get('/v1/post',asyncHandler(getPostHandler))
router.post('/v1/post',asyncHandler(createPostHandler))
router.post('/v1/delete-post',asyncHandler(deletePostHandler))

router.post('/v1/comment',asyncHandler(createCommentHandler))

export default router;