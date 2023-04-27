import {ErrorRequestHandler} from 'express';

export const errHandler : ErrorRequestHandler = (err, req, res, next) => {
  console.error('Uncaught exception: ', err)
// return res.status(500).send('Ops, an unexpected error ocured, please try again!')
}