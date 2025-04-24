import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import skillSwapRoutes from './routes/skillSwapRoutes.js';

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Routes
app.use('/api/swaps', skillSwapRoutes);

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// MongoDB connection
const connectDB = async () => {
  try {
    // Check if MONGO_URI is defined
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI is not defined in .env file');
      console.log('Using default MongoDB connection: mongodb://localhost:27017/skillswap');
      process.env.MONGO_URI = 'mongodb://localhost:27017/skillswap';
    }
    
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(process.env.MONGO_URI, options);
    console.log('Connected to MongoDB');
    
    // Only start the server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Test the server at: http://localhost:${PORT}/test`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Please make sure MongoDB is running and your connection string is correct.');
    console.log('Current MongoDB URI:', process.env.MONGO_URI);
    
    // Exit the process if we can't connect to MongoDB
    process.exit(1);
  }
};

connectDB(); 