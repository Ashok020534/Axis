import mongoose from 'mongoose';
import { MONGO_URI } from '../../env.js';

const reconnectTimeout = 5000;

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI || 'mongodb://localhost:27017/axixapp', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = mongoose.connection;

        db.on('error', err => {
            console.log('MongoDB error:', err);
            mongoose.disconnect();
        });

        db.on('disconnected', () => {
            console.log('MongoDB disconnected. Reconnecting...');
            setTimeout(connectToDatabase, reconnectTimeout);
        });

        db.on('reconnected', () => console.log('MongoDB reconnected.'));

        console.log('MongoDB connected:', db.host);

        await db.collection('test').insertOne({ test: true });
    } catch (err) {
        console.log('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};
