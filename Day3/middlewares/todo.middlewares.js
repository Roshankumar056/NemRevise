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



    let longestSubstringOfS=0
    for(let i=0;i<s.length;i++){
        let chCount={}
        for(let j=i;j<s.length;j++){
            let ch=s[j]
            chCount[ch]=(chCount[ch]||0)+1
            let flag =true

            for(let key in chCount){
                if(chCount[key]<k){
                    flag=false
                    break
                }
            }
            if(flag){
                longestSubstringOfS=Math.max(longestSubstringOfS,j-i+1)
            }
        }
    }
    return longestSubstringOfS