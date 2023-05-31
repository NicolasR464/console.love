import { Schema, model, models } from "mongoose";

const commentSchema = new Schema({
  userId: {
    type: String,
  },
  movieId: {
    type: String,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  like: {
    type: Number,
  },
});

// export default mongoose.model('movie', movieSchema)
const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;
