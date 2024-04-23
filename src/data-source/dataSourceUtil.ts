import * as fs from "fs";
import csvtojson from "csvtojson";

export interface DataRepository<T> {
  loadData(): Promise<void>;
  getData(args: T): Promise<T[]>;
}

interface FilterArgs<T> {
  item: T;
  args: Partial<T>;
}

export function filterItems<T>(filterArgs: FilterArgs<T>): boolean {
  const { item, args } = filterArgs;
  for (const key in args) {
    if (
      args.hasOwnProperty(key) &&
      args[key] &&
      item[key as keyof T] !== args[key]
    ) {
      return false;
    }
  }
  return true;
}

export async function loadData(filePath: string): Promise<any[]> {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return csvtojson().fromString(fileContent);
  } catch (error) {
    throw new Error(`Error loading data: ${error}`);
  }
}
