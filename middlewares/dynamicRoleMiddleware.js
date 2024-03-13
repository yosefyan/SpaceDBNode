import Card from "../models/MongoDB/Collections/Schemas/Cards.js";
import errorCreater from "../helpers/errorCreater.js";
import { getInstance } from "../models/MongoDB/Collections/dynamicService.js";

const dynamicRoleMiddleware = (rolesArray) => {
  return async (req, res, next) => {
    try {
      const roleMatcher = rolesArray.every((role) => req.userData[role]);
      const selfParamsUser = req.params.id === req.userData._id;
      const getCardObject = await getInstance({
        collectionType: Card,
        identifier: "user_id",
        value: req.userData._id,
      });
      const isCardOwner =
        getCardObject[0]?.user_id.toString() === req.userData._id;
      if (
        Object.keys(req.body).length === 1 &&
        Object.keys(req.body)[0] === "bizNumber"
      ) {
        if (!roleMatcher && !selfParamsUser && !isCardOwner)
          return res.status(403).json("Insufficient privileges");
      } else {
        if (
          /Card/g.test(req.path) &&
          !roleMatcher &&
          !selfParamsUser &&
          !isCardOwner
        ) {
          return res.status(403).json("Insufficient privileges");
        } else {
          if (!roleMatcher && !selfParamsUser && !/Card/g.test(req.path)) {
            return res.status(403).json("Insufficient privileges");
          }
        }
      }
      req.id = req.params.id;

      next();
    } catch (err) {
      errorCreater(res, 400, err.message);
    }
  };
};

export default dynamicRoleMiddleware;
