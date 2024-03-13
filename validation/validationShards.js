import Joi from "joi";
import { passwordRegex, phoneRegex } from "../helpers/regexTypes.js";
import { inlineValidation, nestedValidation } from "./genericValidation.js";

const validationShards = async () => ({
  phone: inlineValidation({
    regex: phoneRegex,
    messages: "Please provide a valid phone number.",
  }),
  image: nestedValidation({
    keys: { url: "url", alt: "alt" },
  }).required(),
  address: nestedValidation({
    keys: {
      city: "city",
      country: "country",
      street: "street",
      houseNumber: "houseNumber",
      state: "state",
      zip: "zip",
    },
  }).required(),
});

const emailPassword = async (shouldPassword = true) => ({
  email: inlineValidation({
    additionalType: Joi.string().email(),
    min: 5,
    max: 500,
    messages: "Please provide a valid email.",
  }),
  ...(shouldPassword && {
    password: inlineValidation({
      min: 7,
      max: 20,
      regex: passwordRegex,
      messages:
        "Password must contain at least one uppercase, lowercase, special character(!@#$%^&*-), and number",
    }),
  }),
});

export { validationShards, emailPassword };
