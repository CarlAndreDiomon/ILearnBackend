
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import usersRoutes from './routes/usersRoutes.js';
import modulesRoutes from './routes/moduleRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import connectDB from './config/db.js';
import  {PORT}  from './config/config.js';

const app = express();

// Use cors middleware to allow requests from your frontend (you can specify the exact URL)
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
}));

// Use helmet to set security-related HTTP headers
app.use(helmet());

// Use rate limiting to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});
app.use(limiter);



app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Welcome to I-Learn App Server!');
});

app.use('/api/auth', usersRoutes);
app.use('/api', modulesRoutes);
app.use('/api/admin', adminRoutes);

connectDB().then(() => app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
)
