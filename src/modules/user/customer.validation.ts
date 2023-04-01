import Joi from "joi";

export default class CustomerValidation {
  public static customerRegisterSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
    gender: Joi.string().valid('Male', 'Female', 'Other'),
  }).options({ allowUnknown: false });

  public static customerUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    gender: Joi.string(),
  }).options({ allowUnknown: false });

  public static customerIdSchema = Joi.object({
    id: Joi.number().required(),
  }).options({ allowUnknown: false });
}
