const joi=require('joi')
const changePassword=joi.object({
    oldPassword:joi.string().min(4).max(15).required().messages(
     {  "string.empty": "Password is required",
        "string.min": "Password must be at least 4 characters",
        "string.max": "Password must not exceed 15 characters",
    }),
    password:joi.string().min(4).max(15).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 4 characters",
        "string.max": "Password must not exceed 15 characters",
    }),
    confirmPassword:joi.string().min(4).max(15).required().messages({
         "string.empty": "Password is required",
        "string.min": "Password must be at least 4 characters",
        "string.max": "Password must not exceed 15 characters",
    }),
})
module.exports=changePassword