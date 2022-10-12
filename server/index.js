import 'dotenv/config'

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import userRoutes from './routes/user.js'
import postsRoutes from './routes/posts.js'


const app = express()
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());


app.use("/users", userRoutes)
app.use("/posts", postsRoutes)


const PORT = 5000;

mongoose.connect("mongodb://root:password@localhost:27017", {useNewUrlParser: true, useUnifiedTopology:true})
.then(() => app.listen(PORT, () => console.log(`Server running on Port ${PORT}`)))
.catch((error) => console.log(error))