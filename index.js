const { ApolloServer } = require("apollo-server"); // Import Apollo Server
const { importSchema } = require("graphql-import"); // Import graphql-import to load schema
const EtherDataSource = require("./datasource/ethDatasource"); // Import custom data source

const typeDefs = importSchema("./schema.graphql"); // Load schema from file

require("dotenv").config(); // Load environment variables from .env file

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // Resolver for etherBalanceByAddress query
      dataSources.ethDataSource.etherBalanceByAddress(), 

    totalSupplyOfEther: (root, _args, { dataSources }) => // Resolver for totalSupplyOfEther query
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // Resolver for latestEthereumPrice query
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // Resolver for blockConfirmationTime query
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({ // Create Apollo Server instance
  typeDefs,
  resolvers,
  dataSources: () => ({ 
    ethDataSource: new EtherDataSource(), // Instantiate data source
  }), 
});

server.timeout = 0; 

server.listen("9000").then(({ url }) => { // Start server on port 9000
  console.log(`🚀 Server ready at ${url}`); 
});
