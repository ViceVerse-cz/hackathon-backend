import express from 'express';
import dotenv from 'dotenv';

dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const app = express();

const PORT: number = parseInt(process.env.PORT || "3000");
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started at http://localhost:${PORT}`);
});