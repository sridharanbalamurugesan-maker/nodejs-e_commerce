const express=require('express');
const connect=require('./Config/config');
const UserRouter=require('./Routes/userRoute')
const categoryRouter=require('./Routes/categoryRoute');
const productRoute=require('./Routes/productRoute');
const orderRouter=require('./Routes/orderRoute');
const paymentRouter=require('./Routes/paymentRoute');
const cors=require('cors');
const app=express();
const path = require("path");
app.use(cors());
app.use(express.json());

connect();
app.use('/category',express.static(path.join(__dirname, "category")));
app.use('/product',express.static(path.join(__dirname, "product")));
app.use('/api',UserRouter)
app.use('/category',categoryRouter);
app.use('/product',productRoute);
app.use('/order',orderRouter);
app.use('/payment',paymentRouter);

app.listen(5000,()=>{
    console.log('server start')
})