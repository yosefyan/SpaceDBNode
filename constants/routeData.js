import {
  createData,
  deleteData,
  getData,
  updateData,
} from "../models/dynamicAdapter/dbAdapter.js";
import {
  cardValidationAdapter,
  loginValidationAdapter,
  userValidationAdapter,
} from "../validation/validationAdapter.js";
import User from "../models/MongoDB/Collections/Schemas/Users.js";
import Card from "../models/MongoDB/Collections/Schemas/Cards.js";
import registerUser from "../controllers/registerUser.js";
import loginUser from "../controllers/loginUser.js";
import likeCard from "../controllers/likeCard.js";
import dynamicRoleMiddleware from "../middlewares/dynamicRoleMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import paramsMiddleware from "../middlewares/paramsMiddleware.js";
import bodyMiddleware from "../middlewares/reqDataMiddlewares/bodyMiddleware.js";
import middlewaresFormat from "./middlewareFormats.js";
import limitUser from "../helpers/limitUser.js";
import passport from "passport";

const usersRouteData = {
  get: {
    urls: ["/getAllUsers", "/getUserById/:id"],
    bodyRequest: [
      [authMiddleware, dynamicRoleMiddleware(["isAdmin"]), getData(User)],
      [...middlewaresFormat.paramsAdminMiddleware, getData(User, "_id")],
    ],
  },
  post: {
    urls: ["/register", "/login"],
    bodyRequest: [
      [bodyMiddleware(userValidationAdapter), registerUser],
      [bodyMiddleware(loginValidationAdapter), limitUser, loginUser],
    ],
  },
  put: {
    urls: ["/updateUser/:id"],
    bodyRequest: [
      [
        ...middlewaresFormat.paramsAdminMiddleware,
        bodyMiddleware(userValidationAdapter, false),
        updateData(User, false),
      ],
    ],
  },
  patch: {
    urls: ["/patchBizStatus/:id"],
    bodyRequest: [
      [
        ...middlewaresFormat.paramsAdminMiddleware,
        bodyMiddleware(userValidationAdapter, false, true),
        updateData(User, "isBusiness"),
      ],
    ],
  },
  delete: {
    urls: ["/deleteUser/:id"],
    bodyRequest: [
      [...middlewaresFormat.paramsAdminMiddleware, deleteData(User)],
    ],
  },
};

const cardsRouteData = {
  get: {
    urls: ["/getAllCards", "/getCardById/:id", "/getAllMyCards"],
    bodyRequest: [
      [getData(Card)],
      [paramsMiddleware, getData(Card, "_id")],
      [authMiddleware, getData(Card, "user_id")],
    ],
  },
  post: {
    urls: ["/createCard"],
    bodyRequest: [
      [
        authMiddleware,
        dynamicRoleMiddleware(["isBusiness"]),
        bodyMiddleware(cardValidationAdapter, false),
        createData(Card),
      ],
    ],
  },
  put: {
    urls: ["/updateCard/:id"],
    bodyRequest: [
      [
        ...middlewaresFormat.paramsAdminMiddleware,
        bodyMiddleware(cardValidationAdapter, false),
        updateData(Card),
      ],
    ],
  },
  patch: {
    urls: ["/likeCard/:id", "/patchCardsBizNum/:id"],
    bodyRequest: [
      [authMiddleware, paramsMiddleware, likeCard],
      [
        ...middlewaresFormat.paramsAdminMiddleware,
        bodyMiddleware(cardValidationAdapter, null, true),
        updateData(Card, true),
      ],
    ],
  },
  delete: {
    urls: ["/deleteCard/:id"],
    bodyRequest: [
      [...middlewaresFormat.paramsAdminMiddleware, deleteData(Card)],
    ],
  },
};

const authRouteData = {
  get: {
    urls: ["/google", "/google/callback", "/success", "/failure"],
    bodyRequest: [
      [passport.authenticate("google", { scope: ["profile", "email"] })],
      [
        passport.authenticate("google", {
          successRedirect: "/auth/success",
          failureRedirect: "/auth/failure",
        }),
      ],
      [(req, res) => res.send("You are successfully logged in!")],
      [(req, res) => res.send("Login failed!")],
    ],
  },
};

export { usersRouteData, cardsRouteData, authRouteData };
