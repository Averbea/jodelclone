import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import mongoose, { ConnectOptions } from 'mongoose'

import userRoutes from './routes/user'
import postsRoutes from './routes/posts'
import configuration, { checkEnvironmentVariables } from './config'

checkEnvironmentVariables()

const app = express()
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.use("/users", userRoutes)
app.use("/posts", postsRoutes)

const PORT: number = configuration.PORT || 5000

mongoose.connect(`mongodb://${configuration.MONGO_ROOT_USER}:${configuration.MONGO_ROOT_PASSWORD}@localhost:27017`)
    .then(() => app.listen(PORT, () => console.log(`Server running on Port ${PORT}`)))
    .catch((error) => console.log(error))