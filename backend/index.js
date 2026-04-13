
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from './route/book.route.js';
import userRoute from './route/user.route.js';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(express.json()); 
app.use(cors());
const PORT=process.env.PORT || 4000;
const URI=process.env.MONGO_URI;
//connect to mongodb;
try {
    mongoose.connect(URI);

    console.log("Connected to mongodb");
} catch (error) {
    console.log("Error",error);
}
app.use("/book", bookRoute);
app.use("/user", userRoute);


app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`);
})

