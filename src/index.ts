import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import bodyParser from 'body-parser';
import Logger from '@ptkdev/logger';
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes
import warehouseRoute from './controller/warehouse.controller';
import employeeRoute from './controller/employee.controller';
import buildingRoute from './controller/building.controller';
import productRoute from './controller/product.controller';
import floorRoute from './controller/floor.controller';
import shopRoute from './controller/shop.controller';

dotenv.config({
    path: './.env',
});

const LOGGER = new Logger();
const PORT = parseInt(process.env.PORT || "3000");

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    preflightContinue: true
}));

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

// Swagger api documentation configuration
const swaggerSpec = swaggerJsDoc({
    swaggerDefinition: {
        info: {
            title: 'Hackathon REST API',
            version: '1.0.0'
        },
        host: 'localhost:3000',
        basePath: './',
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
            }
        }
    },
    apis: ['./src/controller/*.controller.ts'],
});

// @ts-ignore
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/api/warehouse', warehouseRoute);
app.use('/api/building', buildingRoute);
app.use('/api/employee', employeeRoute);
app.use('/api/product', productRoute);
app.use('/api/floor', floorRoute);
app.use('/api/shop', shopRoute);

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