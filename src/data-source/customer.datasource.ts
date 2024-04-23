import { DataSource } from "apollo-datasource";
import * as fs from "fs";
import csvtojson from "csvtojson";
import { CustomerArgs } from "../resolvers/resolvers";
import { DataRepository } from "./dataSourceUtil";

interface Customer {
  email: string;
  forename: string;
  surname: string;
  contact_number: string;
  postcode: string;
}

export class CustomerDataSource extends DataSource implements DataRepository<CustomerArgs> {
  customers: Customer[];
  dataSourceType: string = process.env.DATA_SOURCE_TYPE || "csv";

  constructor() {
    super();
    this.customers = [];
    this.loadData().catch((err) => {
      console.error("Error loading data:", err);
    });
  }

  async loadData(): Promise<void> {
    try {
      // Load data based on the configured data source type
      if (this.dataSourceType === "csv") {
        const fileContent = fs.readFileSync("/Users/taliablain/gql-endpoint/src/data/customer.csv", "utf-8");
        const result = await csvtojson().fromString(fileContent) as Customer[];
        this.customers = result;
      } else if (this.dataSourceType === "db") {
        // Stubbed out external database connection
        console.log("Fetching customers from external database...");
        this.customers = []; // Placeholder for actual data retrieval from DB
      } else {
        throw new Error("Invalid data source type specified in .env file");
      }
    } catch (error) {
      throw new Error(`Error loading data: ${error}`);
    }
  }

  async getData(args: CustomerArgs): Promise<CustomerArgs[]> {
    await this.loadData();
    const filteredCustomers: CustomerArgs[] = this.customers
      .filter((customer) => {
        for (const key in args) {
          if (
            args.hasOwnProperty(key) &&
            args[key] &&
            customer[key as keyof Customer] !== args[key]
          ) {
            return false;
          }
        }
        return true;
      })
      .map((customer) => ({
        email: customer.email,
        forename: customer.forename,
        surname: customer.surname,
        contactNumber: customer.contact_number,
        postcode: customer.postcode,
      }));
    return filteredCustomers;
  }
}

