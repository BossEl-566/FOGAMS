import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to database successfully');
  })
  .catch((error) => {   
    console.log('Error:', error);
  });
  const app = express();
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });

//mongodb+srv://datsomorelliot56:qksRy88UwJ7KszZ4@cluster0.pem06.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0