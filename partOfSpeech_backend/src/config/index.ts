import * as dotenv from 'dotenv';

dotenv.config();


export default {
    port: +(process.env.PORT || 3000),
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/partOfSpeech',
    app: {
        practiceWordListLength: 10
    }
};