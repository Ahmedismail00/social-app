import express,{RequestHandler,ErrorRequestHandler} from 'express';
import {listPostsHandler,createPostHandler,getPostHandler,deletePostHandler} from './handlers/postHandler'

const app = express();

app.use(express.json());

const requestLoggerMiddleware: RequestHandler = 
  (req, res, next) =>{
    console.log('New Request', req.path , '- body:', req.body);
    next();
  }
  
app.use(requestLoggerMiddleware);

app.get('/posts',listPostsHandler)
app.get('/post',getPostHandler)
app.post('/post',createPostHandler)
app.post('/delete-post',deletePostHandler)

const errHandler : ErrorRequestHandler = (err, req, res, next) => {
  console.error('Uncaught exception: ', err)
  return res.status(500).send('Ops, an unexpected error ocured, please try again!')
}
 
 app.use(errHandler)


app.listen(3000);

