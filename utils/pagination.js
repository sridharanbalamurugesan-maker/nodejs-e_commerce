const pagination=async(model,query={},page=1,limit=10,populate=null)=>{
    page=Number(page);
    limit=Number(limit);
    const skip=(page-1)*limit;
    let dataQuery=model.find(query).skip(skip).limit(limit);
    if(populate){
        dataQuery=dataQuery.populate(populate);
    }
    const data=await dataQuery;
    const totalRecord=await model.countDocuments(query);
    const totalPage=Math.ceil(totalRecord/limit);
    return{
        data,
        pagination:{
            currentPage:page,
            perPage:limit,
            totalRecord,
            totalPage
        }
    } 
}
module.exports=pagination;