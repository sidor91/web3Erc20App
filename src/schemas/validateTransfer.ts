import Joi from 'joi';

export const transferValidationSchema = Joi.object({
	token_addr: Joi.string().required(),
	recipient_addr: Joi.string().required(),
	amount: Joi.number().positive().required(),
});
