"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDataSource = void 0;
const apollo_datasource_1 = require("apollo-datasource");
const fs = __importStar(require("fs"));
const csvtojson_1 = __importDefault(require("csvtojson"));
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
                // Load data based on the configured data source type
                if (this.dataSourceType === "csv") {
                    const fileContent = fs.readFileSync("/Users/taliablain/gql-endpoint/src/data/customer.csv", "utf-8");
                    const result = yield (0, csvtojson_1.default)().fromString(fileContent);
                    this.products = result;
                }
                else if (this.dataSourceType === "db") {
                    // Stubbed out external database connection
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
            const filteredProducts = this.products
                .filter((product) => {
                for (const key in args) {
                    if (args.hasOwnProperty(key) &&
                        args[key] &&
                        product[key] !== args[key]) {
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
        });
    }
}
exports.ProductDataSource = ProductDataSource;
