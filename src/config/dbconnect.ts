import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://agroteam:26039756ha@cluster0.kw2kn.mongodb.net/products?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      },
    );
    console.log(`mongoDb connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
  }
};

export default connectDb;
