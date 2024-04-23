import { CustomerDataSource } from "../src/data-source/customer.datasource";
import { ProductDataSource } from "../src/data-source/product.datasource";
import resolvers, { ProductArgs } from "../src/resolvers/resolvers";

jest.mock("../src/data-source/product.datasource");

const mockContext = {
    dataSources: {
      customerDataSource: new CustomerDataSource(),
      productDataSource: new ProductDataSource(),
    },
  };

describe("Product Resolver", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("products resolver", () => {
    it("should return filtered product data based on make", async () => {
      const mockProductData = [
        {
          vin: "VIN123",
          make: "Toyota",
          model: "Camry",
          colour: "Blue",
          price: 20000,
        },
        {
          vin: "VIN456",
          make: "Mini",
          model: "Cooper",
          colour: "Red",
          price: 25000,
        },
      ];

      (mockContext.dataSources.productDataSource.getData as jest.Mock).mockResolvedValue(mockProductData);

      const result = await resolvers.Query.products(null, { make: "Toyota" } as ProductArgs, mockContext);

      expect(result).toEqual(mockProductData);
    });
  });
});