import {db} from '../datastore';
import {User,ExpressHandler} from '../types';
import crypto from 'crypto'
import {CreateUserRequest,CreateUserResponse,GetUserByEmailRequest,GetUserByEmailResponse,GetUserByUsernameRequest,GetUserByUsernameResponse} from '../api-types/user';

export const createUserHandler: ExpressHandler<CreateUserRequest,CreateUserResponse> = async(req,res) => {
  
  if(!req.body.userName || !req.body.email || !req.body.password){
    return res.sendStatus(400);
  }
  
  const user: User = {
    id : crypto.randomUUID(),
    userName: req.body.userName,
    email : req.body.email,
    password : req.body.password,
  }
  
  await db.createUser(user)
  res.sendStatus(200);
}

export const GetUserByUsernameHandler: ExpressHandler<GetUserByUsernameRequest,GetUserByUsernameResponse> = async (req,res) => {
  
  if(!req.query.id){
    return res.sendStatus(400);
  }
  
  await db.getUserByUsername(req.query.id)
  res.sendStatus(200);
}

export const GetUserByEmailHandler: ExpressHandler<GetUserByEmailRequest,GetUserByEmailResponse> = async (req,res) => {
  
  if(!req.query.email){
    return res.sendStatus(400);
  }
  
  await db.getUserByEmail(req.query.email)
  res.sendStatus(200);
}