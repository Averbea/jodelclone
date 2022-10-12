import mongoose from "mongoose";

export const postSchema = mongoose.Schema({
    author: {type: String, required: true},
    message: {type: String, required: true},
    channel: {type: String, required: true},
    upvotes: {
        type: [String], 
        default: []
    },
    downvotes: {
        type: [String], 
        default: []
    },
    createdAt: {type:Date, default: new Date()}
    
})

const PostModel = mongoose.model('Post', postSchema)

export default PostModel