const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const DB_URI = 'mongodb://localhost:27017/urbanbazaar'; // Hardcoded MongoDB URI
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  age: Number,
});
const User = mongoose.model('User', UserSchema);
app.get('/', (req, res) => {
  res.send('Hello, MERN Backend!');
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

const PORT = 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
