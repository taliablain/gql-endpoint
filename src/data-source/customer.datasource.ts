import { DataSource } from "apollo-datasource";

import { CustomerArgs } from "../resolvers/resolvers";
import { DataRepository, filterItems, loadData } from "./dataSourceUtil";

interface Customer {
  email: string;
  forename: string;
  surname: string;
  contact_number: string;
  postcode: string;
}

export class CustomerDataSource
  extends DataSource
  implements DataRepository<CustomerArgs>
{
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
      if (this.dataSourceType === "csv") {
        this.customers = await loadData("src/data/customer.csv");
      } else if (this.dataSourceType === "db") {
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
    const filteredCustomers = this.customers.filter((customer) =>
      filterItems({ item: customer, args }),
    );
    return filteredCustomers.map((customer) => ({
      email: customer.email,
      forename: customer.forename,
      surname: customer.surname,
      contactNumber: customer.contact_number,
      postcode: customer.postcode,
    }));
  }
}
