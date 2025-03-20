const { gql } = require("graphql-tag");

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        profilePic: String
        bio: String
        followers: [User]
        following: [User]
        post: [Post]
    }
    type Post{   
        id: ID!
        content: String!
        user: User!
        image: String
        comment: [User]!
    }

    type Query {
        getUsers: [User]!
        getUserById(id: ID!): User
        getPosts(userId:ID!): [Post]!
        getPostByID(postId:ID!):Post


    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
        addPost(userId:ID!,content:String!): Post
        followUser(currentUserId:ID!,targetUserId:ID!):String
        unfollowUser(currentUserId:ID!,targetUserId:ID!):String
    }
`;

module.exports = typeDefs;
