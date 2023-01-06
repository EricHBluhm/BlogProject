import express from "express";
import {login} from "../controllers/auth.js";

//allows express to identify that these routes are all configured

const router = express.Router(); 

router.post("/login", login); //will actually be auth/login b/c of line 44 under //Routes in index.js

export default router;