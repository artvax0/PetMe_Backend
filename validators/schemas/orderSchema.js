import Joi from "joi";

const orderSchema = (order) => {
  const schema = Joi.object({
    products: Joi.array().items(Joi.object().required()),
    address: Joi.object().keys({
      country: Joi.string().min(2).max(256).required(),
      state: Joi.string().min(0).max(256).allow(''),
      city: Joi.string().min(2).max(256).required(),
      street: Joi.string().min(2).max(256).required(),
      houseNumber: Joi.number().min(1).default(1).required(),
      zip: Joi.number().min(0).default(0).required()
    }).required()
  });
  return schema.validate(order);
}

export default orderSchema;