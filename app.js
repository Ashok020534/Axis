// app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import userRoutes from './api/routes/auth.routes.js';
import storeSms from './api/routes/storeSms.route.js';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/sms', storeSms);

export default app;
