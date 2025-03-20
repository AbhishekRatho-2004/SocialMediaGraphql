const User = require("./models/User");
const { getUserResolver, getUserByIdResolver, addUserResolver,followUserResolver, getFollowingUsers, getFollowedUser, unfollowUserResolver } = require("./resolvers/user");

const resolvers = {
    User:{
        followers:getFollowingUsers,
        following:getFollowedUser
    },
    Query: {
        getUsers: getUserResolver,
        getUserById: getUserByIdResolver
    },
    Mutation: {
        addUser: addUserResolver,
        followUser:followUserResolver,
        unfollowUser:unfollowUserResolver
    },
};
module.exports = resolvers;