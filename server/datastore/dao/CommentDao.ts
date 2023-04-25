import {IComment} from '../../interfaces';


export interface CommentDao{
  
  createComment(comment: IComment): Promise<void>
  listComments(postId: string): Promise<IComment[]>
  deleteComment(id: string): Promise<void>
  
}