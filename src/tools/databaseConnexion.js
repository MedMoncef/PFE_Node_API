import mongoose from 'mongoose';

const databaseConnexion = () => {
  mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
  });
};

export default databaseConnexion;