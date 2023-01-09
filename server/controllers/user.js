import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from '../models/userSchema.js';

export const signout = async (req, res) => {
    //TODO make logged out users unable to login with the old token 
    const {userId} = req
    console.log(req)

    console.log(userId, " signed out")
    res.sendStatus(200)
}

export const signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await (UserModel.findOne({username}));
        
        if(!existingUser) return res.status(404).json({message:"User doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(401).json({message:"Invalid credentials"});

        const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({token, username: username})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
};

export const signup = async (req, res) => {
    try {

        const { username, password, confirmPassword} = req.body;
        const existingUser = await (UserModel.findOne({username}));
        if(existingUser) return res.status(400).json({ message: "User already eists"});

        if(password !== confirmPassword) return res.status(400).message({ message: "Passwords dont match"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModel.create({ username, password: hashedPassword });
        const token = jwt.sign({ username: result.username, id: result._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log(result)
        res.status(200).json({token})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }

};