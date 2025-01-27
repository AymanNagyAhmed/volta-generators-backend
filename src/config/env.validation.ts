import * as Joi from 'joi';

export const validationSchema = Joi.object({

  // Application
  PORT: Joi.number().default(4002),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  // CORS

  CORS_ORIGINS: Joi.string().required(),
  CORS_METHODS: Joi.string().required(),
  CORS_CREDENTIALS: Joi.string().required(),

  // Database
  DB_TYPE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),

});