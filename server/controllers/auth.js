import bcrypt from "bcrypt"; //encrypt password
import jwt from "jsonwebtoken"; //webtoken from authorization
import User from "../models/User.js";

//REGISTER USER

export const register = async (req,res) => { //async b/c calling mongo database, call to backend
    //req is request body from front end, res is what we are sending back to frontend
    //this is express stuff

    try{
        const{ //frontend sends object that has these parameters
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt(); //use salt to encrypt password
        const passwordHash = await bcrypt.hash(password, salt); //hashes password

        //create user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000), //random number just for now, can add functionality later
            impressions: Math.floor(Math.random() * 10000), //random number just for now, can add functionality later
        });
        const savedUser = await newUser.save(); //save user, .save() is epxress or mongo, not sure. Saves to database
        res.status(201).json(savedUser); //from express, send user a status code of 201, meaning soemthing has been created. Creates a json version of savedUser, so frontend can receive this response and know it is correct

    } catch (err){
        res.status(500).json({ error: err.message }) //when soemthing goes wrong, send frontend status of 500, with an error emssage from the mongoDB database
    }
}