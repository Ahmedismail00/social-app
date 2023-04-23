import express,{RequestHandler,ErrorRequestHandler} from 'express';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import {authMiddleware} from "./middleware/authMiddleware"
import {listPostsHandler,createPostHandler,getPostHandler,deletePostHandler} from './handlers/postHandler';
import {signUpHandler,signInHandler} from './handlers/authHandler';
import {listUsersHandler} from './handlers/userHandler';
import {initDb} from './datastore';
import {requestLoggerMiddleware} from './middleware/loggerMiddleware';
import {errHandler} from './middleware/errorMiddleware';

(async ()=>{
  await initDb()
  dotenv.config();
  const app = express();

  app.use(express.json());


  
app.use(requestLoggerMiddleware);

app.post('/v1/signup',asyncHandler(signUpHandler))
app.post('/v1/signin',asyncHandler(signInHandler))

app.use(authMiddleware);

app.get('/v1/posts',asyncHandler(listPostsHandler))
app.get('/v1/post',asyncHandler(getPostHandler))
app.post('/v1/post',asyncHandler(createPostHandler))
app.post('/v1/delete-post',asyncHandler(deletePostHandler))

app.get('/v1/users',asyncHandler(listUsersHandler))


 
app.use(errHandler)


app.listen(3000);


})()
