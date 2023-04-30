import mongoose, { Document, Schema } from 'mongoose';
import {IComment,ICommentDoc} from '../../../interfaces';


const CommentSchema: Schema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    },
    
  },
  {timestamps: true}
  );

export default mongoose.model<ICommentDoc>('Comment',CommentSchema);
