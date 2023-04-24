import mongoose from "mongoose";

export interface User {
    username: string,
    password: string,
    id: string
}

const userSchema = new mongoose.Schema<User>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String }

})

export const UserModel = mongoose.model('User', userSchema)
