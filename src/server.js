
import express from 'express';
import usersRoutes from './routes/usersRoutes.js';
import connectDB from './config/db.js';
import { mongoDBURL, PORT } from './config/config.js';
import cors from 'cors';

const app = express();

// Use cors middleware to allow requests from your frontend (you can specify the exact URL)
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Welcome to I-Learn App Server!');
});

app.use('/api/auth', usersRoutes);

connectDB().then(() => app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
)
