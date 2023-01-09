import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    id: {type: String}
    
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel