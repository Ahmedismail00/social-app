import {db} from '../datastore';
import {ExpressHandler} from '../types';
import {IUser} from '../interfaces';
import crypto from 'crypto'
import {SignUpRequest,SignUpResponse,SignInRequest,SignInResponse} from '../api-types/auth';
import {signJwt, verifyJwt} from '../auth'


export const signUpHandler: ExpressHandler<SignUpRequest,SignUpResponse> = async(req,res) => {
  
  const {firstName,lastName,username,email,password} = req.body
  if(!firstName || !lastName|| !username || !email  || !password){
    return res.status(400).send({error: 'All fields are required'});
  }
  
  const existing = await db.getUserByEmail(email) || await db.getUserByUsername(username)
  if(existing){
    return res.status(403).send({error:'User already exists'})
  }
  
  const passwordHash = hashPassword(password)
  
  const user: IUser = {
    firstName: firstName,
    lastName: lastName,
    username: username,
    email : email,
    password : passwordHash,
  }
  
  const jwt = await db.createUser(user)
  
 return res.status(200).json({
    jwt
  });
}

export const signInHandler: ExpressHandler<SignInRequest,SignInResponse> = async (req,res) => {
  const {login, password} = req.body
  if(!login || !password){
    return res.sendStatus(400);
  }
  const existing = (await db.getUserByEmail(login)) || (await db.getUserByUsername(login))
  
  const passwordHash = hashPassword(password)
  
  
  if (!existing || !existing.id || existing.password != passwordHash){
    return res.status(403).send({error:"User is not existing"})
  }
  
  const jwt = await signJwt({userId: existing.id})
  
  return res.json({
    user: {
      email: existing.email,
      username: existing.username,
      id: existing.id
    },
    jwt
  })
}


function hashPassword(password:string): string{
  return crypto.pbkdf2Sync(password,process.env.PASSWORD_SALT!,42,64,'sha512').toString('hex')
}