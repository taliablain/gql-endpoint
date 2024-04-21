// src/resolvers.ts

import { CustomerDataSource } from "./customerDataSource";
import { ProductDataSource } from "./productDataSource";

interface ResolverContext {
  dataSources: {
    customerDataSource: CustomerDataSource;
    productDataSource: ProductDataSource;
  };
}

export type CustomerArgs = {
  email?: string,
  forename?: string,
  surname?: string,
  contactNumber?: string,
  postcode?: string,
  [key: string]: string | undefined; // Index signature indicating any string key is valid
}

export type ProductArgs = {
  vin?: string,
  colour?: string,
  make?: string,
  model?: string,
  price?: number,
  [key: string]: string | number | undefined
}

const resolvers = {
  Query: {
    customers: async (
      parent: any,
      args: CustomerArgs,
      context: ResolverContext,
      info: any
    ) => {
      const customers = await context.dataSources.customerDataSource.getCustomers(args);
      return customers;
    },
    products: async (
      parent: any,
      args: ProductArgs,
      context: ResolverContext,
      info: any
    ) => {
      const products = await context.dataSources.productDataSource.getProducts(args);
      return products;
    },
  },
};

export default resolvers;
