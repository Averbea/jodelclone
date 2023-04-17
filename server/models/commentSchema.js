import mongoose from "mongoose";

export const commentSchema = mongoose.Schema({
    author: { type: String, required: true },
    message: { type: String, required: true },
    upvotes: {
        type: [String],
        default: []
    },
    downvotes: {
        type: [String],
        default: []
    },
    createdAt: { type: Date, default: new Date() }

})

export const CommentModel = mongoose.model('Comment', commentSchema)

export default CommentModel