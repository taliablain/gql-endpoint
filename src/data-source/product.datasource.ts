// src/dataSources/productDataSource.ts
import { DataSource } from "apollo-datasource";
import * as fs from "fs";
import csvtojson from "csvtojson";
import { ProductArgs } from "../resolvers/resolvers";

interface Product {
  vin: string;
  colour: string;
  make: string;
  model: string;
  price: number;
}

export class ProductDataSource extends DataSource {
  private products: Product[];

  constructor() {
    super();
    this.products = [];
    this.loadData();
  }

  async loadData(): Promise<void> {
    const fileContent = fs.readFileSync(
      "/Users/taliablain/gql-endpoint/src/data/product.csv",
      "utf-8",
    );

    this.products = (await csvtojson().fromString(fileContent)) as Product[];
  }

  async getProducts(args: ProductArgs): Promise<Product[]> {
    await this.loadData();
    const filteredProducts = this.products.filter(product => {
      for (const key in args) {
        if (args.hasOwnProperty(key) && args[key] && product[key as keyof Product] !== args[key]) {
          return false;
        }
      }
      return true;
    });
    return filteredProducts;
  }
}
