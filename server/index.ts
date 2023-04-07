import express,{RequestHandler,ErrorRequestHandler} from 'express';
import asyncHandler from 'express-async-handler'

import {listPostsHandler,createPostHandler,getPostHandler,deletePostHandler} from './handlers/postHandler'

const app = express();

app.use(express.json());

const requestLoggerMiddleware: RequestHandler = 
  (req, res, next) =>{
    console.log('New Request', req.path , '- body:', req.body);
    next();
  }
  
app.use(requestLoggerMiddleware);

app.get('/posts',asyncHandler(listPostsHandler))
app.get('/post',asyncHandler(getPostHandler))
app.post('/post',asyncHandler(createPostHandler))
app.post('/delete-post',asyncHandler(deletePostHandler))

const errHandler : ErrorRequestHandler = (err, req, res, next) => {
  console.error('Uncaught exception: ', err)
  return res.status(500).send('Ops, an unexpected error ocured, please try again!')
}
 
 app.use(errHandler)


app.listen(3000);

