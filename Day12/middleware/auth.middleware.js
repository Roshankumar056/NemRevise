var jwt = require("jsonwebtoken");
const blackListTokenModel = require("../models/blacklistToken.model");

const authMiddleware = (...roleAllowed) => {
  let decoded;
  return async(req, res, next) => {
    try {
      const token = req.headers?.authorization.split(" ")[1];
      if (!token) {
        res.status(404).json({ message: "Token Not Found" });
        return;
      }
      let blacklistTokenStatus=await blackListTokenModel.exists({token})
      if(blacklistTokenStatus){
         res.status(401).json({ message: "BlackListed Token" });
         return
      }

      decoded = jwt.verify(token, "shhhhh");
    } catch (error) {
      if (error.message == "jwt expired") {
        let refreshToken = req.headers?.refreshtoken?.split(" ")[1];
        if (!refreshToken) {
          res.status(404).json({ message: "Token Not Found, Login Again" });
        return
        } else {
          let refreshDecoded = jwt.verify(refreshToken, "shhhhh");
          let newAccessToken = jwt.sign(
            { userId: refreshDecoded.userId, role: refreshDecoded.role },
            "shhhhh",
            { expiresIn: 40 },
          );
         // req.set({"authorizartion":`Bearer ${newAccessToken}`})
          decoded = jwt.verify(newAccessToken, "shhhhh");
        }
      } else {
        res
          .status(400)
          .json({ message: "Login Failed", errmessage: error.message });
      }
    }
     if (decoded && roleAllowed.includes(decoded.role)) {
        req.user = decoded.userId;
        req.userRole = decoded.role;
        next();
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
  };
};
module.exports = authMiddleware;
