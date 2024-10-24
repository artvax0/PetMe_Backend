import Joi from "joi";

const categorySchema = (category) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(256).required()
  });
  return schema.validate(category);
}

export default categorySchema;