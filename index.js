const dotenv = require("dotenv").config()
const {ApolloServer}= require("@apollo/server")
const {startStandaloneServer} = require("@apollo/server/standalone")
const resolvers = require("./resolvers")
const typeDefs = require("./typeDefs")
const db = require("./config/db")


PORT = process.env.PORT

const startServer = async ()=>{
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    })

    const { url } = await startStandaloneServer(server, {
            listen: { port: PORT }
    });

    console.log(`Server running at ${url}`);
}

startServer()