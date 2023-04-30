import {db} from '../datastore';
import {ExpressHandler} from '../types';
import {IUser} from '../interfaces';
import crypto from 'crypto'
import {ListUsersRequest,ListUsersResponse} from '../api-types/user';

export const listUsersHandler: ExpressHandler<ListUsersRequest,ListUsersResponse> = async(req,res) => {
    res.send({users: await db.listUsers()})
  }