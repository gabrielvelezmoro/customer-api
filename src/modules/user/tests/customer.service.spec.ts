import { CustomerModel } from "../../../models/customer.model";
import { createCustomerRequestBody } from "./customer.controller.spec.data";
import { createCustomerModelExpectedResponse } from "./customer.service.spec.data";

describe("Create Customer", () => {
  
  test("Should return customer object if user created successfullly", async () => {
    CustomerModel.create = jest.fn().mockResolvedValue(createCustomerModelExpectedResponse);
    jest.spyOn(CustomerModel, "create");
    const response = await CustomerModel.create(createCustomerRequestBody);
    expect(CustomerModel.create).toHaveBeenCalledTimes(1);
    expect(CustomerModel.create).toHaveBeenCalledWith(createCustomerRequestBody);
    expect(response).toEqual(createCustomerModelExpectedResponse);
  });
  test("Should throw error if service fails to create the customer", async () => {
    CustomerModel.create = jest.fn().mockRejectedValueOnce(new Error("Something went wrong"));
    jest.spyOn(CustomerModel, "create");
    await expect(CustomerModel.create(createCustomerRequestBody)).rejects.toThrow("Something went wrong");
    expect(CustomerModel.create).toHaveBeenCalledTimes(1);
    expect(CustomerModel.create).toHaveBeenCalledWith(createCustomerRequestBody);
  });
});
