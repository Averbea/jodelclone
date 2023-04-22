import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { CustomRequest } from '../RequestType';

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {

    try {

        if (!req.headers.authorization) {
            res.status(401).json({ message: "no authorization header sent" })
            return
        }
        const token = req.headers.authorization.split(" ")[1];

        let decodedData: any = jwt.verify(token, process.env.JWT_SECRET!);

        req.userId = decodedData?.id;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: "JWT expired" })
            return
        }
        res.sendStatus(500)
    }

};

export default auth;