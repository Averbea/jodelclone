import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {

    try {

        if (!req.headers.authorization) {
            res.status(401).json({ message: "no authorization header sent" })
            return
        }
        const token = req.headers.authorization.split(" ")[1];

        let decodedData = jwt.verify(token, process.env.JWT_SECRET);
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