import mongoose, { Document, Schema } from 'mongoose';
import {IPost,IPostDoc} from '../../../interfaces';

                                      
const PostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    comments:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }],
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref : "Like"
    }]
  },
  {timestamps: true}
  );

export default mongoose.model<IPostDoc>('Post',PostSchema);
