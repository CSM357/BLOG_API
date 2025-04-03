import express from 'express';
import {userLogin,userRegister,userLogout,getMyprofile} from '../controllers/user.js';
import { get } from 'http';
import { isAuthenticated } from '../middlewares/auth.js'; 

const router = express.Router();

router.post("/register",userRegister)

router.post("/login",userLogin)

router.get("/logout",userLogout)

router.get("/myprofile",isAuthenticated,getMyprofile)

export default router;