import Logger from '@ptkdev/logger';
import mongoose from 'mongoose';
import express from 'express';
import fs from 'node:fs';
import yaml from 'yaml';

const LOGGER = new Logger();
const CONFIG = yaml.parse(
    fs.readFileSync('./config.yaml', 'utf8')
);

const app = express();

mongoose.connect(CONFIG.DATABASE.uri)
    .then(() => {
        LOGGER.info('Connected to database');
    })
    .catch((err) => {
        LOGGER.error(err);
    });

app.listen(CONFIG.HOST.port, CONFIG.HOST.hostname, () => {
    LOGGER.info(`Server running at http://${CONFIG.HOST.hostname}:${CONFIG.HOST.port}/`);
});