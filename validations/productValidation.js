import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  inStock: Joi.boolean().required(),
  rating: Joi.number().min(0).max(5).optional()
});
