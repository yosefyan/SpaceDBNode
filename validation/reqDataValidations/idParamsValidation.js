import Joi from "joi";

const idParamsValidation = async (id) => {
  try {
    const idValidation = Joi.string().hex().length(24).required();
    return await idValidation.validateAsync(id);
  } catch (error) {
    throw new Error(error);
  }
};

export default idParamsValidation;
