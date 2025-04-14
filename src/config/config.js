import dotenv from "dotenv";
dotenv.config({ path: './src/.env' });


export const  PORT = process.env.PORT;
export const mongoDBURL = process.env.MONGO_URI;