import { CustomerDataSource } from "../src/data-source/customer.datasource";
import { ProductDataSource } from "../src/data-source/product.datasource";
import resolvers, { CustomerArgs, ProductArgs } from "../src/resolvers/resolvers";

jest.mock("../src/data-source/customer.datasource");
jest.mock("../src/data-source/product.datasource");

const mockContext = {
  dataSources: {
    customerDataSource: new CustomerDataSource(),
    productDataSource: new ProductDataSource(),
  },
};

describe("Resolvers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("customers resolver", () => {
    it("should return filtered customer data based on postcode", async () => {
      const mockCustomerData = [
        {
          email: "john@example.com",
          forename: "John",
          surname: "Doe",
          contact_number: "1234567890",
          postcode: "12345",
        },
        {
          email: "jane@example.com",
          forename: "Jane",
          surname: "Smith",
          contact_number: "0987654321",
          postcode: "54321",
        },
      ];

      (mockContext.dataSources.customerDataSource.getData as jest.Mock).mockResolvedValue(mockCustomerData);

      const result = await resolvers.Query.customers(null, { postcode: "12345" } as CustomerArgs, mockContext);

      expect(result).toEqual(mockCustomerData);
    });
  });
});