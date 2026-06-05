const ChatReply = require("../Models/ChatReply");
const support = require("../Models/support");

exports.sentMessage=async(req,res)=>{
    try {
        const {ticketId,message,isAdmin} = req.body;

        const userID=req.user.id;
        const reply=await ChatReply.create({
            ticketId,
            sender:userID,
            message,
            isAdmin,
            attachment:req.file?`attachment/${req.file.filename}`:null,
        })
          res.status(200).json({
            success:true,
            message:"Reply Added",
            data:reply
           });
    } catch (error) {
         res.status(400).json({
            success:false,
            message:error.message
            });
    }
}
exports.getMessages = async (req, res) => {
  try {
    const ticketId = req.params.id;
    console.log("tid",ticketId);
    const messages = await ChatReply.find({ticketId});

    // console.log("messages",messages);

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.updateTicketStatus = async (req,res) => {
  try {

    const { status } = req.body;

    const ticketId = req.params.id;
    console.log("ticketId",ticketId);

    const ticket = await support.findOneAndUpdate({ ticketId },{ status },{ new: true });

    res.status(200).json({

      success: true,

      message: "Status Updated",

      data: ticket,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};