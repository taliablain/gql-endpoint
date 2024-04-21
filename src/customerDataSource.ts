// src/dataSources/customerDataSource.ts
import { DataSource } from "apollo-datasource";
import * as fs from "fs";
import csvtojson from "csvtojson";
//maybe try changing this from an interface to an array? like our ts types
interface Customer {
  email: string;
  forename: string;
  surname: string;
  contact_number: string;
  postcode: string;
}

export class CustomerDataSource extends DataSource {
  private customers: Customer[];

  constructor() {
    super();
    this.customers = [];
    this.loadData().catch((err) => {
      console.error("Error loading data:", err);
    });
  }

  async loadData(): Promise<void> {
    try {
      const fileContent = fs.readFileSync(
        "/Users/taliablain/gql-endpoint/src/data/customer.csv",
        "utf-8",
      );
      const result = (await csvtojson().fromString(fileContent)) as Customer[];
      this.customers = result;
    } catch (error) {
      throw new Error(`Error loading data`);
    }
  }

  async getCustomers(): Promise<Customer[]> {
    await this.loadData();
    return this.customers;
  }
}
