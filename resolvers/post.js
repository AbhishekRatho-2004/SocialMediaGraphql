const Post = require("../models/Post")
const User = require("../models/User")

const getPostsResolver = async (_,args)=>{
    try {
        const {userId}= args
        const posts = await Post.find({user:userId})
        return posts
    } catch (error) {
        return {
            error: error.message
        }
    }
}

const getPostByIdResolver = async (_,args)=>{
    try {
        const {postId}=args
        const post = await Post.findById(postId)
        return post
    } catch (error) {
        return {
            error:error.message
        }
    }
}

const postResolver =  async (parent)=>{
    return await Post.find({user:parent._id})
}



const addPostResolver = async (_, args) => {
    try {
        const { content, userId } = args;

        const newPost = new Post({ content, user: userId });
        await newPost.save();
    
        return newPost;
    } catch (error) {
        return {
            message:"Either user doesnot exists or failed to fill all the fields"
        }
    }
}

const likePostResolver= async (_,args)=>{
    try {
        const {postId,userId} = args
        if(postId===userId){
            return "Both the ids are same"
        }
        if(!postId || !userId){
            return "All the fields are manadatory"
        }
        const post = await Post.findById(postId)
        const user = await User.findById(userId)
        if(!post || !user){
            return "Either post or User doesnot exists"
        }
        if(post.likes.includes(userId)){
            post.likes = post.likes.filter((like) => like !== userId)
            return "Post Unliked successfully"
        }
        post.likes.push(user._id)
        await post.save()
        return "Post Liked Successfully"

    } catch (error) {
        return "Unable to Like "
    }
}

const getLikesResolver = async (parent) => {
    const post = await Post.findById(parent._id).populate("likes","username email followers following _id"); 
    return post.likes || []; 
};




module.exports = {
    addPostResolver,
    getPostsResolver,
    getPostByIdResolver,
    postResolver,
    likePostResolver,
    getLikesResolver
}

