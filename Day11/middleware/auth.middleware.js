var jwt = require("jsonwebtoken");

const authMiddleware = (...roleAllowed) => {
  return (req, res, next) => {
    try {
        console.log(roleAllowed);
        
      const token = req.headers?.authorization.split(" ")[1];
      // console.log(token);
        if(!token){
            res.status(404).json({message:"Token Not Found"})
            return
        }
      var decoded = jwt.verify(token, "shhhhh");
      console.log(decoded);

      if (decoded && roleAllowed.includes(decoded.role)) {
          req.user=decoded.userId;
          req.userRole=decoded.role
        next();
      }else{
        res.status(401).json({message:"Unauthorized"})
      }
    //   res.json({ message: "hy" });
    } catch (error) {
      res.status(400).json({ message: "Login Failed", errmessage:error.message});
    }
  };
};
module.exports = authMiddleware;
