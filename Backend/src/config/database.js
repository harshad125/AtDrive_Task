import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';

export const mysqlConnection = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql'
});

export const connectDB = async () => {
  try {
    // console.log(process.env.DATABASE_URL)
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log('MONGODB connection FAILED ', error);
    process.exit(1);
  }
};
