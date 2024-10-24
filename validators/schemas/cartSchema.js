import Joi from "joi";

const cartSchema = (cart) => {
  const schema = Joi.object({
    product_id: Joi.string().hex().length(24).required(),
    quantity: Joi.number().min(0).required()
  });
  return schema.validate(cart);
}

export default cartSchema;