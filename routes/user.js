import express from 'express';
import {userLogin,userRegister,userLogout,getMyprofile,getUserById} from '../controllers/user.js';
import { get } from 'http';
import { isAuthenticated } from '../middlewares/auth.js'; 

const router = express.Router();

router.post("/register",userRegister)

router.post("/login",userLogin)

router.get("/logout",userLogout)

router.get("/myprofile",isAuthenticated,getMyprofile)

router.get("/:id",getUserById)

export default router;