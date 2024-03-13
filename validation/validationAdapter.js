import { currentValidation } from "../constants/currentAdapter.js";
import idParamsValidation from "./reqDataValidations/idParamsValidation.js";
import cardValidation from "./websiteAreas/cardValidation.js";
import loginValidation from "./websiteAreas/loginValidation.js";
import userValidation from "./websiteAreas/userValidation.js";

const validationAdapter = async (method) => {
  try {
    if (currentValidation === "Joi") {
      return await method;
    } else {
      throw new Error(`Validation ${currentValidation} is not supported`);
    }
  } catch (error) {
    throw error;
  }
};

const userValidationAdapter = async (data, shouldPassword, shouldSpecific) =>
  await validationAdapter(userValidation(data, shouldPassword, shouldSpecific));

const objectIdValidationAdapter = async (id) =>
  await validationAdapter(idParamsValidation(id));

const loginValidationAdapter = async (data) =>
  await validationAdapter(loginValidation(data));

const cardValidationAdapter = async (data, _, shouldSpecific) =>
  await validationAdapter(cardValidation(data, shouldSpecific));

export {
  validationAdapter,
  userValidationAdapter,
  loginValidationAdapter,
  objectIdValidationAdapter,
  cardValidationAdapter,
};
