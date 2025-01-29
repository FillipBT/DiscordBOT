import { Schema, model } from "mongoose";

const UsersSchema = new Schema({
    userId: String,
    username: String,
    token: String
})

export const User = model('User', UsersSchema)