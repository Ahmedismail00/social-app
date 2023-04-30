import mongoose, { Document, Schema } from 'mongoose';
import {ILike,ILikeDoc} from '../../../interfaces';


const LikeSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  },
  {timestamps: true}
  );

export default mongoose.model<ILikeDoc>('Like',LikeSchema);
