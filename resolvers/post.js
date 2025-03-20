const Post = require("../models/Post")

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

module.exports = {
    addPostResolver,
    getPostsResolver,
    getPostByIdResolver,
    postResolver
}

