const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./models/todo.model");

const app = express();

app.use(express.json()); // for parsing application/json
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/todo", async (req, res) => {
  try {
    const item = await Todo.find(req.body);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/todo/new", async (req, res) => {
  try {
    const item = await Todo.create(req.body);
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/todo/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    !item ? res.status(500).json("Item not found") : res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/todo/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Todo.findByIdAndDelete(id);
    if (!item) {
      res.status(404).json({ message: "No todo with this id found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server listening at 3001");
});

mongoose
  .connect(
    "mongodb+srv://rohanchaudharybkbiet2022:JvhZ4iYhkpq4YGdp@cluster0.oafzw8i.mongodb.net/"
  )
  .then(() => console.log("Connected"))
  .catch(() => console.log("Connection failed!!!"));
