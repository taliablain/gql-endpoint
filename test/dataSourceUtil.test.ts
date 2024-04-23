import { loadData, filterItems } from "../src/data-source/dataSourceUtil";
import * as fs from "fs";

jest.mock("fs", () => ({
  ...jest.requireActual("fs"),
  readFileSync: jest.fn(),
}));

describe("dataSourceUtil tests", () => {
  describe("filterItems", () => {
    it("should return true when all filter criteria match", () => {
      const item = { id: 1, name: "John", age: 30 };
      const args = { id: 1, name: "John" };
      expect(filterItems({ item, args })).toBe(true);
    });

    it("should return false if any filter criteria doesn't match", () => {
      const item = { id: 1, name: "John", age: 30 };
      const args = { id: 2, name: "John" };
      expect(filterItems({ item, args })).toBe(false);
    });
  });

  describe("loadData", () => {
    it("should load data from file and parse it into JSON", async () => {
      const mockFileContent = "id,name,age\n1,John,30\n2,Alice,25";
      const mockParsedData = [
        { id: "1", name: "John", age: "30" },
        { id: "2", name: "Alice", age: "25" },
      ];
      (fs.readFileSync as jest.Mock).mockReturnValueOnce(mockFileContent);

      const csvtojson = require("csvtojson");
      csvtojson().fromString = jest.fn().mockResolvedValueOnce(mockParsedData);

      const filePath = "test.csv";
      const data = await loadData(filePath);

      expect(data).toEqual(mockParsedData);
      expect(fs.readFileSync).toHaveBeenCalledWith(filePath, "utf-8");
    });

    it("should throw an error if file loading fails", async () => {
      const errorMessage = "File not found";
      (fs.readFileSync as jest.Mock).mockImplementationOnce(() => {
        throw new Error(errorMessage);
      });

      const filePath = "test.csv";
      await expect(loadData(filePath)).rejects.toThrowError(`Error loading data: Error: ${errorMessage}`);
      expect(fs.readFileSync).toHaveBeenCalledWith(filePath, "utf-8");
    });
  });
});