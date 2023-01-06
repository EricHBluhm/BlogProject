import User from "../models/User.js";

//READ

export const getUser = async (req,res) => {
    try{

        const {id} = req.params; //grab id
        const user = await User.findById(id); //use the Id to grab information of the user
        res.status(200).json(user);//send back to frontend relevant to user after we found it

    }catch (err){
        res.status(404).json({message: err.message});
    }
}

//59:59 ish
export const getUserFriends = async (req,res) => { //get friends from user Id
    
    try{
        const {id} = req.params; //grab id
        const user = await User.findById(id);

        const friends = await Promise.all( //multiple api calls to the database
            user.friends.map((id)=> User.findById(id)) //grab each id that user has, and grab all information from friend id's
        );

        const formattedFriends = friends.map(//format this in proper way for the frontend
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        );
        res.status(200).json(formattedFriends)
    }catch (err){
        res.status(404).json({message: err.message});
    }  
};

//UPDATE
export const addRemoveFriend = async(req,res) =>{
    try{

        const {id, friendId} = req.params;
        const user = await User.findById(id); //grab user information from DB
        const friend = await User.findById(friendId); //grab friend information

        if(user.friends.includes(friendId)){ //see if friendId is included in the main users friendId, delete friends
            //remove them
            user.friends = user.friends.filter((id) => id !== friendId); //filter function from JavaScript, removing id when id equals friend id
            friend.friends = friend.friends.filter((id) => id !== id); //remove user from friends friends list
        } else { //if they are not already in friends list, add them
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save(); //save the updates
        await friend.save();


        const friends = await Promise.all( //multiple api calls to the database
            user.friends.map((id)=> User.findById(id)) //grab each id that user has, and grab all information from friend id's
        );
        const formattedFriends = friends.map(//format this in proper way for the frontend
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        );

        res.status(200).json(formattedFriends);

    }catch(err){
        res.status(404).json({message: err.message});
    }
}