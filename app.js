import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import Pokemon from "./models/Pokemon.js";

const uri = process.env.MONGODB_URI;
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Create a new Pokémon
app.post("/save-data", async (req, res) => {
  try {
    const newPokemon = await Pokemon.create(req.body);
    res.json({ message: "Saved successfully", name: newPokemon.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save data" });
  }
});

// Get all or paginated Pokémon
app.get("/get-data", async (req, res) => {
  try {
    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || 0;

    const skip = (page - 1) * limit;

    const total = await Pokemon.countDocuments();

    const pokemons = limit
      ? await Pokemon.find().skip(skip).limit(limit)
      : await Pokemon.find();

    res.set("X-Total-Count", total);
    res.json(pokemons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Delete a Pokémon by ID
app.delete("/delete-data/:id", async (req, res) => {
  try {
    const deletedPokemon = await Pokemon.findByIdAndDelete(req.params.id);
    if (!deletedPokemon) {
      return res.status(404).json({ error: "Pokémon not found" });
    }
    res.json({ message: "Deleted successfully", name: deletedPokemon.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
