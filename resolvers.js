const User = require("./models/User");
const { getUserResolver, getUserByIdResolver, addUserResolver,followUserResolver, getFollowingUsers, getFollowedUser, unfollowUserResolver } = require("./resolvers/user");
const {addPostResolver, getPostsResolver, getPostByIdResolver, postResolver}= require("./resolvers/post")
const resolvers = {
    User:{
        followers:getFollowingUsers,
        following:getFollowedUser,
        posts:postResolver
    },
    Query: {
        getUsers: getUserResolver,
        getUserById: getUserByIdResolver,
        getPosts:getPostsResolver,
        getPostByID:getPostByIdResolver
    },
    Mutation: {
        addUser: addUserResolver,
        followUser:followUserResolver,
        unfollowUser:unfollowUserResolver,
        addPost: addPostResolver
        
    },
};
module.exports = resolvers;