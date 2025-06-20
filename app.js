import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import Pokemon from './models/Pokemon.js';


const uri = process.env.MONGODB_URI;
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json());
mongoose.connect(uri)
.then(() => console.log('Mongodb connected'))
.catch((err) => console.log('Mongodb connection error;', err));




app.post('/save-data', async (req, res) => {
  try {
    const newPokemon = await Pokemon.create(req.body);
    res.json({ message: 'Saved successfully', name: newPokemon.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.get('/get-data', async (req, res) => {
  try {
    const allPokemon = await Pokemon.find();
    res.json(allPokemon);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});


app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`);
})