import Joi from "joi";
import { inlineValidation } from "../genericValidation.js";
import { validationShards, emailPassword } from "../validationShards.js";

const cardValidation = async (data, shouldSpecific = false) => {
  try {
    const validationShardsResult = await validationShards();
    const emailResult = await emailPassword(false);
    const Schema = Joi.object(
      shouldSpecific
        ? {
            bizNumber: inlineValidation({
              type: Joi.string(),
              length: 7,
            }),
          }
        : {
            title: inlineValidation,
            subtitle: inlineValidation,
            description: inlineValidation,
            web: inlineValidation,
            ...validationShardsResult,
            ...emailResult,
          }
    );
    return await Schema.validateAsync(data);
  } catch (error) {
    throw new Error(error);
  }
};

export default cardValidation;
