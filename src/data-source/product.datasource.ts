import { DataSource } from "apollo-datasource";
import * as fs from "fs";
import csvtojson from "csvtojson";
import { ProductArgs } from "../resolvers/resolvers";
import { DataRepository, filterItems, loadData } from "./dataSourceUtil";

interface Product {
  vin: string;
  colour: string;
  make: string;
  model: string;
  price: number;
}

export class ProductDataSource
  extends DataSource
  implements DataRepository<ProductArgs>
{
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
      if (this.dataSourceType === "csv") {
        this.products = await loadData("/Users/taliablain/gql-endpoint/src/data/product.csv");
      } else if (this.dataSourceType === "db") {
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
    const filteredProducts = this.products.filter((product) =>
      filterItems({ item: product, args }),
    );
    const mappedProducts: ProductArgs[] = filteredProducts.map((product) => ({
      vin: product.vin,
      colour: product.colour,
      make: product.make,
      model: product.model,
      price: product.price,
    }));
    return mappedProducts;
  }
}
