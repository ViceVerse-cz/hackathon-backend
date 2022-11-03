import Logger from '@ptkdev/logger';
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env',
});

const LOGGER = new Logger();
const PORT = parseInt(process.env.PORT || "3000");

const app = express();

mongoose.connect(process.env.MONGO_URI || "")
.then(() => {
    LOGGER.info('Connected to database');
})
.catch((err) => {
    LOGGER.error(err);
});

app.listen(PORT, "127.0.0.1", () => {
    LOGGER.info(`Server running at http://127.0.0.1:${PORT}/`);
});