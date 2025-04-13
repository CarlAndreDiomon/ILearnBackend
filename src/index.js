
import express from 'express';
import dotenv from 'dotenv';
import usersRoutes from './routes/usersRoutes.js';
import connectDB from './config/db.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT ;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, ES Modules!');
});

app.use('/api/auth', usersRoutes);



connectDB().then(() => app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
)
