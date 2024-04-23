"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDataSource = void 0;
const apollo_datasource_1 = require("apollo-datasource");
const dataSourceUtil_1 = require("./dataSourceUtil");
class ProductDataSource extends apollo_datasource_1.DataSource {
    constructor() {
        super();
        this.dataSourceType = process.env.DATA_SOURCE_TYPE || "csv";
        this.products = [];
        this.loadData().catch((err) => {
            console.error("Error loading data:", err);
        });
    }
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.dataSourceType === "csv") {
                    this.products = yield (0, dataSourceUtil_1.loadData)("/Users/taliablain/gql-endpoint/src/data/product.csv");
                }
                else if (this.dataSourceType === "db") {
                    console.log("Fetching customers from external database...");
                    this.products = []; // Placeholder for actual data retrieval from DB
                }
                else {
                    throw new Error("Invalid data source type specified in .env file");
                }
            }
            catch (error) {
                throw new Error(`Error loading data: ${error}`);
            }
        });
    }
    getData(args) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadData();
            const filteredProducts = this.products.filter((product) => (0, dataSourceUtil_1.filterItems)({ item: product, args }));
            const mappedProducts = filteredProducts.map((product) => ({
                vin: product.vin,
                colour: product.colour,
                make: product.make,
                model: product.model,
                price: product.price,
            }));
            return mappedProducts;
        });
    }
}
exports.ProductDataSource = ProductDataSource;
