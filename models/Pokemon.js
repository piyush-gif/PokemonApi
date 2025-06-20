import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
  name: String,
  height: Number,
  weight: Number,
  base_experience: Number,
  type: [String],
  img: String,
});

export default mongoose.model('Pokemon', pokemonSchema);
