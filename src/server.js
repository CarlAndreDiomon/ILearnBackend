
import express from 'express';
import usersRoutes from './routes/usersRoutes.js';
import connectDB from './config/db.js';
import { mongoDBURL, PORT } from './config/config.js';


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Welcome to I-Learn App Server!');
});

app.use('/api/auth', usersRoutes);

connectDB().then(() => app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
)
