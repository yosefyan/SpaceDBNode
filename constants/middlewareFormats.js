import authMiddleware from "../middlewares/authMiddleware.js";
import paramsMiddleware from "../middlewares/paramsMiddleware.js";
import dynamicRoleMiddleware from "../middlewares/dynamicRoleMiddleware.js";

const middlewaresFormat = {
  paramsAdminMiddleware: [
    authMiddleware,
    paramsMiddleware,
    dynamicRoleMiddleware(["isAdmin"]),
  ],
};

export default middlewaresFormat
