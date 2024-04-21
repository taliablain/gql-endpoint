// src/resolvers.ts

import { CustomerDataSource } from "./customerDataSource";
import { ProductDataSource } from "./productDataSource";

interface ResolverContext {
  dataSources: {
    customerDataSource: CustomerDataSource;
    productDataSource: ProductDataSource;
  };
}

const resolvers = {
  Query: {
    getCustomer: async (
      parent: any,
      args: any,
      context: ResolverContext,
      info: any
    ) => {
      return context.dataSources.customerDataSource.getCustomers();
    },
    getProduct: async (
      parent: any,
      args: any,
      context: ResolverContext,
      info: any
    ) => {
      return context.dataSources.productDataSource.getProducts();
    },
  },
};

export default resolvers;
