import {db} from '../datastore';
import {User,ExpressHandler} from '../types';
import crypto from 'crypto'
import {SignUpRequest,SignUpResponse,SignInRequest,SignInResponse} from '../api-types/user';
import {signJwt, verifyJwt} from '../auth'


export const signUpHandler: ExpressHandler<SignUpRequest,SignUpResponse> = async(req,res) => {
  
  const {email,userName,password} = req.body
  if(!email || !userName || !password){
    return res.sendStatus(400).send({error: 'All fields are required'});
  }
  
  const existing = await db.getUserByEmail(email) || await db.getUserByUsername(userName)
  if(existing){
    return res.status(403).send({error:'User already exists'})
  }
  
  const passwordHash = hashPassword(password)
  
  const user: User = {
    id : crypto.randomUUID(),
    userName: userName,
    email : email,
    password : passwordHash,
  }
  
  await db.createUser(user)
  const jwt = signJwt({userId: user.id});
  return res.sendStatus(200).send({
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
  
  
  if (!existing || existing.password != passwordHash){
    return res.sendStatus(403)
  }
  
  const jwt = signJwt({userId: existing.id})
  
  return res.send({
    user: {
      email: existing.email,
      userName: existing.userName,
      id: existing.id
    },
    jwt
  })
}


function hashPassword(password:string): string{
  return crypto.pbkdf2Sync(password,process.env.PASSWORD_SALT!,42,64,'sha512').toString('hex')
}