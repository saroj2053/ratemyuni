import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if (connection) {
      console.log(
        `MongoDB connected successfully at ${connection.connection.host}`.bgCyan
          .white
      );
    } else {
      console.log("Error connecting to database".bgRed.white);
    }
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error.message}`.bgRed.white);
  }
};

export default connectDB;
