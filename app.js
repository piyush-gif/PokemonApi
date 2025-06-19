import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import express from 'express';


const uri = process.env.MONGODB_URI;
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
mongoose.connect(uri)
.then(() => console.log('Mongodb connected'))
.catch((err) => console.log('Mongodb connection error;', err));


app.post('/save-data', (req, res) => {
  console.log(req.body)
  res.send('Server running');
});

app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`);
})