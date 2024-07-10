import User from "../models/User.js";
import Post from "../models/Post.js";

/* CREATE */
export const createPost = (req, res) => {
    try {

       

    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};
