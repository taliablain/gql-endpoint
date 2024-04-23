// src/resolvers.ts

import { CustomerDataSource } from "../data-source/customer.datasource";
import { ProductDataSource } from "../data-source/product.datasource";

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
      _parent: any,
      args: CustomerArgs,
      context: ResolverContext,
    ) => {
      const customers = await context.dataSources.customerDataSource.getData(args);
      return customers;
    },
    products: async (
      _parent: any,
      args: ProductArgs,
      context: ResolverContext,
    ) => {
      const products = await context.dataSources.productDataSource.getData(args);
      return products;
    },
  },
};

export default resolvers;
