import Joi from "joi";

const loginUserSchema = (user) => {
  const schema = Joi.object({
    email: Joi.string()
      .ruleset.regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
      .rule({ message: 'Email must be a valid email address' })
      .required(),
    password: Joi.string()
      .ruleset.regex(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/)
      .rule({ message: 'Password must be at least 7 characters long and contain one: Uppercase letter, lowercase letter, a number, and one of the following special characters !@#$%^&*-' })
      .required(),
  });
  return schema.validate(user);
}

export default loginUserSchema;