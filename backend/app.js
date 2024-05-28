require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db'); // Import the connectDB function

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);

// Invoke connectDB function to establish MongoDB connection
connectDB()
  .then(() => {
    app.listen(8080, () => {
      console.log('Server running on port 8080');
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
