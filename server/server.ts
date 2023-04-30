import express,{RequestHandler,ErrorRequestHandler} from 'express';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import {authMiddleware} from "./middlewares/authMiddleware"
import {listPostsHandler,createPostHandler,getPostHandler,deletePostHandler} from './handlers/postHandler';
import {signUpHandler,signInHandler} from './handlers/authHandler';
import {listUsersHandler} from './handlers/userHandler';
import {createCommentHandler} from './handlers/commentHandler';
import {initDb} from './datastore';
import {requestLoggerMiddleware} from './middlewares/loggerMiddleware';
import {errHandler} from './middlewares/errorMiddleware';
import mongoose from 'mongoose';
import config from './config/config';

// initDb()

mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
      console.log(`Running on ENV = ${process.env.NODE_ENV}`);
      console.log('Connected to mongoDB.');
      
      startServer();
  })
  .catch((error) => {
      console.log('Unable to connect.');
      console.log(error);
      process.exit(1);
});

const startServer = async ()=>{
  initDb();
  const app = express();

  app.use(express.json());
  
  app.use(requestLoggerMiddleware);
  
  // public
  app.get('/healthz',(req,res)=>{
    res.send({status:"ok"})
  })
  
  app.post('/v1/signup',asyncHandler(signUpHandler))
  app.post('/v1/signin',asyncHandler(signInHandler))
  
  app.use(authMiddleware);
  app.get('/v1/users',asyncHandler(listUsersHandler))
  
  app.get('/v1/posts',asyncHandler(listPostsHandler))
  app.get('/v1/post',asyncHandler(getPostHandler))
  app.post('/v1/post',asyncHandler(createPostHandler))
  app.post('/v1/delete-post',asyncHandler(deletePostHandler))
  
  app.post('/v1/comment',asyncHandler(createCommentHandler))
  
  
  app.use(errHandler)
  
  app.listen(process.env.APP_PORT || 3000); 
}
