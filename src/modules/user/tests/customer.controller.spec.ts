import * as httpMocks from "node-mocks-http";
import CustomerController from "../customer.controller";
import CustomerService from "../customer.service";
import {
  createCustomerRequestBody,
  createCustomerInvalidRequestBody,
  updateCustomerRequestBody,
  updateCustomerInvalidRequestBody,
  expectedCustomerListResponseFromService,
  expectedCustomerDetailResponseFromService,
} from "./customer.controller.spec.data";

describe("Create customer", () => {
  test("Should return 400 if any validation error", async () => {
    for (const body of createCustomerInvalidRequestBody) {
      let request = httpMocks.createRequest({
        body,
      });
      let expectedResponseMessage = "Validation Error!";
      let response = httpMocks.createResponse();
      await CustomerController.create(request, response);
      expect(response._getStatusCode()).toEqual(400);
      expect(response._getData().message).toEqual(expectedResponseMessage);
    }
  });

  test("Should return 500 if any error occured while creating a new customer", async () => {
    let request = httpMocks.createRequest({
      body: createCustomerRequestBody,
    });
    let response = httpMocks.createResponse();
    CustomerService.createCustomer = jest.fn().mockRejectedValueOnce(new Error("Something went wrong"));
    jest.spyOn(CustomerService, "createCustomer");
    await CustomerController.create(request, response);
    expect(CustomerService.createCustomer).toHaveBeenCalledTimes(1);
    expect(CustomerService.createCustomer).toHaveBeenCalledWith(createCustomerRequestBody);

    expect(response._getStatusCode()).toEqual(500);
  });

  test("Should create a new customer and return 200 status code", async () => {
    let expectedResponseFromService = 2;
    let request = httpMocks.createRequest({
      body: createCustomerRequestBody,
    });
    let response = httpMocks.createResponse();
    CustomerService.createCustomer = jest.fn().mockResolvedValue(expectedResponseFromService);
    jest.spyOn(CustomerService, "createCustomer");
    await CustomerController.create(request, response);
    expect(CustomerService.createCustomer).toHaveBeenCalledTimes(1);
    expect(CustomerService.createCustomer).toHaveBeenCalledWith(createCustomerRequestBody);
    expect(response._getStatusCode()).toEqual(200);
    expect(response._getData()).toEqual({
      message: "Customer created successfully",
    });
  });
});

describe("Update customer", () => {
  test("Should return 400 if any validation error", async () => {
    for (const body of updateCustomerInvalidRequestBody) {
      let request = httpMocks.createRequest({
        body,
      });
      let expectedResponseMessage = "Validation Error!";
      let response = httpMocks.createResponse();
      await CustomerController.update(request, response);
      expect(response._getStatusCode()).toEqual(400);
      expect(response._getData().message).toEqual(expectedResponseMessage);
    }
  });
  test("Should return 500 if any error while updating a customer", async () => {
    let customerId = 61;
    let request = httpMocks.createRequest({
      body: updateCustomerRequestBody,
      params: {
        id: customerId,
      },
    });
    let response = httpMocks.createResponse();
    CustomerService.updateCustomer = jest.fn().mockRejectedValueOnce(new Error("Something went wrong"));
    jest.spyOn(CustomerService, "updateCustomer");
    await CustomerController.update(request, response);
    expect(CustomerService.updateCustomer).toHaveBeenCalledTimes(1);
    expect(CustomerService.updateCustomer).toHaveBeenCalledWith({ match: { id: customerId }, data: updateCustomerRequestBody });

    expect(response._getStatusCode()).toEqual(500);
  });
  test("Should return 200 status code if customer updated successfully", async () => {
    let customerId = 61;
    let request = httpMocks.createRequest({
      body: updateCustomerRequestBody,
      params: {
        id: customerId,
      },
    });
    let response = httpMocks.createResponse();
    let expectedResponseFromService = [1];
    CustomerService.updateCustomer = jest.fn().mockResolvedValueOnce(expectedResponseFromService);
    jest.spyOn(CustomerService, "updateCustomer");
    await CustomerController.update(request, response);
    expect(CustomerService.updateCustomer).toHaveBeenCalledTimes(1);
    expect(CustomerService.updateCustomer).toHaveBeenCalledWith({ match: { id: customerId }, data: updateCustomerRequestBody });
    expect(response._getStatusCode()).toEqual(200);
    expect(response._getData()).toEqual({
      message: "Customer updated successfully",
    });
  });
});

describe("Delete customer", () => {
  test("Should return 400 if any validation error", async () => {
    let request = httpMocks.createRequest({
      params: {
        name: "Saurabh",
      },
    });
    let expectedResponseMessage = "Validation Error!";
    let response = httpMocks.createResponse();
    await CustomerController.delete(request, response);
    expect(response._getStatusCode()).toEqual(400);
    expect(response._getData().message).toEqual(expectedResponseMessage);
  });

  test("Should return 500 if any error while deleting a customer", async () => {
    let customerId = 61;
    let request = httpMocks.createRequest({
      params: {
        id: customerId,
      },
    });
    let response = httpMocks.createResponse();
    CustomerService.destroyCustomer = jest.fn().mockRejectedValueOnce(new Error("Something went wrong"));
    jest.spyOn(CustomerService, "destroyCustomer");
    await CustomerController.delete(request, response);
    expect(CustomerService.destroyCustomer).toHaveBeenCalledTimes(1);
    expect(CustomerService.destroyCustomer).toHaveBeenCalledWith({ id: customerId });
    expect(response._getStatusCode()).toEqual(500);
  });

  test("Should return 200 status code if customer deleted successfully", async () => {
    let customerId = 61;
    let request = httpMocks.createRequest({
      params: {
        id: customerId,
      },
    });
    let response = httpMocks.createResponse();
    let expectedResponseFromService = 0;
    CustomerService.destroyCustomer = jest.fn().mockResolvedValueOnce(expectedResponseFromService);
    jest.spyOn(CustomerService, "destroyCustomer");
    await CustomerController.delete(request, response);
    expect(CustomerService.destroyCustomer).toHaveBeenCalledTimes(1);
    expect(CustomerService.destroyCustomer).toHaveBeenCalledWith({ id: customerId });
    expect(response._getStatusCode()).toEqual(200);
    expect(response._getData()).toEqual({
      message: "Customer deleted successfully",
    });
  });
});

describe("Get customers list", () => {
  test("Should return 200 status code if get customers list successfully", async () => {
    let limit = 10;
    let page = 1;
    let offset = (page - 1) * limit;
    let request = httpMocks.createRequest({
      query: {
        page,
        limit,
      },
    });
    let response = httpMocks.createResponse();
    CustomerService.getCustomers = jest.fn().mockResolvedValueOnce(expectedCustomerListResponseFromService);
    jest.spyOn(CustomerService, "getCustomers");
    await CustomerController.findAll(request, response);
    expect(CustomerService.getCustomers).toHaveBeenCalledTimes(1);
    expect(CustomerService.getCustomers).toHaveBeenCalledWith({ offset, limit });
    expect(response._getStatusCode()).toEqual(200);
    expect(response._getData()).toEqual({
      data: expectedCustomerListResponseFromService,
    });
  });

  test("Should return 500 if any error while fetching customers", async () => {
    let limit = 10;
    let page = 1;
    let offset = (page - 1) * limit;
    let request = httpMocks.createRequest({
      query: {
        page,
        limit,
      },
    });
    let response = httpMocks.createResponse();
    CustomerService.getCustomers = jest.fn().mockRejectedValueOnce(new Error("Something went wrong"));
    jest.spyOn(CustomerService, "getCustomers");
    await CustomerController.findAll(request, response);
    expect(CustomerService.getCustomers).toHaveBeenCalledTimes(1);
    expect(CustomerService.getCustomers).toHaveBeenCalledWith({ offset, limit });
    expect(response._getStatusCode()).toEqual(500);
  });
});

describe("Get customer detail", () => {
  test("Should return 400 if any validation error", async () => {
    let request = httpMocks.createRequest({
      params: {
        name: "Saurabh",
      },
    });
    let expectedResponseMessage = "Validation Error!";
    let response = httpMocks.createResponse();
    await CustomerController.findOne(request, response);
    expect(response._getStatusCode()).toEqual(400);
    expect(response._getData().message).toEqual(expectedResponseMessage);
  });

  test("Should return 500 if any error while fetching Customer detail", async () => {
    let CustomerId = 61;
    let request = httpMocks.createRequest({
      params: {
        id: CustomerId,
      },
    });
    let response = httpMocks.createResponse();
    CustomerService.getCustomerDetail = jest.fn().mockRejectedValueOnce(new Error("Something went wrong"));
    jest.spyOn(CustomerService, "getCustomerDetail");
    await CustomerController.findOne(request, response);
    expect(CustomerService.getCustomerDetail).toHaveBeenCalledTimes(1);
    expect(CustomerService.getCustomerDetail).toHaveBeenCalledWith({ match: { id: CustomerId } });
    expect(response._getStatusCode()).toEqual(500);
  });

  test("Should return 200 status code if no error in fetching customer detail", async () => {
    let customerId = 61;
    let request = httpMocks.createRequest({
      params: {
        id: customerId,
      },
    });
    let response = httpMocks.createResponse();
    CustomerService.getCustomerDetail = jest.fn().mockResolvedValueOnce(expectedCustomerDetailResponseFromService);
    jest.spyOn(CustomerService, "getCustomerDetail");
    await CustomerController.findOne(request, response);
    expect(CustomerService.getCustomerDetail).toHaveBeenCalledTimes(1);
    expect(CustomerService.getCustomerDetail).toHaveBeenCalledWith({ match: { id: customerId } });
    expect(response._getStatusCode()).toEqual(200);
    expect(response._getData()).toEqual({
      data: expectedCustomerDetailResponseFromService,
    });
  });
});
