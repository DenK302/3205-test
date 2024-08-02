import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

let currentTimeout: NodeJS.Timeout | null = null;
let isProcessing: boolean = false;

const getData = async () => {
    const dataPath = path.join(__dirname, 'data.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
};

app.get('/search', async (req, res) => {
    if (isProcessing) {
        if (currentTimeout) {
            clearTimeout(currentTimeout);
            currentTimeout = null;
            console.log('Previous request cancelled');
        }
    }
    isProcessing = true;

    currentTimeout = setTimeout(async () => {
        const { email, number } = req.query;
        const data = await getData();
        const results = data.filter((user: { email: string; number: string }) => { //the number is a string in case the number starts with 0
            return user.email === (email as string) && (!number || user.number.includes((number as string)));
        });
        res.json(results);
        currentTimeout = null;
        isProcessing = false;
    }, 5000);
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});