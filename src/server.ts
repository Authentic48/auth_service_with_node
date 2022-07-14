import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { app } from './app';

// .env configuration
dotenv.config();

const start = () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  //DB connection
  connectDB();

  const PORT = process.env.PORT || 6000;

  app.listen(PORT, () => {
    console.log(`App in ${process.env.NODE_ENV} is running on port  ${PORT}`);
  });
};

start();
