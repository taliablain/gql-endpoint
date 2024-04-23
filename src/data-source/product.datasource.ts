import { DataSource } from "apollo-datasource";
import * as fs from "fs";
import csvtojson from "csvtojson";
import { ProductArgs } from "../resolvers/resolvers";
import { DataRepository } from "./dataSourceUtil";

interface Product {
  vin: string;
  colour: string;
  make: string;
  model: string;
  price: number;
}

export class ProductDataSource extends DataSource implements DataRepository<ProductArgs> {
  products: Product[];
  dataSourceType: string = process.env.DATA_SOURCE_TYPE || "csv";

  constructor() {
    super();
    this.products = [];
    this.loadData().catch((err) => {
      console.error("Error loading data:", err);
    });
  }

  async loadData(): Promise<void> {
    try {
      // Load data based on the configured data source type
      if (this.dataSourceType === "csv") {
        const fileContent = fs.readFileSync("/Users/taliablain/gql-endpoint/src/data/customer.csv", "utf-8");
        const result = await csvtojson().fromString(fileContent) as Product[];
        this.products = result;
      } else if (this.dataSourceType === "db") {
        // Stubbed out external database connection
        console.log("Fetching customers from external database...");
        this.products = []; // Placeholder for actual data retrieval from DB
      } else {
        throw new Error("Invalid data source type specified in .env file");
      }
    } catch (error) {
      throw new Error(`Error loading data: ${error}`);
    }
  }

  async getData(args: ProductArgs): Promise<ProductArgs[]> {
    await this.loadData();
    const filteredProducts: ProductArgs[] = this.products
      .filter((product) => {
        for (const key in args) {
          if (
            args.hasOwnProperty(key) &&
            args[key] &&
            product[key as keyof Product] !== args[key]
          ) {
            return false;
          }
        }
        return true;
      })
      .map((product) => ({
        vin: product.vin,
        colour: product.colour,
        make: product.make,
        model: product.model,
        price: product.price
      }));
    return filteredProducts;
  }
}