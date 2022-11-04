import Logger from '@ptkdev/logger';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes
import employeeRoute from './controller/employee.controller';
import buildingRoute from './controller/building.controller';

dotenv.config({
    path: './.env',
});

const LOGGER = new Logger();
const PORT = parseInt(process.env.PORT || "3000");

const app = express();

app.use(cors());

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

app.use('/api/building', buildingRoute);
app.use('/api/employee', employeeRoute);

// Database connect
mongoose.connect(process.env.MONGO_URI || "")
.then(() => {
    LOGGER.info('Connected to database');
})
.catch((err) => {
    LOGGER.error(err);
});

app.listen(PORT, "0.0.0.0", () => {
    LOGGER.info(`Server running at http://127.0.0.1:${PORT}/`);
});