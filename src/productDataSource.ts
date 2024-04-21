// src/dataSources/productDataSource.ts
import { DataSource } from "apollo-datasource";
import * as fs from "fs";
import csvtojson from "csvtojson";

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

  async getProducts(): Promise<Product[]> {
    await this.loadData();
    return this.products;
  }
}
