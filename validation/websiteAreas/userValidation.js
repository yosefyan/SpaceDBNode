import Joi from "joi";
import { inlineValidation, nestedValidation } from "../genericValidation.js";
import { emailPassword, validationShards } from "../validationShards.js";

const userValidation = async (
  data,
  shouldPassword = true,
  shouldSpecific = false
) => {
  try {
    const validationShardsResult = await validationShards();
    const emailPasswordResult = await emailPassword(shouldPassword);

    const isBusiness = {
      isBusiness: inlineValidation({ type: Joi.boolean() }),
    };
    const Schema =
      shouldSpecific
        ? Joi.object({
            ...isBusiness,
          })
        : Joi.object({
            name: nestedValidation({
              keys: { first: "first", middle: "middle", last: "last" },
            }).required(),
            ...validationShardsResult,
            ...emailPasswordResult,
            ...isBusiness,
          });
    return await Schema.validateAsync(data);
  } catch (error) {
    throw new Error(error);
  }
};

export default userValidation;
