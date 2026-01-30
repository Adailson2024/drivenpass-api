
import Joi from "joi";
export const signUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const credentialSchema = Joi.object({
  title: Joi.string().required(),
  url: Joi.string().uri().required(),
  username: Joi.string().required(),
  password: Joi.string().required()
});

export const userSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "O email deve ser um endereço válido",
    "any.required": "O email é obrigatório"
  }),
  password: Joi.string().min(10).required().messages({
    "string.min": "A password deve ter pelo menos 10 caracteres",
    "any.required": "A password é obrigatória"
  })
});


export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});