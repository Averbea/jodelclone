import mongoose from "mongoose"
import PostModel from "../models/postSchema.js"

export const getPost = async (req, res) => {
    try {
        const post = await PostModel.findById(new mongoose.Types.ObjectId(req.params))
        const postToSend = reducePostToNecessaryData(post, req.userId)
        res.status(200).json(postToSend)
    } catch (error) {

        res.sendStatus(500)
    }
}

const reducePostToNecessaryData = (post, userId) => {
    const isUsersPost = post.author === userId ? true: false;
    let userVote = "none"
    if(post.upvotes.includes(userId)){
        userVote ="up"
    }
    else if (post.downvotes.includes(userId)){
        userVote = "down"
    }

    return {
        _id: post._id,
        isUsersPost, 
        message: post.message,
        votes: post.upvotes.length - post.downvotes.length,
        userVote: userVote,
        commentAmount: 0,
        channel: post.channel

    }
}

export const getPosts = async (req, res) => {
    try {
        const postsFromDb = await PostModel.find().sort({_id: -1})
        const posts = postsFromDb.map((post) => reducePostToNecessaryData(post, req.userId))
        res.status(200).json(posts);

    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const {message} = post
    const newPost = new PostModel({message: message,channel: "main", author: req.userId, createdAt: new Date().toISOString()});
    try {
        await newPost.save()
        res.status(201).json(newPost._id)
    } catch (error) {
        res.status(409).json(error.message)        
    }
}


export const votePost = async (req, res) => {
    try {
        const {vote} = req.body
    
        let toAddTo =""
        if(vote == "up"){
            toAddTo = "upvotes"
        }
        else if(vote == "down"){
            toAddTo = "downvotes"
        }
        else{
            //vote should either be "up" or "down"
            res.sendStatus(400)
            return
        }
        
        let queryParam = {}
        queryParam[toAddTo] = req.userId
       
        const newData = await PostModel.findOneAndUpdate(
            {
                _id: req.params.id,
                upvotes: { "$ne" : req.userId}, 
                downvotes: { "$ne" : req.userId}
            },
            {
                $addToSet: queryParam, 
            },
            { 
                new: true
            }
             ) 

        if(newData){
            const newPost = reducePostToNecessaryData(newData, req.userId)
            res.status(200).json(newPost)            
        }else{
            res.sendStatus(400)
        }
    } catch (error) {
        res.sendStatus(500)
    }
   
}