import {db} from '../datastore';
import {User,ExpressHandler} from '../types';
import crypto from 'crypto'
import {SignUpRequest,SignUpResponse,SignInRequest,SignInResponse} from '../api-types/user';

export const signUpHandler: ExpressHandler<SignUpRequest,SignUpResponse> = async(req,res) => {
  
  const {email,userName,password} = req.body
  if(!email || !userName || !password){
    return res.sendStatus(400).send('All fields are required');
  }
  
  const existing = await db.getUserByEmail(email) || await db.getUserByUsername(userName)
  if(!existing){
    return res.status(403).send('User already exists')
  }
  const user: User = {
    id : crypto.randomUUID(),
    userName: userName,
    email : email,
    password : password,
  }
  
  await db.createUser(user)
  return res.sendStatus(200);
}

export const signInHandler: ExpressHandler<SignInRequest,SignInResponse> = async (req,res) => {
  const {login, password} = req.body
  if(!login || !password){
    return res.sendStatus(400);
  }
  const existing = (await db.getUserByEmail(login)) || (await db.getUserByUsername(login))
  
  if (!existing || existing.password != password){
    return res.status(403)
  }
  
  return res.send({
    email: existing.email,
    userName: existing.userName,
    id: existing.id,
  })
}