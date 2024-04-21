const { buildSchema } = require("graphql");

export const schema = buildSchema(`
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
