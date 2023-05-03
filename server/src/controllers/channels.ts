import { CustomRequest } from "../RequestType";
import { Response } from "express"
import { PostModel } from "../models/postSchema";

export const onGetTopChannels = async (req: CustomRequest, res: Response) => {
    try {
        const amount = Number(req.query.amount) || 10
        let response = await PostModel.aggregate([
            {
                $group: { _id: "$channel", count: { $sum: 1 } }
            },
            {
                $sort: {
                    count: -1
                }
            },
            {
                $limit: amount
            }
        ])

        res.json(response).status(200)
    } catch (error) {
        res.sendStatus(500)
    }
}


export const onSearchChannel = async (req: CustomRequest, res: Response) => {
    try {
        const searchTerm = req.query.searchTerm?.toString().trim()
        const amount = Number(req.query.amount) || 10

        if (!searchTerm) return res.sendStatus(400)

        let response = await PostModel.aggregate([
            {
                $group: { _id: "$channel", count: { $sum: 1 } },
            },
            {
                $match: {
                    _id: { $regex: searchTerm }
                }
            },
            {
                $sort: {
                    count: -1
                }
            },
            {
                $limit: amount
            }
        ])

        res.json(response).status(200)
    } catch (error) {
        res.sendStatus(500)
    }
}
