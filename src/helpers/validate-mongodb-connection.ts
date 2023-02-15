import mongoose from "mongoose";

/**
 * Check if MongoDB ENV Variables is present and Test the connection
 */
export const validateMongoDBConnection = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDb');
    } catch (err) {
        throw new Error(`MONGODB connection failed: ${err}`);
    }
}