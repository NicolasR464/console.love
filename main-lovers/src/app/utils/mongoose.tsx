import mongoose from "mongoose";

const connectMongoose = async () => mongoose.connect(process.env.DB_URI!);

export default connectMongoose;
