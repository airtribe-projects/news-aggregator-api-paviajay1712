const Joi = require("joi");

const registrationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const preferencesSchema = Joi.object({
  country: Joi.string().length(2).required(),
  category: Joi.string()
    .valid(
      "business",
      "entertainment",
      "general",
      "health",
      "science",
      "sports",
      "technology"
    )
    .required(),
});

exports.validateRegistration = (req, res, next) => {
  const { error } = registrationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

exports.validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

exports.validatePreferences = (req, res, next) => {
  const { error } = preferencesSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
