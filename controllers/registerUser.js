import { generateHash } from "../helpers/bcryptServices.js";
import errorCreater from "../helpers/errorCreater.js";
import User from "../models/MongoDB/Collections/Schemas/Users.js";
import {
  createInstance,
  getInstance,
} from "../models/MongoDB/Collections/dynamicService.js";

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await getInstance({
      collectionType: User,
      identifier: "email",
      value: email,
    });
    if (findUser.length > 0) throw new Error("User already exists.");
    const protectedPassword = await generateHash(password);
    let newUser = await createInstance({
      collectionType: User,
      data: {
        ...req.body,
        password: protectedPassword,
      },
    });
    newUser = newUser.toObject();
    delete newUser.password;
    return res.json(newUser);
  } catch (error) {
    errorCreater(res, 400, error.message);
  }
};

export default registerUser;
