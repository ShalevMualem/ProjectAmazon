import  express  from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose';
import userRouter from './Routes/userRoutes.js';
import seedRouter from './Routes/seedRoutes.js';
import {orderRouter} from './Routes/orderRoutes.js';
import { productRouter } from './Routes/productRouter.js';
dotenv.config();
console.log("blalalalalalalalalalalalalalalalalal")

const PORT = process.env.PORT || 5000;


const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);

mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(()=>{
    app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
})
.catch((e)=> console.log(e))
