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
    }

    type Query {
        getUsers: [User]!
        getUserById(id: ID!): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
        followUser(currentUserId:ID!,targetUserId:ID!):String
        unfollowUser(currentUserId:ID!,targetUserId:ID!):String
    }
`;

module.exports = typeDefs;
