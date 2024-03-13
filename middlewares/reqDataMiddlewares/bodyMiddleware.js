import errorCreater from "../../helpers/errorCreater.js";

const bodyMiddleware =
  (validateSchema, shouldPassword = true, shouldSpecific = false) =>
  async (req, res, next) => {
    const body = req.body;
    try {
      if (Object.keys(body).length === 0)
        return res.status(400).json("body is required.");
      await validateSchema(body, shouldPassword, shouldSpecific);
      next();
    } catch (err) {
      errorCreater(res, 400, err.message);
    }
  };

export default bodyMiddleware;
