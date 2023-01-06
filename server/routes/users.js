import express from "express";
import { //controllers
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ //1:00, talks about CRUD
//routes where we grab information

router.get("/:id", verifyToken, getUser); //users/:id, grab the user id from user or frontend, and call database with the particular id. How we do query strings (look up)
router.get("/:id/friends", verifyToken, getUserFriends); //gets userfriends 

//Update
//update function, so use .patch
router.patch("/:id/:friendId", verifyToken, addRemoveFriend); //add or remove friend

export default router;