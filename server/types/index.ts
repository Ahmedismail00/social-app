import { RequestHandler } from 'express';
import {GetUserType} from "./user"
import {GetPostType} from "./post"

type WithError<T> = T & {error: string};

export type ExpressHandler<Req, Res> = RequestHandler<
  string,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;

export interface JwtObject{
  userId: string
}

export {
  GetUserType,
  GetPostType
}