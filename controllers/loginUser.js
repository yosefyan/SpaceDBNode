import { compareHash } from "../helpers/bcryptServices.js";
import errorCreater from "../helpers/errorCreater.js";
import limitUser from "../helpers/limitUser.js";
import { generateToken } from "../helpers/tokenServices.js";
import User from "../models/MongoDB/Collections/Schemas/Users.js";
import { getInstance } from "../models/MongoDB/Collections/dynamicService.js";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Invalid email or password.");
    const userFromDB = await getInstance({
      collectionType: User,
      identifier: "email",
      value: email,
    });
    if (userFromDB.length === 0)
      throw new Error("Account not found. Please register.");

    const isPasswordMatching = await compareHash(
      password,
      userFromDB[0].password
    );
    if (!isPasswordMatching) throw new Error("Invalid email or password.");
    const { _id, isAdmin, isBusiness } = userFromDB[0];
    const generatedToken = await generateToken({ _id, isAdmin, isBusiness });

    return res.json(generatedToken);
  } catch (error) {
    errorCreater(res, 400, error.message);
  }
};

export default loginUser;
