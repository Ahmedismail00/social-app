import express,{RequestHandler,ErrorRequestHandler} from 'express';
import asyncHandler from 'express-async-handler'

import {listPostsHandler,createPostHandler,getPostHandler,deletePostHandler} from './handlers/postHandler'
import {signUpHandler,signInHandler} from './handlers/userHandler'
import {initDb} from './datastore'

(async ()=>{
  await initDb()
  
  const app = express();

app.use(express.json());

const requestLoggerMiddleware: RequestHandler = 
  (req, res, next) =>{
    console.log('New Request', req.path , '- body:', req.body)
    next();
  }
  
app.use(requestLoggerMiddleware);

app.get('/v1/posts',asyncHandler(listPostsHandler))
app.get('/v1/post',asyncHandler(getPostHandler))
app.post('/v1/post',asyncHandler(createPostHandler))
app.post('/v1/delete-post',asyncHandler(deletePostHandler))

app.post('/v1/signup',asyncHandler(signUpHandler))
app.post('/v1/signin',asyncHandler(signInHandler))

const errHandler : ErrorRequestHandler = (err, req, res, next) => {
  console.error('Uncaught exception: ', err)
 return res.status(500).send('Ops, an unexpected error ocured, please try again!')
}
 
 app.use(errHandler)


app.listen(3000);


})()
