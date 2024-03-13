import { address, image } from "./customShards/index.js";
import { phoneRegex, emailRegex } from "../../../../helpers/regexTypes.js";

const fieldType = ({
  type = String,
  min = 2,
  max = 256,
  minlength = 2,
  maxlength = 256,
  required = true,
}) => ({
  type,
  min,
  max,
  minlength,
  maxlength,
  trim: true,
  required,
});

const regexField = (regex, options = {}) => ({
  ...fieldType(options),
  match: [RegExp(regex), "Value did not match the regex."],
  ...(options.unique ? { unique: true } : {}),
});

const dateType = {
  type: Date,
  default: Date.now,
};

const booleanType = {
  type: Boolean,
  default: false,
};

const repetitiveObjects = async ({
  emailUnique = false,
  shouldPassword = false,
}) => ({
  phone: { ...regexField(phoneRegex, { min: 9, maxlength: 11 }) },
  email: {
    ...regexField(emailRegex, {
      ...(emailUnique && { unique: true }),
      minlength: 5,
    }),
  },
  ...(shouldPassword && {
    password: { ...fieldType({ min: 7 }) },
  }),
  address,
  image,
});

export { fieldType, dateType, regexField, booleanType, repetitiveObjects };
