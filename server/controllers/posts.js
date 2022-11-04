import mongoose from "mongoose"
import PostModel from "../models/postSchema.js"

const reducePostToNecessaryData = (post, userId) => {
    const isUsersPost = post.author === userId ? true: false;
    const userVote = 0
    return {
        _id: post._id,
        isUsersPost, 
        message: post.message,
        votes: post.upvotes.length - post.downvotes.length,
        commentAmount: 0,
        channel: post.channel

    }
}

export const getPosts = async (req, res) => {
    try {
        const postsFromDb = await PostModel.find().sort({_id: -1})
        const posts = postsFromDb.map((post) => reducePostToNecessaryData(post, req.userId))
        res.status(200).json({posts});

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