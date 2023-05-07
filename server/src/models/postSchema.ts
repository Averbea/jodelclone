import mongoose from "mongoose";

export interface Post extends Required<{
    _id: mongoose.Schema.Types.ObjectId;
}> {
    author: string,
    message: string,
    channel: string,
    color: string,
    upvotes: string[],
    downvotes: string[],
    comments: mongoose.Schema.Types.ObjectId[],
    createdAt: Date
}


export const postSchema = new mongoose.Schema<Post>({
    author: { type: String, required: true },
    message: { type: String, required: true },
    channel: { type: String, required: true },
    color: { type: String, required: true},
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
