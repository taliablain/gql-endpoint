import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import resolvers from "./resolvers";
import { CustomerDataSource } from "./customerDataSource";
import { ProductDataSource } from "./productDataSource";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: () => ({
    dataSources: {
      customerDataSource: new CustomerDataSource(),
      productDataSource: new ProductDataSource(),
    }
  }),
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
