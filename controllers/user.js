import { User } from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateCookie } from '../utils/feature.js';


export const userRegister =  async(req, res) => {
const { name, email, password } = req.body
let user = await User.findOne({email});
if (user)
  return res.status(400).json({
    success: false,
    message: "User already exists"
  })
const hashedPassword = await bcrypt.hash(password, 10)
user = await User.create({
  name,
  email,
  password: hashedPassword

})
generateCookie(user, res, 201, "User registered successfully")
}




export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
   if (!user)
    return res.status(400).json({
      success: false,
      message: "User does not exist",
    });
const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({
      success: false,
      message: "Invalid credentials: email or password does not match",
    });
   generateCookie(user, res, 200, `Welcome back, ${user.name}`);
};



export const userLogout = (req, res) => {
  res.status(200).cookie("token","", {
    expires: new Date(Date.now())
  }).json({
    success: true,
    message: "Logout successfully",
  });
}
export const getMyprofile = (req,res)=>{
    res.status(200).json({
    
      success:true,
      user:req.user
      })
  }

