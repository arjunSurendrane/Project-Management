import mongoose from "mongoose";

mongoose.set('strictQuery', true);
export const connectDB = async () => {
    try {
        const res = await mongoose.connect('mongodb://localhost:27017/projectManagement')
        console.log('connected to mongodb database')
    } catch (error) {
        console.log(`data base connection have error: ${error}`)
    }
}

