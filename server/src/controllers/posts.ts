import mongoose, { AggregateOptions, PipelineStage } from "mongoose"
import { Post, PostModel } from "../models/postSchema"
import { CommentModel } from "../models/commentSchema"
import { CustomRequest } from "../RequestType"
import { Request, Response } from "express"


//#region _____________API Handlers__________________________
interface tmp extends Request {
    userId: string
}


export const onGetPost = async (req: CustomRequest, res: Response) => {
    let id = getIdFromParams(req)
    if (!id) return res.sendStatus(400)

    try {
        const post = await PostModel.findById(id)
        if (!post) return res.sendStatus(400)

        const postToSend = reducePostToNecessaryData(post, req.userId!)
        res.status(200).json(postToSend)
    } catch (error) {
        res.sendStatus(500)
    }
}

export const onDeletePost = async (req: CustomRequest, res: Response) => {
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

export const onGetPosts = async (req: CustomRequest, res: Response) => {

    let limit = Number(req.query.limit) || 10
    let skip = Number(req.query.skip) || 0
    const channel = req.query.channel?.toString()


    let sortBy: AggregateOptions

    if (req.query.sort == "comments") {
        sortBy = { commentAmount: -1, createdAt: -1 };
    } else if (req.query.sort == "votes") {
        sortBy = { voteAmount: -1, createdAt: -1 };
    } else {
        sortBy = { createdAt: -1 }
    }
    try {

        let aggreagePipeline: PipelineStage[] = []
        if (channel) aggreagePipeline.push({ $match: { channel: channel } })
        aggreagePipeline.push(
            {
                "$addFields": {
                    "voteAmount": {
                        $subtract: [{ $size: "$upvotes" }, { $size: "$downvotes" }]
                    },
                    "commentAmount": {
                        $size: "$comments"
                    }
                }
            },
            {
                $sort: sortBy
            }
        )
        const postsFromDb = await PostModel.aggregate(aggreagePipeline).skip(skip).limit(limit)

        const posts = postsFromDb.map((post) => reducePostToNecessaryData(post, req.userId!))
        res.status(200).json(posts);

    } catch (error: any) {
        res.status(404).json({ message: error.message })
    }
}
interface OnCreatePostBody {
    message: string,
    channel: string,
    color: string
}
export const onCreatePost = async (req: CustomRequest, res: Response) => {
    const post: OnCreatePostBody = req.body;
    const { message, channel, color } = post


    if (!message || !color || !channel) return res.sendStatus(400)

    const newPost = new PostModel({ message: message, channel: channel.toLowerCase(), color: color, author: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save()
        res.status(201).json(newPost._id)
    } catch (error: any) {
        res.status(409).json(error.message)
    }
}

export const onVotePosts = async (req: CustomRequest, res: Response) => {
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


        const newData = await PostModel.findOneAndUpdate(
            {
                _id: id,
                upvotes: { "$ne": req.userId },
                downvotes: { "$ne": req.userId }
            },
            {
                $addToSet: { [toAddTo]: req.userId },
            },
            {
                new: true
            }
        )

        if (newData) {
            const newPost = reducePostToNecessaryData(newData, req.userId!)
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

export function getIdFromParams(req: CustomRequest) {
    try {
        return new mongoose.Types.ObjectId(req.params.id)
    } catch (error) {

    }
}

function reducePostToNecessaryData(post: Post, userId: string) {
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
        color: post.color,
        createdAt: post.createdAt

    }
}

// #endregion