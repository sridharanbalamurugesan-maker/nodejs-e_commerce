const express = require('express');
const connect = require('./Config/config');
// const http=require('http');
// const server=http.createServer(app);
const UserRouter = require('./Routes/userRoute');
const categoryRouter = require('./Routes/categoryRoute');
const productRoute = require('./Routes/productRoute');
const orderRouter = require('./Routes/orderRoute');
const paymentRouter = require('./Routes/paymentRoute');
const myOrderRouter=require('./Routes/myOrderRoute');
const viewReview=require('./Routes/viewReview');
const supportRouter=require('./Routes/supportRoute');
const ticketRouter=require('./Routes/ticketRoute');
const messageRouter=require('./Routes/messageRoute');
const forgotRouter=require('./Routes/forgotPasswordRoute');
const resetRouter=require('./Routes/resetPasswordRoute');
const addressRouter=require('./Routes/addressRoute');
const cors = require('cors');
const path = require("path");
const initializeScoket = require('./utils/socket');
require('dotenv').config(); 

const app = express();
// initializeScoket(server);

const allowedOrigins = [
    "http://localhost:3000",
    "https://noisy-rice-14a8.devsoftean.workers.dev"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.options("*", cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/category', express.static(path.join(__dirname, "category")));
app.use('/product', express.static(path.join(__dirname, "product")));
app.use('/review', express.static(path.join(__dirname, "review")));
app.use('/profile', express.static(path.join(__dirname, "profile")));

app.use('/api', UserRouter);
app.use('/category', categoryRouter);
app.use('/product', productRoute);
app.use('/order', orderRouter);
app.use('/payment', paymentRouter);
app.use('/my-order',myOrderRouter);
app.use('/reviews',viewReview);
app.use('/support',supportRouter);
app.use('/ticket',ticketRouter);
app.use('/chatBox',messageRouter);
app.use('/forgot',forgotRouter);
app.use('/api',resetRouter);
app.use('/address',addressRouter);


connect();

app.use("/attachment", express.static("attachment"));
app.use((err, req, res, next) => {
  res.status(400).json({
    success: false,
    message: err.message,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});