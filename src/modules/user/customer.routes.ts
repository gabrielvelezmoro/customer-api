import { Router } from "express";
import CustomerController from "./customer.controller";

export class CustomerRoutes {
  constructor() {}

  public init() {
    const router = Router();

    router.get("/",  CustomerController.findAll);
    router.get("/:id",  CustomerController.findOne);
    router.post("/",  CustomerController.create);
    router.put("/:id",  CustomerController.update);
    router.delete("/:id",  CustomerController.delete);

    return router;
  }
}
