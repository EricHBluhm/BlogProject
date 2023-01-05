import mongoose from "mongoose";

//schema object
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true, //no duplicate emails
        },
        password: {
            type: String,
            required: true,
            min: 5,
            max: 50,
            unique: true, //no duplicate emails
        },
        picturePath: {
            type: String,
            default: "",
        },
        friends: {
            type: Array,
            default: [],
        },
        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,

    },
    {timestamps: true} //dates when updated/created
);

const User = mongoose.model("User", UserSchema) //create mongoose schema first, then into mongoose.model
export default User;