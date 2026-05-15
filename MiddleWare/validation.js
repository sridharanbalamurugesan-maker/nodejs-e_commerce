const validate=(schema,source="body")=>{
        return (req,res,next)=>{
            try {
            const data=req[source];
            if(!data||Object.keys(data).length===0){
                return res.status(400).json({
                    status:false,
                    message:`${source} data is required`
                })
            }
            const {error,value}=schema.validate(data,{abortEarly:false,allowUnknown:false});
            if(error){
                const errors=error.details.map(item=>item.message);
                 return res.status(400).json({
                    status:false,
                    message:"validation failed!",
                    errors
                });
            }
            req.validatedData=value;
            next(); 
            } 
            catch (error) {
                res.status(500).json({
                    success:false,
                    message:error.message
                })
            }
        }
}
module.exports=validate;