import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import userRoutes from './routes/userRoutes.js';
import matchRoutes from './routes/matchRoutes.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/user', userRoutes);
app.use('/match', matchRoutes);

export default app;
