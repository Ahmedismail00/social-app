import {ILike} from '../../interfaces';


export interface LikeDao{
  
  createLike(like: ILike): Promise<void>
}