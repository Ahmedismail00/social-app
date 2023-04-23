import {db} from '../datastore';
import {User,ExpressHandler} from '../types';
import crypto from 'crypto'
import {ListUsersRequest,ListUsersResponse} from '../api-types/user';

export const listUsersHandler: ExpressHandler<ListUsersRequest,ListUsersResponse> = async(req,res) => {
    res.send({users: await db.listUsers()})
  }
