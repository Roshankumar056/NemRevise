const User = require("../models/User")

const generateToken=(user)=>{
    return jwt.sign(
        {
            id:user.id,
            role:user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    )
}

exports.register=async(req,res)=>{
    const {name,eamil,password}=req.body
    const exists=await User.findOne({email});
    if(exists){
        return res.status(400).json({
            message:"Email already exists"
        })
    }
    const user=await User.create({
        name,email,password,
    });
    const result=user.toObject();
    delete result.password;
    res.status(201).json(result)
}

exports.login=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email})
    if(!user|| !(await user.comparePassword(password))){
        return res.status(401).json({
            message:"Invalid credentials"
        })
    }
    const token=generateToken(user)
    res.json({
        token,
    })
};