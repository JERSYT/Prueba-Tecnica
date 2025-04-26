import BaseJoi from "joi";
import JoiPhoneNumber from "joi-phone-number";

const Joi = BaseJoi.extend(JoiPhoneNumber);

const contactSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  country: Joi.string().optional(),
  phone: Joi.string()
    .phoneNumber({ defaultCountry: "US", strict: true })
    .optional(),
  message: Joi.string().min(10).max(500).required(),
});

export default contactSchema;
