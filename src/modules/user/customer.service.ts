import { uniq } from "lodash";
import { IDBQueryParams } from "../../common/interfaces/i-db-query-params";
import { CustomerModel } from "../../models/customer.model";
import { ICreateCustomer, ICustomer } from "../../interfaces/customer/i-customer";

export default class CustomerService {
  constructor() {}

  public static async createCustomer(customer: ICreateCustomer): Promise<number> {
    try {
      const result: ICustomer = await CustomerModel.create({...customer});
      return result.id;
    } catch (error) {
      throw error;
    }
  }

  public static async updateCustomer({ match, data }: IDBQueryParams): Promise<any> {
    try {
      const result = await CustomerModel.update(data, {
        where: match,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  public static async destroyCustomer(match: any): Promise<any> {
    try {
      const result = await CustomerModel.destroy({
        where: match,
      });
      console.log(result, "deleted customer");
      return result;
    } catch (error) {
      throw error;
    }
  }

  public static async getCustomers({ offset, limit }: { offset?: number; limit?: number }): Promise<ICustomer[]> {
    try {
      const users = await CustomerModel.findAll({
        attributes: ["id", "name", "email", "gender"],
        offset: offset ? offset : 0,
        limit: limit ? limit : 10,
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  public static async getCustomerDetail({ match, attributes }: IDBQueryParams): Promise<ICustomer | null> {
    try {
      let project = ["id", "name", "email", "gender"];
      if (attributes) {
        project = uniq([...project, ...attributes]);
      }

      const user = await CustomerModel.findOne({
        attributes: project,
        where: match,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
