import { ApolloServer } from "apollo-server";
import { schema } from "./schema/schema";
import resolvers from "./resolvers/resolvers";
import { CustomerDataSource, ProductDataSource } from "./data-source/index";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: () => ({
    dataSources: {
      customerDataSource: new CustomerDataSource(),
      productDataSource: new ProductDataSource(),
    },
  }),
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});