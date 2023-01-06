import Post from "../models/Post.js"
import User from "../models/User.js";

//CREATE

//BTW mongoose automatically creates Ids

export const createPost = async (req, res) => {
    try {
        const {userId, description, picturePath} = req.body; //front end will send these
        const user = await User.findById(userID); // grab user information
        const newPost = new Post({ //putting post into database
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath, //post picturepath
            likes: {}, //empty object because starts with no likes, look like someId: true
            comments: []
        })

        await newPost.save(); //save to mongoDB
        const post = await Post.find(); //grab all posts

        res.status(201).json(post); //return all posts, so frontend has updated posts. 201 is creating soemthign

    } catch (err){
        res.status(409).json({message: err.message })
    }
}

// READ

//grab all posts of everyone, like a newsfeed for a user
export const getFeedPosts = async (req, res) => {
    try{
        const post = await Post.find(); //grab all posts
        res.status(200).json(post); //return all posts, so frontend has updated posts . 200 sucessful request
    } catch (err) {
        res.status(404).json({message: err.message })
    }
}

export const getUserPosts = async (req, res) => {
    try{
        const { userId } = req.params;
        const posts = await Post.find({ userId }); //only grab user posts that meet the requrement
        res.status(200).json(post); //return all posts, so frontend has updated posts . 200 sucessful request
    } catch (err) {
        res.status(404).json({message: err.message })
    }
}

//UPDATE

export const likePost = async (req,res) => {
    try{
        const{ id } = req.params; //grab the relevant post. id comes from query sting
        const { userId } = req.body;  //userId comes from the body of the request
        const post = await Post.findById(id); //grabbing post information
        const isLiked = post.likes.get(userId); //check in likes if userId exists. if it does, that mean the post is liked by that particular person

        if (isLiked){ //if post is liked by user
            post.likes.delete(userId); //so if press like with the post already being liked by the current user, it will delete the like in the map?
        } else {
            post.likes.set(userId, true); //like post, and add userId to true
        }

        const updatedPost = await Post.findByIdAndUpdate ( //update a specific post, pass in id, and lieks to new post we are modyfing
            id,
            {likes: post.likes }, //list of likes that we modified
            {new: true} //new object
        );

        res.status(200).json(updatedPost); //return all posts, so frontend has updated posts . Pass in updated post to update front end
    } catch (err) {
        res.status(404).json({message: err.message })
    }
}