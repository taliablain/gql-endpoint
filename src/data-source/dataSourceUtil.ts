import { DataSource } from "apollo-datasource";

export class CustomDataSource<T> {
  data: T[];

  constructor(data: T[] = []) {
    // Provide a default value for data
    this.data = data;
  }
}
