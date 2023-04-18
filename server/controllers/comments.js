import mongoose from "mongoose"
import { CommentModel } from "../models/commentSchema.js"
import { PostModel } from "../models/postSchema.js"



//#region _____________API Handlers__________________________


export const onCommentPost = async (req, res) => {
    try {
        const postId = req.params.id
        const { message } = req.body

        const newComment = new CommentModel({ message: message, author: req.userId, createdAt: new Date().toISOString() });

        let savedComment = await newComment.save()

        const newPost = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $push: { comments: savedComment._id } },
            {
                new: true
            }
        )

        if (!newPost) {
            // if post not available delete comment again
            await CommentModel.findByIdAndDelete(savedComment._id)
            res.sendStatus(400)
        }
        res.sendStatus(200)
        return

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

}

export const onGetCommentsForPost = async (req, res) => {
    try {
        const postId = req.params.id
        //TODO: add pagination
        const commentsFromDb = await PostModel.findById(
            req.params.id,
            "comments", {
            populate: "comments"
        }
        )

        let toRet = {
            _id: commentsFromDb._id,
            comments: commentsFromDb.comments.map(c => reduceCommentToNecessaryData(c, req.userId))
        }

        res.status(200).json(toRet)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export const onVoteComment = async (req, res) => {
    try {
        const postId = req.params.id
        const commentId = req.params.commentId

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
        console.log("voted", vote, "on", commentId)

        let queryParam = {}
        queryParam[toAddTo] = req.userId

        const newData = await CommentModel.findOneAndUpdate(
            {
                _id: req.params.commentId,
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
            const newComment = reduceCommentToNecessaryData(newData, req.userId)
            res.status(200).json(newComment)
            return
        }

        res.sendStatus(400)
        return

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export const onDeleteComment = async (req, res) => {
    try {
        const postId = req.params.id
        const commentId = req.params.commentId

        let result = await CommentModel.findByIdAndDelete(req.params.commentId)
        if (result) {
            let t = await PostModel.findByIdAndUpdate(postId,
                {
                    $pull: {
                        comments: result._id
                    }
                }, { new: true })
        }

        res.sendStatus(200)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

//#endregion


//#region _____________Helper Functions______________________

function reduceCommentToNecessaryData(comment, userId) {
    const isUsersPost = comment.author === userId ? true : false;
    let userVote = "none"
    if (comment.upvotes.includes(userId)) {
        userVote = "up"
    }
    else if (comment.downvotes.includes(userId)) {
        userVote = "down"
    }

    return {
        _id: comment._id,
        isUsersPost,
        message: comment.message,
        votes: comment.upvotes.length - comment.downvotes.length,
        userVote: userVote,
        createdAt: comment.createdAt
    }
}


//#endregion