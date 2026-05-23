const getIncomingTodo=(req,res,next)=>{
  const {title,description}=req.body
  if(!title |!description){
    res.json({message:"Improper Request"})
  }else{
    next()
  }
}


const TodoRouterMiddleWare=(req,res,next)=>{
  console.log("This is todo Router Middleware");
  next()
  
}
module.exports={getIncomingTodo,TodoRouterMiddleWare}