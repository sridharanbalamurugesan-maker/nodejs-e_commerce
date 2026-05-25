const User=require('../Models/User');
const order = require('../Models/order');
const Order=require('../Models/order');
const payment = require('../Models/payment');
const RazorpayInstance=require('../utils/Razorpay');

exports.createPayment=async(req,res)=>{
    try {
            const {order_data}=req.body;
            const userId = req.user.id;
            const user=await User.findById(userId);
            if(!user){
                return res.status(404).json({message:"user not found"});
            }
            let total=0;
            for(let orderRequest of order_data){
            const dborder=await Order.findById(orderRequest.id);
            if(!dborder){
                return res.status(400).json({message:"order not found"});
            }
            total+=dborder.totalPrice;
        }
      const order=await RazorpayInstance.orders.create({
                    amount:total *100,
                    currency: "INR",
                    receipt: "receipt#1",
                    partial_payment: false,
                    notes: {
                        FirstName: "value3",
                        LastName: "value2",
                    },
        })
        const Payment=new payment({
            userId,
            orderId:order.id,
            status:order.status,
            amount:order.amount,
            currency:order.currency,
            receipt:order.receipt,
            notes:order.notes,
        });
        console.log("payment",payment);
        const savePayment=await Payment.save();
        console.log("savePayment",savePayment);
    
        res.status(201).json({
            success:true,
             key: process.env.RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                order_id: order.id,
                mongoOrderId:order_data.map((e)=>e.id)
        })
    } catch (error) {
          console.log("RAZORPAY ERROR:", error);
         res.status(500).json({message:error.message});
    }
}
exports.updateOrderStatus=async(req,res)=>{
    try {
        const {status}=req.body;
        const orderId=req.params.id;
        const updatedOrder=await order.findByIdAndUpdate(orderId,{status:status},{new:true});
        console.log("updatedOrder",updatedOrder);
         res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder
    });
    } catch (error) {
         res.status(500).json({
      success: false,
      message: error.message
    });

    }
}