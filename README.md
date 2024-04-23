new markdown file:

---------------------
gql-endpoint - API
=====================

Introduction
------------

A GraphQL endpoint that serves as the backend for retrieving customer and product data.

Getting Started
---------------
To get started, follow these steps:

1. Install dependencies:
    * yarn install
2. Build the application:
    * yarn build
3. Run the application:
    * yarn start
4. Run the tests:
    * yarn test

* type: 'yarn dev' to run application in dev mode
* type: 'yarn format' to run formatting on all ts files

Usage
------
To interact with the GQL API use a tool like [Apollo Studio](https://studio.apollographql.com/sandbox/explorer). You can execute queries to retrieve data from the server.

An example query to retrieve a list of customers: 

```graphql
query  {
  customers(contact_number: null, email: null, forename: null, surname: null, postcode: null) {
    contact_number
    email
    forename
    postcode
    surname
  }
}
```

Built With
----------

* [TypeScript](https://www.typescriptlang.org)
* [GraphQL](https://graphql.org)
* [Apollo Server](https://www.apollographql.com/docs/apollo-server)
* [Express](https://expressjs.com)