import mongoose from "mongoose";

export async function connectDB () {

    try {   
        await mongoose.connect(process.env.DB_URI as string)
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
}