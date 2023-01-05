import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
// import { register } from "./controllers/auth.js"

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
        cb(null,file.originalname);
    },
});
const upload = multer({ storage }); //saves, use this variable to upload files

// //Routes WITH FILES
// app.post("/auth/register", upload.single("picture"), register); //route to auth/register, use middleware (upload.single.. locally into the public/assets folder), register is our function(controller)


//MONGOOSE SETUP
const PORT = process.env.PORT || 6001; //go to PORT in .env, but if it doesnt work do port 6001
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
}).catch((error) => console.log(`${error} did not connect`));
