import mongoose from "mongoose";

export interface Comment {
    _id: mongoose.Schema.Types.ObjectId,
    author: string,
    message: string,
    upvotes: string[],
    downvotes: string[],
    createdAt: Date
}

export const commentSchema = new mongoose.Schema<Comment>({
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
