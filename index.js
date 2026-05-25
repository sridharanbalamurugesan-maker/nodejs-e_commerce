const express = require('express');
const connect = require('./Config/config');
const UserRouter = require('./Routes/userRoute');
const categoryRouter = require('./Routes/categoryRoute');
const productRoute = require('./Routes/productRoute');
const orderRouter = require('./Routes/orderRoute');
const paymentRouter = require('./Routes/paymentRoute');
const myOrderRouter=require('./Routes/myOrderRoute');
const viewReview=require('./Routes/viewReview');
const cors = require('cors');
const path = require("path");
require('dotenv').config(); 

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));

app.use(express.json());

app.use('/category', express.static(path.join(__dirname, "category")));
app.use('/product', express.static(path.join(__dirname, "product")));

app.use('/api', UserRouter);
app.use('/category', categoryRouter);
app.use('/product', productRoute);
app.use('/order', orderRouter);
app.use('/payment', paymentRouter);
app.use('/my-order',myOrderRouter);
app.use('/reviews',viewReview);

connect();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});