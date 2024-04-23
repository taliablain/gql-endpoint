"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = require("./schema/schema");
const resolvers_1 = __importDefault(require("./resolvers/resolvers"));
const index_1 = require("./data-source/index");
const server = new apollo_server_1.ApolloServer({
    typeDefs: schema_1.schema,
    resolvers: resolvers_1.default,
    context: () => ({
        dataSources: {
            customerDataSource: new index_1.CustomerDataSource(),
            productDataSource: new index_1.ProductDataSource(),
        },
    }),
});
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
