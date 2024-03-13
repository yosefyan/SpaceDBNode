import errorCreater from "../helpers/errorCreater.js";
import {
  createInstance,
  deleteByIdInstance,
  getInstance,
  updateByIdInstance,
} from "../models/MongoDB/Collections/dynamicService.js";

const dynamicController = (
  { collectionType, identifier, value, updateSpecific, data },
  theMethod
) => {
  return async (req, res) => {
    try {
      const dataMethod = await theMethod({
        collectionType,
        identifier,
        updateSpecific,
        value,
        data,
      });
      if (dataMethod.length === 0)
        return res.status(404).send(
          `${
            collectionType.modelName === "cards" ? "Card/s" : "User/s"
          } does/do not exist.`
        );
      return res.status(200).json(dataMethod);
    } catch (error) {
      return errorCreater(res, 400, error.message);
    }
  };
};

const getDataController = ({ collectionType, identifier }) => {
  return async (req, res) => {
    return dynamicController(
      {
        collectionType,
        identifier,
        value: !identifier
          ? ""
          : collectionType.modelName === "cards"
          ? req.params.id || req.userData._id
          : req.params.id,
      },
      getInstance
    )(req, res);
  };
};

const createDataController = ({ collectionType, data }) => {
  return async (req, res) => {
    return dynamicController(
      {
        collectionType,
        data: {
          ...data,
          user_id:
            collectionType.modelName === "cards" &&
            req.userData._id &&
            req.userData._id,
        },
      },
      createInstance
    )(req, res);
  };
};

const updateDataController = ({
  collectionType,
  identifier,
  updateSpecific,
  data,
}) => {
  return async (req, res) => {
    return dynamicController(
      { collectionType, identifier, updateSpecific, data },
      updateByIdInstance
    )(req, res);
  };
};

const deleteDataController = ({ collectionType, identifier }) => {
  return async (req, res) => {
    return dynamicController(
      { collectionType, identifier },
      deleteByIdInstance
    )(req, res);
  };
};

export {
  getDataController,
  deleteDataController,
  updateDataController,
  createDataController,
};

export default dynamicController;
