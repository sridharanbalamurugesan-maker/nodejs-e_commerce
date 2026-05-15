const joi=require('joi')
const loginDto=joi.object({
    name:joi.string().required(),
    email:joi.string().email().required()
})
module.exports=loginDto;