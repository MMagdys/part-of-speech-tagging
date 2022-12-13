import mongoose from "mongoose";


export class DBHelper {


    public static async setupDatabase() {
        const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/partOfSpeech-test";
        await mongoose.connect(mongoUrl);
    }


    public static async tearDownDatabase() {
        await mongoose.disconnect();
    }
}