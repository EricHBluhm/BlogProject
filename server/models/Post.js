import mongoose from "mongoose";

//can separate comments into another model later, add likes, who liked it, etc.

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes: {
            type: Map,
            of: Boolean,
        },
        comments: {
            type: Array,
            default: [], //empty array
        }

    },
    {timestamps: true}
);

const Post = mongoose.model("Post", postSchema); //mongoose template
export default Post;