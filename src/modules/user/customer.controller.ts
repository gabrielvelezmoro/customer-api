import { Request, Response } from "express";
import { ICreateCustomer, ICustomer } from "../../interfaces/customer/i-customer";
import CustomerValidation from "./customer.validation";
import ResponseService from "../../common/services/response.service";
import ValidationService from "../../common/services/validation.service";
import * as messages from "./messages.json";
import CustomerService from "./customer.service";

export default class CustomerController {
  // function to create new customer
  public static async create(request: Request, response: Response) {
    try {
      const customer: ICreateCustomer = request.body;
      const validationErrors = ValidationService.joiValidator(CustomerValidation.customerRegisterSchema, customer);
      if (validationErrors.errors && validationErrors.errors.length) {
        const errors = validationErrors.errors;
        ResponseService.validationErrorResponse({ response, errors });
      } else {
        await CustomerService.createCustomer(customer);
        ResponseService.successResponse({
          response,
          message: messages.customer_created,
        });
      }
    } catch (error) {
      ResponseService.errorResponse({ request, response, error });
    }
  }

  // function to update the existing customer by customer id
  public static async update(request: Request, response: Response) {
    try {
      const customer: ICustomer = request.body;
      const validationErrors = ValidationService.joiValidator(CustomerValidation.customerUpdateSchema, customer);
      if (validationErrors.errors && validationErrors.errors.length) {
        const errors = validationErrors.errors;
        ResponseService.validationErrorResponse({ response, errors });
      } else {
        await CustomerService.updateCustomer({ match: { id: request.params.id }, data: customer });
        ResponseService.successResponse({
          response,
          message: messages.customer_updated,
        });
      }
    } catch (error) {
      ResponseService.errorResponse({ request, response, error });
    }
  }

  // function to delete the customer by customer id
  public static async delete(request: Request, response: Response) {
    try {
      const customerId = request.params.id;
      const validationErrors = ValidationService.joiValidator(CustomerValidation.customerIdSchema, { id: customerId });
      if (validationErrors.errors && validationErrors.errors.length) {
        const errors = validationErrors.errors;
        ResponseService.validationErrorResponse({ response, errors });
      } else {
        await CustomerService.destroyCustomer({ id: customerId });
        ResponseService.successResponse({
          response,
          message: messages.customer_deleted,
        });
      }
    } catch (error) {
      ResponseService.errorResponse({ request, response, error });
    }
  }

  // function to get all the customers from customers table
  public static async findAll(request: Request, response: Response) {
    try {
      let page = 0;
      let limit = 0;
      let offset;
      if (request.query && request.query.page) {
        page = (request.query as any).page;
      }
      if (request.query && request.query.limit) {
        limit = (request.query as any).limit;
      }
      if (page && limit) {
        offset = (page - 1) * limit;
      }

      const customers = await CustomerService.getCustomers({ offset, limit });
      ResponseService.successResponse({ response, data: customers });
    } catch (error) {
      ResponseService.errorResponse({ request, response, error });
    }
  }

  // function to get single customer detail by id
  public static async findOne(request: Request, response: Response) {
    try {
      const customerId = request.params.id;
      const validationErrors = ValidationService.joiValidator(CustomerValidation.customerIdSchema, { id: customerId });
      if (validationErrors.errors && validationErrors.errors.length) {
        const errors = validationErrors.errors;
        ResponseService.validationErrorResponse({ response, errors });
      } else {
        const customer = await CustomerService.getCustomerDetail({ match: { id: customerId } });
        ResponseService.successResponse({ response, data: customer });
      }
    } catch (error) {
      ResponseService.errorResponse({ request, response, error });
    }
  }
}
