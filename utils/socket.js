const socket=require('socket.io');

const initializeScoket=(server)=>{
    const io=socket(server,{cros:{
         origin: process.env.FRONTEND_URL || "*",
         credentials: true
    }  
    })
    io.on("connection",(socket)=>{
        socket.on("joinChat",()=>{})
        socket.on("sentMessage",()=>{})
        socket.on("disconnect",()=>{})
    })
}
module.exports=initializeScoket;
