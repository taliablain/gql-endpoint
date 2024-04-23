"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const { buildSchema } = require("graphql");
exports.schema = buildSchema(`
type Customer {
  email: String
  forename: String
  surname: String
  contact_number: String
  postcode: String
}

type Product {
  vin: String
  colour: String
  make: String
  model: String
  price: Float
}

  type Query {
    customers(email: String, forename: String, surname: String, contact_number: String, postcode: String): [Customer]
    products(vin: String, colour: String, make: String, model: String, price: Float): [Product]
  }
`);
