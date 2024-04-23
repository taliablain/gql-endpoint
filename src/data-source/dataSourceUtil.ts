import { DataSource } from "apollo-datasource";

export interface DataRepository<T> {
  loadData(): Promise<void>;
  getData(args: T): Promise<T[]>;
}
