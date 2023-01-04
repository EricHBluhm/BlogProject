import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPathq } from "url";

// configurations
const __filename = fileURLToPath(import.meta.url); //grab file url
const __dirname = path.dirname(__filename);
dotenv.config(); //to use .env files
const app = express(); //to use middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit: "30mb",extended:true}));
app.use(cors()); //invoke cross-origin resource sharing policies
app.use("/assets", express.static(path.join(__dirname,'public/assets'))); // sets directory of where we keep our assets (images), stored locally

//File Storage
    //from multer github, when someone uploads a file, will be saved in the dstination folder ("public/assets")
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, "public/assets");
    },
    filename: function(req,file,cb){
        cb(null,file.orginalname);
    },
});
const upload = multer({ storage }); //saves, use this variable to upload files
