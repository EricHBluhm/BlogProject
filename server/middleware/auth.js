import jwt from 'jsonwebtoken';

export const verifyToken = async (req,res, next) =>{  //next lets the function continue
    try{

        let token = req.header("Authorization"); //from the request from the front end, grabbing authorization header. Thats where the token will be set, Frontend is setting this, and we are grabbing it from the backend throyugh this key

        if(!token){
            return res.status(403).send("Access Denied"); //token doesn't exist, so nothing is sent
        }

        if (token.startsWith("Bearer ")) { //~47mins
            token.slice(7, token.length).trimLeft(); //take everything from right side of string, where the actual token is
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET); //check with jwt with the secret string
        req.user = verfied;

        next(); //

    } catch (err) {
        res.status(500).json({ error: err.message})
    }
}