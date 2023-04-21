import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
    author: { type: String, required: true },
    message: { type: String, required: true },
    channel: { type: String, required: true },
    upvotes: {
        type: [String],
        default: []
    },
    downvotes: {
        type: [String],
        default: []
    },
    comments: { type: [mongoose.Schema.Types.ObjectId], ref: "Comment" },
    createdAt: { type: Date, default: new Date() }

})

export const PostModel = mongoose.model('Post', postSchema)

export default PostModel