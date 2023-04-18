import mongoose from "mongoose"
import { PostModel } from "../models/postSchema.js"
import CommentModel from "../models/commentSchema.js"


//#region _____________API Handlers__________________________

export const onGetPost = async (req, res) => {
    let id = getIdFromParams(req)
    if (!id) return res.sendStatus(400)

    try {
        const post = await PostModel.findById(id)
        const postToSend = reducePostToNecessaryData(post, req.userId)
        res.status(200).json(postToSend)
    } catch (error) {
        res.sendStatus(500)
    }
}

export const onDeletePost = async (req, res) => {
    let id = getIdFromParams(req)
    if (!id) return res.sendStatus(401)

    try {
        const response = await PostModel.findByIdAndDelete(id)
        if (!response) return res.sendStatus(400)
        for (let comment of response.comments) {
            CommentModel.findByIdAndDelete(comment).exec() // we do not care for the result here
        }
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export const onGetPosts = async (req, res) => {
    try {
        const postsFromDb = await PostModel.find().sort({ _id: -1 })
        const posts = postsFromDb.map((post) => reducePostToNecessaryData(post, req.userId))
        res.status(200).json(posts);

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const onCreatePost = async (req, res) => {
    const post = req.body;
    const { message } = post

    if (!message) return res.sendStatus(400)

    const newPost = new PostModel({ message: message, channel: "main", author: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save()
        res.status(201).json(newPost._id)
    } catch (error) {
        res.status(409).json(error.message)
    }
}

export const onVotePosts = async (req, res) => {
    let id = getIdFromParams(req)
    if (!id) return res.sendStatus(400)
    try {
        const { vote } = req.body

        let toAddTo = ""
        if (vote == "up") {
            toAddTo = "upvotes"
        }
        else if (vote == "down") {
            toAddTo = "downvotes"
        }
        else {
            //vote should either be "up" or "down"
            res.sendStatus(400)
            return
        }

        let queryParam = {}
        queryParam[toAddTo] = req.userId

        const newData = await PostModel.findOneAndUpdate(
            {
                _id: id,
                upvotes: { "$ne": req.userId },
                downvotes: { "$ne": req.userId }
            },
            {
                $addToSet: queryParam,
            },
            {
                new: true
            }
        )

        if (newData) {
            const newPost = reducePostToNecessaryData(newData, req.userId)
            res.status(200).json(newPost)
        } else {
            console.log(newData)
            res.sendStatus(400)
        }
    } catch (error) {
        res.sendStatus(500)
    }

}

//#endregion

//#region _____________Helper Functions______________________

export function getIdFromParams(req) {
    try {
        return new mongoose.Types.ObjectId(req.params.id)
    } catch (error) {

    }
}

function reducePostToNecessaryData(post, userId) {
    const isUsersPost = post.author === userId ? true : false;
    let userVote = "none"
    if (post.upvotes.includes(userId)) {
        userVote = "up"
    }
    else if (post.downvotes.includes(userId)) {
        userVote = "down"
    }

    return {
        _id: post._id,
        isUsersPost,
        message: post.message,
        votes: post.upvotes.length - post.downvotes.length,
        userVote: userVote,
        commentAmount: post.comments.length,
        channel: post.channel,
        createdAt: post.createdAt

    }
}

// #endregion