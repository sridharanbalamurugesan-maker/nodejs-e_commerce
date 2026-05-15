const joi=require('joi')
const registerDto=joi.object({
    name:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().required(),
    mobile:joi.number().required(),
    address:joi.string().required()
})
module.exports=registerDto;