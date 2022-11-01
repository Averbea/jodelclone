import mongoose from "mongoose"
import PostModel from "../models/postSchema.js"

export const getPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().sort({_id: -1})
        
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