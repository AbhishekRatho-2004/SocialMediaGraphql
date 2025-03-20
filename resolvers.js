const User = require("./models/User");
const { getUserResolver, getUserByIdResolver, addUserResolver,followUserResolver, getFollowingUsers, getFollowedUser, unfollowUserResolver } = require("./resolvers/user");
const {addPostResolver, getPostsResolver, getPostByIdResolver}= require("./resolvers/post")
const resolvers = {
    User:{
        followers:getFollowingUsers,
        following:getFollowedUser
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