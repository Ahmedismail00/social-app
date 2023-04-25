import {RequestHandler} from 'express';

export const requestLoggerMiddleware: RequestHandler = 
  (req, res, next) =>{
    console.log('New Request', req.path , '- body:', req.body)
    next();
  }